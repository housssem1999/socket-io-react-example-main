const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send-pos", (data) => {
    socket.broadcast.emit("receive_pos", data);
    console.log("msg: ", data);
  });
});

server.listen(4000, () => {
  console.log("SERVER IS RUNNING");
});
