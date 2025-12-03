"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type ChatMessage = {
  match_id: string;
  user: string;
  message: string;
  ts: string;
};

let socket: Socket | null = null;

function getSocket() {
  if (!socket) {
    socket = io(undefined, {
      path: "/api/socket",
      transports: ["websocket"]
    });
  }
  return socket;
}

export function ChatPanel({ matchId }: { matchId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [nickname, setNickname] = useState(`Guest-${Math.floor(Math.random() * 9999)}`);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const s = getSocket();
    
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    const handleMessage = (payload: ChatMessage) => {
      if (payload.match_id !== matchId) return;
      setMessages((prev) => [...prev.slice(-199), payload]);
    };

    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);
    s.on("chat:message", handleMessage);
    s.emit("chat:join", { match_id: matchId });

    return () => {
      s.emit("chat:leave", { match_id: matchId });
      s.off("connect", handleConnect);
      s.off("disconnect", handleDisconnect);
      s.off("chat:message", handleMessage);
    };
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const payload: ChatMessage = {
      match_id: matchId,
      user: nickname,
      message: trimmed,
      ts: new Date().toISOString()
    };
    const s = getSocket();
    s.emit("chat:message", payload);
    setInput("");
  };

  return (
    <section
      id="chat"
      aria-label="Match chat"
      className="flex h-[400px] sm:h-80 flex-col rounded-xl sm:rounded-2xl border border-muted/40 bg-white/90"
    >
      <header className="flex items-center justify-between border-b border-muted/30 px-3 py-2 text-xs">
        <span className="font-semibold">Match chat</span>
        <span className="text-[11px] text-muted">
          {connected ? "Live" : "Connecting…"} • last 200 messages
        </span>
      </header>
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-2 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="font-semibold text-[11px] text-primary">
              {m.user}{" "}
              <span className="ml-1 text-[10px] font-normal text-muted">
                {new Date(m.ts).toLocaleTimeString()}
              </span>
            </span>
            <span>{m.message}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-muted">Be the first to say something about this match.</p>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-muted/30 px-3 py-2 text-xs">
        <div className="mb-2 flex gap-2">
          <label className="flex-1">
            <span className="sr-only">Nickname</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-full border border-muted/60 px-3 py-1 text-xs"
              placeholder="Nickname"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 rounded-full border border-muted/60 px-3 py-1 text-xs"
            placeholder="Type a message…"
          />
          <button
            type="button"
            onClick={handleSend}
            className="rounded-full bg-primary px-4 py-2 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold text-white touch-manipulation min-w-[60px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}


