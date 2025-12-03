'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Suggestion = {
  id: string;
  label: string;
  href: string;
};

export function Header() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal
        });
        if (!res.ok) {
          setIsSearching(false);
          return;
        }
        const data = await res.json();
        const items: Suggestion[] = (data.results || []).slice(0, 5).map((r: any) => ({
          id: r.id,
          label: r.label,
          href: r.href
        }));
        setSuggestions(items);
        setIsSearching(false);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setSuggestions([]);
        }
        setIsSearching(false);
      }
    }, 160);
    return () => {
      controller.abort();
      clearTimeout(timeout);
      setIsSearching(false);
    };
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#1a1a1a] backdrop-blur-md shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-0 px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3 py-2.5 sm:py-3">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 group min-w-0"
            aria-label="BeyazElma Home"
          >
            <img 
              src="/logo.svg" 
              alt="BeyazElma" 
              className="h-7 w-auto sm:h-9 group-hover:opacity-90 transition-opacity"
              width="200"
              height="40"
            />
          </Link>

          <div className="relative flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-2 md:mx-4 min-w-0">
            <label className="sr-only" htmlFor="main-search">
              Search matches, teams, leagues
            </label>
            <div className="relative">
              <input
                id="main-search"
                ref={inputRef}
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg sm:rounded-xl border-2 border-muted/50 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                autoComplete="off"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-gray-400/40 bg-gray-700/30 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                <span className="text-xs">/</span>
              </kbd>
            </div>
            {isFocused && suggestions.length > 0 && (
              <ul
                className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border-2 border-muted/40 bg-white text-sm shadow-xl backdrop-blur-sm"
                role="listbox"
              >
                {suggestions.map((s) => (
                  <li key={s.id} className="border-b border-muted/20 last:border-none">
                    <Link
                      href={s.href}
                      className="block px-4 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors"
                      role="option"
                      aria-label={s.label}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors text-white touch-manipulation"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden items-center gap-1 sm:gap-2 text-sm font-medium md:flex">
            <Link href="/" className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 transition-colors font-medium">
              Home
            </Link>
            <Link href="/live" className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 transition-colors font-medium">
              Live
            </Link>
            <Link href="/matches" className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 transition-colors font-medium">
              Upcoming
            </Link>
            <Link href="/leagues" className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 transition-colors font-medium">
              Leagues
            </Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-1 pb-3 border-t border-gray-800 pt-3 animate-in slide-in-from-top-2 duration-200">
            <Link 
              href="/" 
              className="px-4 py-2.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 text-sm font-medium transition-colors active:bg-white/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/live" 
              className="px-4 py-2.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 text-sm font-medium transition-colors active:bg-white/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Live
            </Link>
            <Link 
              href="/matches" 
              className="px-4 py-2.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 text-sm font-medium transition-colors active:bg-white/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Upcoming
            </Link>
            <Link 
              href="/leagues" 
              className="px-4 py-2.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 text-sm font-medium transition-colors active:bg-white/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Leagues
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-300 text-sm font-medium transition-colors active:bg-white/20" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}


