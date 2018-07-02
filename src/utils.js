import ow from "ow";
export const isString = (input, label = "") =>
  ow(input, ow.string.label(label));

export const isArrayOfLength = (input, length, label = "") =>
  ow(input, ow.array.label(label).length(length));

export const isObjectWithKeys = (input, keys = [], label = "") => {
  ow(input, ow.object.label("data").hasKeys(...keys));
};

export const isObjectWithOptionalKeys = (input, keys = [], label = "") => {
  ow(input, ow.object.label("data").hasAnyKeys(...keys));
};
