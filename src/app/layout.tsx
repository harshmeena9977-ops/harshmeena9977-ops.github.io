import type { Metadata } from "next";
import { Analytics } from "../components/Analytics";
import { profile } from "../data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.websiteUrl),
  title: profile.metadata.title,
  description: profile.metadata.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: profile.metadata.openGraphTitle,
    description: profile.metadata.openGraphDescription,
    url: profile.websiteUrl,
    type: "website",
    siteName: profile.name,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: `${profile.name} — Data Analyst portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.metadata.openGraphTitle,
    description: profile.metadata.openGraphDescription,
    images: ["/opengraph-image.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.websiteUrl,
  jobTitle: profile.roles,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Indore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/harshmeena9977-ops",
    "https://www.linkedin.com/in/harsh-meena-analyst/",
  ],
  knowsAbout: ["Data Analysis", "SQL", "Python", "Power BI", "Excel", "Business Intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}