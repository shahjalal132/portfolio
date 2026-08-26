import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CloudCog,
  Code2,
  FileDown,
  Mail,
  PanelsTopLeft,
  Plus,
  ServerCog,
  ShoppingCart,
  Tag,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { ProjectGallery } from "@/components/project-gallery";
import { SmoothScroll } from "@/components/smooth-scroll";
import profilePhoto from "@/data/Jalal.png";
import { portfolioData } from "@/lib/portfolio";

const sectionHeading =
  "font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent";

const skillIcons: Record<string, LucideIcon> = {
  "ai-modern-workflow": BrainCircuit,
  "backend-system-architecture": ServerCog,
  "frontend-ui-development": PanelsTopLeft,
  "woocommerce-expertise": ShoppingCart,
  "infrastructure-devops-tooling": CloudCog,
  "soft-skills": UsersRound,
};

export default function Home() {
  const { profile, experience, projects, skills } = portfolioData.portfolio;
  const github = profile.contact.links.find((link) => link.id === "github");
  const featuredProjects = projects.filter((project) => project.featured);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.headline,
      description: profile.summary,
      email: `mailto:${profile.contact.email}`,
      telephone: profile.contact.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location.city,
        addressCountry: profile.location.country,
      },
      sameAs: profile.contact.links.map((link) => link.url),
      knowsAbout: profile.focusAreas,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-[1180px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#about" className="font-semibold tracking-tight">
            {profile.name}
          </a>
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm text-muted">
              {portfolioData.portfolio.settings.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    className="transition-colors hover:text-accent"
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`mailto:${profile.contact.email}`}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Contact
          </a>
        </div>
      </header>

      <SmoothScroll>
        <main>
          <section
            id="about"
            className="hero-glow hero-reveal mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12 lg:flex lg:min-h-[calc(100svh-4.6rem)] lg:items-center lg:px-10 lg:py-8"
          >
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-center">
              <div>
                <p className={sectionHeading}>
                  Full-Stack Engineering + AI Automation
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-[2.875rem]">
                  I build reliable digital products that turn complex workflows
                  into clear business outcomes.
                </h1>
                <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-6">
                  {profile.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    data-gsap-button
                    href={`mailto:${profile.contact.email}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Start a conversation
                  </a>
                  {github && (
                    <a
                      data-gsap-button
                      href={github.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 font-semibold transition-colors hover:border-accent hover:text-accent"
                    >
                      <Code2 size={18} aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  <a
                    data-gsap-button
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    <FileDown size={18} aria-hidden="true" />
                    Download CV
                  </a>
                </div>
              </div>

              <div className="profile-photo-reveal relative mx-auto flex h-[400px] w-full max-w-[370px] items-end justify-center overflow-hidden rounded-[2rem] bg-accent-soft pt-5 lg:h-[420px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-10 bottom-8 aspect-square rounded-full border border-accent/15 bg-white/70"
                />
                <Image
                  src={profilePhoto}
                  alt={`Portrait of ${profile.name}`}
                  priority
                  sizes="(min-width: 1024px) 390px, (min-width: 640px) 360px, 82vw"
                  className="relative z-10 h-auto max-h-[430px] w-auto object-contain object-bottom drop-shadow-[0_20px_25px_rgba(15,23,42,0.14)]"
                />
              </div>
            </div>
          </section>

          <section
            id="experience"
            data-gsap-pinned-section
            className="border-y border-border bg-surface"
          >
            <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
              <p className={sectionHeading}>Experience</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Professional track record
              </h2>
              <div className="mt-12 divide-y divide-border border-y border-border">
                {experience.map((item) => (
                  <article
                    key={item.id}
                    data-gsap-panel
                    className="experience-list-row -mx-2 grid gap-5 rounded-2xl border border-transparent bg-surface px-2 py-9 sm:-mx-4 sm:px-4 lg:grid-cols-[260px_1fr]"
                  >
                    <div>
                      <p className="font-mono text-sm text-subtle">
                        {item.period.display}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.role}
                      </h3>
                      <a
                        className="mt-1 inline-flex items-center gap-1 text-muted hover:text-accent"
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.company}{" "}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      <p className="mt-1 text-sm text-subtle">
                        {item.location.display}
                      </p>
                    </div>
                    <ul className="grid gap-4 text-muted">
                      {item.highlights.slice(0, 4).map((highlight) => (
                        <li key={highlight.label} className="leading-7">
                          <strong className="font-semibold text-foreground">
                            {highlight.label}:
                          </strong>{" "}
                          {highlight.description}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="projects"
            className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"
          >
            <p className={sectionHeading}>Selected projects</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Systems built around measurable impact
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="project-card group relative flex min-h-[500px] flex-col overflow-hidden rounded-[1.75rem] border border-border p-7 sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="project-card-glow absolute -right-24 -bottom-28 h-72 w-72 rounded-full"
                  />

                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <span className="rounded-md border border-white/80 bg-white/80 px-3 py-1.5 font-mono text-xs font-medium text-accent shadow-sm backdrop-blur">
                      {project.technologies[0]}
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative z-10 mt-5 flex items-center gap-2 font-mono text-sm text-muted">
                    <Tag size={17} aria-hidden="true" />
                    <span>Featured engineering work</span>
                  </div>

                  <h3 className="relative z-10 mt-5 max-w-xl text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                    {project.name}
                  </h3>

                  <p className="relative z-10 mt-5 text-base leading-7 text-muted">
                    {project.highlights[0]?.description}
                  </p>

                  <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                    {project.technologies.slice(1).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-accent/10 bg-white/65 px-3 py-1 font-mono text-xs text-accent backdrop-blur"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <ul className="relative z-10 mt-7 grid gap-3 text-sm text-muted">
                    {project.highlights.slice(1, 3).map((highlight) => (
                      <li
                        key={highlight.label}
                        className="border-l-2 border-accent/20 pl-3 leading-6 transition-colors group-hover:border-accent/60"
                      >
                        <strong className="font-semibold text-foreground">
                          {highlight.label}
                        </strong>
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 mt-auto flex items-center justify-between gap-5 pt-9">
                    <a
                      data-gsap-button
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-foreground transition-colors group-hover:text-accent"
                    >
                      Explore project
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-1"
                        size={19}
                        aria-hidden="true"
                      />
                    </a>
                    <a
                      data-gsap-button
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.name}`}
                      className="project-card-action inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/85 text-foreground shadow-sm backdrop-blur"
                    >
                      <Plus size={22} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <ProjectGallery />

          <section
            id="skills"
            data-gsap-pinned-section
            className="border-y border-border bg-surface"
          >
            <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
              <p className={sectionHeading}>Capabilities</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Technical foundation
              </h2>
              <div className="mt-10 divide-y divide-border border-y border-border">
                {skills.map((skill) => {
                  const SkillIcon = skillIcons[skill.id] ?? Code2;

                  return (
                    <article
                      key={skill.id}
                      data-gsap-panel
                      className="skill-list-row -mx-2 grid gap-7 rounded-2xl border border-transparent bg-surface px-2 py-8 sm:-mx-4 sm:px-4 lg:grid-cols-[280px_1fr] lg:gap-12"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                          <SkillIcon
                            size={23}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                        <h3 className="text-lg font-semibold leading-6">
                          {skill.label}
                        </h3>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {skill.groups.map((group) => (
                          <div key={group.label}>
                            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                              {group.label}
                            </h4>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm leading-5 text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="education"
            className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"
          >
            <div className="rounded-2xl bg-foreground px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  International collaboration
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Looking for engineering work where product quality and
                  business impact matter.
                </h2>
              </div>
              <a
                data-gsap-button
                href={`mailto:${profile.contact.email}`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-50 lg:mt-0"
              >
                Contact me <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </section>
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p className="font-mono text-xs">
              Built from structured portfolio data.
            </p>
          </div>
        </footer>
      </SmoothScroll>
    </>
  );
}
