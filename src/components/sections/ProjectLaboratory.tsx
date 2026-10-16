import Image from "next/image";
import { projects } from "../../data/projects";
import { designTokens } from "../../lib/design-tokens";

export function ProjectLaboratory() {
  return (
    <section
      id="projects"
      aria-labelledby="project-laboratory-title"
      className="border-t"
      style={{
        backgroundColor: designTokens.colors.background,
        borderColor: designTokens.colors.border,
        paddingBlock: designTokens.spacing[16],
        paddingInline: designTokens.layout.pageGutter,
      }}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: designTokens.layout.contentMaxWidth }}
      >
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p
              className="mb-3 font-mono text-xs uppercase tracking-[0.16em]"
              style={{ color: designTokens.colors.accent }}
            >
              Case files / {String(projects.length).padStart(2, "0")}
            </p>
            <h2
              id="project-laboratory-title"
              className="text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Analytics Investigation Files
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: designTokens.colors.muted }}
          >
            Business questions, evidence, and decisions from real-world analytics projects.
          </p>
        </header>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id} className="min-w-0">
              <article
                aria-labelledby={`${project.id}-title`}
                className="group flex h-full flex-col overflow-hidden border transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  backgroundColor: designTokens.colors.card,
                  borderColor: designTokens.colors.border,
                  borderRadius: designTokens.radius.md,
                  boxShadow: designTokens.shadow.card,
                }}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-black/20">
                  {project.image ? (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={project.placeholderText?.join(". ") ?? project.title}
                      className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center font-mono text-xs uppercase tracking-wider"
                      style={{ color: designTokens.colors.muted }}
                    >
                      {project.placeholderText?.map((line) => <span key={line}>{line}</span>)}
                    </div>
                  )}
                  <span
                    className="absolute left-3 top-3 border px-2 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm"
                    style={{
                      color: designTokens.colors.text,
                      backgroundColor: "rgb(5 8 22 / 0.82)",
                      borderColor: designTokens.colors.border,
                      borderRadius: designTokens.radius.sm,
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3
                    id={`${project.id}-title`}
                    className="text-xl font-semibold leading-snug text-white"
                  >
                    {project.title}
                  </h3>

                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt
                        className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: designTokens.colors.accent }}
                      >
                        Business question
                      </dt>
                      <dd className="text-sm leading-relaxed text-white">
                        {project.question}
                      </dd>
                    </div>

                    <div>
                      <dt
                        className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: designTokens.colors.accent }}
                      >
                        Findings
                      </dt>
                      <dd className="text-sm leading-relaxed text-white">
                        <p className="font-medium">{project.signal}</p>
                        <p className="mt-1" style={{ color: designTokens.colors.muted }}>
                          {project.decision}
                        </p>
                      </dd>
                    </div>

                    <div>
                      <dt
                        className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: designTokens.colors.accent }}
                      >
                        Tools
                      </dt>
                      <dd>
                        <ul
                          aria-label={`${project.title} tools`}
                          className="flex flex-wrap gap-2"
                        >
                          {project.tags.map((tool) => (
                            <li
                              key={tool}
                              className="border px-2 py-1 text-xs"
                              style={{
                                color: designTokens.colors.muted,
                                borderColor: designTokens.colors.border,
                                borderRadius: designTokens.radius.sm,
                              }}
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                        <p
                          className="mt-2 font-mono text-xs"
                          style={{ color: designTokens.colors.muted }}
                        >
                          {project.method}
                        </p>
                      </dd>
                    </div>
                  </dl>

                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t pt-4 text-sm font-medium text-white outline-none transition-colors hover:text-[color:var(--project-link-hover)] focus-visible:ring-2 focus-visible:ring-cyan-300"
                    style={{
                      borderColor: designTokens.colors.border,
                      "--project-link-hover": designTokens.colors.accent,
                    } as React.CSSProperties}
                  >
                    View GitHub repository
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}