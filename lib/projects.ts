import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveProjectScreenshot } from "@/lib/project-screenshot";
import type { ProjectsData } from "@/lib/project-types";

const projectsFile = join(process.cwd(), "data", "projects.json");
const projectsJson = readFileSync(projectsFile, "utf8").replace(/^\uFEFF/, "");
const projectsData = JSON.parse(projectsJson) as ProjectsData;

export const projects = projectsData.projects;
export type { Project } from "@/lib/project-types";
export { resolveProjectScreenshot };

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
