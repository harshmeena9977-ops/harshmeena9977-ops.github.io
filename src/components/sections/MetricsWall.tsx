import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { certifications } from "../../data/certifications";
import { designTokens } from "../../lib/design-tokens";

const coreStack = ["SQL", "Python", "Power BI", "Excel"] as const;

const metrics = [
  {
    value: String(projects.length).padStart(2, "0"),
    label: "Analytics Projects",
    accent: designTokens.colors.primary,
  },
  {
    value: String(certifications.length).padStart(2, "0"),
    label: "Certifications",
    accent: designTokens.colors.secondary,
  },
  {
    value: coreStack.join(" + "),
    label: "Core Stack",
    accent: designTokens.colors.accent,
  },
  {
    value: profile.availability,
    label: "Availability",
    accent: designTokens.colors.status.success,
  },
] as const;

export function MetricsWall() {
  return (
    <section
      aria-labelledby="metrics-wall-title"
      className="border-y"
      style={{
        backgroundColor: designTokens.colors.background,
        borderColor: designTokens.colors.border,
        paddingBlock: designTokens.spacing[8],
        paddingInline: designTokens.layout.pageGutter,
      }}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: designTokens.layout.contentMaxWidth }}
      >
        <h2 id="metrics-wall-title" className="sr-only">
          Recruiter impact metrics
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ value, label, accent }) => (
            <li
              key={label}
              className="group flex min-h-28 min-w-0 flex-col justify-between gap-4 border p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[color:var(--metric-accent)] hover:shadow-xl"
              style={{
                backgroundColor: designTokens.colors.card,
                borderColor: designTokens.colors.border,
                borderRadius: designTokens.radius.md,
                boxShadow: designTokens.shadow.card,
                "--metric-accent": accent,
              } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="h-1 w-8 rounded-full transition-[width] duration-200 group-hover:w-12"
                style={{ backgroundColor: accent }}
              />
              <span
                className={`min-w-0 break-words font-medium leading-snug ${
                  label === "Core Stack" ? "text-sm sm:text-base" : "text-xl"
                }`}
                style={{ color: designTokens.colors.text }}
              >
                {value}
              </span>
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: designTokens.colors.muted }}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}