function parseSiteUrl(value: string | undefined): URL | null {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  try {
    return new URL(
      /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`,
    );
  } catch {
    return null;
  }
}

export const siteUrl =
  parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  parseSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  parseSiteUrl(process.env.VERCEL_URL) ??
  new URL("http://localhost:3000");
