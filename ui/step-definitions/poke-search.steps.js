const { Given, When, Then } = require('@cucumber/cucumber');
const { relaunchApp } = require('../utils/web.helper');

const PokeSearchPage = require('../pages/poke-search.page');

const pokeSearchPage = new PokeSearchPage();

Given('I launch the poke search website', async () => {
  await relaunchApp();
});

When('I search using {string}', async (item) => {
  await pokeSearchPage.searchItem(item);
});

Then('An error message will be displayed reading {string}', async (errorMessage) => {
  await pokeSearchPage.shouldSeeErrorMessage(errorMessage);
});

Then('A list of valid results should be displayed', async () => {
  await pokeSearchPage.shouldSeeResults();
});

Then('I select a result', async () => {
  await pokeSearchPage.selectFirstResult();
});

Then('The user should be on the result page', async () => {
  await pokeSearchPage.shouldBeOnTheResultPage();
});

Then('The below information sections should be displayed', async (table) => {
  await pokeSearchPage.assertResultDetails(table);
});
