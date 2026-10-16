import type {
  PortfolioContent,
  PortfolioMetric,
  TerminalSequenceItem,
} from "../types/portfolio";

export const portfolioContent: PortfolioContent = {
  metadata: {
    title: "Harsh Meena — Data Analyst | Business Analyst | MIS Analyst",
    description:
      "Premium Data Analyst Portfolio. SQL, Python, Power BI, Excel. Real datasets, verified projects, immediate joiner. Indore, India.",
    openGraphTitle: "Harsh Meena — Data Analyst Portfolio",
    openGraphDescription: "Turning messy data into decisions people can use.",
    url: "https://harshmeena9977-ops.github.io",
  },
  brand: "HARSH MEENA",
  navigation: [
    { label: "Projects", href: "#work" },
    { label: "Storytelling", href: "#approach" },
    { label: "Skills", href: "#capabilities" },
    { label: "Evidence", href: "#profile" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "● AVAILABLE FOR ANALYST ROLES",
    heading: "Turning messy data into decisions people can use.",
    description:
      "Entry-level Data / Business / MIS Analyst based in Indore, India. I solve business problems using SQL, Python, Power BI, and Excel across real public datasets.",
    locationLabel: "Location",
    location: "Indore, India",
    availabilityLabel: "Availability",
    availability: "Immediate Joiner",
    callsToAction: [
      { label: "Explore Analytics", href: "#projects" },
      { label: "Request Resume", href: "mailto:harshmeena9977@gmail.com?subject=Resume%20request" },
    ],
  },
  projectsSection: {
    title: "Featured Projects",
    description:
      "Six verified analytics investigations across real public datasets. Question → Signal → Decision.",
  },
  storytelling: {
    title: "Data Storytelling Isn't About Charts",
    description:
      "It's about decisions. Every project starts with a question, follows the evidence, and ends with a decision somebody can act on.",
    stories: [
      {
        num: "1",
        label: "Question",
        title: "Telecom Churn",
        content:
          "43% churn in month-to-month contracts — Why are customers leaving? The question defines the entire analysis.",
      },
      {
        num: "2",
        label: "Signal",
        title: "HR Attrition",
        content:
          "2.93× overtime risk factor — Attrition isn't uniform. It concentrates in specific segments.",
      },
      {
        num: "3",
        label: "Decision",
        title: "Superstore Profit",
        content: "Target the 20% profit drag — But only act on evidence, not hunches.",
      },
    ],
  },
  workflow: {
    title: "The Analysis Workflow",
    description: "Every investigation follows this structured approach",
    steps: [
      { num: "1", title: "Question", description: "Define the business problem clearly" },
      { num: "2", title: "Data", description: "Source and validate the evidence" },
      { num: "3", title: "SQL", description: "Query and aggregate from source" },
      { num: "4", title: "Python", description: "Clean, explore, and model" },
      { num: "5", title: "Power BI", description: "Visualize and communicate findings" },
      { num: "6", title: "Decision", description: "Enable actionable business decisions" },
    ],
  },
  skillsTitle: "Skills Matrix",
  recruiter: {
    title: "Recruiter Fast-Scan",
    summary:
      "6 projects across telecom, HR, retail, hospitality, supply chain, and healthcare. 5 certifications in SQL, data analytics, and data science. Public datasets. GitHub repositories. Production-ready analytics.",
    fields: [
      { label: "Role", value: "Data / Business / MIS Analyst" },
      { label: "Location", value: "Indore, India" },
      { label: "Availability", value: "Immediate Joiner" },
      { label: "Stack", value: "SQL, Python, Power BI, Excel" },
    ],
  },
};

export const portfolioMetrics: PortfolioMetric[] = [
  { value: "26.5%", label: "Overall Churn Rate" },
  { value: "43%", label: "Month-to-Month Churn" },
  { value: "85.3%", label: "Model Accuracy" },
  { value: "82.1%", label: "Precision Score" },
  { value: "2.93×", label: "Attrition Risk" },
  { value: "20%", label: "Profitability Drag" },
  { value: "65%", label: "Reporting Reduction" },
  { value: "2.5×", label: "Engagement Gap" },
];

export const terminalSequence: TerminalSequenceItem[] = [
  {
    command: "SELECT Contract, COUNT(*) FROM Customers WHERE Churn='Yes';",
    output: "43% churn found in month-to-month contracts",
  },
  {
    command: "model.fit(X, y)",
    output: "Accuracy: 85.3% | Precision: 82.1%",
  },
  {
    command: "power_bi.connect().dashboard.publish()",
    output: "Dashboard live. Ready for business action.",
  },
];