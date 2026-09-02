import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const elsewhere = defineCollection({
  loader: file("./src/content/elsewhere.json"),
  schema: z.object({
    title: z.string(),
    publication: z.string(),
    published: z.coerce.date(),
    url: z.string().url(),
    note: z.string().optional(),
  }),
});

export const collections = { writing, elsewhere };
