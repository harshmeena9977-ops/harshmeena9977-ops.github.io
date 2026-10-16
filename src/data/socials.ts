import type { SocialLink } from "../types/portfolio";
import { profile } from "./profile";

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/harshmeena9977-ops",
    kind: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harsh-meena-analyst/",
    kind: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:harshmeena9977@gmail.com",
    kind: "email",
  },
  {
    label: "Request résumé",
    href: profile.resumeUrl,
    kind: "resume",
  },
];