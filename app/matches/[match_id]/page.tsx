import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatPanel } from "@/components/ChatPanel";
import { TeamLogoClient } from "@/components/TeamLogoClient";
import { getMatchById } from "@/lib/matches";
import type { Metadata } from "next";

type MatchDetailPageProps = {
  params: { match_id: string };
};

export async function generateMetadata({ params }: MatchDetailPageProps): Promise<Metadata> {
  const match = getMatchById(params.match_id);
  
  if (!match) {
    return {
      title: "Match Not Found"
    };
  }

  const title = `${match.home_team.name} vs ${match.away_team.name}`;
  const description = `Live match: ${match.home_team.name} ${match.home_team.score} - ${match.away_team.score} ${match.away_team.name}. ${match.competition.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website"
    }
  };
}

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
  const match = getMatchById(params.match_id);

  if (!match) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-4xl flex-1 items-center justify-center px-4">
          <p className="text-sm text-muted">Match not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isLive = match.status === "in_play" || match.status === "live";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 sm:gap-5 px-3 sm:px-4 py-4 sm:py-5">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted">
              {match.competition.name} • {match.competition.country}
            </p>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight truncate">
              {match.home_team.name} vs {match.away_team.name}
            </h1>
          </div>
          <div className="flex flex-col items-start sm:items-end text-xs sm:text-sm">
            {isLive ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-primary">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-primary" />
                Live {match.clock?.minute ?? 0}&apos;
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-wide">
                {match.status === "scheduled"
                  ? `Kickoff: ${
                      (match as any).kickoff_ts
                        ? new Date((match as any).kickoff_ts).toLocaleString()
                        : "TBD"
                    }`
                  : match.status}
              </span>
            )}
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
          <div className="space-y-3 sm:space-y-4">
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl sm:rounded-2xl border border-muted/40 bg-white/90 p-3 sm:p-4 gap-3"
              aria-live="polite"
            >
              <div className="flex flex-col gap-3 sm:gap-2 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="relative flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-background border border-muted/30 flex items-center justify-center overflow-hidden">
                      <TeamLogoClient
                        src={match.home_team.logo}
                        alt={match.home_team.name}
                        fallbackText={match.home_team.name}
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>
                    <span className="text-base sm:text-lg font-semibold truncate">{match.home_team.name}</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold min-w-[2.5rem] text-right" aria-label="Home score">
                    {match.home_team.score}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="relative flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-background border border-muted/30 flex items-center justify-center overflow-hidden">
                      <TeamLogoClient
                        src={match.away_team.logo}
                        alt={match.away_team.name}
                        fallbackText={match.away_team.name}
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>
                    <span className="text-base sm:text-lg font-semibold truncate">{match.away_team.name}</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold min-w-[2.5rem] text-right" aria-label="Away score">
                    {match.away_team.score}
                  </span>
                </div>
              </div>
              <div className="text-[10px] sm:text-xs text-muted text-right sm:text-left border-t sm:border-t-0 sm:border-l border-muted/20 pt-2 sm:pt-0 sm:pl-4">
                <div>Last update:</div>
                <div>{new Date(match.last_update_ts).toLocaleTimeString()}</div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-muted/40 bg-white/90 p-3 sm:p-4 text-xs sm:text-sm">
              <h2 className="mb-2 text-xs sm:text-sm font-semibold">Streaming</h2>
              <p className="mb-2 text-[10px] sm:text-xs text-muted">
                Streams are placeholders only. Do not embed or redistribute any stream you do not
                have rights to. For Turkish matches, default stream is beIN Sports Turkey
                (requires license).
              </p>
              <ul className="space-y-1.5 text-[10px] sm:text-xs">
                {(match.stream_sources || []).map((s) => (
                  <li key={s.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg bg-background px-2.5 sm:px-3 py-2">
                    <span className="font-medium truncate">{s.name}</span>
                    <button
                      type="button"
                      className="rounded-full border border-muted/60 px-2 py-1 text-[10px] sm:text-[11px] text-muted hover:border-primary hover:text-primary transition self-start sm:self-auto"
                    >
                      Admin: paste official embed
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-muted/40 bg-white/90 p-3 sm:p-4 text-xs sm:text-sm">
              <h2 className="mb-2 text-xs sm:text-sm font-semibold">Match timeline</h2>
              <ul className="space-y-1 text-[10px] sm:text-xs">
                {match.events?.map((e) => (
                  <li key={e.id} className="flex items-center justify-between rounded-lg bg-background px-2.5 sm:px-3 py-1.5">
                    <span className="font-medium break-words">
                      {e.minute}&apos; • {e.type === "goal" ? "Goal" : e.type} ({e.team}) —{" "}
                      {e.player}
                    </span>
                  </li>
                ))}
                {(!match.events || match.events.length === 0) && (
                  <li className="text-[10px] sm:text-xs text-muted">No events yet.</li>
                )}
              </ul>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-muted/40 bg-white/90 p-3 sm:p-4 text-xs sm:text-sm">
              <h2 className="mb-2 text-xs sm:text-sm font-semibold">Stats (placeholder)</h2>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <div className="rounded-lg bg-background px-2 sm:px-3 py-2">
                  <div className="text-muted">Possession</div>
                  <div className="mt-1 font-semibold">54% - 46%</div>
                </div>
                <div className="rounded-lg bg-background px-2 sm:px-3 py-2">
                  <div className="text-muted">Shots</div>
                  <div className="mt-1 font-semibold">8 - 5</div>
                </div>
                <div className="rounded-lg bg-background px-2 sm:px-3 py-2">
                  <div className="text-muted">Corners</div>
                  <div className="mt-1 font-semibold">4 - 2</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <ChatPanel matchId={match.match_id} />
            <div className="rounded-xl sm:rounded-2xl border border-muted/40 bg-white/90 p-3 sm:p-4 text-[10px] sm:text-xs">
              <h2 className="mb-2 text-xs sm:text-sm font-semibold">Lineups (lazy-loaded placeholder)</h2>
              <p className="text-muted">
                Detailed lineups and player cards can be loaded lazily from your data provider
                here.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}




