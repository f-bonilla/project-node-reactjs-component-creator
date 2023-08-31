const colors = {
  black: "\x1b[30m%s\x1b[0m",
  red: "\x1b[31m%s\x1b[0m",
  green: "\x1b[32m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
  blue: "\x1b[34m%s\x1b[0m",
  magenta: "\x1b[35m%s\x1b[0m",
  cyan: "\x1b[36m%s\x1b[0m",
  white: "\x1b[37m%s\x1b[0m",
  brightBlack: "\x1b[90m%s\x1b[0m",
  brightRed: "\x1b[91m%s\x1b[0m",
  brightGreen: "\x1b[92m%s\x1b[0m",
  brightYellow: "\x1b[93m%s\x1b[0m",
  brightBlue: "\x1b[94m%s\x1b[0m",
  brightMagenta: "\x1b[95m%s\x1b[0m",
  brightCyan: "\x1b[96m%s\x1b[0m",
  brightWhite: "\x1b[97m%s\x1b[0m",
  disabled: "\x1b[2m\x1b[37m%s\x1b[0m",
};

const print = (msg, props = {}) => {
  props.color && colors[props.color]
    ? console.log(colors[props.color], msg)
    : console.log(msg);
};
const clear = () => console.clear();

module.exports = { print, clear };
