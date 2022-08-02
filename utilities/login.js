module.exports = async (page, opts) => {
  await page.goto(`${opts.appUrl}/login`);
  await page.click('[name=email]');
  await page.type('idmontie@gmail.com')
  await page.click('[name=password]');
  await page.type('testing123');

  await page.click('[type=submit]');

  const DASHBOARD_SELECTOR = 'div > ul > li > button > span';
  await page.waitFor(DASHBOARD_SELECTOR, { timeout: 1000 });

  return true;
};
