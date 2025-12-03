"use client";

import Link from "next/link";
import { TeamLogo } from "./TeamLogo";

export type Match = {
  match_id: string;
  sport: string;
  competition: {
    id: string;
    name: string;
    country: string;
  };
  home_team: {
    id: string;
    name: string;
    logo?: string;
    score: number;
  };
  away_team: {
    id: string;
    name: string;
    logo?: string;
    score: number;
  };
  status: string;
  clock?: {
    minute: number;
    second: number;
  };
};

export function MatchCard({
  match,
  onOpenChat
}: {
  match: Match;
  onOpenChat: (matchId: string) => void;
}) {
  const isLive = match.status === "in_play" || match.status === "live";
  const minute = match.clock?.minute ?? 0;

  return (
    <article
      className="group flex flex-col gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-muted/30 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg active:translate-y-0"
      aria-live={isLive ? "polite" : undefined}
    >
      <header className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
            {match.competition.country}
          </span>
          <div className="min-w-0 flex-1">
            <span className="block font-semibold text-[11px] sm:text-xs uppercase tracking-wide text-text-dark truncate">
              {match.competition.name}
            </span>
          </div>
        </div>
        {isLive && (
          <span className="inline-flex items-center gap-1.5 flex-shrink-0 rounded-full bg-primary/10 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-primary border border-primary/20">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-primary" />
            <span className="hidden sm:inline">Live</span>
            <span>{minute}&apos;</span>
          </span>
        )}
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3.5 sm:gap-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-background to-muted/20 border-2 border-muted/40 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-primary/30 transition-colors">
                <TeamLogo
                  src={match.home_team.logo}
                  alt={match.home_team.name}
                  fallbackText={match.home_team.name}
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base text-text-dark truncate">{match.home_team.name}</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black min-w-[2.5rem] text-right text-text-dark tabular-nums" aria-label="Home score">
              {match.home_team.score}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-background to-muted/20 border-2 border-muted/40 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-primary/30 transition-colors">
                <TeamLogo
                  src={match.away_team.logo}
                  alt={match.away_team.name}
                  fallbackText={match.away_team.name}
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base text-text-dark truncate">{match.away_team.name}</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black min-w-[2.5rem] text-right text-text-dark tabular-nums" aria-label="Away score">
              {match.away_team.score}
            </span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-2.5 border-t sm:border-t-0 sm:border-l border-muted/20 pt-3 sm:pt-0 sm:pl-4 sm:ml-2">
          <Link
            href={`/matches/${match.match_id}`}
            className="rounded-lg sm:rounded-full border-2 border-primary/60 bg-primary/5 px-4 py-2 sm:px-4 sm:py-2 font-semibold text-xs sm:text-sm text-primary hover:bg-primary hover:text-white transition-all duration-200 whitespace-nowrap active:scale-95"
          >
            Details
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg sm:rounded-full border border-muted/50 bg-background px-3 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 whitespace-nowrap active:scale-95"
              onClick={() => onOpenChat(match.match_id)}
            >
              Chat
            </button>
            <button
              type="button"
              className="rounded-lg sm:rounded-full border border-muted/50 bg-background px-3 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 whitespace-nowrap active:scale-95"
              onClick={(e) => {
                const url = `${window.location.origin}/matches/${match.match_id}`;
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(url).then(() => {
                    const btn = e.currentTarget;
                    const original = btn.textContent;
                    btn.textContent = 'Copied!';
                    setTimeout(() => {
                      btn.textContent = original;
                    }, 2000);
                  }).catch(() => undefined);
                }
              }}
              aria-label="Copy match link"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}




