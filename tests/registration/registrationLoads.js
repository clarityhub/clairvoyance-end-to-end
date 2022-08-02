const { expect } = require('chai');
const { test } = require('../../browser');
const { wait } = require('../../utilities');

describe('Registration', () => {
  it('loads the registration script', test(async (browser, opts) => {
    const page = await browser.newPage();
    await page.goto(`${opts.websiteUrl}/register`);
    
    const REGISTRATION_SELECTOR = '.registration .user-info h2';
    await page.waitFor(REGISTRATION_SELECTOR, { timeout: 1000 });
    const innerText = await page.innerText(REGISTRATION_SELECTOR);
    
    expect(innerText).to.be.equal('Get Started');
  }));
});
