const { By, until } = require('selenium-webdriver');

class MainPage {
  constructor(driver) {
    this.driver = driver;
    this.shoesCategoryLinkSelector = 'a[href="/c/15/shoes-women/?sitelink=topmenuW&l=3"]';
  }

  async open() {
    await this.driver.get('https://www.lamoda.by/');
  }

  async goToShoesCategory() {
    await this.driver.wait(until.elementLocated(By.css(this.shoesCategoryLinkSelector)), 15000);
    const shoesLink = await this.driver.findElement(By.css(this.shoesCategoryLinkSelector));
    await shoesLink.click();
  }
}

module.exports = MainPage;
