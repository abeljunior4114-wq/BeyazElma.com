import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "BeyazElma",
  description: "BeyazElma — Live sports scores, streams, and real-time chat."
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





