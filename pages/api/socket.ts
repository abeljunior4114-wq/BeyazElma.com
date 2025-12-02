import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as NetServer } from "http";
import type { Socket } from "net";
import { Server as IOServer } from "socket.io";
import { getRedis } from "@/lib/redis";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io?: IOServer;
    };
  };
};

type ChatMessage = {
  match_id: string;
  user: string;
  message: string;
  ts: string;
};

const inMemoryHistory = new Map<string, ChatMessage[]>();

function addToHistory(msg: ChatMessage) {
  const arr = inMemoryHistory.get(msg.match_id) ?? [];
  arr.push(msg);
  inMemoryHistory.set(msg.match_id, arr.slice(-200));
}

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    const io = new IOServer(res.socket.server, {
      path: "/api/socket",
      cors: { origin: "*" }
    });
    const redis = getRedis();

    io.on("connection", (socket) => {
      socket.on("chat:join", ({ match_id }) => {
        socket.join(match_id);
        const history = inMemoryHistory.get(match_id) ?? [];
        history.forEach((m) => socket.emit("chat:message", m));
      });

      socket.on("chat:leave", ({ match_id }) => {
        socket.leave(match_id);
      });

      socket.on("chat:message", async (payload: ChatMessage) => {
        addToHistory(payload);
        io.to(payload.match_id).emit("chat:message", payload);
        if (redis) {
          await redis.publish(
            "chat:message",
            JSON.stringify({ channel: payload.match_id, message: payload })
          );
        }
      });
    });

    if (redis) {
      const sub = redis.duplicate();
      sub.subscribe("chat:message", () => undefined);
      sub.on("message", (_channel, data) => {
        try {
          const parsed = JSON.parse(data) as { channel: string; message: ChatMessage };
          io.to(parsed.channel).emit("chat:message", parsed.message);
        } catch {
          // ignore
        }
      });
    }

    res.socket.server.io = io;
  }
  res.end();
}




