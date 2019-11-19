// environment.js

const PuppeteerEnvironment = require('jest-environment-puppeteer')
const Authenticator = require('./authenticator')

class CustomEnvironment extends PuppeteerEnvironment {

  async setup() {
    await super.setup()

    const authenticator = new Authenticator(this.global.page)
    await authenticator.connect(authenticator.admin)
  }

}

module.exports = CustomEnvironment