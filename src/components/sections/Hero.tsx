import type { CSSProperties } from "react";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { certifications } from "../../data/certifications";
import { designTokens } from "../../lib/design-tokens";

const coreTools = ["SQL", "Python", "Power BI", "Excel"] as const;

const highlights = [
  {
    value: String(projects.length).padStart(2, "0"),
    label: "Analytics Projects",
  },
  {
    value: String(certifications.length).padStart(2, "0"),
    label: "Certifications",
  },
  {
    value: coreTools.join(" • "),
    label: "Core Stack",
  },
  {
    value: profile.availability,
    label: "Availability",
  },
];

const tokenStyles = {
  "--hero-bg": designTokens.colors.background,
  "--hero-border": designTokens.colors.border,
  "--hero-primary": designTokens.colors.primary,
  "--hero-secondary": designTokens.colors.secondary,
  "--hero-accent": designTokens.colors.accent,
  "--hero-text": designTokens.colors.text,
  "--hero-muted": designTokens.colors.muted,
} as CSSProperties;

export function Hero({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[color:var(--hero-bg)] text-[color:var(--hero-text)]"
      style={{
        ...tokenStyles,
        paddingInline: designTokens.layout.pageGutter,
        paddingBlock: designTokens.spacing[6],
      }}
    >
      <style jsx>{`
        @keyframes hero-intro-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-introduction {
          animation: hero-intro-enter ${designTokens.animation.duration.deliberate}s cubic-bezier(${designTokens.animation.easing.enter.join(", ")}) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-introduction { animation: none; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage: `linear-gradient(${designTokens.colors.border} 1px, transparent 1px), linear-gradient(90deg, ${designTokens.colors.border} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 88%)",
        }}
      />

      <div
        className="mx-auto flex w-full flex-1 flex-col"
        style={{ maxWidth: designTokens.layout.contentMaxWidth }}
      >
        <header
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b py-4"
          style={{ borderColor: designTokens.colors.border }}
        >
          <a
            href="#top"
            className="rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--hero-text)] outline-none transition-colors hover:text-[color:var(--hero-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--hero-accent)]"
          >
            {profile.brand}
          </a>
          <p className="ml-auto max-w-full text-right font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--hero-muted)] sm:text-xs">
            Analytics Command Center <span aria-hidden="true">/</span> 01
          </p>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-16 lg:py-16">
          <div className="hero-introduction">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--hero-accent)]">
              <span className="h-px w-8 bg-[color:var(--hero-accent)]" aria-hidden="true" />
              Business intelligence / portfolio
            </p>

            <h1
              id="hero-title"
              className="max-w-3xl font-sans text-5xl font-semibold leading-[0.98] text-[color:var(--hero-text)] sm:text-6xl lg:text-7xl"
            >
              {profile.name}
            </h1>

            <ul
              aria-label="Professional roles"
              className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[color:var(--hero-muted)] sm:text-base"
            >
              {profile.roles.map((role, index) => (
                <li key={role} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-[color:var(--hero-primary)]">
                      /
                    </span>
                  )}
                  {role}
                </li>
              ))}
            </ul>

            <h2 className="mt-9 max-w-2xl text-3xl font-medium leading-tight text-[color:var(--hero-text)] sm:text-4xl">
              Transforming business questions into measurable decisions.
            </h2>
            <p
              className="mt-5 max-w-xl leading-relaxed text-[color:var(--hero-muted)]"
              style={{ fontSize: designTokens.typography.fontSize.lg }}
            >
              Using SQL, Python, Power BI, and Excel to uncover insights from real-world datasets.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {resumeAvailable ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[color:var(--hero-primary)] px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-[color:var(--hero-secondary)] focus-visible:ring-2 focus-visible:ring-[color:var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--hero-bg)]"
                >
                  Download résumé <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span
                  role="status"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border px-5 py-3 text-sm font-semibold text-[color:var(--hero-muted)]"
                  style={{ borderColor: designTokens.colors.border }}
                >
                  Resume Coming Soon
                </span>
              )}
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border px-5 py-3 text-sm font-semibold text-[color:var(--hero-text)] outline-none transition-colors hover:border-[color:var(--hero-accent)] hover:text-[color:var(--hero-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--hero-accent)]"
                style={{ borderColor: designTokens.colors.border }}
              >
                Explore projects <span aria-hidden="true">↓</span>
              </a>
            </div>

            <p
              className="mt-8 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium text-[color:var(--hero-text)]"
              style={{ borderColor: designTokens.colors.border }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: designTokens.colors.status.success }}
              />
              Immediate Joiner
            </p>
          </div>

          <aside
            aria-label="Analytics toolchain"
            className="relative overflow-hidden border p-5 sm:p-7"
            style={{
              backgroundColor: designTokens.colors.card,
              borderColor: designTokens.colors.border,
              borderRadius: designTokens.radius.lg,
              boxShadow: designTokens.shadow.floating,
            }}
          >
            <div className="flex items-start justify-between gap-4 border-b pb-5" style={{ borderColor: designTokens.colors.border }}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--hero-muted)]">
                  Working toolkit
                </p>
                <h3 className="mt-2 text-xl font-medium text-[color:var(--hero-text)]">
                  Evidence to action
                </h3>
              </div>
              <span
                className="rounded-sm border px-2 py-1 font-mono text-[10px] text-[color:var(--hero-accent)]"
                style={{ borderColor: designTokens.colors.border }}
              >
                HM / 01
              </span>
            </div>

            <ol className="mt-2">
              {coreTools.map((tool, index) => (
                <li
                  key={tool}
                  className="flex items-center gap-4 border-b py-4 last:border-b-0"
                  style={{ borderColor: designTokens.colors.border }}
                >
                  <span className="font-mono text-xs text-[color:var(--hero-primary)]">
                    0{index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-[color:var(--hero-text)]">
                    {tool}
                  </span>
                  <span className="h-px w-10 bg-[color:var(--hero-border)]" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--hero-muted)]">
                    {index === 0 ? "Query" : index === 1 ? "Analyze" : index === 2 ? "Visualize" : "Report"}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <section aria-labelledby="hero-highlights-title" className="pb-2">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2
              id="hero-highlights-title"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--hero-muted)]"
            >
              Portfolio snapshot
            </h2>
            <span className="font-mono text-[10px] text-[color:var(--hero-muted)]">
              4 SIGNALS
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ value, label }) => (
              <li
                key={label}
                className="flex min-h-24 min-w-0 flex-col justify-between gap-3 border p-4"
                style={{
                  backgroundColor: designTokens.colors.card,
                  borderColor: designTokens.colors.border,
                  borderRadius: designTokens.radius.md,
                  boxShadow: designTokens.shadow.card,
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--hero-muted)]">
                  {label}
                </span>
                <span
                  className={`break-words font-medium leading-snug text-[color:var(--hero-text)] ${
                    label === "Core Stack" ? "text-sm" : "text-lg"
                  }`}
                >
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}