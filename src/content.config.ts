import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// GitHub username 規則（簡化版）：1~39，英數或 -，不能 - 開頭/結尾
const githubUsername = z
  .string()
  .min(1)
  .max(39)
  .regex(/^(?!-)[a-zA-Z0-9-]+(?<!-)$/);

const authors = z.array(githubUsername).min(1);

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    authors,
    draft: z.boolean().default(false),
    pin: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(["planning", "active", "paused", "done"]).default("active"),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    authors,
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    startAt: z.coerce.date(),
    endAt: z.coerce.date().optional(),
    location: z.string().optional(),
    registrationUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    authors,
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news, projects, events };
