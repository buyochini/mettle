const Screen = require('./screen');

class PokeSearchScreen extends Screen {
  constructor() {
    super();
    this.searchBar = undefined;
    this.errorMessage = undefined;
    this.invalidErrorMessage = undefined;
    this.result = undefined;
    this.container = undefined;
    this.evolution = undefined;
  }
}

module.exports = PokeSearchScreen;
