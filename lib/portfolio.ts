import rawPortfolioData from "@/data/portfolio-data.json";
import { z } from "zod";

const linkSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.union([z.string().url(), z.literal("#")]),
});

const highlightSchema = z
  .object({
    label: z.string(),
    description: z.string(),
  })
  .passthrough();

const locationSchema = z
  .object({
    country: z.string(),
    display: z.string(),
  })
  .passthrough();

const periodSchema = z
  .object({
    start: z.string().regex(/^\d{4}-\d{2}$/),
    end: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .nullable(),
    display: z.string(),
  })
  .passthrough();

const portfolioDataSchema = z
  .object({
    schemaVersion: z.string(),
    lastUpdated: z.string(),
    portfolio: z.object({
      settings: z
        .object({
          navigation: z.array(z.object({ id: z.string(), label: z.string() })),
          featuredProjectIds: z.array(z.string()),
        })
        .passthrough(),
      profile: z.object({
        name: z.string(),
        headline: z.string(),
        location: locationSchema.extend({ city: z.string() }),
        contact: z.object({
          email: z.string().email(),
          phone: z.string(),
          cv_url: z.string().url(),
          links: z.array(linkSchema),
        }),
        summary: z.string(),
        focusAreas: z.array(z.string()),
      }),
      experience: z.array(
        z
          .object({
            id: z.string(),
            company: z.string(),
            companyUrl: z.string().url(),
            role: z.string(),
            location: locationSchema,
            period: periodSchema,
            highlights: z.array(highlightSchema),
          })
          .passthrough(),
      ),
      projects: z.array(
        z
          .object({
            id: z.string(),
            featured: z.boolean(),
            name: z.string(),
            url: z.string().url(),
            technologies: z.array(z.string()),
            highlights: z.array(highlightSchema),
          })
          .passthrough(),
      ),
      skills: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          groups: z.array(
            z.object({
              label: z.string(),
              items: z.array(z.string()),
            }),
          ),
        }),
      ),
      education: z.array(z.unknown()),
      certifications: z.array(z.unknown()),
      languages: z.array(z.unknown()),
    }),
  })
  .passthrough();

export const portfolioData = portfolioDataSchema.parse(rawPortfolioData);
