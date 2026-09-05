import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, Layers3 } from "lucide-react";
import {
  getProjectBySlug,
  projects,
  resolveProjectScreenshot,
} from "@/lib/projects";

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug)!;
  const hasLiveUrl = project.links.live !== "#";

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-[1180px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Project Gallery
          </Link>

          {hasLiveUrl && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Live project
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(460px,1.15fr)] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Project details · {project.code}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              {project.summary}
            </p>

            {project.technologies.length > 0 && (
              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label="Technology stack"
              >
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-md border border-accent/15 bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-background shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
            <Image
              src={resolveProjectScreenshot(project.screenshot_url)}
              alt={`${project.name} project screenshot`}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10 lg:py-20">
        <article>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Overview
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            About this project
          </h2>
          <p className="mt-5 whitespace-pre-line text-base leading-8 text-muted">
            {project.description}
          </p>
        </article>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">Project information</h2>
          <dl className="mt-5 space-y-5 text-sm">
            <div>
              <dt className="flex items-center gap-2 font-medium text-foreground">
                <Code2 size={16} className="text-accent" aria-hidden="true" />
                Project code
              </dt>
              <dd className="mt-1.5 text-muted">{project.code}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-medium text-foreground">
                <Layers3 size={16} className="text-accent" aria-hidden="true" />
                Technologies
              </dt>
              <dd className="mt-1.5 text-muted">
                {project.technologies.length} technologies listed
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Project ID</dt>
              <dd className="mt-1.5 font-mono text-muted">{project.id}</dd>
            </div>
          </dl>

          {hasLiveUrl && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-accent px-4 py-2.5 font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
            >
              Visit live project
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </aside>
      </section>
    </main>
  );
}
