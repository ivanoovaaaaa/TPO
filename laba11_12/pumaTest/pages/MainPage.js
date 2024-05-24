const { By, until } = require('selenium-webdriver');
const Logger = require('../utils/Logger');

class MainPage {
  constructor(driver) {
    this.driver = driver;
    this.shoesCategoryLinkSelector = 'a[href="/c/15/shoes-women/?sitelink=topmenuW&l=3"]';
  }

  async open() {
    await this.driver.get('https://www.lamoda.by/');
    Logger.log('Открыта главная страница');
  }

  async goToShoesCategory() {
    await this.driver.wait(until.elementLocated(By.css(this.shoesCategoryLinkSelector)), 15000);
    const shoesLink = await this.driver.findElement(By.css(this.shoesCategoryLinkSelector));
    await shoesLink.click();
    Logger.log('Переход на страницу с обувью');
  }
}

module.exports = MainPage;
