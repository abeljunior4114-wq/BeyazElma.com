import Redis from "ioredis";

let client: Redis | null = null;

export function getRedis() {
  if (client !== null) return client;
  const url = process.env.REDIS_URL;
  if (!url) {
    client = null;
    return client;
  }
  client = new Redis(url);
  return client;
}





