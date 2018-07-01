import socketio from "socket.io-client";

const socket = socketio("http://127.0.0.1:8989/");
socket.on("connect", function() {
  console.log("connected");
  socket.emit("hello");
});
socket.on("hello", () => {
  socket.emit("fs.readFile", {
    input: ["src/client/main.js", { encoding: "utf8" }]
  });
  socket.emit("fs.writeFile", {
    input: ["tmp.delete", JSON.stringify({ encoding: "utf8" })]
  });
});

socket.on("fs.readFile.response", data => {
  console.log("fs.readFile.response : ", data);
});

socket.on("event", function(data) {});
socket.on("disconnect", function() {});
