"use client";

import { useState } from "react";

const MOCK_NEWS = [
  {
    id: "n1",
    title: "Galatasaray edges derby thriller in Istanbul",
    source: "BeyazElma News",
    ts: "2 min ago"
  },
  {
    id: "n2",
    title: "Premier League title race heats up as top four collide",
    source: "Global Wire",
    ts: "12 min ago"
  },
  {
    id: "n3",
    title: "Champions League draw: giants set for heavyweight clashes",
    source: "Wire Service",
    ts: "30 min ago"
  }
];

export function NewsDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open sports news"
        className="fixed right-2 sm:right-3 md:right-6 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-semibold text-white shadow-lg transition hover:bg-primary/90 active:scale-95 hidden lg:block"
        onClick={() => setOpen(true)}
      >
        <span className="hidden sm:inline">Sports News</span>
        <span className="sm:hidden">News</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Latest sports news"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 flex h-full w-full sm:w-96 max-w-md flex-col border-l border-muted/40 bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-muted/40 px-4 sm:px-5 py-3 sm:py-4">
              <h2 className="text-sm font-semibold tracking-tight">Latest Sports News</h2>
              <button
                type="button"
                className="text-xs text-muted hover:text-text-dark p-1 rounded transition"
                onClick={() => setOpen(false)}
                aria-label="Close news drawer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 space-y-2 sm:space-y-3 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">
              {MOCK_NEWS.map((n) => (
                <article
                  key={n.id}
                  className="rounded-lg sm:rounded-xl border border-muted/30 bg-white/90 p-2.5 sm:p-3 shadow-sm"
                >
                  <h3 className="text-xs sm:text-sm font-semibold leading-snug">{n.title}</h3>
                  <div className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-wide text-muted">
                    {n.source} • {n.ts}
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}




