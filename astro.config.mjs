// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // ⚠️ Remplace par ton vrai nom de domaine une fois en ligne.
  // C'est utilisé pour générer le sitemap.xml (important pour le SEO).
  site: "https://iatuto.fr",
  integrations: [sitemap()],
  build: {
    format: "directory",
  },
  trailingSlash: "never",
});
