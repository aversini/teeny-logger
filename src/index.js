/* eslint-disable no-console */
const kleur = require("kleur");
const util = require("util");
const TYPES = [
  {
    color: kleur.grey,
    method: "debug",
  },
  {
    color: kleur.white,
    method: "log",
  },
  {
    color: kleur.blue,
    method: "info",
  },
  {
    color: kleur.yellow,
    method: "warn",
  },
  {
    color: kleur.red,
    method: "error",
  },
];

class Logger {
  constructor({
    boring = false,
    silent = false,
    prefix = "",
    timestamp = false,
  } = {}) {
    this.shouldLog = !silent;
    this.globalPrefix = typeof prefix === "string" ? prefix : "";
    this.timestamp = timestamp;
    this.printOptions = {
      colors: !boring,
      compact: false,
      depth: 5,
    };
  }

  set silent(flag) {
    this.shouldLog = !flag;
  }

  set boring(flag) {
    this.printOptions.colors = !flag;
  }

  set prefix(prefix) {
    this.globalPrefix = typeof prefix === "string" ? prefix : "";
  }

  set timestamp(flag) {
    this.showTimestamp = flag;
  }
}

TYPES.forEach((type) => {
  Logger.prototype[type.method] = function (...args) {
    if (this.shouldLog) {
      let msg;
      if (!this.showTimestamp && !this.globalPrefix) {
        msg = util.formatWithOptions(this.printOptions, ...args);
      } else {
        const prefix = this.globalPrefix ? [this.globalPrefix] : [];
        if (this.showTimestamp) {
          const now = new Date();
          prefix.push(
            this.printOptions.colors
              ? `${kleur.grey(
                  `[ ${now.toDateString()} ${now.toLocaleTimeString()} ]`
                )}`
              : `[ ${now.toDateString()} ${now.toLocaleTimeString()} ]`
          );
        }

        msg = util.formatWithOptions(
          this.printOptions,
          prefix.join(" "),
          ...args
        );
      }
      console[type.method](
        this.printOptions.colors ? `${type.color(msg)}` : msg
      );
    }
  };
});

module.exports = Logger;
