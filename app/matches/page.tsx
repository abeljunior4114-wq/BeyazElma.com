import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MatchesListClient } from "@/components/MatchesListClient";
import { type Match } from "@/components/MatchCard";
import matchesData from "@/data/mockMatches.json";

type MatchWithMeta = Match & { kickoff_ts?: string };

const ALL_MATCHES = matchesData as MatchWithMeta[];

const PAGE_SIZE = 10;

export default function MatchesPage({
  searchParams
}: {
  searchParams: { page?: string };
}) {
  const pageNum = Math.max(1, Number(searchParams.page ?? "1") || 1);
  const totalPages = Math.max(1, Math.ceil(ALL_MATCHES.length / PAGE_SIZE));
  const start = (pageNum - 1) * PAGE_SIZE;
  const paged = ALL_MATCHES.slice(start, start + PAGE_SIZE);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 sm:px-4 py-4 sm:py-5">
        <header className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">All matches</h1>
            <p className="text-xs sm:text-sm text-muted">
              Paginated list of live and upcoming fixtures.
            </p>
          </div>
        </header>

        <MatchesListClient matches={paged} page={pageNum} totalPages={totalPages} />
      </main>
      <Footer />
    </div>
  );
}



