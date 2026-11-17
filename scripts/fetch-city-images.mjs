#!/usr/bin/env node
/**
 * Fetches verified Wikimedia Commons landmark images (1200px width) and their
 * Creative Commons / Public Domain attribution metadata into:
 *   - public/img/cities/<slug>.jpg
 *   - src/data/city-image-credits.json
 *
 * Single source of truth: reads `image: { slug, localPath, commonsFile, commonsUrl }`
 * directly from src/data/cities.ts.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const CITIES_TS_PATH = path.join(ROOT_DIR, "src", "data", "cities.ts");
const CREDITS_JSON_PATH = path.join(
  ROOT_DIR,
  "src",
  "data",
  "city-image-credits.json"
);
const IMG_OUT_DIR = path.join(ROOT_DIR, "public", "img", "cities");

const USER_AGENT =
  "MyAirportTransfer24-AssetFetcher/1.0 (https://myairporttransfer24.de; info@MyAirportTransfer24.de)";

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

function stripHtml(raw) {
  if (!raw || typeof raw !== "string") return "";
  const withoutTags = raw.replace(/<[^>]*>/g, " ");
  return decodeHtmlEntities(withoutTags).replace(/\s+/g, " ").trim();
}

function extractImageSpecsFromCitiesTs(source) {
  const specs = [];
  const blockRegex =
    /image:\s*\{\s*slug:\s*"([^"]+)",\s*localPath:\s*"([^"]+)",\s*commonsFile:\s*"([^"]+)",\s*commonsUrl:\s*"([^"]+)"/g;

  let match;
  while ((match = blockRegex.exec(source)) !== null) {
    specs.push({
      slug: match[1],
      localPath: match[2],
      commonsFile: match[3],
      commonsUrl: match[4],
    });
  }
  return specs;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCommonsMetadata(commonsFile) {
  const apiUrl = new URL("https://commons.wikimedia.org/w/api.php");
  apiUrl.searchParams.set("action", "query");
  apiUrl.searchParams.set("titles", commonsFile);
  apiUrl.searchParams.set("prop", "imageinfo");
  apiUrl.searchParams.set("iiprop", "url|extmetadata");
  apiUrl.searchParams.set("iiurlwidth", "1200");
  apiUrl.searchParams.set("format", "json");
  apiUrl.searchParams.set("redirects", "1");

  const res = await fetch(apiUrl.toString(), {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Commons API HTTP ${res.status} for ${commonsFile}`);
  }

  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== "object") {
    throw new Error(`No query.pages returned for ${commonsFile}`);
  }

  const firstPage = Object.values(pages)[0];
  if (!firstPage || firstPage.missing !== undefined) {
    throw new Error(`Wikimedia page missing for ${commonsFile}`);
  }

  const info = firstPage.imageinfo?.[0];
  if (!info) {
    throw new Error(`No imageinfo returned for ${commonsFile}`);
  }

  const meta = info.extmetadata || {};
  const rawArtist =
    meta.Artist?.value ||
    meta.Attribution?.value ||
    meta.Credit?.value ||
    "Wikimedia Commons";
  const author = stripHtml(rawArtist) || "Wikimedia Commons";
  const license = stripHtml(meta.LicenseShortName?.value || "Wikimedia Commons");
  const licenseUrl = meta.LicenseUrl?.value || "";
  const downloadUrl = info.thumburl || info.url;
  const descriptionUrl = info.descriptionurl || "";

  if (!downloadUrl) {
    throw new Error(`No download URL for ${commonsFile}`);
  }

  return {
    author,
    license,
    licenseUrl,
    downloadUrl,
    descriptionUrl,
  };
}

async function downloadBinary(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
    },
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Image download HTTP ${res.status} for ${url}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.byteLength < 1024) {
    throw new Error(
      `Downloaded file suspiciously small (${buffer.byteLength} bytes) for ${url}`
    );
  }

  await fs.writeFile(destPath, buffer);
  return buffer.byteLength;
}

async function main() {
  const citiesSource = await fs.readFile(CITIES_TS_PATH, "utf8");
  const specs = extractImageSpecsFromCitiesTs(citiesSource);

  if (specs.length === 0) {
    console.error("Failed to extract image entries from src/data/cities.ts");
    process.exit(1);
  }

  await fs.mkdir(IMG_OUT_DIR, { recursive: true });

  let existingCredits = {};
  try {
    const existingRaw = await fs.readFile(CREDITS_JSON_PATH, "utf8");
    existingCredits = JSON.parse(existingRaw);
  } catch {
    existingCredits = {};
  }

  const nextCredits = { ...existingCredits };
  let successCount = 0;
  let failCount = 0;

  console.log(`Fetching ${specs.length} Wikimedia Commons city images...`);

  for (const spec of specs) {
    const destRel = spec.localPath.replace(/^\/+/, "");
    const destAbs = path.join(ROOT_DIR, "public", destRel);

    try {
      const meta = await fetchCommonsMetadata(spec.commonsFile);
      const bytes = await downloadBinary(meta.downloadUrl, destAbs);

      nextCredits[spec.slug] = {
        commonsFile: spec.commonsFile,
        commonsUrl: meta.descriptionUrl || spec.commonsUrl,
        localPath: spec.localPath,
        author: meta.author,
        license: meta.license,
        licenseUrl: meta.licenseUrl,
        downloaded: true,
      };

      successCount += 1;
      console.log(
        `[OK] ${spec.slug} -> ${path.relative(ROOT_DIR, destAbs)} (${Math.round(
          bytes / 1024
        )} KB, ${meta.license}, by ${meta.author})`
      );
    } catch (err) {
      failCount += 1;
      console.error(`[FAIL] ${spec.slug} (${spec.commonsFile}): ${err.message}`);
      if (!nextCredits[spec.slug]) {
        nextCredits[spec.slug] = {
          commonsFile: spec.commonsFile,
          commonsUrl: spec.commonsUrl,
          localPath: spec.localPath,
          author: "",
          license: "",
          licenseUrl: "",
          downloaded: false,
        };
      }
    }

    await sleep(300);
  }

  await fs.writeFile(
    CREDITS_JSON_PATH,
    JSON.stringify(nextCredits, null, 2) + "\n",
    "utf8"
  );

  console.log(
    `Done. Success: ${successCount}/${specs.length}, Failed: ${failCount}. Updated src/data/city-image-credits.json.`
  );

  if (failCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

