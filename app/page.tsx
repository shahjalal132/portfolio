import { ArrowUpRight, Code2, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import profilePhoto from "@/data/Jalal.png";
import { portfolioData } from "@/lib/portfolio";

const sectionHeading =
  "font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent";

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

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
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

      <main>
        <section
          id="about"
          className="hero-reveal mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
            <div>
              <p className={sectionHeading}>
                Full-Stack Engineering + AI Automation
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-6xl">
                I build reliable digital products that turn complex workflows
                into clear business outcomes.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                {profile.summary}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  <Mail size={18} aria-hidden="true" />
                  Start a conversation
                </a>
                {github && (
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    <Code2 size={18} aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="profile-photo-reveal relative mx-auto flex h-[500px] w-full max-w-[390px] items-end justify-center overflow-hidden rounded-[2rem] bg-accent-soft pt-8 lg:h-[560px]">
              <div
                aria-hidden="true"
                className="absolute inset-x-10 bottom-8 aspect-square rounded-full border border-accent/15 bg-white/70"
              />
              <Image
                src={profilePhoto}
                alt={`Portrait of ${profile.name}`}
                priority
                sizes="(min-width: 1024px) 390px, (min-width: 640px) 360px, 82vw"
                className="relative z-10 h-auto max-h-[570px] w-auto object-contain object-bottom drop-shadow-[0_20px_25px_rgba(15,23,42,0.14)]"
              />
            </div>
          </div>

          <aside
            className="mt-12 grid gap-5 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]"
            aria-label="Professional profile"
          >
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} aria-hidden="true" />
              {profile.location.display}
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">
                Web development
              </p>
              <p className="mt-1 text-2xl font-bold">4+ years</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">
                Laravel
              </p>
              <p className="mt-1 text-2xl font-bold">2+ years</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">
                WordPress
              </p>
              <p className="mt-1 text-2xl font-bold">3+ years</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">
                Featured work
              </p>
              <p className="mt-1 text-2xl font-bold">
                {featuredProjects.length} projects
              </p>
            </div>
          </aside>
        </section>

        <section id="experience" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <p className={sectionHeading}>Experience</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Professional track record
            </h2>
            <div className="mt-12 divide-y divide-border border-y border-border">
              {experience.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 py-9 lg:grid-cols-[260px_1fr]"
                >
                  <div>
                    <p className="font-mono text-sm text-subtle">
                      {item.period.display}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
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
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl border border-border bg-background p-7 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name}`}
                    className="rounded-lg border border-border p-2 text-muted transition-colors group-hover:border-accent group-hover:text-accent"
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-muted">
                  {project.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight.label}>
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
        </section>

        <section id="skills" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <p className={sectionHeading}>Capabilities</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Technical foundation
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <article
                  key={skill.id}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <h3 className="text-lg font-semibold">{skill.label}</h3>
                  <div className="mt-5 grid gap-5">
                    {skill.groups.map((group) => (
                      <div key={group.label}>
                        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-subtle">
                          {group.label}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {group.items.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
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
                Looking for engineering work where product quality and business
                impact matter.
              </h2>
            </div>
            <a
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
    </>
  );
}
