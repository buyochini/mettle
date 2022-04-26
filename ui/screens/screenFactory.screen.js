const fs = require('fs');
const path = require('path');

class ScreenFactoryScreen {
  static getWebScreen(name) {
    return ScreenFactoryScreen.createScreen([`./web/${name}.js`]);
  }

  static createScreen(paths) {
    for (const p of paths) {
      if (fs.existsSync(path.join(__dirname, p))) {
        const Screen = require(p);
        return new Screen();
      }
    }
    throw new Error(`Screen ${paths.join(' or ')} not found!`);
  }
}

module.exports = ScreenFactoryScreen;
