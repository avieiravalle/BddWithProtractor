const { Given, When, Then } = require('cucumber')
const expect = require('chai').use(require('chai-as-promised')).expect
const Page = require('../../pageobjetcs/PgOb');
const page = new Page()
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

Given('Im on the page',  {timeout: 50 * 1000}, async function () {
    await browser.get('https://www.google.com/');
});

When('I fill in the text field with {string}',{timeout: 50 * 1000}, async function (name) {    
   browser.sleep(3000);
    await page.inputSearch.sendKeys(name);
});

Then('I click and my search return something about this {string} was successfully validated', {timeout: 50 * 1000}, async function (name) {
    browser.sleep(3000);
    await page.inputSearch.submit();
    browser.sleep(3000);
    expect(page.inputSearch.getText()).to.eventually.equal("")

});