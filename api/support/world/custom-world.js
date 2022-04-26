const { setDefaultTimeout, setWorldConstructor } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);

class CustomWorld {
  static response;
}

setWorldConstructor(CustomWorld);
