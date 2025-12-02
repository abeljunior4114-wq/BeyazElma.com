import React from "react";
import { render, screen } from "@testing-library/react";
import { MatchCard, type Match } from "@/components/MatchCard";

const mockMatch: Match = {
  match_id: "test_1",
  sport: "football",
  competition: { id: "tr_superlig", name: "Süper Lig", country: "TR" },
  home_team: { id: "t1", name: "Galatasaray", score: 1 },
  away_team: { id: "t2", name: "Besiktas", score: 0 },
  status: "in_play",
  clock: { minute: 61, second: 10 }
};

describe("MatchCard", () => {
  it("renders teams and scores", () => {
    render(<MatchCard match={mockMatch} onOpenChat={() => {}} />);
    expect(screen.getByText("Galatasaray")).toBeInTheDocument();
    expect(screen.getByText("Besiktas")).toBeInTheDocument();
    expect(screen.getByLabelText("Home score")).toHaveTextContent("1");
    expect(screen.getByLabelText("Away score")).toHaveTextContent("0");
  });
});





