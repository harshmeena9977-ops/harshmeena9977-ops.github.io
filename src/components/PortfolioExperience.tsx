"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { certifications } from "../data/certifications";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { socials } from "../data/socials";
import type { Project } from "../types/project";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Profile", href: "#profile" },
];

const stages = [
  { title: "Learn", detail: "Understand the context before opening a spreadsheet." },
  { title: "Clean", detail: "Make the evidence reliable, consistent, and usable." },
  { title: "Analyze", detail: "Find the signal behind the business question." },
  { title: "Visualize", detail: "Make the important patterns easy to see." },
  { title: "Decide", detail: "Turn a finding into a clear next move." },
  { title: "Impact", detail: "Keep the work connected to business outcomes." },
];

const coreTools = ["SQL", "Python", "Power BI", "Excel"];
const skillTopics: Record<string, string[]> = {
  SQL: ["Database fundamentals", "SELECT · WHERE", "GROUP BY · HAVING", "Joins · subqueries", "CTEs · views", "Window · ranking functions", "Indexing · optimization", "Stored procedures", "Data modeling"],
  Python: ["Pandas · NumPy", "Data cleaning · processing", "EDA · automation", "Matplotlib · Seaborn", "Plotly"],
  "Power BI": ["Power Query · DAX", "Data modeling · relationships", "KPIs · dashboards", "RLS · bookmarks", "Drill-through · deployment"],
};
const churnCase = projects.find((project) => project.category === "telecom");
const CaseStudy = dynamic(() => import("./PortfolioCaseStudy"), { ssr: false });
const RecruiterBrief = dynamic(() => import("./RecruiterBrief"), { ssr: false });
const Assistant = dynamic(() => import("./PortfolioAssistant"), { ssr: false });

function SocialIcon({ kind }: { kind: string }) {
  if (kind === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
        <path d="M9 19c-4.3 1.4-4.3-2.2-6-2.7m12 5.4v-3.3a2.9 2.9 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7a4.4 4.4 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6.2 0C6.4 3.4 5.4 3.7 5.4 3.7A4.4 4.4 0 0 0 5.3 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.9 5.7 5.6 6a2.9 2.9 0 0 0-.8 2.2v3.2" />
      </svg>
    );
  }
  if (kind === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
        <path d="M5 8v11M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6m-8-7v7" />
      </svg>
    );
  }
  return <span aria-hidden="true" className="contact-at">@</span>;
}

function LaptopDashboard({ lightweight }: { lightweight: boolean }) {
  return (
    <div className="laptop-scene" aria-label="A premium laptop displaying a live business analytics dashboard">
      <div className="desk-environment" aria-hidden="true">
        <span className="desk-environment__ambient" />
        <span className="desk-surface" />
        <span className="desk-reflection" />
      </div>
      <div className="float-note float-note--top">
        <span className="float-note__dot" />
        SIGNAL DETECTED
        <strong>Retention opportunity</strong>
      </div>
      <div className="float-note float-note--bottom">
        <span className="float-note__label">ANALYSIS → ACTION</span>
        <strong>43% churn signal</strong>
        <span>Month-to-month contracts</span>
      </div>
      <span className="laptop-shadow" aria-hidden="true" />
      <div className="laptop-arrival">
        <div className="laptop">
          <div className="laptop-lid">
            <div className="laptop-screen">
              <div className="dashboard-ui">
                <header className="workspace-topbar">
                  <span className="workspace-brand"><i /> INSIGHTS HUB</span>
                  <nav aria-label="Analytics workspace">
                    <span className="workspace-tab is-selected">Executive dashboard</span>
                    <span className="workspace-tab">SQL workspace</span>
                    <span className="workspace-tab">Reports</span>
                    <span className="workspace-tab">Forecasting</span>
                  </nav>
                  <span className="workspace-live"><i /> CASE 01</span>
                </header>
                <aside className="dataset-panel">
                  <span className="workspace-label">DATASET EXPLORER</span>
                  <strong className="dataset-name"><i /> Telecom customer churn</strong>
                  <span className="dataset-source">PUBLIC TELECOM DATASET</span>
                  <span className="dataset-heading">TABLES</span>
                  <span className="dataset-table is-active">▦&nbsp; Customer records</span>
                  <span className="dataset-table">▦&nbsp; Contract segments</span>
                  <span className="dataset-table">▦&nbsp; Churn outcomes</span>
                  <span className="dataset-heading">KPI CATEGORIES</span>
                  <span className="dataset-chip">Retention</span>
                  <span className="dataset-chip">Customer health</span>
                  <span className="dataset-heading">BUSINESS METRICS</span>
                  <span className="dataset-metric"><i /> Churn rate</span>
                  <span className="dataset-metric"><i /> Contract type</span>
                </aside>
                <div className="dashboard-main">
                  <div className="dashboard-heading">
                    <div>
                      <span>TELECOM&nbsp; / &nbsp;CUSTOMER ANALYTICS&nbsp; / &nbsp;CASE 01</span>
                      <strong>Customer retention overview</strong>
                    </div>
                    <div className="dashboard-filters"><span>Metric&nbsp; Churn⌄</span><span>Segment&nbsp; All⌄</span><b>↻</b></div>
                  </div>
                  <div className="dashboard-kpis">
                    <div><span>OVERALL CHURN</span><strong>26.5%</strong><small>Portfolio case finding</small></div>
                    <div><span>MONTH-TO-MONTH</span><strong>43%</strong><small className="negative">Highest-risk segment</small></div>
                    <div><span>MODEL ACCURACY</span><strong>85.3%</strong><small className="positive">Churn model</small></div>
                    <div><span>MODEL PRECISION</span><strong>82.1%</strong><small>Churn model</small></div>
                  </div>
                  <div className="dashboard-chart">
                    <div className="dashboard-chart__copy"><span>CHURN RATE&nbsp; / &nbsp;EXECUTIVE VIEW</span><small>Published project visual · portfolio case metrics</small></div>
                    <div className="dashboard-chart-body">
                      <div className="dashboard-source-preview">
                        {churnCase?.image && (
                          <Image
                            src={churnCase.image.src}
                            alt="Published executive summary dashboard from the telecom churn project"
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 760px) 90vw, 480px"
                            className="dashboard-source-image"
                          />
                        )}
                        <span>VERIFIED PROJECT OUTPUT&nbsp; / &nbsp;TELECOM CHURN</span>
                      </div>
                      <div className="churn-chart" role="img" aria-label="Churn rate comparison: 26.5 percent overall and 43 percent for month-to-month contracts.">
                        <span className="churn-chart__label">CHURN RATE&nbsp; / &nbsp;0–50%</span>
                        <div className="churn-bars">
                          <div className="churn-bar"><strong>26.5%</strong><span style={{ height: "53%" }} /><small>Overall</small></div>
                          <div className="churn-bar churn-bar--focus"><strong>43%</strong><span style={{ height: "86%" }} /><small>Month-to-month</small></div>
                        </div>
                        <span className="churn-chart__note">VERIFIED FINDINGS · NOT A TIME SERIES</span>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-lower">
                    <div className="sql-workspace">
                      <div className="dashboard-mini-heading"><span>SQL WORKSPACE&nbsp; / &nbsp;QUERY PREVIEW</span><span>GROUP BY contract&nbsp; ⌄</span><b>RUN&nbsp; ▶</b></div>
                      <pre><span>SELECT</span> contract,<br />&nbsp; <span>ROUND</span>(<br />&nbsp;&nbsp; <span>AVG</span>(<span>CASE WHEN</span> churn = <span>&apos;Yes&apos;</span><br />&nbsp;&nbsp;&nbsp; <span>THEN</span> 1.0 <span>ELSE</span> 0 <span>END</span>) * 100, 1<br />&nbsp; ) <span>AS</span> churn_rate<br /><span>FROM</span> customer_churn<br /><span>GROUP BY</span> contract;</pre>
                    </div>
                    <div className="regional-analysis">
                      <div className="dashboard-mini-heading"><span>REGIONAL ANALYSIS</span><span>VISUAL MOCKUP</span></div>
                      <div className="region-map"><span className="region-region region-region--a" /><span className="region-region region-region--b" /><span className="region-region region-region--c" /><span className="region-region region-region--d" /><span className="region-region region-region--e" /><i className="map-marker map-marker--a" /><i className="map-marker map-marker--b" /><i className="map-marker map-marker--c" /><span className="map-disclaimer">SCHEMATIC<br />NO GEOGRAPHIC DATA</span></div>
                      <div className="region-key"><span>SCHEMATIC LAYOUT · NOT A PROJECT RESULT</span></div>
                    </div>
                    <div className="data-preview">
                      <div className="dashboard-mini-heading"><span>KEY FINDINGS</span><span>CASE SUMMARY</span></div>
                      <table><thead><tr><th>MEASURE</th><th>FINDING</th><th>INTERPRETATION</th></tr></thead><tbody><tr><td>Overall churn</td><td>26.5%</td><td>Portfolio rate</td></tr><tr><td>Monthly contract</td><td className="table-risk">43%</td><td>Highest segment</td></tr><tr><td>Model accuracy</td><td>85.3%</td><td>Churn model</td></tr></tbody></table>
                    </div>
                  </div>
                </div>
                <aside className="dashboard-right">
                  <div className="right-panel-section">
                    <span className="workspace-label">KPI SUMMARY</span>
                    <div className="right-kpi"><span>Overall churn</span><strong>26.5%</strong><small>Portfolio case finding</small></div>
                    <div className="right-kpi"><span>Highest-risk contract</span><strong>Monthly</strong><small className="negative">43% churn signal</small></div>
                    <div className="right-kpi"><span>Model precision</span><strong>82.1%</strong><small>Churn classification</small></div>
                  </div>
                  <div className="right-panel-section forecast-panel">
                    <span className="workspace-label">FORECASTING&nbsp; / &nbsp;SCENARIO PLANNING</span>
                    <strong>Retention <small>scenario</small></strong>
                    <svg viewBox="0 0 130 40" preserveAspectRatio="none" role="img" aria-label="Schematic retention scenario, not a measured forecast.">
                      <path d="M0 32 L18 26 L37 29 L55 19 L72 22 L91 13 L108 15 L130 5" fill="none" stroke="#718a70" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                      <path d="M91 13 L108 7 L130 2" fill="none" stroke="#b9954b" strokeWidth="2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="forecast-caption">SCHEMATIC · NO FORECAST CLAIMED</span>
                  </div>
                  <div className="right-panel-section alert-panel">
                    <span className="workspace-label">PRIORITY ALERT</span>
                    <strong>Retention opportunity</strong>
                    <p>Month-to-month contracts show a 43% churn signal in the case analysis.</p>
                  </div>
                  <div className="right-panel-section recommendation-panel">
                    <span className="workspace-label">NEXT BEST ACTION</span>
                    <p>Prioritize retention outreach for high-risk, low-tenure customers.</p>
                    <span>VIEW RECOMMENDATION&nbsp; ↗</span>
                  </div>
                </aside>
              </div>
              <div className="laptop-reflection" aria-hidden="true" />
            </div>
          </div>
          <div className="laptop-base"><span /></div>
          <div className="dashboard-projections" data-quality={lightweight ? "lite" : "full"} aria-hidden="true">
            <div className="projection-card projection-card--chart">
              <span>CHURN RATE&nbsp; / &nbsp;CASE 01</span>
              <div className="projection-sparkline"><i style={{ height: "53%" }} /><i style={{ height: "86%" }} /></div>
              <strong>26.5% overall&nbsp; · &nbsp;43% monthly <b>↗</b></strong>
            </div>
            <div className="projection-card projection-card--kpi">
              <span>SEGMENT AT RISK</span>
              <strong>43<small>%</small></strong>
              <i>Month-to-month</i>
            </div>
          </div>
        </div>
      </div>
      <span className="scene-orbit scene-orbit--one" aria-hidden="true" />
      <span className="scene-orbit scene-orbit--two" aria-hidden="true" />
    </div>
  );
}

function ProjectArtwork({ project, className = "", loadImage = true }: { project: Project; className?: string; loadImage?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  if (project.image && !loadImage) {
    return (
      <div className={`project-placeholder ${className}`} aria-hidden="true">
        <span className="placeholder-kicker">{project.category.replace("-", " ")} / ANALYTICS</span>
        <strong>{project.title}</strong>
        <span>Select to preview the published dashboard</span>
      </div>
    );
  }
  if (project.image && !imageFailed) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        loading="lazy"
        fetchPriority="low"
        unoptimized
        sizes="(max-width: 720px) 90vw, 680px"
        className={`project-artwork ${className}`}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className={`project-placeholder ${className}`} role="img" aria-label={`${project.title}. ${project.image ? "Dashboard preview unavailable." : "No dashboard image published."}`}>
      <span className="placeholder-kicker">{project.category.replace("-", " ")} / ANALYTICS</span>
      <strong>{project.title}</strong>
      <span>{project.image ? "Dashboard preview unavailable · view the published repository" : "No dashboard image published · view the project repository"}</span>
    </div>
  );
}

export function PortfolioExperience({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [activeProject, setActiveProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSkill, setActiveSkill] = useState("SQL");
  const [activeDomain, setActiveDomain] = useState(projects[0].category);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [lightweightMode, setLightweightMode] = useState(false);
  const dragStart = useRef<number | null>(null);
  const caseStudyTriggerRef = useRef<HTMLElement | null>(null);
  const lastWheelTime = useRef(0);
  const activeProjectItem = projects[activeProject];
  const projectIndices = useMemo(
    () => projects.map((_, index) => {
      let difference = index - activeProject;
      if (difference > projects.length / 2) difference -= projects.length;
      if (difference < -projects.length / 2) difference += projects.length;
      return { index, difference };
    }),
    [activeProject],
  );
  const allSkills = skills.flatMap((group) => group.items);
  const activeSkillProjects = projects.filter((project) =>
    project.tags.some((tag) => tag.toLowerCase() === activeSkill.toLowerCase())
      || project.method.toLowerCase().includes(activeSkill.toLowerCase()),
  );
  const relatedSkillTags = [...new Set(activeSkillProjects.flatMap((project) =>
    project.tags.filter((tag) => tag.toLowerCase() !== activeSkill.toLowerCase()),
  ))].slice(0, 5);

  const moveProject = (direction: number) => {
    setActiveProject((current) => (current + direction + projects.length) % projects.length);
  };
  const openCaseStudy = (project: Project, trigger: HTMLElement) => {
    caseStudyTriggerRef.current = trigger;
    setSelectedProject(project);
  };
  const closeSelectedProject = useCallback(() => setSelectedProject(null), []);
  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const compactViewport = window.matchMedia("(max-width: 1050px)").matches;
    const limitedCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
    setLightweightMode(coarsePointer || compactViewport || limitedCpu);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);
  const count = (value: number | string) => String(value).padStart(2, "0");
  const dashboards = projects.filter((project) => project.image).length;
  const linkedRepositories = projects.filter((project) => project.repositoryUrl).length;

  return (
    <main id="main-content" tabIndex={-1}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="brand" href="#top">HM<span>.</span></a>
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <button
            className={`recruiter-toggle${recruiterMode ? " is-active" : ""}`}
            type="button"
            aria-pressed={recruiterMode}
            onClick={() => setRecruiterMode((active) => !active)}
          >{recruiterMode ? "Recruiter mode" : "Recruiter view"}<i aria-hidden="true" /></button>
          <a className="header-contact" href="#contact">Let’s talk <span>↗</span></a>
        </div>
      </header>

      {recruiterMode && <RecruiterBrief resumeAvailable={resumeAvailable} />}

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-intro">
            <span className="eyebrow__line" /> INDEPENDENT ANALYST&nbsp; / &nbsp;INDORE, INDIA
          </p>
          <h1 className="hero-intro" id="hero-title">
            Complex data.<br />Clear <em>decisions.</em>
          </h1>
          <p className="hero-description hero-intro">
            Turning complex datasets into practical recommendations through analysis, visualization, and business storytelling.
          </p>
          <div className="hero-actions hero-intro">
            <a href="#work" className="button button--dark">Explore the work <span>↘</span></a>
            <a href="#profile" className="text-link">A little about Harsh <span>↗</span></a>
          </div>
          <div className="hero-status hero-intro">
            <span className="status-dot" /> AVAILABLE FOR ANALYST OPPORTUNITIES
          </div>
        </div>
        <div className="hero-visual">
          <LaptopDashboard lightweight={lightweightMode} />
        </div>
        <div className="hero-bottomline">
          <span>INDEPENDENT ANALYTICS PRACTICE</span>
          <span>SQL&nbsp; · &nbsp;PYTHON&nbsp; · &nbsp;POWER BI&nbsp; · &nbsp;EXCEL</span>
          <a href="#work">SCROLL TO EXPLORE <span>↓</span></a>
        </div>
      </section>

      <section className="signal-strip" aria-label="Portfolio overview">
        <div className="signal-strip__intro"><span>THE WORK, AT A GLANCE</span><strong>Evidence over assumption.</strong></div>
        <div><strong>{count(projects.length)}</strong><span>ANALYTICS STUDIES</span></div>
        <div><strong>{count(new Set(projects.map((project) => project.category)).size)}</strong><span>BUSINESS DOMAINS</span></div>
        <div><strong>{count(coreTools.length)}</strong><span>CORE TOOLS</span></div>
        <div><strong>{count(linkedRepositories)}</strong><span>PUBLIC REPOSITORIES</span></div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-shell">
          <div className="section-heading section-heading--light scroll-reveal">
            <div><p className="eyebrow"><span className="eyebrow__line" /> SELECTED INVESTIGATIONS&nbsp; / &nbsp;06 CASES</p><h2 id="work-title">Business questions.<br /><em>Answered with evidence.</em></h2></div>
            <p>Each project begins with a decision to make—not a chart to build. Rotate through six analyses across six distinct business domains.</p>
          </div>

          <div
            className="project-wheel"
            role="group"
            aria-label="Interactive project carousel. Use the arrow buttons, arrow keys, or scroll to rotate."
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); moveProject(1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); moveProject(-1); }
            }}
            onWheel={(event) => {
              const now = Date.now();
              if (now - lastWheelTime.current < 320) return;
              if (Math.abs(event.deltaY) > 8 || Math.abs(event.deltaX) > 8) {
                lastWheelTime.current = now;
                moveProject((event.deltaY + event.deltaX) > 0 ? 1 : -1);
              }
            }}
            onPointerDown={(event) => { dragStart.current = event.clientX; }}
            onPointerUp={(event) => {
              if (dragStart.current === null) return;
              const difference = event.clientX - dragStart.current;
              if (Math.abs(difference) > 38) moveProject(difference < 0 ? 1 : -1);
              dragStart.current = null;
            }}
            onPointerCancel={() => { dragStart.current = null; }}
          >
            <div className="wheel-glow" aria-hidden="true" />
            {projectIndices.map(({ index, difference }) => {
                const project = projects[index];
                const isActive = difference === 0;
                const hidden = Math.abs(difference) > 2;
                return (
                  <article
                    key={project.id}
                    className={`wheel-card${isActive ? " is-active" : ""}`}
                    style={{
                      opacity: hidden ? 0 : isActive ? 1 : 0.78,
                      transform: `translateX(${difference * 67}%) scale(${isActive ? 1 : Math.max(0.68, 0.83 - Math.abs(difference) * 0.08)}) rotateY(${difference * -16}deg)`,
                      zIndex: 5 - Math.abs(difference),
                      visibility: hidden ? "hidden" : "visible",
                    }}
                    aria-hidden={hidden}
                  >
                    <button className="wheel-card__button" onClick={(event) => isActive ? openCaseStudy(project, event.currentTarget) : setActiveProject(index)} tabIndex={hidden ? -1 : 0}>
                      <span className="sr-only">{isActive ? "Open case study:" : "Select project:"}</span>
                      <div className="wheel-card__image"><ProjectArtwork project={project} loadImage={isActive} /></div>
                      <div className="wheel-card__info">
                        <span>{project.badge}</span><h3>{project.title}</h3>
                        <p>{project.question}</p>
                        <div><span className="wheel-card__signal">{project.signal}</span><span className="wheel-card__arrow" aria-hidden="true">↗</span></div>
                      </div>
                    </button>
                  </article>
                );
              })}
            <button className="wheel-control wheel-control--previous" aria-label="Previous project" onClick={() => moveProject(-1)}>←</button>
            <button className="wheel-control wheel-control--next" aria-label="Next project" onClick={() => moveProject(1)}>→</button>
            <div className="wheel-index"><span>{String(activeProject + 1).padStart(2, "0")}</span><i />{String(projects.length).padStart(2, "0")}</div>
          </div>

          <div className="project-selection">
            <div className="project-selection__copy"><span>NOW IN FOCUS</span><strong>{activeProjectItem.title}</strong></div>
            <p>{activeProjectItem.method} <span>·</span> {activeProjectItem.tags.slice(0, 3).join(" · ")}</p>
            <button className="text-link text-link--light" onClick={(event) => openCaseStudy(activeProjectItem, event.currentTarget)}>Read the case study <span>↗</span></button>
          </div>
          <div className="work-footnote"><span>DRAG OR SWIPE TO ROTATE</span><span>SCROLL / USE ARROW KEYS</span></div>
        </div>
      </section>

      <section className="method-section" id="approach" aria-labelledby="approach-title">
        <div className="section-shell">
          <div className="section-heading scroll-reveal">
            <div><p className="eyebrow"><span className="eyebrow__line" /> A DECISION-LED PROCESS</p><h2 id="approach-title">From first question<br />to <em>business impact.</em></h2></div>
            <p>Good analytics is a chain of reasoning. Every step should make the final decision more confident, more useful, and easier to explain.</p>
          </div>
          <div className="method-timeline">
            <div className="timeline-track" aria-hidden="true"><span /></div>
            {stages.map((stage, index) => (
              <article className="timeline-step scroll-reveal" key={stage.title} style={{ transitionDelay: `${index * 50}ms` }}>
                <span className="timeline-step__index">0{index + 1}</span><span className="timeline-step__node" aria-hidden="true" />
                <h3>{stage.title}</h3><p>{stage.detail}</p>
              </article>
            ))}
          </div>
          <div className="method-note"><span>THE PRINCIPLE</span><p>“A useful chart is only the beginning. The work is helping someone know what to do next.”</p></div>
        </div>
      </section>

      <section className="domain-section" id="domains" aria-labelledby="domains-title">
        <div className="section-shell">
          <div className="section-heading scroll-reveal">
            <div><p className="eyebrow"><span className="eyebrow__line" /> DOMAIN EXPERIENCE</p><h2 id="domains-title">Business context<br /><em>behind the data.</em></h2></div>
            <p>Explore the industries represented in the published work. Each view is grounded in a project question and its reported finding.</p>
          </div>
          <div className="domain-explorer">
            <div className="domain-explorer__list" role="group" aria-label="Project domains">
              {projects.map((project) => (
                <button key={project.id} type="button" className={`domain-option${activeDomain === project.category ? " is-active" : ""}`} aria-pressed={activeDomain === project.category} onClick={() => setActiveDomain(project.category)}>
                  <span>{project.badge}</span><strong>{project.category.replace("-", " ")}</strong><i>↗</i>
                </button>
              ))}
            </div>
            {projects.filter((project) => project.category === activeDomain).map((project) => (
              <div className="domain-detail scroll-reveal" key={project.id} role="region" aria-label={`${project.category.replace("-", " ")} project details`} aria-live="polite">
                <span className="eyebrow">PROJECT SIGNAL / {project.badge}</span>
                <h3>{project.title}</h3>
                <p className="domain-detail__question">{project.question}</p>
                <div className="domain-detail__metrics">
                  <div><span>REPORTED SIGNAL</span><strong>{project.signal}</strong></div>
                  <div><span>ANALYTICAL APPROACH</span><strong>{project.method}</strong></div>
                </div>
                <p className="domain-detail__decision">{project.decision}</p>
                <button className="text-link" onClick={() => { setActiveProject(projects.findIndex((item) => item.id === project.id)); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}>Explore this project <span>↗</span></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-shell">
          <div className="section-heading scroll-reveal">
            <div><p className="eyebrow"><span className="eyebrow__line" /> ANALYTICAL TOOLKIT</p><h2 id="capabilities-title">Fluent in the tools.<br /><em>Focused on the why.</em></h2></div>
            <p>Tools matter when they are applied to a real question. Select a capability to see where it appears in the work.</p>
          </div>
          <div className="skills-dashboard">
            <div className="skills-dashboard__list" role="group" aria-label="Analytical capabilities">
              {skills.map((group) => (
                <section className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div>{group.items.map((skill) => (
                    <button
                      className={`skill-pill${activeSkill === skill ? " is-active" : ""}`}
                      key={skill}
                      onClick={() => setActiveSkill(skill)}
                      id={`skill-${skill.replaceAll(" ", "-")}`}
                      aria-pressed={activeSkill === skill}
                      aria-controls="skill-detail"
                    >{skill}<span>↗</span></button>
                  ))}</div>
                </section>
              ))}
            </div>
            <aside className="skill-detail" id="skill-detail" role="region" aria-label={`${activeSkill} skill details`} aria-live="polite" key={activeSkill}>
              <span className="eyebrow">CAPABILITY / {String(allSkills.indexOf(activeSkill) + 1).padStart(2, "0")}</span>
              <span className="skill-detail__monogram">{activeSkill.slice(0, 2).toUpperCase()}</span>
              <h3>{activeSkill}</h3>
              <p>Explore where this capability appears in the published project work and which business questions it supports.</p>
              <div className="skill-detail__meta"><span>PROJECTS USING {activeSkill.toUpperCase()}</span><ul>{activeSkillProjects.length
                ? activeSkillProjects.map((project) => <li key={project.id}>{project.title}</li>)
                : <li>No project linkage listed yet</li>}</ul></div>
              {skillTopics[activeSkill] && <div className="skill-detail__meta"><span>METHODS &amp; WORKFLOWS</span><ul>{skillTopics[activeSkill].map((topic) => <li key={topic}>{topic}</li>)}</ul></div>}
              {activeSkillProjects[0] && <div className="skill-detail__meta"><span>BUSINESS QUESTION</span><p>{activeSkillProjects[0].question}</p></div>}
              <div className="skill-detail__footer"><span>RELATED PROJECT TOOLS</span><strong>{relatedSkillTags.length ? relatedSkillTags.join(" · ") : "Not specified"}</strong></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="executive-section" id="profile" aria-labelledby="profile-title">
        <div className="section-shell">
          <div className="section-heading section-heading--light scroll-reveal">
            <div><p className="eyebrow"><span className="eyebrow__line" /> EXECUTIVE ANALYTICS DASHBOARD</p><h2 id="profile-title">A clear view<br />of the <em>analyst.</em></h2></div>
            <p>A concise snapshot for teams looking for an analyst who can connect the dataset to the decision.</p>
          </div>
          <div className="executive-grid">
            <article className="executive-profile">
              <div className="executive-profile__top"><div><span>ANALYST PROFILE / 2026</span><h3>{profile.name}</h3></div><span className="availability-pill"><i />{profile.availability}</span></div>
              <p className="executive-profile__summary">{profile.summary}</p>
              <div className="executive-profile__stack"><span>CORE STACK</span><div>{coreTools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
              <div className="executive-profile__footer"><span>BASED IN</span><strong>{profile.location}</strong><a href="#contact">CONTACT <span>↗</span></a></div>
            </article>
            <div className="executive-metrics">
              {[
                { label: "Projects completed", value: projects.length, suffix: "CASE STUDIES", detail: "Published investigations" },
                { label: "Domains explored", value: new Set(projects.map((project) => project.category)).size, suffix: "INDUSTRIES", detail: "From telecom to healthcare" },
                { label: "Visual project reports", value: dashboards, suffix: "VISUALS", detail: "Published project imagery" },
                { label: "Public repositories", value: projects.length, suffix: "GITHUB", detail: "Analysis available to review" },
                { label: "Certifications", value: certifications.length, suffix: "CREDENTIALS", detail: "SQL, data analytics & data science" },
              ].map((metric, index) => (
                <article className="executive-metric scroll-reveal" key={metric.label} style={{ transitionDelay: `${index * 50}ms` }}>
                  <span>{metric.label}</span><strong>{count(metric.value)}</strong><small>{metric.detail}</small><i aria-hidden="true">{metric.suffix}</i>
                </article>
              ))}
            </div>
          </div>
          <section className="certification-board scroll-reveal" id="certifications" aria-labelledby="certifications-title">
            <header className="certification-board__header">
              <div>
                <span>CONTINUED LEARNING / {count(certifications.length)} CREDENTIALS</span>
                <h3 id="certifications-title">Certifications &amp; job simulations</h3>
              </div>
              <p>Training across SQL, Python, data analytics, and data science.</p>
            </header>
            <ul className="certification-list">
              {certifications.map(({ name, issuer }, index) => (
                <li className="certification-card" key={`${issuer ?? "course"}-${name}`}>
                  <span>0{index + 1}</span>
                  <div><strong>{name}</strong>{issuer && <small>{issuer}</small>}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="section-shell contact-shell">
          <div className="contact-copy">
            <p className="eyebrow"><span className="eyebrow__line" /> THE NEXT GOOD QUESTION</p>
            <h2 id="contact-title">Let’s turn data<br />into <em>decisions.</em></h2>
            <p>Have a business question, an open analyst role, or a dataset worth exploring? I’d be glad to hear from you.</p>
            <a className="button button--dark" href={socials.find((social) => social.kind === "email")?.href}>Start a conversation <span>↗</span></a>
          </div>
          <div className="contact-links">
            <span>CONNECT WITH HARSH</span>
            {socials.filter((social) => ["linkedin", "github", "email", "resume"].includes(social.kind)).map((social) => {
              const isResume = social.kind === "resume";
              const title = isResume
                ? resumeAvailable ? "Download résumé" : "Resume Coming Soon"
                : social.label;
              const description = isResume
                ? resumeAvailable ? "Download PDF" : "Résumé PDF not yet published"
                : social.kind === "email" ? "Direct email" : social.kind === "github" ? "Public project repositories" : "Professional profile";
              const contactContent = (
                <>
                  <span className="contact-link__icon"><SocialIcon kind={social.kind} /></span>
                  <span>{title}<small>{description}</small></span>
                  {!isResume && <b>↗</b>}
                </>
              );

              if (isResume && !resumeAvailable) {
                return <div className="contact-link-disabled" key={social.kind} role="status">{contactContent}</div>;
              }

              return (
                <a href={isResume ? profile.resumeUrl : social.href} key={social.kind} target={social.kind === "linkedin" || social.kind === "github" ? "_blank" : undefined} rel={social.kind === "linkedin" || social.kind === "github" ? "noreferrer" : undefined} download={isResume || undefined}>
                  {contactContent}
                </a>
              );
            })}
            <a href={`mailto:${socials.find((social) => social.kind === "email")?.href.replace("mailto:", "")}?subject=Portfolio%20PDF%20request`}>
              <span className="contact-link__icon"><span className="pdf-mark">PDF</span></span><span>Portfolio PDF<small>Request a copy by email</small></span><b>↗</b>
            </a>
            <a href={`mailto:${socials.find((social) => social.kind === "email")?.href.replace("mailto:", "")}?subject=Let%E2%80%99s%20schedule%20a%20conversation`}>
              <span className="contact-link__icon"><span className="calendar-mark">↗</span></span><span>Schedule a conversation<small>Arrange a time by email</small></span><b>↗</b>
            </a>
          </div>
        </div>
        <footer className="site-footer">
          <a className="brand brand--small" href="#top">HM<span>.</span></a>
          <span>ANALYTICS WITH INTENTION.</span>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </section>

      {recruiterMode && <span className="sr-only" role="status">Recruiter mode activated. Quick links to projects, skills, résumé request, and contact are available at the top.</span>}
      {assistantOpen ? (
        <Assistant initialOpen />
      ) : (
        <div className="assistant">
          <button
            className="assistant-launcher"
            aria-expanded={false}
            onClick={() => {
              setAssistantOpen(true);
            }}
          >
            <span aria-hidden="true">✳</span><span>Ask the portfolio</span>
          </button>
        </div>
      )}
      {selectedProject && <CaseStudy project={selectedProject} onClose={closeSelectedProject} returnFocusRef={caseStudyTriggerRef} />}
    </main>
  );
}
