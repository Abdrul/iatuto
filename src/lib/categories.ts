// Métadonnées d'affichage des catégories (libellé, badge, en-tête, intro).
//
// IMPORTANT : la LISTE des catégories n'est jamais figée ici. Elle se déduit
// toujours de la collection `blog` via `getUsedCategories()`. Ce fichier ne
// fait qu'« habiller » une catégorie déjà rencontrée dans un article ; une
// catégorie inconnue retombe sur un rendu générique (libellé capitalisé,
// badge neutre). Une nouvelle catégorie utilisée dans un futur article
// apparaîtra donc automatiquement, avec ou sans entrée ci-dessous.
import { getCollection } from "astro:content";

export interface CategoryMeta {
  /** Libellé court et capitalisé utilisé dans la nav et les badges. */
  label: string;
  /** Titre h1 de la page de catégorie (souvent au pluriel). */
  heading: string;
  /** Phrase d'introduction affichée sous le titre. */
  intro: string;
  /** Couleur de fond du badge (identique à la page /blog). */
  bg: string;
  /** Couleur du texte du badge. */
  color: string;
}

// Habillage des catégories connues. Les couleurs reprennent celles de /blog.
const CATEGORY_META: Record<string, CategoryMeta> = {
  comparatif: {
    label: "Comparatif",
    heading: "Comparatifs",
    intro:
      "Nos comparatifs d'outils IA, testés en conditions réelles pour vous aider à choisir le bon.",
    bg: "#e1f5ee",
    color: "#1d9e75",
  },
  tutoriel: {
    label: "Tutoriel",
    heading: "Tutoriels",
    intro:
      "Nos tutoriels pas à pas pour prendre en main les meilleurs outils IA, sans jargon.",
    bg: "#eeeaf9",
    color: "#7a5bc7",
  },
  avis: {
    label: "Avis",
    heading: "Avis",
    intro:
      "Nos avis indépendants, rédigés après usage réel de chaque outil — points forts comme limites.",
    bg: "#faeeda",
    color: "#854f0b",
  },
  guide: {
    label: "Guide",
    heading: "Guides",
    intro:
      "Nos guides complets pour aller plus loin et tirer le meilleur des outils IA.",
    bg: "#eeeaf9",
    color: "#7a5bc7",
  },
};

// Ordre d'affichage préféré (nav et listes). Les catégories non listées ici
// sont simplement ajoutées à la fin, par ordre alphabétique.
const CATEGORY_ORDER = Object.keys(CATEGORY_META);

/** Métadonnées d'une catégorie, avec repli générique si elle est inconnue. */
export function categoryMeta(category: string): CategoryMeta {
  const known = CATEGORY_META[category];
  if (known) return known;

  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    label: capitalized,
    heading: capitalized,
    intro: `Tous nos articles de la catégorie « ${capitalized} ».`,
    bg: "var(--border)",
    color: "var(--text-2)",
  };
}

/**
 * Liste des catégories réellement utilisées par au moins un article publié,
 * ordonnées selon `CATEGORY_ORDER` (inconnues en fin de liste).
 */
export async function getUsedCategories(): Promise<string[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const used = [...new Set(posts.map((post) => post.data.category))];

  return used.sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
  });
}
