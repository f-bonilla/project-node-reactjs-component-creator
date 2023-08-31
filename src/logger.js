const fs = require("fs");
const path = require("path");

const Logger = (() => {
  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("en-GB");

  const firstLine = `\n*********** ${formattedDateTime} ***********\n`;
  const filePath = path.join(__dirname, "logs.txt");

  let isStreamOpen = false;
  const writeQueue = [];

  const stream = fs.createWriteStream(filePath, { flags: "a" });
  stream.on("error", (err) => {
    console.error("An error occurred while writing in the file:", err);
  });
  stream.on("open", () => {
    isStreamOpen = true;
    // delete content
    fs.writeFileSync(filePath, "");
    stream.write(firstLine);
    while (writeQueue.length > 0) {
      const message = writeQueue.shift();
      stream.write(message + "\n");
    }
  });

  return {
    write: (msg, isObject = false) => {
      const message = isObject ? JSON.stringify(msg) : msg;

      if (isStreamOpen) {
        stream.write(message + "\n");
      } else {
        writeQueue.push(message);
      }
    },
    close: () => {
      stream.end();
    },
  };
})();

module.exports = Logger;
