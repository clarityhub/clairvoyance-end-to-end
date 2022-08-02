const { expect } = require('chai');
const { clear, test } = require('../../browser');
const { wait } = require('../../utilities');

describe('Login', () => {
  afterEach(async () => {
    await clear();
  });

  it('can login', test(async (browser, opts) => {
    const page = await browser.newPage();
    await page.goto(`${opts.appUrl}/login`);
    await page.click('[name=email]');
    await page.type('idmontie@gmail.com')
    await page.click('[name=password]');
    await page.type('testing123');

    await page.click('[type=submit]');

    const DASHBOARD_SELECTOR = 'div > ul > li > button > span';
    await page.waitFor(DASHBOARD_SELECTOR, { timeout: 1000 });
    const innerText = await page.innerText(DASHBOARD_SELECTOR);

    expect(innerText).to.be.equal('Dashboard');
  }));

  it('incorrect password', test(async (browser, opts) => {
    const page = await browser.newPage();
    await page.goto(`${opts.appUrl}/login`);
    await page.click('[name=email]');
    await page.type('idmontie@gmail.com')
    await page.click('[name=password]');
    await page.type('testing12345');

    await page.click('[type=submit]');
    const ERROR_SELECTOR = 'form > [role=alert]';

    await page.waitFor(ERROR_SELECTOR, { timeout: 1000 });
    await wait(800);
    const innerText = await page.innerText(ERROR_SELECTOR);

    expect(innerText).to.be.equal('The email or password is not correct');
  }));
});
