"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { certifications } from "../data/certifications";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { socials } from "../data/socials";

type ChatMessage = { role: "assistant" | "visitor"; text: string };

const coreTools = ["SQL", "Python", "Power BI", "Excel"];
const skillTopics: Record<string, string[]> = {
  SQL: ["Database fundamentals", "SELECT · WHERE", "GROUP BY · HAVING", "Joins · subqueries", "CTEs · views", "Window · ranking functions", "Indexing · optimization", "Stored procedures", "Data modeling"],
  Python: ["Pandas · NumPy", "Data cleaning · processing", "EDA · automation", "Matplotlib · Seaborn", "Plotly"],
  "Power BI": ["Power Query · DAX", "Data modeling · relationships", "KPIs · dashboards", "RLS · bookmarks", "Drill-through · deployment"],
};
const portfolioUnavailable = "This information is not currently published in the portfolio.";

export default function PortfolioAssistant({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hi, I'm Harsh. Hope you're doing well.\n\nWelcome to my portfolio. I'm a Data Analyst passionate about transforming data into actionable business insights. Feel free to explore my projects, dashboards, skills, and case studies. If you'd like to know anything specific, just ask me." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (initialOpen || window.sessionStorage.getItem("portfolio-guide-welcomed")) return;
    window.sessionStorage.setItem("portfolio-guide-welcomed", "true");
    const showTimer = window.setTimeout(() => setWelcomeVisible(true), 1800);
    const hideTimer = window.setTimeout(() => setWelcomeVisible(false), 10500);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [initialOpen]);

  const answerQuestion = (input: string) => {
    const text = input.toLowerCase();
    const matchingProject = projects.find((project) =>
      text.includes(project.title.toLowerCase()) || text.includes(project.category.replace("-", " ")),
    );

    if (matchingProject) {
      return `${matchingProject.title}: ${matchingProject.question} The analysis found ${matchingProject.signal.toLowerCase()}. The recommended action is to ${matchingProject.decision.charAt(0).toLowerCase()}${matchingProject.decision.slice(1)} Tools: ${matchingProject.tags.join(", ")}.`;
    }
    if (/phone|telephone|calendar|booking|book/.test(text)) return portfolioUnavailable;
    if (/who is harsh|about harsh|tell me about harsh|profile/.test(text)) {
      return `${profile.name} is a ${profile.roles.join(" / ")} based in ${profile.location}. ${profile.summary} ${profile.availability}.`;
    }
    if (/\b(sql|query|code|github|repo)\b/.test(text)) {
      const sqlProjects = projects.filter((project) => project.tags.some((tag) => tag.toLowerCase().includes("sql")));
      return `Published SQL-related projects include ${sqlProjects.map((project) => project.title).join(", ")}. Listed methods include ${skillTopics.SQL.join(", ")}. Project repositories contain the available code and analysis.`;
    }
    if (/power bi/.test(text)) {
      const powerBiProjects = projects.filter((project) => project.tags.some((tag) => /power bi/i.test(tag)));
      return `Listed Power BI methods include ${skillTopics["Power BI"].join(", ")}. Published Power BI-related projects include ${powerBiProjects.map((project) => project.title).join(", ")}.`;
    }
    if (/dashboard|visual|report/.test(text)) {
      return `Power BI and dashboard design are used to make findings easier to act on. Explore visual project reports such as ${projects.filter((project) => project.image).slice(0, 3).map((project) => project.title).join(", ")}.`;
    }
    if (/python|pandas|numpy/.test(text)) {
      const pythonProjects = projects.filter((project) => project.tags.some((tag) => /python|pandas/i.test(tag)));
      return `Listed Python methods include ${skillTopics.Python.join(", ")}. Published Python-related projects include ${pythonProjects.map((project) => project.title).join(", ") || portfolioUnavailable}`;
    }
    if (/excel|spreadsheet/.test(text)) {
      const excelProjects = projects.filter((project) => project.tags.some((tag) => /excel/i.test(tag)));
      return `Excel is listed in the toolkit and is tagged in ${excelProjects.map((project) => project.title).join(", ") || portfolioUnavailable}.`;
    }
    if (/skill|tool|expertise/.test(text)) {
      return `Core tools: ${coreTools.join(", ")}. Other applied capabilities include data modeling, DAX, exploratory analysis, statistical analysis, and executive reporting.`;
    }
    if (/resume|résumé|cv/.test(text)) return `${portfolioUnavailable} A downloadable résumé can be requested by email.`;
    if (/\b(certifications?|certificates?|credentials?|hackerrank|deloitte|quantium|bcg)\b|python 101 for data science|data science job simulation/.test(text)) {
      return `Certifications: ${certifications.map(({ name, issuer }) => issuer ? `${name} — ${issuer}` : name).join("; ")}.`;
    }
    if (/domain|industry|sector/.test(text)) {
      return `The project work covers ${[...new Set(projects.map((project) => project.category.replace("-", " ")))].join(", ")}. Each case study links its business question, signal, methods, and recommended next step.`;
    }
    if (/contact|email|linkedin/.test(text)) {
      const email = socials.find((social) => social.kind === "email");
      const linkedin = socials.find((social) => social.kind === "linkedin");
      return `Email: ${email?.href.replace("mailto:", "") ?? portfolioUnavailable} · LinkedIn: ${linkedin?.href ?? portfolioUnavailable}. Location: ${profile.location}.`;
    }
    return portfolioUnavailable;
  };

  const submitQuestion = (input: string) => {
    const currentQuestion = input.trim();
    if (!currentQuestion) return;
    setMessages((current) => [
      ...current,
      { role: "visitor", text: currentQuestion },
      { role: "assistant", text: answerQuestion(currentQuestion) },
    ]);
    setQuestion("");
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion(question);
  };

  return (
    <div className="assistant">
      {welcomeVisible && !open && (
        <aside className="assistant-welcome" aria-label="Welcome from the portfolio guide">
          <button className="assistant-welcome__close" onClick={() => setWelcomeVisible(false)} aria-label="Dismiss welcome">×</button>
          <span>YOUR PORTFOLIO GUIDE</span>
          <p>Hi, I’m Harsh. Hope you’re doing well. Welcome to my portfolio. I’m a Data Analyst passionate about transforming data into actionable business insights. Feel free to explore my projects, dashboards, skills, and case studies. If you’d like to know anything specific, just ask me.</p>
          <button className="assistant-welcome__action" onClick={() => { setWelcomeVisible(false); setOpen(true); }}>Explore with the guide <span>↗</span></button>
        </aside>
      )}
      {open && (
        <section className="assistant-panel" aria-label="AI Portfolio Assistant">
          <header className="assistant-header">
            <span className="assistant-avatar">HM</span>
            <div><strong>Portfolio assistant</strong><span>Answers about Harsh’s work</span></div>
            <button className="assistant-close" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
          </header>
          <div className="assistant-messages" ref={scrollRef} aria-live="polite">
            {messages.map((message, index) => <p className={`chat-message chat-message--${message.role}`} key={`${message.role}-${index}`}>{message.text}</p>)}
          </div>
          <div className="assistant-prompts">
            {["Who is Harsh?", "Explain Telecom Churn", "Show Power BI skills", "Which domains?"].map((prompt) => (
              <button key={prompt} onClick={() => submitQuestion(prompt)}>{prompt}</button>
            ))}
          </div>
          <form className="assistant-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="assistant-question">Ask about this portfolio</label>
            <input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about the portfolio…" />
            <button type="submit" aria-label="Send message">↑</button>
          </form>
        </section>
      )}
      <button className={`assistant-launcher${open ? " is-open" : ""}`} aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <span aria-hidden="true">{open ? "×" : "✳"}</span><span>{open ? "Close" : "Ask the portfolio"}</span>
      </button>
    </div>
  );
}
