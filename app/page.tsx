'use client';

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterBar, type SportFilter } from "@/components/FilterBar";
import { MatchCard, type Match } from "@/components/MatchCard";
import { UpcomingSection } from "@/components/UpcomingSection";
import { NewsDrawer } from "@/components/NewsDrawer";
import matchesData from "@/data/mockMatches.json";

type MatchWithOptionalKickoff = Match & { kickoff_ts?: string };

const ALL_MATCHES = matchesData as MatchWithOptionalKickoff[];

function selectLiveMatches(sportFilter: SportFilter): MatchWithOptionalKickoff[] {
  let live = ALL_MATCHES.filter(
    (m) => m.status === "in_play" || m.status === "live"
  );

  if (sportFilter !== "All") {
    const key = sportFilter.toLowerCase();
    live = live.filter((m) => m.sport.toLowerCase() === key);
  }

  const leaguePriority = [
    "tr_superlig",
    "premier_league",
    "laliga",
    "bundesliga",
    "serie_a"
  ];
  const priorityMap = new Map<string, number>();
  leaguePriority.forEach((id, idx) => priorityMap.set(id, idx));

  return live
    .slice()
    .sort((a, b) => {
      const pa = priorityMap.get(a.competition.id) ?? Number.MAX_SAFE_INTEGER;
      const pb = priorityMap.get(b.competition.id) ?? Number.MAX_SAFE_INTEGER;
      if (pa !== pb) return pa - pb;
      return a.match_id.localeCompare(b.match_id);
    })
    .slice(0, 10);
}

function selectUpcoming(sportFilter: SportFilter): MatchWithOptionalKickoff[] {
  let upcoming = ALL_MATCHES.filter((m) => m.status === "scheduled");

  if (sportFilter !== "All") {
    const key = sportFilter.toLowerCase();
    upcoming = upcoming.filter((m) => m.sport.toLowerCase() === key);
  }

  return upcoming.slice(0, 6);
}

export default function HomePage() {
  const [sportFilter, setSportFilter] = useState<SportFilter>("All");

  const liveMatches = selectLiveMatches(sportFilter);
  const upcoming = selectUpcoming(sportFilter);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row gap-4 md:gap-6 px-3 sm:px-4 py-3 sm:py-4 md:py-6">
        <aside className="w-full md:w-1/4 order-2 md:order-1">
          <FilterBar active={sportFilter} onChange={setSportFilter} />
        </aside>

        <section
          className="flex-1 space-y-4 order-1 md:order-2"
          aria-label="Live matches"
          aria-live="polite"
        >
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-muted/30">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-dark">
                Live Matches
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Prioritized: Süper Lig, Premier League, LaLiga, Bundesliga, Serie A.
              </p>
            </div>
            {liveMatches.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  {liveMatches.length} Live
                </span>
              </div>
            )}
          </header>

          <div className="space-y-3">
            {liveMatches.map((m) => (
              <MatchCard
                key={m.match_id}
                match={m}
                onOpenChat={() => {
                  // Chat open handled by match detail page / future sidebar
                  document.location.href = `/matches/${m.match_id}#chat`;
                }}
              />
            ))}
            {liveMatches.length === 0 && (
              <div className="rounded-xl border border-muted/30 bg-white/90 p-8 text-center">
                <div className="text-4xl mb-3">⚽</div>
                <p className="text-base font-medium text-text-dark mb-1">
                  No live matches at the moment
                </p>
                <p className="text-sm text-muted">
                  Check back soon or browse upcoming fixtures below.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 sm:pt-6">
            <Link
              href="/matches"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Show all matches
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <UpcomingSection matches={upcoming} />
        </section>

        <div className="hidden lg:block w-1/4" aria-hidden="true" />
        <NewsDrawer />
      </main>
      <Footer />
    </div>
  );
}



