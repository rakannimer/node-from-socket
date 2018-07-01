import fs from "fs-extra";
import http from "http";
import socketio from "socket.io";
import express from "express";

const expressApp = express();
expressApp.get("/", (req, res) => {
  res.send("Hi");
});
const httpServer = http.createServer(expressApp);
const io = socketio(httpServer);

const fsReadFileDefaults = ["", { encoding: "utf8" }];
const fsWriteFileDefaults = ["", ""];

io.on("connection", function(client) {
  // client.on
  client.on("fs.writeFile", (data = { input: fsWriteFileDefaults }) => {
    const { input = fsWriteFileDefaults } = data;
    const [
      path = fsWriteFileDefaults[0],
      fileData = fsWriteFileDefaults[1]
    ] = input;
    fs.writeFile(path, fileData, "utf8", (err, data) => {
      if (err) {
        client.emit("fs.writeFile.response", { status: "ERROR", data: err });
        return;
      }
      client.emit("fs.writeFile.response", { status: "OK", data });
    });
  });
  client.on("fs.readFile", (data = { input: fsReadFileDefaults }) => {
    const { input = fsReadFileDefaults } = data;
    const [
      path = fsReadFileDefaults[0],
      { encoding, flag } = fsReadFileDefaults[1]
    ] = input;
    fs.readFile(path, { encoding, flag }, (err, data) => {
      if (err) {
        client.emit("fs.readFile.response", { status: "ERROR", data: err });
        return;
      }
      client.emit("fs.readFile.response", { status: "OK", data });
    });
  });
  client.on("hello", data => {
    client.emit("hello");
  });
  client.on("disconnect", () => {});
});
httpServer.listen(8989);
