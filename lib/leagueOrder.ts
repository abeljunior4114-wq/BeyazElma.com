import leagueOrder from "@/config/league_order.json";

export function getLeaguePriorityMap() {
  const order = (leagueOrder as { priority: string[] }).priority || [];
  const map = new Map<string, number>();
  order.forEach((id, index) => map.set(id, index));
  return map;
}





