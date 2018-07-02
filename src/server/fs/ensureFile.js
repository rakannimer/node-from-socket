import fs from "fs-extra";
import { isArrayOfLength, isObjectWithKeys, isString } from "../../utils";

const validate = data => {
  isObjectWithKeys(data, ["input"], "data");
  isArrayOfLength(data.input, 1, "data.input");
  isString(data.input[0], "data.input[0]");
};

export const onRequest = (path, socket) => {
  socket.on(path, async inputData => {
    try {
      validate(inputData);
    } catch (err) {
      console.log(err);
      socket.emit(`${path}.response`, { status: "INPUT_ERROR", data: err });
      return;
    }
    const { input } = inputData;
    const [path] = input;
    try {
      await fs.ensureFile(path);
      socket.emit(`${path}.response`, { status: "OK", data: {} });
    } catch (err) {
      socket.emit(`${path}.response`, { status: "ERROR", data: err });
    }
  });
};
