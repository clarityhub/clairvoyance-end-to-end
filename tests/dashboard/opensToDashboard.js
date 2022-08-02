const { expect } = require('chai');
const { clear, test } = require('../../browser');
const { login, wait } = require('../../utilities');

describe('Dashboard', () => {
  let page;

  before(test(async (browser, opts) => {
    page = await browser.newPage();
    await login(page, opts);
  }));

  after(async () => {
    await clear();
  });

  it('opens the chats tab', test(async (browser, opts) => {
    const DASHBOARD_SELECTOR = 'h2';
    await page.waitFor(DASHBOARD_SELECTOR, { timeout: 1000 });
    const innerText = await page.innerText(DASHBOARD_SELECTOR);

    expect(innerText).to.be.equal('Dashboard');
  }));
});