import puppeteer from "puppeteer";


class Browser {

    constructor() {
        this.page = null;
        this.browser = null;
        this.width = 1920;
        this.height = 1080;
    }

    async start() {
        this.browser = await puppeteer.launch({
            headless: true,
            args: [`--window-size=${this.width},${this.height}`, '--disable-dev-shm-usage']
          });
        this.page = await this.browser.newPage();

        const width = this.width;
        const height = this.height;
        await this.page.setViewport({ width, height });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async find  (selector)  {
        await this.page.waitForSelector(selector);
        return this.page.$(selector);
      }
      
    async findAll(selector)  {
        await this.page.waitForSelector(selector);
        return this.page.$$(selector);
    }

    async containsText(text, wrapperSelector) {
        const textSelector = `//text()[contains(.,'${text}')]`;
        const wrapper = wrapperSelector ? await find(wrapperSelector) : this.page;
      
        await this.page.waitForXPath(textSelector);
        const matches = await wrapper.$x(textSelector);
      
        return matches.length > 0;
    }
}



module.exports = Browser;