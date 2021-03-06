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
      socket.emit(`${path}.response`, { status: "INPUT_ERROR", data: err });
      return;
    }
    const { input } = inputData;
    try {
      const [path] = input;
      const result = await fs.unlink(path);
      socket.emit(`${path}.response`, { status: "SUCCESS", data: result });
    } catch (err) {
      socket.emit(`${path}.response`, { status: "ERROR", data: err });
    }
  });
};

export const onDocsRequest = (path, expressApp) => {
  expressApp.get(`/${path}`, (req, res) => {
    res.send(`<pre>
      unlink
      Sample Body : 
      {
        input : ['path/to/someFile']
      }
      </pre>
    `);
  });
};
