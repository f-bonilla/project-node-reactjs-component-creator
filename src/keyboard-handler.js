const readline = require("readline");
const constants = require("./constants");

const KeyboardHandler = (
  onEnterKeyPress,
  onBackspaceKeyPress,
  onArrowKeyPress,
  onUserEntryText,
  onExitMenu
) => {
  const validCharacters = /^[a-zA-Z0-9-_.]+$/;
  readline.emitKeypressEvents(process.stdin); // send key events
  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true); // allow Ctrl + C, etc...
  }
  process.stdin.setEncoding("utf8");

  process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
      onExitMenu();
    }
    if (key.name === constants.KEY_UP || key.name === constants.KEY_DOWN) {
      onArrowKeyPress(key.name);
    } else if (key.name === constants.KEY_RETURN) {
      onEnterKeyPress(key.name);
    } else if (key.name === constants.KEY_BACKSPACE) {
      onBackspaceKeyPress(key.name);
    } else {
      if (str && validCharacters.test(str)) {
        onUserEntryText(str);
      }
    }
  });

  return {
    exitApp: () => {
      // NOTE: If the Logger module is used, it is important to call this method before exiting the application.
      //Logger.close();

      // show terminal cursor
      process.stdout.write("\x1B[?25h");
      process.exit();
    },
  };
};

module.exports = KeyboardHandler;
