const { print, clear } = require("./terminal-printer");
const constants = require("./constants");
const KeyboardHandler = require("./keyboard-handler");
const MenuIterator = require("./menu-iterator");

const MENU_MODE = constants.MENU_MODE;

const getFirstValidOption = (options) =>
  options.findIndex(
    (option) =>
      option.type === constants.OPTION_FOLDER ||
      option.type === constants.OPTION_ACTION
  );

const Menu = (options, onMenuOptionSelected, onUserAnswer) => {
  // arrow keys direction
  const UP = -1;
  const DOWN = 1;
  let menuHistory = [];
  let menuOptions = options;
  let menuMode, currentMenuOptionIndex, menuIterator;
  let userAnswer = [];

  const enterKeyPressHandler = () => {
    if (menuMode === MENU_MODE.NAVIGATE) {
      onMenuOptionSelected(menuOptions[currentMenuOptionIndex]);
    } else if (menuMode === MENU_MODE.QUESTION) {
      onUserAnswer({ complete: true, value: userAnswer.join("") });
    }
    userAnswer = [];
  };

  const backspaceKeyPressHandler = () => {
    if (menuMode === MENU_MODE.QUESTION) {
      userAnswer.pop();
      printMenu();
      print(" " + userAnswer.join(""));
    }
  };

  const userEntryTextHandler = (keyName) => {
    if (menuMode === MENU_MODE.QUESTION) {
      userAnswer.push(keyName);
      printMenu();
      print(" " + userAnswer.join(""));
    }
  };

  const arrowKeyPressHandler = (keyName) => {
    if (menuMode === MENU_MODE.NAVIGATE) {
      const direction = keyName === constants.KEY_UP ? UP : DOWN;
      currentMenuOptionIndex = menuIterator.next(
        direction,
        currentMenuOptionIndex
      ).value;
      printMenu();
    }
  };

  const exitMenuHandler = () => {
    if (menuMode === MENU_MODE.NAVIGATE) {
      keyboardHandler.exitApp();
    } else if (menuMode === MENU_MODE.QUESTION) {
      onUserAnswer({ complete: false });
    }
  };

  const updateState = (options, mode, optionIndex, iterator) => {
    menuOptions = options;
    menuMode = mode || menuMode;
    currentMenuOptionIndex = optionIndex || getFirstValidOption(menuOptions);
    menuIterator = iterator || MenuIterator(menuOptions);
  };

  const saveCurrentMenu = () => {
    menuHistory.push({
      menuOptions: menuOptions,
      menuMode: menuMode,
      currentMenuOptionIndex: currentMenuOptionIndex,
      menuIterator: menuIterator,
    });
  };

  const printMenu = () => {
    clear();
    menuOptions.forEach((menuOption, index) => {
      print(
        index === currentMenuOptionIndex
          ? `> ${menuOption.name}`
          : ` ${menuOption.name}`,
        { color: menuOption.color }
      );
    });
  };

  const keyboardHandler = KeyboardHandler(
    enterKeyPressHandler,
    backspaceKeyPressHandler,
    arrowKeyPressHandler,
    userEntryTextHandler,
    exitMenuHandler
  );

  updateState(menuOptions, MENU_MODE.NAVIGATE);
  printMenu();

  return {
    update: (options, mode = MENU_MODE.NAVIGATE) => {
      if (mode === MENU_MODE.QUESTION) {
        saveCurrentMenu();
      }
      updateState(options, mode);
      printMenu();
    },
    restorePrevMenu: () => {
      const prevState = menuHistory.pop();
      updateState(
        prevState.menuOptions,
        prevState.menuMode,
        prevState.currentMenuOptionIndex,
        prevState.menuIterator
      );
      printMenu();
    },
  };
};

module.exports = Menu;
