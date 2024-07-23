//initialize Express.js boilerplate plate ->
const express = require("express");
const app = express();
const path = require("path");

//create http server using already created express server ->
const http = require("http");
const server = http.createServer(app);

//initialize socket.io and pass server to socket.io and listen on server.listen(port) ->
const socketio = require("socket.io");
const io = socketio(server);

//socket-io real-time connection ->
io.on("connection", function (socket) {
  console.log("New user connected");
  socket.on("send-location", function (data) {
    console.log("user connected");
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("user-disconnect", function () {
    console.log("user disconnected");
    io.emit("user-disconnect", socket.id);
  });
});

//view engine setup ->
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Routes Setup ->
app.get("/", (req, res) => {
  res.render("index");
});

//listening on port ->
server.listen(3000);
