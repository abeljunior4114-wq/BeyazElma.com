import { NextResponse } from "next/server";
import { getMatchById } from "@/lib/matches";

export function GET(
  _request: Request,
  { params }: { params: { match_id: string } }
) {
  const match = getMatchById(params.match_id);
  if (!match) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.json({ match });
}





