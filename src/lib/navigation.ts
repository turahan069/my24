/**
 * Gemeinsame Navigations-Helfer für Buchungsanker (#Buchen / #Book),
 * damit Navbar, Navigator und mobile Aktionsleiste identisch routen.
 */
const INLINE_BOOK_PAGES = new Set([
  "/",
  "/flughafentransfer/[slug]",
  "/leistungen/[slug]",
  "/stundenbuchung",
]);

/** Prüft, ob die aktuelle Seite bereits ein eigenes Buchungsformular enthält */
export function hasInlineBookingSection(pathname: string): boolean {
  return INLINE_BOOK_PAGES.has(pathname);
}

/** Liefert den passenden Anker-Link (#Buchen lokal vs. /#Buchen auf Unterseiten) */
export function getBookHref(pathname: string, bookAnchor: string): string {
  return hasInlineBookingSection(pathname) ? `#${bookAnchor}` : `/#${bookAnchor}`;
}

