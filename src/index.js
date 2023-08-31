const fs = require("fs");
const Menu = require("./menu");
const MenuOptions = require("./menu-options");
const NavigationManager = require("./navigation-manager");
const ActionsManager = require("./actions-manager");
const AnswersManager = require("./answers-manager");

// Since the name of the working directory can be typed or selected with the
// TAB key when running the program, it is necessary to remove the ".\/"
// characters from both the beginning and the end of the string.
const rootPath = (process.argv[2] || "").replace(
  /^(\.\/|\.\\|\/|\\)|(\/|\\)$/g,
  ""
);
if (!fs.existsSync(rootPath)) {
  return console.log(
    `\n > ERROR: The "${rootPath}" directory does not exist.\n`
  );
}

// hide terminal cursor
process.stdout.write("\x1B[?25l");

NavigationManager.init(rootPath);

const menuOptionSelectedHandler = (selectedOption) => {
  const { options, menuMode } = ActionsManager.action(selectedOption);
  menu.update(options, menuMode);
};

// The user has typed a directory or component name.
const userAnswerHandler = (answer) => {
  if (!answer.complete) {
    menu.restorePrevMenu();
  } else {
    AnswersManager(answer.value)
      .then(() =>
        menu.update(MenuOptions.getByPath(NavigationManager.getCurrentPath()))
      )
      .catch((err) => console.log(err));
  }
};

let menu = Menu(
  MenuOptions.getByPath(rootPath),
  menuOptionSelectedHandler,
  userAnswerHandler
);
