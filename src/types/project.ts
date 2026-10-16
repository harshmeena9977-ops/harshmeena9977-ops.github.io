export interface ProjectImage {
  src: string;
  alt: string;
}

export type ProjectCategory =
  | "telecom"
  | "hr"
  | "retail"
  | "hospitality"
  | "supply-chain"
  | "healthcare";

export interface Project {
  id: string;
  badge: string;
  category: ProjectCategory;
  title: string;
  question: string;
  signal: string;
  method: string;
  decision: string;
  tags: string[];
  repositoryUrl: string;
  image?: ProjectImage;
  placeholderText?: [string, string];
}
