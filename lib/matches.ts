import rawMatches from "@/data/mockMatches.json";
import { getLeaguePriorityMap } from "./leagueOrder";
import { getDefaultStreamsForMatch, type StreamSource } from "./streams";

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
  events?: {
    id: string;
    type: string;
    team: "home" | "away";
    player: string;
    minute: number;
  }[];
  kickoff_ts?: string;
  stream_sources?: StreamSource[];
  last_update_ts: string;
};

const ALL_MATCHES: Match[] = rawMatches as Match[];

export function listMatches(params: {
  status?: "live" | "upcoming";
  sport?: string;
  limit?: number;
  order?: "priority" | "default";
}): Match[] {
  const { status, sport, limit = 10, order = "default" } = params;

  let filtered = ALL_MATCHES.slice();

  if (status === "live") {
    filtered = filtered.filter((m) => m.status === "in_play" || m.status === "live");
  } else if (status === "upcoming") {
    filtered = filtered.filter((m) => m.status === "scheduled");
  }

  if (sport && sport !== "all") {
    filtered = filtered.filter((m) => m.sport.toLowerCase() === sport.toLowerCase());
  }

  if (order === "priority" && status === "live") {
    const priorityMap = getLeaguePriorityMap();
    filtered.sort((a, b) => {
      const pa = priorityMap.get(a.competition.id) ?? Number.MAX_SAFE_INTEGER;
      const pb = priorityMap.get(b.competition.id) ?? Number.MAX_SAFE_INTEGER;
      if (pa !== pb) return pa - pb;
      return a.match_id.localeCompare(b.match_id);
    });
  }

  return filtered.slice(0, limit);
}

export function getMatchById(matchId: string): Match | undefined {
  const m = ALL_MATCHES.find((m) => m.match_id === matchId);
  if (!m) return undefined;

  if (!m.stream_sources || m.stream_sources.length === 0) {
    const defaults = getDefaultStreamsForMatch(m.competition.country, m.competition.id);
    return { ...m, stream_sources: defaults };
  }
  return m;
}

export function searchMatches(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return ALL_MATCHES.filter((m) => {
    return (
      m.home_team.name.toLowerCase().includes(q) ||
      m.away_team.name.toLowerCase().includes(q) ||
      m.competition.name.toLowerCase().includes(q) ||
      m.competition.country.toLowerCase().includes(q)
    );
  }).slice(0, 20);
}




