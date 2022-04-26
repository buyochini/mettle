class WebHelper {
  static byText(webElement, text) {
    return `//${webElement.element}[text()="${text}"]`;
  }

  static byId(webElement, id) {
    return `//${webElement.element}[@id='${id}']`;
  }

  static byTestId(webElement, id) {
    return `//${webElement.element}[@data-testid='${id}']`;
  }

  static byTestId2(webElement, id) {
    return `//${webElement.element}[@data-test-id='${id}']`;
  }

  static byClass(webElement, id) {
    return `//${webElement.element}[@class='${id}']`;
  }
}

module.exports = WebHelper;
