"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { Project } from "../types/project";

function CaseStudyArtwork({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  if (project.image && !failed) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        loading="lazy"
        unoptimized
        sizes="(max-width: 720px) 90vw, 680px"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="project-placeholder" role="img" aria-label={`${project.title}. Dashboard preview unavailable.`}>
      <span className="placeholder-kicker">{project.category.replace("-", " ")} / ANALYTICS</span>
      <strong>{project.title}</strong>
      <span>{project.image ? "Dashboard preview unavailable · view the published repository" : "No dashboard image published · view the project repository"}</span>
    </div>
  );
}

export default function PortfolioCaseStudy({ project, onClose, returnFocusRef }: { project: Project; onClose: () => void; returnFocusRef: RefObject<HTMLElement | null> }) {
  const reportRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocusElement = returnFocusRef.current;
    reportRef.current?.querySelector<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")?.focus();
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !reportRef.current) return;
      const focusable = Array.from(reportRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])",
      )).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleDialogKeys);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", handleDialogKeys);
      document.body.classList.remove("dialog-open");
      (returnFocusElement ?? previouslyFocused)?.focus();
    };
  }, [onClose, returnFocusRef]);

  const reportSections = [
    { id: "01", label: "Executive summary", title: project.signal, text: project.decision },
    { id: "02", label: "Problem statement", title: project.question, text: "The investigation is framed around a specific business question, keeping the analysis tied to a decision rather than a chart." },
    { id: "03", label: "Dataset overview", title: `${project.category.replace("-", " ")} data`, text: "This project uses a public dataset. Record counts, time coverage, and source-level details are not included in this portfolio summary; consult the project repository for the original materials." },
    { id: "04", label: "Data cleaning", title: "Make the evidence dependable.", text: "Data preparation is the bridge between source records and analysis-ready information. The repository is the source of truth for project-specific transformations and cleaning logic." },
    { id: "05", label: "Exploration", title: "Look for patterns worth explaining.", text: "Exploratory analysis helps identify where outcomes differ across meaningful business segments, then narrows attention to the patterns that matter." },
    { id: "06", label: "Analysis", title: project.method, text: `The analysis surfaces ${project.signal.toLowerCase()} and uses it to make the business question more actionable.` },
    { id: "07", label: "Visualization", title: project.image ? "A view built for fast interpretation." : "Explore the published analysis.", text: project.image ? "A project visual is previewed above. The repository contains the source project and additional context." : "A dashboard image is not listed in this portfolio. Visit the repository for the published analysis and project materials." },
    { id: "08", label: "Key insight", title: project.signal, text: "This is the principal signal highlighted in the project summary. It points to a specific area for business attention." },
    { id: "09", label: "Recommendation", title: "Turn the finding into a focused next step.", text: project.decision },
    { id: "10", label: "Business impact", title: "A decision opportunity—not an invented uplift.", text: "The work provides evidence to prioritize action. No realized financial or operational lift is claimed in this portfolio summary." },
    { id: "11", label: "Lessons learned", title: "Keep the analysis connected to the decision.", text: "A useful investigation makes the question, evidence, and next step easy to follow. Segment-level signals can help teams focus attention more precisely than broad assumptions." },
  ];

  return (
    <div className="case-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="case-report" ref={reportRef} role="dialog" aria-modal="true" aria-labelledby="case-title">
        <header className="case-report__bar">
          <a className="brand brand--small" href="#top" onClick={onClose}>HM<span>.</span></a>
          <span>ANALYTICS FIELDNOTE&nbsp; / &nbsp;{project.badge}</span>
          <button className="icon-button" onClick={onClose} aria-label="Close case study">×</button>
        </header>
        <div className="case-report__hero">
          <div className="case-report__intro">
            <p className="eyebrow"><span className="eyebrow__line" />{project.category.replace("-", " ")} / Case study</p>
            <h2 id="case-title">{project.title}<span>.</span></h2>
            <p>{project.question}</p>
            <div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <a className="button button--dark" href={project.repositoryUrl} target="_blank" rel="noreferrer">Explore repository <span>↗</span></a>
          </div>
          <div className="case-report__visual"><CaseStudyArtwork project={project} /></div>
        </div>
        <div className="case-report__body">
          <div className="case-report__contents">
            <span>IN THIS REPORT</span>
            {reportSections.map((section) => <a key={section.id} href={`#report-${section.id}`}>{section.id} / {section.label}</a>)}
            <a href="#report-files">12 / Project files</a>
          </div>
          <div className="case-report__sections">
            {reportSections.map((section) => (
              <section id={`report-${section.id}`} key={section.id}>
                <span className="eyebrow">{section.id} / {section.label}</span>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </section>
            ))}
            <section id="report-files">
              <span className="eyebrow">12 / Project files</span>
              <h3>Analysis, built to be reviewed.</h3>
              <p>Explore the published work, visual outputs, and project documentation in the source repository.</p>
              <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
