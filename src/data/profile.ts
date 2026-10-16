export interface Profile {
  name: string;
  brand: string;
  roles: string[];
  headline: string;
  summary: string;
  location: string;
  availability: string;
  websiteUrl: string;
  resumeUrl: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
  };
}

export const profile: Profile = {
  name: "Harsh Meena",
  brand: "HARSH MEENA",
  roles: ["Data Analyst", "Business Analyst", "MIS Analyst"],
  headline: "Turning messy data into decisions people can use.",
  summary:
    "Entry-level Data / Business / MIS Analyst based in Indore, India. I solve business problems using SQL, Python, Power BI, and Excel across real public datasets.",
  location: "Indore, India",
  availability: "Immediate Joiner",
  websiteUrl: "https://harshmeena9977-ops.github.io",
  resumeUrl: "/resume.pdf",
  metadata: {
    title: "Harsh Meena — Data Analyst | Business Analyst | MIS Analyst",
    description:
      "Premium Data Analyst Portfolio. SQL, Python, Power BI, Excel. Real datasets, verified projects, immediate joiner. Indore, India.",
    openGraphTitle: "Harsh Meena — Data Analyst Portfolio",
    openGraphDescription: "Turning messy data into decisions people can use.",
  },
};
