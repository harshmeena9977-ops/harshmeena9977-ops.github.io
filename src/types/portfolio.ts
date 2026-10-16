export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer?: string;
  issuedOn?: string;
  credentialUrl?: string;
}

export type SocialLinkKind = "github" | "linkedin" | "email" | "resume";

export interface SocialLink {
  label: string;
  href: string;
  kind: SocialLinkKind;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface PortfolioCallToAction {
  label: string;
  href: string;
}

export interface PortfolioMetric {
  value: string;
  label: string;
}

export interface TerminalSequenceItem {
  command: string;
  output: string;
}

export interface PortfolioStory {
  num: string;
  label: string;
  title: string;
  content: string;
}

export interface WorkflowStep {
  num: string;
  title: string;
  description: string;
}

export interface RecruiterField {
  label: string;
  value: string;
}

export interface PortfolioContent {
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    url: string;
  };
  brand: string;
  navigation: NavigationItem[];
  hero: {
    badge: string;
    heading: string;
    description: string;
    locationLabel: string;
    location: string;
    availabilityLabel: string;
    availability: string;
    callsToAction: PortfolioCallToAction[];
  };
  projectsSection: {
    title: string;
    description: string;
  };
  storytelling: {
    title: string;
    description: string;
    stories: PortfolioStory[];
  };
  workflow: {
    title: string;
    description: string;
    steps: WorkflowStep[];
  };
  skillsTitle: string;
  recruiter: {
    title: string;
    summary: string;
    fields: RecruiterField[];
  };
}