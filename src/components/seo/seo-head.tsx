import Head from "next/head";
import { useRouter } from "next/router";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://myairporttransfer24.de"
).replace(/\/$/, "");

export type SeoHeadProps = {
  title: string;
  description: string;
  path: string; // e.g. "/" or "/flughafentransfer/bad-homburg"
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

function buildUrl(path: string, locale: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    return cleanPath === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${cleanPath}`;
  }
  return `${SITE_URL}${cleanPath}`;
}

const SeoHead = ({
  title,
  description,
  path,
  ogImage = "/img/carousel1.jpg",
  ogImageAlt = "MyAirportTransfer24 – Flughafentransfer Bad Homburg",
  jsonLd,
  noindex = false,
}: SeoHeadProps) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  const deUrl = buildUrl(path, "de");
  const enUrl = buildUrl(path, "en");
  const canonicalUrl = locale === "en" ? enUrl : deUrl;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  const ldSchemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={deUrl} />

      <meta property="og:locale" content={locale === "en" ? "en_US" : "de_DE"} />
      <meta
        property="og:locale:alternate"
        content={locale === "en" ? "de_DE" : "en_US"}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MyAirportTransfer24" />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {ldSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

export default SeoHead;

