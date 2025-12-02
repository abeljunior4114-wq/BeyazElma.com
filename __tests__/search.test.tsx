import { searchMatches } from "@/lib/matches";

describe("searchMatches", () => {
  it("finds matches by team name", () => {
    const results = searchMatches("Galatasaray");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].home_team.name).toContain("Galatasaray");
  });

  it("returns empty for unknown query", () => {
    const results = searchMatches("this-team-does-not-exist");
    expect(results.length).toBe(0);
  });
});





