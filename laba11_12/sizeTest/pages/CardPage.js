const { By, until } = require('selenium-webdriver');
const Logger = require('../utils/Logger');

class CardPage {
  constructor(driver) {
    this.driver = driver;
    this.cartPageLinkSelector = 'a[href="/checkout/cart/"]';
  }

  async selectProductSize(size) {
    try {
      // Ожидание появления выпадающего меню выбора размера
      await this.driver.wait(until.elementLocated(By.css('div._selectWrapper_8karg_10')), 10000);
      const sizeDropdown = await this.driver.findElement(By.css('div._selectWrapper_8karg_10'));
      await sizeDropdown.click();
      Logger.log('Открыто выпадающее меню выбора размера');

      const sizeOptionSelector = `div._colspan_8karg_150.ui-product-page-sizes-chooser-item div._firstRow_8karg_194`;
      await this.driver.wait(until.elementLocated(By.css(sizeOptionSelector)), 10000);

      const sizeOptions = await this.driver.findElements(By.css(sizeOptionSelector));
      for (let option of sizeOptions) {
        const text = await option.getText();
        if (text.includes(size)) {
          await option.click();
          Logger.log(`Выбран размер: ${size}`);
          return;
        }
      }
      throw new Error(`Размер ${size} не найден`);
    } catch (error) {
      Logger.error('Не удалось выбрать размер: ' + error);
    }
  }

  async addToCart() {
    try {
      // Находим кнопку "Добавить в корзину" по классу
      const addToCartButton = await this.driver.findElement(By.css('button._cartButton_lrjtr_11'));

      // Кликаем на кнопку
      await addToCartButton.click();

      Logger.log('Нажата кнопка "Добавить в корзину"');
    } catch (error) {
      Logger.error('Ошибка при нажатии на кнопку "Добавить в корзину":', error);
    }
  }

  async goToCart() {
  
    await this.driver.wait(until.elementLocated(By.css(this.cartPageLinkSelector)), 15000);
    const cartLink = await this.driver.findElement(By.css(this.cartPageLinkSelector));
    await cartLink.click();
    Logger.log("Переход в корзину");
  }

}

module.exports = CardPage;
