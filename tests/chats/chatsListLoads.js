const { expect } = require('chai');
const { clear, test } = require('../../browser');
const { login, wait } = require('../../utilities');

describe('Chat List', () => {
  let page;

  before(test(async (browser, opts) => {
    page = await browser.newPage();
    await login(page, opts);
  }));

  after(async () => {
    await clear();
  });

  it('opens the chats tab', test(async (browser, opts) => {
    await page.click('div > ul:nth-child(2) > li:nth-child(2) > button');

    const CHAT_SELECTOR = 'h2';
    await page.waitFor(CHAT_SELECTOR, { timeout: 1000 });
    const innerText = await page.innerText(CHAT_SELECTOR);

    expect(innerText).to.be.equal('Chat');
  }));
});