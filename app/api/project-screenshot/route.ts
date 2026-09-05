import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(request: Request) {
  const requestedPath = new URL(request.url).searchParams.get("path");

  if (!requestedPath) {
    return NextResponse.json(
      { error: "Image path is required." },
      { status: 400 },
    );
  }

  const dataRoot = path.resolve(process.cwd(), "data");
  const imagePath = path.resolve(dataRoot, requestedPath);
  const relativePath = path.relative(dataRoot, imagePath);
  const contentType = contentTypes[path.extname(imagePath).toLowerCase()];

  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    !contentType
  ) {
    return NextResponse.json({ error: "Invalid image path." }, { status: 400 });
  }

  try {
    const image = await readFile(imagePath);

    return new Response(image, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(image.byteLength),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
