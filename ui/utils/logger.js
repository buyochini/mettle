/* eslint-disable no-console */

const LOG = require('log4js');
const util = require('util');
const { pid } = process;

// Logger configuration
LOG.configure({
  appenders: {
    fileLog: {
      type: 'file',
      filename: 'ui/logs/html-reporter.log',
      maxLogSize: 5000000,
      level: 'debug',
    },
    debugLog: {
      type: 'file',
      filename: 'ui/logs/debug-html-reporter.log',
      maxLogSize: 5000000,
      level: 'debug',
    },
    out: {
      type: 'stdout',
      layout: {
        type: 'colored',
      },
    },
    filterOut: {
      type: 'stdout',
      layout: {
        type: 'colored',
      },
      level: 'info',
    },
  },
  categories: {
    file: { appenders: ['fileLog'], level: 'info' },
    default: { appenders: ['out', 'fileLog'], level: 'info' },
    console: { appenders: ['out'], level: 'info' },
    debug: { appenders: ['debugLog'], level: 'debug' },
  },
});

// Create the logger
let logger = LOG.getLogger('default');

console.debug = (...params) => logger.debug(util.format.apply(null, params));
console.info = (...params) => logger.info(util.format.apply(null, params));
console.log = (...params) => logger.info(util.format.apply(null, params));
console.warn = (...params) => logger.warn(util.format.apply(null, params));
console.error = (...params) => logger.error(util.format.apply(null, params));

logger.info('Initialized logger', {
  pid,
  channel: process.channel !== undefined,
  argv1: process.argv[1],
});

module.exports = logger;
