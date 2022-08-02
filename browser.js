const puppeteer = require('puppeteer');

class Browser {
  setUp(done) {
    const puppeteerOpts = this.options && this.options.puppeteer ?
      this.options.puppeteer :
      {};

    puppeteer.launch(puppeteerOpts).then(async b => {
      this.setBrowser(b);
      done();
    });
  }

  setBrowser(b) {
    const closure = this;
    this.browser = b;
    const oldNewPage = this.browser.newPage.bind(this.browser);

    this.browser.newPage = async function () {
      const page = await oldNewPage();
      this.lastPage = page;

      closure.decoratePage(page);

      return page;
    };
  }

  decoratePage(page) {
    page.innerText = async function (selector) {
      return await page.evaluate((sel) => {
        return document.querySelector(sel).innerText;
      }, selector);
    }
  }

  async clear() {
    const browser = this.browser;
    if (browser.lastPage) {
      await browser.lastPage.evaluate(() => {
        function deleteAllCookies() {
          var cookies = document.cookie.split(";");

          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        }
        sessionStorage.clear();
        localStorage.clear();
        deleteAllCookies();
      });
    }
  }

  setOptions(opts) {
    this.options = opts;
  }

  test(promise) {
    return (done) => {
      promise(this.browser, this.options)
        .then(() => done()).catch(done);
    };
  }
}

/*
 * Create a new browser and use a proxy to pass
 * any puppeteer calls to the inner browser
 */
module.exports = new Proxy(new Browser(), {
  get: function(target, name) {
    return name in target ? target[name].bind(target) : target.browser[name];
  }
});
