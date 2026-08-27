import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const videoPath = path.join(process.cwd(), "data", "typing-animation.mp4");
  const video = await readFile(videoPath);

  return new Response(video, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(video.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
