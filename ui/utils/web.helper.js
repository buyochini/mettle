async function relaunchApp() {
  try {
    await browser.url(browser.options.baseUrl);
  } catch (err) {
    throw new Error(err.stack);
  }
}

module.exports = {
  relaunchApp,
};
