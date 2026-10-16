import type { SocialLink } from "../../types/portfolio";
import { certifications } from "../../data/certifications";
import { featuredSkills } from "../../data/skills";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { socials } from "../../data/socials";
import { designTokens } from "../../lib/design-tokens";

const linkOrder = ["github", "linkedin", "resume", "email"] as const;

const recruiterLinks = linkOrder
  .map((kind) => socials.find((social) => social.kind === kind))
  .filter((social): social is SocialLink => social !== undefined);

const profileFields = [
  { label: "Role", value: profile.roles.join(" / ") },
  { label: "Location", value: profile.location },
] as const;

const quickStats = [
  { label: "Projects", value: projects.length },
  { label: "Certifications", value: certifications.length },
] as const;

export function RecruiterDashboard() {
  return (
    <section
      aria-labelledby="recruiter-dashboard-title"
      className="border-y"
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
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="mb-3 font-mono text-xs uppercase tracking-[0.16em]"
              style={{ color: designTokens.colors.accent }}
            >
              Profile review / 30 seconds
            </p>
            <h2
              id="recruiter-dashboard-title"
              className="text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Recruiter Dashboard
            </h2>
          </div>
          <p
            className="max-w-xl text-sm leading-relaxed"
            style={{ color: designTokens.colors.muted }}
          >
            {profile.summary}
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <article
            aria-labelledby="recruiter-profile-name"
            className="min-w-0 border p-5 sm:p-7"
            style={{
              backgroundColor: designTokens.colors.card,
              borderColor: designTokens.colors.border,
              borderRadius: designTokens.radius.md,
              boxShadow: designTokens.shadow.card,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5" style={{ borderColor: designTokens.colors.border }}>
              <div className="min-w-0">
                <p
                  className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: designTokens.colors.muted }}
                >
                  Candidate profile
                </p>
                <h3
                  id="recruiter-profile-name"
                  className="break-words text-2xl font-semibold text-white sm:text-3xl"
                >
                  {profile.name}
                </h3>
              </div>
              <span
                className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium"
                style={{
                  borderColor: designTokens.colors.status.success,
                  color: designTokens.colors.text,
                }}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: designTokens.colors.status.success }}
                />
                {profile.availability}
              </span>
            </div>

            <dl className="grid gap-x-6 sm:grid-cols-2">
              {profileFields.map(({ label, value }) => (
                <div
                  key={label}
                  className="min-w-0 border-b py-4 last:border-b-0 sm:last:border-b"
                  style={{ borderColor: designTokens.colors.border }}
                >
                  <dt
                    className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: designTokens.colors.muted }}
                  >
                    {label}
                  </dt>
                  <dd className="break-words text-sm font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-b py-4" style={{ borderColor: designTokens.colors.border }}>
              <h4
                className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: designTokens.colors.muted }}
              >
                Tech stack
              </h4>
              <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
                {featuredSkills.slice(0, 4).map((skill) => (
                  <li
                    key={skill}
                    className="border px-3 py-1.5 text-xs font-medium"
                    style={{
                      borderColor: designTokens.colors.border,
                      borderRadius: designTokens.radius.sm,
                      color: designTokens.colors.text,
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <ul aria-label="Portfolio counts" className="grid grid-cols-2 gap-3 pt-4">
              {quickStats.map(({ label, value }) => (
                <li
                  key={label}
                  className="min-w-0 border p-4"
                  style={{
                    borderColor: designTokens.colors.border,
                    borderRadius: designTokens.radius.sm,
                  }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: designTokens.colors.muted }}
                  >
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
                    {String(value).padStart(2, "0")}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <aside
            aria-labelledby="recruiter-contact-title"
            className="flex min-w-0 flex-col border p-5 sm:p-7"
            style={{
              backgroundColor: designTokens.colors.card,
              borderColor: designTokens.colors.border,
              borderRadius: designTokens.radius.md,
              boxShadow: designTokens.shadow.card,
            }}
          >
            <h3
              id="recruiter-contact-title"
              className="text-lg font-semibold text-white"
            >
              Contact &amp; profiles
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: designTokens.colors.muted }}
            >
              Continue to a profile or get in touch.
            </p>

            <ul className="mt-6 divide-y" style={{ borderColor: designTokens.colors.border }}>
              {recruiterLinks.map(({ label, href, kind }) => {
                const isExternal = kind === "github" || kind === "linkedin";

                return (
                  <li key={kind}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex min-h-12 items-center justify-between gap-4 py-3 text-sm font-medium text-white outline-none transition-colors hover:text-[color:var(--dashboard-accent)] focus-visible:ring-2 focus-visible:ring-cyan-300"
                      style={{ "--dashboard-accent": designTokens.colors.accent } as React.CSSProperties}
                    >
                      <span>{label}</span>
                      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs"
                        style={{ color: designTokens.colors.accent }}
                      >
                        {isExternal ? "↗" : kind === "email" ? "@" : ".PDF"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}