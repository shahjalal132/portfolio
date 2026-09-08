import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveProjectScreenshot } from "@/lib/project-screenshot";
import type { ProjectsData } from "@/lib/project-types";

const projectsFile = join(process.cwd(), "data", "projects.json");

export type { Project } from "@/lib/project-types";
export { resolveProjectScreenshot };

export function getProjects() {
  const projectsJson = readFileSync(projectsFile, "utf8").replace(
    /^\uFEFF/,
    "",
  );
  const projectsData = JSON.parse(projectsJson) as ProjectsData;

  return projectsData.projects;
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}
