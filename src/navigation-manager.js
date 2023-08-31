const path = require("path");

const NavigationManager = (() => {
  let rootPath = "";
  let currentPath = "";
  const prevFolder = () => {
    const folders = currentPath.split(path.sep);
    folders.pop();
    const result = folders.join(path.sep);
    return result;
  };
  return {
    init: (basePath) => {
      rootPath = basePath;
      currentPath = rootPath;
    },
    buildPath: (directory) => {
      currentPath =
        directory === ".." ? prevFolder() : path.join(currentPath, directory);
      return currentPath;
    },
    getCurrentPath: () => currentPath,
    isRootPath: () => rootPath === currentPath,
  };
})();

module.exports = NavigationManager;
