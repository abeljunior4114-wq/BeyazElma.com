import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://beyazelma.com"),
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || "BeyazElma",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || "BeyazElma"}`
  },
  description: "BeyazElma — Live sports scores, streams, and real-time chat. Follow live matches, get real-time updates, and join match discussions.",
  keywords: ["sports", "live scores", "football", "soccer", "matches", "streaming", "sports chat"],
  authors: [{ name: "BeyazElma" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BeyazElma",
    title: "BeyazElma — Live Sports Hub",
    description: "Live sports scores, streams, and real-time chat."
  },
  twitter: {
    card: "summary_large_image",
    title: "BeyazElma — Live Sports Hub",
    description: "Live sports scores, streams, and real-time chat."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-background text-text-dark">
      <body className="min-h-screen font-sans bg-background text-text-dark antialiased">
        {children}
      </body>
    </html>
  );
}





