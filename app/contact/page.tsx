'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('benbalbazar@proton.me').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-3 sm:px-4 py-6 sm:py-8">
        <header className="text-center space-y-2 pb-6 border-b border-muted/30">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-dark">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Get in touch with the BeyazElma team
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-muted/30 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-dark">Telegram</h2>
                <p className="text-xs text-muted">Follow for updates</p>
              </div>
            </div>
            <a
              href="https://t.me/forbalbasaur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Join Telegram Channel
            </a>
            <p className="mt-3 text-xs text-muted">
              <a href="https://t.me/forbalbasaur" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                t.me/forbalbasaur
              </a>
            </p>
          </div>

          <div className="rounded-xl border border-muted/30 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-dark">Email</h2>
                <p className="text-xs text-muted">Business & support</p>
              </div>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:benbalbazar@proton.me"
                className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-lg bg-background px-3 py-2 text-xs font-mono text-text-dark border border-muted/30">
                  benbalbazar@proton.me
                </code>
                <button
                  onClick={copyEmail}
                  className="rounded-lg border border-muted/60 px-3 py-2 text-xs font-medium hover:border-primary hover:text-primary transition"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <span className="text-primary">✓</span>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-muted/30 bg-white/90 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-dark mb-3">Other Ways to Reach Us</h2>
          <div className="space-y-3 text-sm text-muted">
            <p>
              <strong className="text-text-dark">For general inquiries:</strong> Use the email above or reach out via Telegram.
            </p>
            <p>
              <strong className="text-text-dark">For business partnerships:</strong> Contact us at benbalbazar@proton.me with your proposal.
            </p>
            <p>
              <strong className="text-text-dark">For technical support:</strong> Join our Telegram channel for community support and updates.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


