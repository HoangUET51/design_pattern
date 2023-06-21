const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const connection = require("../config/connectDB");
const { configCors } = require("../config/configCORS");
const path = require("path");
const http = require("http");
const initApiRoutes = require("./routers/index.router");
const Filter = require("bad-words");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
//tạo cổng chạy
const PORT = process.env.PORT || 8000;
configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection();

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(express.static(path.join(__dirname, "../UI")));

io.on("connection", (socket) => {
  console.log("New client connect");

  socket.emit(
    "send message from server to client",
    "Chào mừng bạn đến với Chat app"
  );
  //socket.broadcast.to.emit('','') => sử dụng .to xử lý chia phòng
  socket.broadcast.emit(
    "send message from server to client",
    "Có một client mới vừa tham gia Chat app"
  );

  //truyen msg tu server client
  socket.on("chat message", (msg, callback) => {
    // socket.join(room) => chia phòng
    const filter = new Filter();
    if (filter.isProfane(msg)) {
      return callback("Invalid message");
    }
    const message = {
      msg,
      createAt: new Date(),
    };
    // io.to(room).emit('','') => gửi về phòng room
    io.emit("send message", message);
    callback();
  });

  //xử lý location

  socket.on("share location", ({ latitude, longitude }) => {
    const linkLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;
    io.emit("send location", linkLocation);
  });

  socket.on("disconnect", () => {
    //removeUser(socket.id)
    console.log("disconnected");
  });
});

initApiRoutes(app);

app.use((req, res) => {
  res.send("404 not found");
});

server.listen(PORT, () => {
  console.log(">>>>>>>>JWT Backend", PORT);
});
