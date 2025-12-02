'use client';

const SPORTS = [
  "All",
  "Football",
  "Basketball",
  "Tennis",
  "Cricket",
  "Volleyball",
  "Others"
] as const;

export type SportFilter = (typeof SPORTS)[number];

export function FilterBar({
  active,
  onChange
}: {
  active: SportFilter;
  onChange: (sport: SportFilter) => void;
}) {
  return (
    <aside
      aria-label="Sport filters"
      className="sticky top-16 md:top-20 space-y-2 sm:space-y-3 rounded-xl sm:rounded-2xl border border-muted/30 bg-white/90 p-3 shadow-sm backdrop-blur"
    >
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">Sports</h2>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {SPORTS.map((sport) => {
          const isActive = active === sport;
          return (
            <button
              key={sport}
              type="button"
              onClick={() => onChange(sport)}
              className={`rounded-full border px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium transition ${
                isActive
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-muted/50 bg-background hover:border-primary/60 hover:text-primary active:scale-95"
              }`}
              aria-pressed={isActive}
            >
              {sport}
            </button>
          );
        })}
      </div>
    </aside>
  );
}




