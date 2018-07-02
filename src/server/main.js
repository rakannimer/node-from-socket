import fs from "fs-extra";
import http from "http";
import socketio from "socket.io";
import express from "express";
// import ow from "ow";
// <GENERATED_CODE_DO_NOT_EDIT>
// <RequestHandlersImports>
import { onRequest as onWalk } from "./fs/walk";
import {
  onRequest as onUnlink,
  onDocsRequest as onUnlinkDocsRequest
} from "./fs/unlink";
import { onRequest as onEnsureDir } from "./fs/ensureDir";
import { onRequest as onWriteFile } from "./fs/writeFile";
import { onRequest as onReadFile } from "./fs/readFile";
import { onRequest as onEnsureFile } from "./fs/ensureFile";
// </RequestHandlersImports>
// </GENERATED_CODE_DO_NOT_EDIT>

const expressApp = express();
expressApp.get("/", (req, res) => {
  res.send("Hi");
});
onUnlinkDocsRequest("fs.unlink", expressApp);
const httpServer = http.createServer(expressApp);
const io = socketio(httpServer);

io.on("connection", socket => {
  // klaw("./src/")
  //   .on("data", item => {
  //     console.log(item);
  //   })
  //   .on("end", () => {})
  //   .on("error", err => {});
  // <GENERATED_CODE_DO_NOT_EDIT>
  // <RequestHandlers>
  onWalk("fs.walk", socket);
  onUnlink("fs.unlink", socket);

  onEnsureDir("fs.ensureDir", socket);
  onWriteFile("fs.writeFile", socket);
  onReadFile("fs.readFile", socket);
  onEnsureFile("fs.ensureFile", socket);
  // </RequestHandlers>
  // </GENERATED_CODE_DO_NOT_EDIT>

  socket.on("disconnect", () => {});
});
httpServer.listen(8989);
