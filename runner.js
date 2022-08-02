const path = require('path');
const slug = require('slug')
const browser = require('./browser');
const options = require('./options');

before((done) => {
  browser.setOptions(options);
  browser.setUp(done);
});

after(() => {
  browser.close();
});

afterEach(async function () {
  if (this.currentTest.state === 'failed' && browser.lastPage) {
    const suite = slug(this.currentTest.parent.title, { lower: true });
    const test = slug(this.currentTest.title, { lower: true });

    await browser.lastPage.screenshot({
      path: path.resolve(
        path.join(
          __dirname,
          'artifacts',
          `${suite}--${test}--fail.png`
        )
      ),
    });
  }
});
