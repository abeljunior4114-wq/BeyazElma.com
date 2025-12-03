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
      className="sticky top-16 md:top-20 space-y-2 sm:space-y-3 rounded-xl sm:rounded-2xl border border-muted/30 bg-white/90 p-3 sm:p-4 shadow-sm backdrop-blur"
    >
      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted mb-2 sm:mb-3">Sports</h2>
      <div className="flex flex-wrap gap-2">
        {SPORTS.map((sport) => {
          const isActive = active === sport;
          return (
            <button
              key={sport}
              type="button"
              onClick={() => onChange(sport)}
              className={`rounded-full border px-3 sm:px-4 py-2 sm:py-1.5 text-xs sm:text-sm font-medium transition touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center ${
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




