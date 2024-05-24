const { By, until } = require('selenium-webdriver');
const Logger = require('../utils/Logger');

class MainPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.lamoda.by/';
    this.shoesCategoryLinkSelector = 'a[href="/c/15/shoes-women/?sitelink=topmenuW&l=3"]';
    this.closeNotificationButtonSelector = 'section._notifyForm_1x9k4_2._notifyBar_1h0rw_2 button';
    this.searchInputSelector = 'input._input_1su1z_19';
    this.searchButtonSelector = 'button._button_1su1z_11'; 
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
      Logger.log('Закрыто всплывающее уведомление');
    }
  }

  async searchForProduct(productName) {
    try {
      await this.driver.wait(until.elementLocated(By.css(this.searchButtonSelector)), 15000);
      const searchButton = await this.driver.findElement(By.css(this.searchButtonSelector));
      await searchButton.click(); // Нажимаем кнопку для активации поля поиска
      Logger.log('Кнопка поиска нажата для активации поля ввода');
      await this.driver.sleep(1000); 


      await this.driver.wait(until.elementLocated(By.css(this.searchInputSelector)), 15000);
      const searchInput = await this.driver.findElement(By.css(this.searchInputSelector));
      await searchInput.sendKeys(productName); // Вводим значение в текстовое поле поиска
      Logger.log(`Введено значение в поле поиска: ${productName}`);
      await this.driver.sleep(1000); 

      await searchButton.click(); // Нажимаем кнопку для выполнения поиска
      Logger.log('Нажата кнопка поиска для выполнения поиска');
      await this.driver.sleep(1000); 

    } catch (error) {
      Logger.error('Не удалось выполнить поиск: ' + error);
    }
  }
  async selectProductById(productId) {
    try {
      const productSelector = `div[id="${productId}"] a._root_f9xmk_2`;
      await this.driver.wait(until.elementLocated(By.css(productSelector)), 15000);
      const productLink = await this.driver.findElement(By.css(productSelector));
      await productLink.click();
      Logger.log(`Выбран товар с ID: ${productId}`);
    } catch (error) {
      Logger.error('Не удалось выбрать товар: ' + error);
    }
  }


  async goToShoesCategory() {
    await this.driver.wait(until.elementLocated(By.css(this.shoesCategoryLinkSelector)), 15000);
    const shoesLink = await this.driver.findElement(By.css(this.shoesCategoryLinkSelector));
    await shoesLink.click();
    Logger.log('Переход на страницу с обувью');
  }
}

module.exports = MainPage;
