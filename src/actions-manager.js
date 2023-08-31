const constants = require("./constants");
const NavigationManager = require("./navigation-manager");
const MenuOptions = require("./menu-options");

const ActionsManager = ((option) => {
  const MENU_MODE = constants.MENU_MODE;
  let currentAction = null;

  return {
    action: (option) => {
      let options = [];
      let menuMode = MENU_MODE.NAVIGATE;
      if (option.type === constants.OPTION_FOLDER) {
        const currentPath = NavigationManager.buildPath(option.name);
        options = MenuOptions.getByPath(currentPath);
      } else if (option.type === constants.OPTION_ACTION) {
        const question =
          option.subtype === constants.ACTION_NEW_FOLDER
            ? "Enter a valid directory name (Ctrl + C to return):"
            : "Enter a component name (Ctrl + C to return):";
        options = MenuOptions.getByQuestion(question);
        menuMode = MENU_MODE.QUESTION;
      }
      currentAction = option.subtype;
      return {
        actionType: currentAction,
        menuMode: menuMode,
        options: options,
      };
    },
    getCurrentAction: () => currentAction,
  };
})();

module.exports = ActionsManager;
