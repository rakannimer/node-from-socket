import {{moduleName}} from "{{moduleName}}";
import {
  isArrayOfLength,
  isObjectWithKeys,
  isObjectWithOptionalKeys,
  isString
} from "../../utils";

const validate = data => {
  isObjectWithKeys(data, ["input"], "data");
};

export const onRequest = (path, socket) => {
  socket.on(path, async inputData => {
    try {
      validate(inputData);
    } catch (err) {
      socket.emit(`${path}.response`, { status: "INPUT_ERROR", data: err });
      return;
    }
    const {input} = inputData;
    try {

      const result = {}
      socket.emit(`${path}.response`, { status: "SUCCESS", data: result });
    } catch(err) {
      socket.emit(`${path}.response`, { status: "ERROR", data:err });
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
