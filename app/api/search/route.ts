import { NextResponse } from "next/server";
import { searchMatches } from "@/lib/matches";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const results = searchMatches(q).map((m) => ({
    id: m.match_id,
    label: `${m.home_team.name} vs ${m.away_team.name} — ${m.competition.name}`,
    href: `/matches/${m.match_id}`
  }));
  return NextResponse.json({ results });
}





