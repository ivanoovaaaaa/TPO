const { By, until } = require('selenium-webdriver');

class MainPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.lamoda.by/';
    this.shoesCategoryLinkSelector = 'a[href="/c/15/shoes-women/?sitelink=topmenuW&l=3"]';
    this.closeNotificationButtonSelector = 'section._notifyForm_1x9k4_2._notifyBar_1h0rw_2 button';
  }

  async open() {
    await this.driver.get(this.url);
    await this.closeNotification();
  }

  async closeNotification() {
    const notificationElements = await this.driver.findElements(By.css(this.closeNotificationButtonSelector));
    if (notificationElements.length > 0) {
      const closeNotificationButton = await this.driver.findElement(By.css(this.closeNotificationButtonSelector));
      await closeNotificationButton.click();
      console.log('Закрыто всплывающее уведомление');
    }
  }

  async goToShoesCategory() {
    await this.driver.wait(until.elementLocated(By.css(this.shoesCategoryLinkSelector)), 15000);
    const shoesLink = await this.driver.findElement(By.css(this.shoesCategoryLinkSelector));
    await shoesLink.click();
  }
}


module.exports = MainPage;
