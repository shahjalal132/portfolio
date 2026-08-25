import type { CSSProperties } from "react";
import rawTheme from "@/themes/corporate-cobalt.json";
import { z } from "zod";

const themeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    colors: z.object({
      background: z.string(),
      surface: z.string(),
      textPrimary: z.string(),
      textSecondary: z.string(),
      textMuted: z.string(),
      border: z.string(),
      accent: z.string(),
      accentHover: z.string(),
      accentSoft: z.string(),
      success: z.string(),
      focusRing: z.string(),
    }),
  })
  .passthrough();

export const theme = themeSchema.parse(rawTheme);

export const themeVariables = {
  "--theme-background": theme.colors.background,
  "--theme-surface": theme.colors.surface,
  "--theme-text-primary": theme.colors.textPrimary,
  "--theme-text-secondary": theme.colors.textSecondary,
  "--theme-text-muted": theme.colors.textMuted,
  "--theme-border": theme.colors.border,
  "--theme-accent": theme.colors.accent,
  "--theme-accent-hover": theme.colors.accentHover,
  "--theme-accent-soft": theme.colors.accentSoft,
  "--theme-success": theme.colors.success,
  "--theme-focus-ring": theme.colors.focusRing,
} as CSSProperties;
