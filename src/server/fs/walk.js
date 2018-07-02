import klaw from "klaw";
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
      const [fsPath] = input;
      klaw(fsPath)
        .on("data", item => {
          socket.emit(`${path}.response`, {
            status: "PARTIAL_SUCCESS",
            data: item
          });
        })
        .on("end", () => {
          socket.emit(`${path}.response`, { status: "SUCCESS", data: null });
        })
        .on("error", err => {
          socket.emit(`${path}.response`, { status: "ERROR", data: err });
        });
    } catch (err) {
      socket.emit(`${path}.response`, { status: "ERROR", data: err });
    }
  });
};

export const onDocsRequest = (path, expressApp) => {
  expressApp.get(`/${path}`, (req, res) => {
    res.send(`<pre>
      ${path}
      Sample Body : 
      {
        input : []
      }
      </pre>
    `);
  });
};
