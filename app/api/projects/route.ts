import { NextResponse } from "next/server";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { projects: getProjects() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
