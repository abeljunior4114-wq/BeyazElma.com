'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import matchesData from "@/data/mockMatches.json";
import Link from "next/link";

type Match = {
  competition: {
    id: string;
    name: string;
    country: string;
  };
};

const ALL_MATCHES = matchesData as Match[];

const LEAGUE_PRIORITY = [
  { id: "tr_superlig", name: "Süper Lig", country: "TR", priority: 1 },
  { id: "premier_league", name: "Premier League", country: "GB", priority: 2 },
  { id: "laliga", name: "LaLiga", country: "ES", priority: 3 },
  { id: "bundesliga", name: "Bundesliga", country: "DE", priority: 4 },
  { id: "serie_a", name: "Serie A", country: "IT", priority: 5 },
];

function getLeagues() {
  const leagueMap = new Map<string, { name: string; country: string; matchCount: number; priority: number }>();
  
  ALL_MATCHES.forEach((match) => {
    const existing = leagueMap.get(match.competition.id);
    const priorityLeague = LEAGUE_PRIORITY.find((l) => l.id === match.competition.id);
    const priority = priorityLeague?.priority ?? 999;
    
    if (existing) {
      existing.matchCount++;
    } else {
      leagueMap.set(match.competition.id, {
        name: match.competition.name,
        country: match.competition.country,
        matchCount: 1,
        priority,
      });
    }
  });

  return Array.from(leagueMap.values()).sort((a, b) => a.priority - b.priority);
}

export default function LeaguesPage() {
  const leagues = getLeagues();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-3 sm:px-4 py-4 sm:py-6">
        <header className="flex flex-col gap-2 pb-4 border-b border-muted/30">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-dark">
            Leagues & Competitions
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Browse matches by league and competition. Priority order: Turkish Süper Lig, Premier League, LaLiga, Bundesliga, Serie A.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leagues.map((league) => (
            <Link
              key={league.name}
              href={`/matches?sport=football&league=${encodeURIComponent(league.name)}`}
              className="group rounded-xl border border-muted/30 bg-white/90 p-4 shadow-sm transition hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-text-dark truncate group-hover:text-primary transition">
                    {league.name}
                  </h2>
                  <p className="text-xs text-muted mt-0.5">{league.country}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {league.country}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">{league.matchCount} match{league.matchCount !== 1 ? 'es' : ''}</span>
                <span className="text-primary group-hover:translate-x-0.5 transition inline-flex items-center">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {leagues.length === 0 && (
          <div className="rounded-xl border border-muted/30 bg-white/90 p-8 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <p className="text-base font-medium text-text-dark mb-1">
              No leagues available
            </p>
            <p className="text-sm text-muted">
              Leagues will appear here as matches are added.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}


