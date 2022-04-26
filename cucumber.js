const basePath = 'api';

/**
 * Support files (e.g. step-definitions, worlds, settings)
 **/
const support = ['support/**/*.js'];

/**
 * Reporting
 **/
const report = ['@cucumber/pretty-formatter', 'html:./api/test_results/html-formatter.html'];

/**
 * Formatting & display settings
 **/
const formatting = ['--publish-quiet'];

module.exports = {
  default: [
    ...support.map((w) => `--require ${basePath}/${w}`),
    ...report.map((r) => `--format ${r}`),
    ...formatting,
  ].join(' '),
};
