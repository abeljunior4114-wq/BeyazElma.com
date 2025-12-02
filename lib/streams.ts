import streamsConfig from "@/config/streams.json";

export type StreamSource = {
  id: string;
  name: string;
  type: string;
  url: string;
};

export function getDefaultStreamsForMatch(competitionCountry: string, competitionId: string) {
  const config = streamsConfig as {
    default: StreamSource[];
    turkey?: StreamSource[];
  };

  if (competitionCountry === "TR" || competitionId.startsWith("tr_")) {
    return config.turkey && config.turkey.length > 0 ? config.turkey : config.default;
  }
  return config.default;
}





