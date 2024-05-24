const BrowserManager = require('../utils/BrowserManager');
const Logger = require('../utils/Logger');
const MainPage = require('../pages/MainPage');
const CardPage = require('../pages/CardPage');
const CartPage = require('../pages/CartPage');

async function runTest() {
  const driver = await BrowserManager.createDriver();
  const mainPage = new MainPage(driver);
  const cardPage = new CardPage(driver);
  const cartPage = new CartPage(driver);

  try {
    // Переход на главную страницу
    await mainPage.open();

    // Поиск товара "Футболка"
    await mainPage.searchForProduct('Футболка');

    // Выбор товара с указанным ID
    await mainPage.selectProductById('MP002XW0PJMN');

    // Выбор размера 42 RUS (XS)
    await cardPage.selectProductSize('42 RUS');

    await cardPage.addToCart();

    await cardPage.goToCart();

    await cartPage.isProductInCart('MP002XW0PJMN');

  } catch (error) {
    Logger.error('Ошибка во время выполнения теста:', error);
  } finally {
    await BrowserManager.quitDriver(driver);
  }
}

runTest();
