const path = require("path");
const fs = require("fs");
const constants = require("./constants");
const NavigationManager = require("./navigation-manager");
const ActionsManager = require("./actions-manager");
const {
  jsTemplate,
  testTemplate,
  cssTemplate,
} = require("./component-templates");

const AnswersManager = (answer) => {
  return new Promise((resolve, reject) => {
    if (answer.length === 0) reject(`\n Warning: You must write a name.`);
    const currentAction = ActionsManager.getCurrentAction();
    const currentPath = NavigationManager.getCurrentPath();
    if (currentAction === constants.ACTION_NEW_FOLDER) {
      const folderPath = path.join(currentPath, `${answer}`);
      if (fs.existsSync(folderPath)) {
        reject(`\n Warning: The directory "${answer}" already exists.`);
      } else {
        fs.mkdirSync(folderPath);
        resolve();
      }
    } else if (currentAction === constants.ACTION_NEW_FILE) {
      const jsFile = path.join(currentPath, `${answer}.js`);
      if (fs.existsSync(jsFile)) {
        reject(`\n Warning: The component "${answer}" already exists.`);
      } else {
        const testFile = path.join(currentPath, `${answer}.test.js`);
        const cssFile = path.join(currentPath, `${answer}.module.css`);
        fs.writeFileSync(
          jsFile,
          jsTemplate.replaceAll("{{COMPONENT_NAME}}", answer)
        );
        fs.writeFileSync(
          testFile,
          testTemplate.replaceAll("{{COMPONENT_NAME}}", answer)
        );
        fs.writeFileSync(
          cssFile,
          cssTemplate.replaceAll("{{COMPONENT_NAME}}", answer)
        );
        resolve();
      }
    }
  });
};

module.exports = AnswersManager;
