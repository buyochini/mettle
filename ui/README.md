# Mettle Automation

A complete test automation framework, built using Gherkin BDD framework and WebdriverIO as the
utility library.

## Framework

It a Javascript-based test automation framework that is developed in 2022. It is a BDD framework
consisting of the following packages:

- **[Cucumber-js](https://cucumber.io/docs/installation/javascript/)** (for writing test plans in
  BDD format)
- **Node** (Dependency Management)
- **[WebdriverIO](https://webdriver.io/docs/api)** (to automate UI)

## Install

- Install yarn
  ```sh
  brew install yarn
  which yarn
  yarn -v
  ```

## Getting Started

- Install the dependencies in `package.json`
  ```sh
  yarn install
  ```

- Check web capabilities in `./src/wdio_config.js`

- Execute `test:cucumber` to run cucumber tests

## Writing new tests for UI

1. Add a new .feature file for the story you are testing in the correct subfolder of
   `src/features`.

2. Name the feature (using `Feature:`) and add some Scenarios to your new .feature file.

3. Add step definitions for any undefined steps in `src/step_definitions`

    * The step definitions should follow the same convention as the existing step definitions, i.e.
        * Create the relevant Page object, eg. `const loginPage = new LoginPage();`.
        * Perform an action on that Page, eg. `loginPage.login();`
    * Reuse existing pages as much as possible.

4. Add any undefined page objects and their actions in `src/pages/`

    * The page objects should follow the same convention as the existing page objects, i.e.
        * They should define a `get xyzScreen()` method which is used to provide the locators, e.g.
          `get loginScreen() { return this.getScreen('login.screen'); }`
        * The actions should perform events (e.g., Click, Wait, Scroll) on Screen elements, e.g.
          `Page.click(this.loginScreen.continueButton());`
    * Reuse existing screens as much as possible.

5. Add any undefined native screens and their elements in the correct subfolder of
   `src/screens/`.

6. Add the platform specific screens:

    * For WEB and Mobile WEBVIEW:
        * The screens should be in `src/screens/web`

## Technologies

The following technologies form the core of the framework:

* WebdriverIO `http://webdriver.io/` - 'WebDriver bindings for Node.js'. Provides a test runner and
  an interface to Appium and Cucumber.
* Cucumber `https://cucumber.io/` - 'Cucumber executes your .feature files, and those files contain
  executable specifications written in a language called Gherkin.'

## Code structure

                                   
        +-------------------+                                      +-------------------+
        |                   |                                      |                   |
        |  ./wdio_config    |                                      |  ./features       |
        |                   |                                      |                   |
        +---------+---------+                                      +---------^---------+
                  ^                                                          |
                  |                   +---------v---------+        +---------+---------+
                  |                   |                   |        |                   |
                  +-------------------+  WebdriverIO      +-------->  Cucumber         |
                                      |                   |        |                   |
                                      +---------+---------+        +-------------------+
                                                |
                                      +---------v---------+
                                      |                   |
                                      |selenium-standalone|
                                      |                   |
                                      +-------------------+

Arrows are roughly the direction of function calls. The entry point is `./wdio_config.js`, which delegate 
to WDIO (WebdriverIO) fairly quickly. WDIO retrieves yet more configuration from `./wdio_config` and is
responsible for actually running the cucumber tests.

## Runner

The main job of the runner is to convert high-level command line arguments into the specific wdio
configuration which describes which tests we want to run. It is also responsible for:

* Initialising reporting before calling WDIO.

## Reporting

Allure HTML report is generated in the `ui/reports/allure-report/index.html`

## Running on the pipeline

This framework is build in such a way that its independent and can be setup on an CI pipeline.
There are various technologies used for running CI. Either Jenkins or CircleCI can be a good candidate to use for CI.
If we want to follow a shift left approach, we would want to run the tests as soon as we have a deployment into 
the preferred environment. A stage would be setup to execute this tests. e.g. we can have a post deployment 
step create on circleCI that would run the script `test:cucumber`. If there are any failures, the deployment 
would be rolled back to the previous commit.
Another approach would be to run the tests separate from the code deployment and would not cause the build to
rollback on failure. This would be a separate task to analyse the report and report and fix issues that might
come out due to regression, in correct implementation or any other issues.
We could also run this outside code deployment and run a parallel pipeline manually or triggered by the code deployment.
Using circleCI, we create .circleci/config.yml file import the desire orbs, create the job/workflow, 
import necessary environment variable and setup and approval process that might be required.
Using Jenkins, we can create the framework using groovy scripts or use the Jenkins interface to create the job/workflow.
Depending on the size of test suite, we might want to have separate jobs that run a sub set daily and the larger pack
at night or weekends.