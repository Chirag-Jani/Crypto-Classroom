const { v4 } = require("uuid");
const mime = require("mime");
const { mkdirSync, existsSync, writeFileSync } = require("fs");
const constants = require("./constants");

const storeAsSync = (dir, buffer, mimetype) => {
  const storageDir = "public/storage";
  const fileName = `${dir}/${v4()}.${mime.extension(mimetype)}`;

  const storageDirExists = existsSync(storageDir);
  if (!storageDirExists) mkdirSync(storageDir);

  const exists = existsSync(`${storageDir}/${dir}`);
  if (!exists) mkdirSync(`${storageDir}/${dir}`);

  writeFileSync(`${storageDir}/${fileName}`, buffer);

  return fileName;
};

const castToStorage = (string) =>
  string ? constants.baseUrl(`storage/${string}`) : null;

module.exports = { storeAsSync, castToStorage };
