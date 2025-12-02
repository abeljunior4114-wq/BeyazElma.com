import { NextResponse } from "next/server";
import { listMatches } from "@/lib/matches";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status") as "live" | "upcoming" | null;
  const sport = searchParams.get("sport") || undefined;
  const limit = Number(searchParams.get("limit") || "10") || 10;
  const order = (searchParams.get("order") as "priority" | "default") || "default";

  const matches = listMatches({
    status: statusParam === "live" || statusParam === "upcoming" ? statusParam : undefined,
    sport,
    limit,
    order
  });

  return NextResponse.json({ matches });
}





