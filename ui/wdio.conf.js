const allure = require('allure-commandline');
const logger = require('../ui/utils/logger');

exports.config = {
  /**
     Set a base URL in order to shorten url command calls. If your `url` parameter starts
     with `/`, the base url gets prepended, not including the path portion of your baseUrl.
     If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
     gets prepended directly. */
  baseUrl: 'https://pokesearch-client.herokuapp.com/',
  /**
   * specify test files
   */
  specs: [__dirname + '/features/*.feature'],

  /**
   * capabilities
   */
  capabilities: [
    {
      browserName: 'chrome',
    },
  ],

  /**
   * test configurations
   */
  logLevel: 'error',
  framework: 'cucumber',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: __dirname + '/reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
        addConsoleLogs: true,
      },
    ],
  ],

  cucumberOpts: {
    require: [__dirname + '/step-definitions/*.js'],
  },

  waitforTimeout: 60000,
  /*
     Default timeout in milliseconds for request
     if Selenium Grid doesn't send response.js */
  connectionRetryTimeout: 160000,
  /*
     Default request retries count */
  connectionRetryCount: 3,

  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  before: function (capabilities, specs, browser) {
    try {
      const chai = require('chai');
      global.expect = chai.expect;
      global.assert = chai.assert;
      global.should = chai.should();
    } catch (err) {
      throw new Error(err.stack);
    }
  },

  onComplete: function () {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure([
      'generate',
      'ui/reports/allure-results',
      '--clean',
      '-o',
      'ui/reports/allure-report',
    ]);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        logger.info('Allure report successfully generated');
        resolve();
      });
    });
  },
};
