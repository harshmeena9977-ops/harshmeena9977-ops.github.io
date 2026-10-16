import { existsSync } from "node:fs";
import { join } from "node:path";
import { PortfolioExperience } from "../components/PortfolioExperience";

export default function HomePage() {
  const resumeAvailable = existsSync(join(process.cwd(), "public", "resume.pdf"));
  return <PortfolioExperience resumeAvailable={resumeAvailable} />;
}
