'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Match } from "./MatchCard";

type TimeFilter = 24 | 48 | 72;

export function UpcomingSection({
  matches
}: {
  matches: (Match & { kickoff_ts?: string })[];
}) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(72);

  const filteredMatches = useMemo(() => {
    if (!timeFilter) return matches;
    
    const now = new Date();
    const future = new Date(now.getTime() + timeFilter * 60 * 60 * 1000);
    
    return matches.filter((m) => {
      if (!m.kickoff_ts) return false;
      const kickoff = new Date(m.kickoff_ts);
      return kickoff >= now && kickoff <= future;
    });
  }, [matches, timeFilter]);

  return (
    <section className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-muted/30 bg-white/90 p-3 sm:p-4 shadow-sm">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-text-dark">Upcoming matches</h2>
          <p className="text-xs text-muted mt-0.5">Next {timeFilter} hours</p>
        </div>
        <div className="flex gap-2 text-xs sm:text-sm">
          <button
            onClick={() => setTimeFilter(24)}
            className={`rounded-full border px-3 sm:px-4 py-2 sm:py-1.5 font-medium transition touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center ${
              timeFilter === 24
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted/60 text-muted hover:border-primary hover:text-primary active:scale-95"
            }`}
          >
            Next 24h
          </button>
          <button
            onClick={() => setTimeFilter(48)}
            className={`rounded-full border px-3 sm:px-4 py-2 sm:py-1.5 font-medium transition touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center ${
              timeFilter === 48
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted/60 text-muted hover:border-primary hover:text-primary active:scale-95"
            }`}
          >
            48h
          </button>
          <button
            onClick={() => setTimeFilter(72)}
            className={`rounded-full border px-3 sm:px-4 py-2 sm:py-1.5 font-medium transition touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center ${
              timeFilter === 72
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted/60 text-muted hover:border-primary hover:text-primary active:scale-95"
            }`}
          >
            72h
          </button>
        </div>
      </header>

      <div className="space-y-2">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((m) => (
            <Link
              key={m.match_id}
              href={`/matches/${m.match_id}`}
              className="flex items-center justify-between rounded-lg sm:rounded-xl border border-muted/20 bg-background px-3 py-2.5 hover:border-primary/50 hover:bg-primary/5 transition group"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] sm:text-xs uppercase tracking-wide text-muted">
                  {m.competition.name}
                </span>
                <span className="font-medium text-xs sm:text-sm text-text-dark group-hover:text-primary transition truncate">
                  {m.home_team.name} vs {m.away_team.name}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-muted flex-shrink-0 ml-3">
                {m.kickoff_ts ? (
                  <div className="text-right">
                    <div>{new Date(m.kickoff_ts).toLocaleDateString()}</div>
                    <div className="font-medium">{new Date(m.kickoff_ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                ) : (
                  "TBD"
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-lg bg-background px-3 py-4 text-center">
            <p className="text-xs sm:text-sm text-muted">No upcoming fixtures in the next {timeFilter} hours.</p>
          </div>
        )}
      </div>
    </section>
  );
}




