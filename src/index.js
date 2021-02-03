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
  constructor({ boring = false, silent = false, prefix = null } = {}) {
    this.shouldLog = !silent;
    kleur.enabled = !boring;
    this.globalPrefix = prefix;
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
    this.globalPrefix = prefix;
  }
}

TYPES.forEach((type) => {
  Logger.prototype[type.method] = function (...args) {
    if (this.shouldLog) {
      const msg = this.globalPrefix
        ? util.formatWithOptions(this.printOptions, this.globalPrefix, ...args)
        : util.formatWithOptions(this.printOptions, ...args);

      console[type.method](`${type.color(msg)}`);
    }
  };
});

module.exports = Logger;
