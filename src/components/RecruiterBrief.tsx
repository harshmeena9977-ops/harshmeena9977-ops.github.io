"use client";

import { certifications } from "../data/certifications";
import { projects } from "../data/projects";
import { socials } from "../data/socials";

const coreTools = ["SQL", "Python", "Power BI", "Excel"];
const email = socials.find((social) => social.kind === "email")?.href ?? "mailto:";
const github = socials.find((social) => social.kind === "github")?.href ?? "#";

export default function RecruiterBrief({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <aside className="recruiter-brief" aria-label="Recruiter quick brief">
      <div><span>RECRUITER MODE ACTIVATED / 02-MINUTE OVERVIEW</span><strong>{projects.length} project case studies · {new Set(projects.map((project) => project.category)).size} domains · {certifications.length} certifications · {coreTools.join(" / ")}</strong></div>
      <a href="#work">Top projects <span>↗</span></a>
      <a href="#capabilities">Skills <span>↗</span></a>
      {resumeAvailable ? (
        <a href="/resume.pdf" download>Download résumé <span>↗</span></a>
      ) : (
        <span className="recruiter-brief__resume-status" aria-label="Résumé: coming soon">Resume Coming Soon</span>
      )}
      <a href="#certifications">Certifications <span>{String(certifications.length).padStart(2, "0")} listed</span></a>
      <a href={github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
      <a href={email}>Contact <span>↗</span></a>
    </aside>
  );
}
