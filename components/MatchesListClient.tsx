'use client';

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { MatchCard, type Match } from "@/components/MatchCard";

type MatchWithMeta = Match & { kickoff_ts?: string };

export function MatchesListClient({
  matches,
  page,
  totalPages
}: {
  matches: MatchWithMeta[];
  page: number;
  totalPages: number;
}) {
  const router = useRouter();

  const goToPage = useCallback(
    (target: number) => {
      const clamped = Math.min(Math.max(1, target), totalPages);
      const params = new URLSearchParams();
      params.set("page", String(clamped));
      router.push(`/matches?${params.toString()}`);
    },
    [router, totalPages]
  );

  return (
    <>
      <section className="space-y-3" aria-label="All matches list">
        {matches.map((m) => (
          <MatchCard
            key={m.match_id}
            match={m}
            onOpenChat={() => {
              router.push(`/matches/${m.match_id}#chat`);
            }}
          />
        ))}
        {matches.length === 0 && (
          <p className="text-sm text-muted">No matches on this page.</p>
        )}
      </section>

      <nav
        className="mt-4 flex items-center justify-between text-xs"
        aria-label="Pagination"
      >
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className="rounded-full border border-muted/60 px-3 py-1 disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-muted">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          className="rounded-full border border-muted/60 px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </>
  );
}



