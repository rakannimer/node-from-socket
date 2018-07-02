import fs from "fs-extra";
import {
  isArrayOfLength,
  isObjectWithKeys,
  isObjectWithOptionalKeys,
  isString
} from "../../utils";

const validate = data => {
  isObjectWithKeys(data, ["input"], "data");
  isArrayOfLength(data.input, 2, "data.input");
  isString(data.input[0], "input[0]");
  isObjectWithOptionalKeys(data.input[1], ["encoding", "flag"], "input[1]");
};

export const onRequest = (path, socket) => {
  socket.on(path, inputData => {
    try {
      validate(inputData);
    } catch (err) {
      console.log(err);
      socket.emit(`${path}.response`, { status: "INPUT_ERROR", data: err });
      return;
    }
    const [filePath, options] = inputData.input;
    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        socket.emit(`${path}.response`, { status: "ERROR", data: err });
        return;
      }
      socket.emit(`${path}.response`, { status: "OK", data });
    });
  });
};
