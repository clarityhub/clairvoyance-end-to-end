const prefix = process.env.URL_PREFIX || '.dev';

module.exports = {
  appUrl: `https://app${prefix}.clarityhub.io`,
  websiteUrl: `https://www${prefix}.clarityhub.io`,

  puppeteer: {
    // headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};
