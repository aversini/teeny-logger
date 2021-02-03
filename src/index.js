/* eslint-disable no-console */
const kleur = require("kleur");
const util = require("util");
const TYPES = [
  {
    method: "debug",
    color: kleur.grey,
  },
  {
    method: "log",
    color: kleur.white,
  },
  {
    method: "info",
    color: kleur.blue,
  },
  {
    method: "warn",
    color: kleur.yellow,
  },
  {
    method: "error",
    color: kleur.red,
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
    kleur.enabled = !boring;
    this.globalPrefix = typeof prefix === "string" ? prefix : "";
    this.timestamp = timestamp;
    this.printOptions = {
      colors: !boring,
      depth: 5,
      compact: false,
    };
  }

  set silent(flag) {
    this.shouldLog = !flag;
  }

  set boring(flag) {
    kleur.enabled = !flag;
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
            `${kleur.grey(
              `[ ${now.toDateString()} ${now.toLocaleTimeString()} ]`
            )}`
          );
        }

        msg = util.formatWithOptions(
          this.printOptions,
          prefix.join(" "),
          ...args
        );
      }
      console[type.method](`${type.color(msg)}`);
    }
  };
});

module.exports = Logger;
