const constants = require("./constants");

const MenuIterator = (options) => {
  const getValidIndex = (index) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }
    return newIndex;
  };

  let menuOptions = options;
  menuOptions[Symbol.iterator] = function () {
    return {
      next: function (direction, currentOptionIndex) {
        let newIndex = currentOptionIndex;
        newIndex = getValidIndex(newIndex + direction);
        let found = false;
        while (!found) {
          if (
            menuOptions[newIndex].type === constants.OPTION_FOLDER ||
            menuOptions[newIndex].type === constants.OPTION_ACTION
          ) {
            found = true;
          } else {
            newIndex = getValidIndex(newIndex + direction);
          }
        }
        return { value: newIndex, done: true };
      },
    };
  };
  const iterator = menuOptions[Symbol.iterator]();
  return iterator;
};

module.exports = MenuIterator;
