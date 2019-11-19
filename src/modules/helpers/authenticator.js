// helpers/authenticator.js
const dotenv = require('dotenv')
const result = dotenv.config({path: '.env.test.local'})

if (result.error) {
  throw result.error
}

console.log("dotenv:", result.parsed)


class Authenticator {

    constructor(page) {
      this.properties()
      this.page = page
    }
  
    properties() {
      this.admin = {
        email: 'julien.pilla@chartes.psl.eu',
        password: `${process.env.VUE_APP_PASSWORD}`
      }
    }
  
    async connect(person) {
      await this.logout()
      await this.page.goto(`${process.env.VUE_APP_APP_URL}/login`, { timeout: 0 })
      //await this.page.waitForSelector('form');
      await Promise.all([
        this.page.waitForSelector('form'),
        this.page.type('input[name="password"]', person.password),
        this.page.type('input[name="email"]', person.email),
        this.page.click('[name="login-btn"]'),
      ])
      
    }
  
    async logout() {
      await this.page.deleteCookie(...await this.page.cookies(`${process.env.VUE_APP_APP_URL}/login`));
    }
  
  }
  
  module.exports = Authenticator