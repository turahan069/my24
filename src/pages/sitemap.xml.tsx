/**
 * Dynamische XML-Sitemap (/sitemap.xml) mit zweisprachigen `hreflang`-Verknüpfungen
 * (DE / EN / x-default) sowie Bild-Metadaten für Orte, Leistungen und Fuhrpark.
 */
import type { GetServerSideProps } from "next";
import { CITIES } from "@/data/cities";
import { FLEET_VEHICLES } from "@/data/fleet";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/components/seo/seo-head";

type SitemapUrlConfig = {
  path: string;
  priority: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  image?: {
    loc: string;
    titleDe: string;
    titleEn: string;
    captionDe: string;
    captionEn: string;
  };
};

/** Schützt Textinhalte innerhalb generierter XML-Tags vor ungültigen Sonderzeichen */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Baut die kanonische URL je Sprache (`/` für DE, `/en/...` für EN) */
function buildLocalizedUrl(routePath: string, locale: "de" | "en"): string {
  const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  if (locale === "en") {
    return cleanPath === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${cleanPath}`;
  }
  return cleanPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`;
}

function generateSiteMapXml(): string {
  const lastmod = new Date().toISOString().split("T")[0];

  const staticRoutes: SitemapUrlConfig[] = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/stundenbuchung", priority: "0.95", changefreq: "weekly" },
    { path: "/leistungen", priority: "0.9", changefreq: "weekly" },
    { path: "/fuhrpark", priority: "0.9", changefreq: "weekly" },
    { path: "/flughafentransfer", priority: "0.95", changefreq: "weekly" },
    { path: "/ueber-uns", priority: "0.8", changefreq: "monthly" },
    { path: "/FAQ", priority: "0.7", changefreq: "monthly" },
    { path: "/AGB", priority: "0.4", changefreq: "yearly" },
    { path: "/Impressum", priority: "0.4", changefreq: "yearly" },
  ];

  const serviceRoutes: SitemapUrlConfig[] = SERVICES.map((service) => ({
    path: `/leistungen/${service.slug}`,
    priority: "0.85",
    changefreq: "monthly",
    image: {
      loc: `${SITE_URL}${service.image}`,
      titleDe: service.nameDe,
      titleEn: service.nameEn,
      captionDe: service.imageAltDe,
      captionEn: service.imageAltEn,
    },
  }));

  const cityRoutes: SitemapUrlConfig[] = CITIES.map((city) => ({
    path: `/flughafentransfer/${city.slug}`,
    priority: "0.9",
    changefreq: "monthly",
    image: city.imageCredit.downloaded
      ? {
        loc: `${SITE_URL}${city.image.localPath}`,
        titleDe: city.image.titleDe,
        titleEn: city.image.titleEn,
        captionDe: city.image.altDe,
        captionEn: city.image.altEn,
      }
      : undefined,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...FLEET_VEHICLES.map((vehicle) => ({
      path: `/fuhrpark/${vehicle.slug}`,
      priority: "0.85",
      changefreq: "monthly" as const,
      image: {
        loc: `${SITE_URL}${vehicle.image}`,
        titleDe: vehicle.nameDe,
        titleEn: vehicle.nameEn,
        captionDe: vehicle.imageAltDe,
        captionEn: vehicle.imageAltEn,
      },
    })),
    ...cityRoutes,
  ];

  const entries = allRoutes.flatMap((route) => {
    const deHref = buildLocalizedUrl(route.path, "de");
    const enHref = buildLocalizedUrl(route.path, "en");

    return (["de", "en"] as const).map((locale) => {
      const loc = locale === "en" ? enHref : deHref;
      const imageXml = route.image
        ? `
    <image:image>
      <image:loc>${escapeXml(route.image.loc)}</image:loc>
      <image:title>${escapeXml(
          locale === "en" ? route.image.titleEn : route.image.titleDe
        )}</image:title>
      <image:caption>${escapeXml(
          locale === "en" ? route.image.captionEn : route.image.captionDe
        )}</image:caption>
    </image:image>`
        : "";

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="de" href="${escapeXml(deHref)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enHref)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
        deHref
      )}" />${imageXml}
  </url>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = generateSiteMapXml();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {
  return null;
}
