// Configuration générale du site, réutilisée pour le SEO et les métadonnées.
export const SITE = {
  name: "IaTuto",
  title: "IaTuto — Comparatifs et avis d'outils",
  description:
    "Comparatifs, tests et avis indépendants pour vous aider à choisir les meilleurs outils.",
  /** Image utilisée par défaut pour le partage sur les réseaux (place le fichier dans /public). */
  defaultOgImage: "/og-default.png",
  lang: "fr",
  ogLocale: "fr_FR",
} as const;
