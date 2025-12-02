import { Server } from "socket.io";

// Simple script outline to simulate match updates via Socket.IO.
// Run this with a small Node server that shares the same Socket.IO instance as the app.

const io = new Server(4001, { cors: { origin: "*" } });

setInterval(() => {
  const payload = {
    match_id: "m_12345",
    diff: {
      home_team: { score: Math.floor(Math.random() * 3) },
      last_update_ts: new Date().toISOString()
    }
  };
  io.emit("match:update", payload);
}, 15000);

console.log("Mock events server emitting match:update every 15s on :4001");





