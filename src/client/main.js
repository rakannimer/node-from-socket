import socketio from "socket.io-client";

const socket = socketio("http://127.0.0.1:8989/");

socket.on("connect", function() {
  console.log("connected");
  socket.emit("fs.readFile", {
    input: ["src/client/main.js", { encoding: "utf8" }]
  });
  socket.emit("fs.writeFile", {
    input: ["tmp.delete", JSON.stringify({ encoding: "utf8" })]
  });
  socket.emit("fs.ensureFile", {
    input: ["tmp.delete.ensureFile2"]
  });
  socket.emit("fs.ensureDir", {
    input: ["tmp.delete.ensureDir"]
  });
  socket.emit("fs.unlink", {
    input: ["tmp.delete.ensureFile"]
  });
  socket.emit("fs.walk", {
    input: ["src/"]
  });
});

socket.on("fs.readFile.response", data => {
  console.log("fs.readFile.response : ", data);
});
socket.on("fs.writeFile.response", data => {
  console.log("fs.writeFile.response : ", data);
});
socket.on("fs.ensureFile.response", data => {
  console.log("fs.ensureFile.response : ", data);
});
socket.on("fs.unlink.response", data => {
  console.log("fs.unlink.response");
});
const walkResponse = [];
socket.on("fs.walk.response", data => {
  if (data.status === "PARTIAL_SUCCESS") {
    walkResponse.push(data.data);
  } else if (data.status === "SUCCESS") {
    console.log("Done", walkResponse);
  }

  console.log("fs.walk.response", data);
});

socket.on("event", function(data) {});
socket.on("disconnect", function() {});
