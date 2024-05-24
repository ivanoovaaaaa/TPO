const { By, Key, until } = require('selenium-webdriver');

const Logger = require('../utils/Logger');

class CartPage {
  constructor(driver) {
    this.driver = driver;
  }
  async isProductInCart(productId) {
    try {
      // Ожидание появления элемента в корзине
      await this.driver.wait(until.elementLocated(By.xpath(`//div[@class='_root_e9e16_2 ui-checkout-cart__item']//div[@data-quick='${productId}']`)), 10000);
      Logger.log(`Товар с ID ${productId} найден в корзине`);
      return true;
    } catch (error) {
      Logger.error(`Товар с ID ${productId} не найден в корзине`);
      return false;
    }
  }
}

module.exports = CartPage;