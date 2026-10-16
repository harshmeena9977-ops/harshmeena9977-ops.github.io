import { portfolioContent } from "../../data/portfolio";
import { projects } from "../../data/projects";
import { designTokens } from "../../lib/design-tokens";

const featuredProject = projects.find((project) => project.category === "telecom");

export function DataStorytelling() {
  if (!featuredProject) return null;

  const stages = [
    { label: "Question", content: featuredProject.question },
    { label: "Evidence", content: featuredProject.signal },
    { label: "Analysis", content: featuredProject.method },
    { label: "Decision", content: featuredProject.decision },
  ] as const;

  return (
    <section
      aria-labelledby="data-storytelling-title"
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
        <header className="mb-10 max-w-3xl">
          <p
            className="mb-3 font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: designTokens.colors.accent }}
          >
            Analytics method / case 01
          </p>
          <h2
            id="data-storytelling-title"
            className="text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            {portfolioContent.storytelling.title}
          </h2>
          <p
            className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: designTokens.colors.muted }}
          >
            {portfolioContent.storytelling.description}
          </p>
        </header>

        <div
          className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b pb-3"
          style={{ borderColor: designTokens.colors.border }}
        >
          <h3 className="text-lg font-medium text-white">{featuredProject.title}</h3>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: designTokens.colors.muted }}
          >
            {featuredProject.badge}
          </span>
        </div>

        <ol
          aria-label={`Analytics process for ${featuredProject.title}`}
          className="grid grid-cols-1 gap-x-5 xl:grid-cols-4"
        >
          {stages.map(({ label, content }, index) => (
            <li
              key={label}
              className="relative min-w-0 border-b py-5 first:border-t md:border-t"
              style={{ borderColor: designTokens.colors.border }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tabular-nums"
                  style={{ color: designTokens.colors.primary }}
                >
                  0{index + 1}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1"
                  style={{ backgroundColor: designTokens.colors.border }}
                />
                {index < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs"
                    style={{ color: designTokens.colors.accent }}
                  >
                    <span className="xl:hidden">↓</span>
                    <span className="hidden xl:inline">→</span>
                  </span>
                )}
              </div>
              <h4
                className="text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: designTokens.colors.accent }}
              >
                {label}
              </h4>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{
                  color: label === "Evidence" ? designTokens.colors.text : designTokens.colors.muted,
                  fontSize: label === "Evidence" ? designTokens.typography.fontSize.lg : undefined,
                  fontWeight: label === "Evidence" ? designTokens.typography.fontWeight.semibold : undefined,
                }}
              >
                {content}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}