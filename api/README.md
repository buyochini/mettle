# PactumJS

PactumJS is a next generation free and open-source REST API automation testing tool for all levels in a Test Pyramid. 
It makes backend testing a productive and enjoyable experience. 
This library provides all the necessary ingredients for the most common things to write better API automation tests in an easy, fast & fun way.


## Adding a new feature

- Add a new feature in `api/features e.g. product.feature`
- Add the step definition in `api/support/steps e.g. product.steps.ts`
- Make a call to the HTTP method from `api/utils/runService.ts`
- Define the url path in `api/utils/urlUtil.ts`
- To get the response, `getSpec()` has been defined in `api/utils/service.ts`

  it can be retrieved using `request.getSpec()._response.body` 
- Custom world (`api/support/world/custom-world.ts`) contains all the cucumber pre-hooks and post-hooks.

## Running a Test

- Install the dependencies in `package.json`
```sh
yarn install
 ```

- Tests can be executed using 
```shell
yarn test:api
``` 

or

- Tests can be executed using tags (only one scenario has a tag)
```shell
yarn test:api:tags
``` 

or

- To run individual features and scenarios from the feature file
    - Goto edit configuration
    - Select edit configuration templates
    - select cucumber
    - Run the feature or scenario using the play icon in the feature file
  
Cucumber HTML report is generated in the `api/test_results` folder


## Integration Testing
Find out the endpoint from the UI. Familiarise yourself with the endpoint using an application such as Postman.
- Build a small automated framework, writing 3 tests for these endpoints based on the functional requirements given by the product owner, including a test for the error handling if the search term is invalid.
- What other things might you be concerned with testing for this API? Are there any bugs/issues you noticed?

An API is essentially a contract between the client and the server or between two applications.
Before any implementation test can begin, it is important to make sure that the contract is correct.
That can be done first by inspecting the spec (or the service contract itself, for example a Swagger
interface or OpenAPI reference) and making sure that endpoints are correctly named, that resources and their
types correctly reflect the object model, that there is no missing functionality or duplicate functionality,
and that relationships between resources are reflected in the API  correctly.

The test scenarios are usually dependant on the requirement from the business.
If there are no requirements, we can ensure that we are getting the standard HTTP response code. The response body
content can also be validated. The url path can also be validated to ensure that it accepts the correct query param
and headers if needed. Verify correct application state and verify basic performance sanity.

Our test cases fall into the following general test scenario groups:

- Basic positive tests (happy paths)
- Extended positive testing with optional parameters
- Negative testing with valid input
- Negative testing with invalid input
- Destructive testing
- Security, authorization, and permission tests (which are out of the scope of this post)

Bugs
- Error message is not returned for the invalid scenarios
- The search value seems to only search correctly with lowercase values  
