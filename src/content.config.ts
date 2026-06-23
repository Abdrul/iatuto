import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z
      .string()
      .max(60, "Titre trop long pour le SEO (max ~60 caractères)"),
    description: z
      .string()
      .min(80, "Description trop courte pour le SEO (min 80)")
      .max(160, "Description trop longue, Google va la tronquer (max 160)"),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Adil"),
    category: z.enum(["comparatif", "tutoriel", "avis", "guide"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
