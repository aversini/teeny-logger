# Teeny Logger

[![npm version](https://badge.fury.io/js/teeny-logger.svg)](https://badge.fury.io/js/teeny-logger)
<a href="https://david-dm.org/aversini/teeny-logger"><img src="https://david-dm.org/aversini/teeny-logger.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/aversini/teeny-logger/?type=dev"><img src="https://david-dm.org/aversini/teeny-logger/dev-status.svg" alt="devDependency Status"></a> [![Build Status](https://travis-ci.com/aversini/teeny-logger.svg?branch=master)](https://travis-ci.com/aversini/teeny-logger) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/b93bc5e55c0c478aa3339f66ea69f078)](https://www.codacy.com/gh/aversini/teeny-logger/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=aversini/teeny-logger&amp;utm_campaign=Badge_Grade)

> Teeny Logger is a dead-simple console logger for nodejs command-line applications.

## Installation

```sh
> cd your-project
> npm install --save-dev teeny-logger
```

## Usage

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger();

log.info("this is an informational log");
log.warn("this is a warning log");
log.error("this is an error log");
```

## API

### Methods

Teeny Logger relies on `console` behind the scenes, and therefore supports the same [string substitution](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions) capabilities and uses the following methods:

| Method | Description                                               | Output color |
| ------ | --------------------------------------------------------- | ------------ |
| debug  | Outputs a message to the console with the log level debug | grey         |
| log    | For general output of logging information.                | white        |
| info   | Informative logging of information.                       | blue         |
| warn   | Outputs a message to the console with the log level debug | yellow       |
| error  | Outputs an error message.                                 | red          |

### Options

#### Disable logging

You can disable logging with `silent`:

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger();

log.info("this will be logged");
// disabling logs in production for example
log.silent = process.env.NODE_ENV === "production";
log.info("but this will not");
log.silent = false;
log.info("this will be logged again!");
```

This option can also be passed to the constructor:

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger({ silent: true });

log.info("this will not be logged");
log.silent = false;
log.info("this will be logged again!");
```

### Disabling colors

You can disable colors with `boring`:

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger();

log.info("this will be logged in the default [info] color");
// disabling colors in test mode for example
log.boring = process.env.NODE_ENV === "test";
log.info("but this will not have any colors :/");
log.boring = false;
log.info("colors are back!");
```

This option can also be passed to the constructor:

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger({ boring: true });

log.info("this will not be logged in color");
log.boring = false;
log.info("this will be logged again!");
```

### Adding a prefix

You can add a prefix to the logs with `prefix`:

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger();

log.info("this will be logged with no prefix");
log.prefix = "[INFO]";
log.info("this will have a prefix!");
```

The output of that last line would be:

```sh
> [INFO] this will have a prefix!
```

This option can also be passed to the constructor:

```js
const TeenyLogger = require("teeny-logger");
const log = new TeenyLogger({ prefix: "Log:" });

log.info("this will be logged with a prefix");
log.prefix = false;
log.info("this will be NOT be logged with a prefix");
```

## License

MIT © Arno Versini
