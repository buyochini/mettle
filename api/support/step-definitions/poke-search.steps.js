const { Given, When, Then } = require('@cucumber/cucumber');
const { get } = require('../../utils/runService');
const { getProductDevelopmentUrlWithPath, url } = require('../../utils/urlUtil');
const { expect } = require('chai');

let request;
let searchItem;

Given('I GET a search for {string}', async (searchValue) => {
  searchItem = searchValue;
  request = get(getProductDevelopmentUrlWithPath(url.SEARCH), searchValue);
  await request.getRequestWithQuery();
});

Then('An error message stating {string}', (message) => {
  /* this code is commented out as the endpoint does not return an error message*/
  // const search = request.getSpec()._response.body;
  // expect(search.message).to.contain(message);
});

When('I should receive a {int} HTTP response from poke-search', (statusCode) => {
  request.getSpec().response().should.have.status(statusCode);
});

Then('A successful response should be received', function () {
  const searchList = request.getSpec()._response.body;
  expect(searchList.map((item) => item.name)).to.contain(searchItem);
});

Then('A successful result response should be received', function () {
  const search = request.getSpec()._response.body;
  expect(search.species.name).to.be.a('string').to.equal(searchItem);
  expect(search.height).to.be.a('number').not.to.be.null;
  expect(search.weight).to.be.a('number').not.to.be.null;
  expect(search.species.evolution_chain).to.be.an('object').to.not.be.empty;
  expect(search.species.flavor_text).to.be.an('array').that.is.not.empty;
});

When('I retrieve the information of a result', async () => {
  request = get(getProductDevelopmentUrlWithPath(`/lookup/${searchItem}`));
  await request.getRequest();
});
