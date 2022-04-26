const BasePokeSearchScreen = require('../poke-search.screen');
const helper = require('../webHelper.screen');
const WebElement = require('../../enums/webElement.enum');

class PokeSearchScreen extends BasePokeSearchScreen {
  constructor() {
    super();
    this.searchBar = helper.byId(WebElement.INPUT, 'search_query');
    this.errorMessage = helper.byTestId(WebElement.P, 'no-results-message');
    this.invalidErrorMessage = helper.byTestId(WebElement.P, 'invalid-term-error');
    this.result = helper.byTestId2(WebElement.LI, 'result');
    this.container = helper.byClass(WebElement.DIV, 'nes-container');
    this.evolution = helper.byText(WebElement.H2, 'Evolution Chain');
  }
}

module.exports = PokeSearchScreen;
