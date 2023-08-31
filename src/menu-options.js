const fs = require("fs");
const path = require("path");
const constants = require("./constants");
const NavigationManager = require("./navigation-manager");

const COLOR_HEADER = "cyan";
const COLOR_HEADER_PATH = "brightBlue";
const COLOR_FOLDER = "white";
const COLOR_FILE = "disabled";
const COLOR_ACTION = "green";
const COLOR_QUESTION = "yellow";

const headerOptions = [
  {
    type: constants.OPTION_HEADER,
    name: "-----------------------------",
    color: COLOR_HEADER,
  },
  {
    type: constants.OPTION_HEADER,
    name: "Build react component - v.1",
    color: COLOR_HEADER,
  },
  {
    type: constants.OPTION_HEADER,
    name: "-----------------------------",
    color: COLOR_HEADER,
  },
  {
    type: constants.OPTION_HEADER,
    path: true,
    name: "setting in getHeader()",
    color: COLOR_HEADER_PATH,
  },
  {
    type: constants.OPTION_HEADER,
    name: " ",
    color: COLOR_HEADER,
  },
];

function getDirectories(currentPath) {
  let normalizedPath = currentPath.split(path.sep).join(path.sep);
  const directories = fs
    .readdirSync(normalizedPath)
    .filter((file) =>
      fs.statSync(path.join(normalizedPath, file)).isDirectory()
    )
    .map((option) => ({
      type: constants.OPTION_FOLDER,
      name: option,
      color: COLOR_FOLDER,
    }));
  if (!NavigationManager.isRootPath()) {
    directories.unshift({
      type: constants.OPTION_FOLDER,
      name: "..",
      color: COLOR_FOLDER,
    });
  }
  return directories;
}

function getFiles(currentPath) {
  return fs
    .readdirSync(currentPath)
    .filter((file) => {
      return (
        fs.statSync(path.join(currentPath, file)).isFile() &&
        (file.endsWith(".js") || file.endsWith(".module.css"))
      );
    })
    .map((option) => ({
      type: constants.OPTION_FILE,
      name: option,
      color: COLOR_FILE,
    }));
}

const userActions = [
  {
    type: constants.OPTION_ACTION,
    subtype: constants.ACTION_NEW_FOLDER,
    name: "new folder",
    color: COLOR_ACTION,
  },
  {
    type: constants.OPTION_ACTION,
    subtype: constants.ACTION_NEW_FILE,
    name: "new component",
    color: COLOR_ACTION,
  },
];

const getHeader = () => {
  return [...headerOptions].map((option) => {
    if (option.path) {
      return {
        ...option,
        name: "." + path.sep + NavigationManager.getCurrentPath(),
      };
    }
    return option;
  });
};

function MenuOptions() {
  return {
    getByPath: (path) => {
      const header = getHeader();
      return header
        .concat(getDirectories(path))
        .concat(getFiles(path))
        .concat(userActions);
    },
    getByQuestion: (question) => {
      const header = getHeader();
      return [
        ...header,
        {
          type: constants.OPTION_QUESTION,
          name: question,
          color: COLOR_QUESTION,
        },
        {
          type: constants.OPTION_QUESTION,
          name: "",
          color: COLOR_QUESTION,
        },
      ];
    },
  };
}

module.exports = MenuOptions();
