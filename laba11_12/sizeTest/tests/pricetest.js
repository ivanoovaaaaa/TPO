const BrowserManager = require('../utils/BrowserManager');
const Logger = require('../utils/Logger');
const MainPage = require('../pages/MainPage');
const ShoesPage = require('../pages/ShoesPage');

async function runTest() {
  const driver = await BrowserManager.createDriver();
  const mainPage = new MainPage(driver);
  const shoesPage = new ShoesPage(driver);

  try {
    // Переход на главную страницу
    await mainPage.open();

    // Переход на страницу с каталогом товаров "Обувь"
    await mainPage.goToShoesCategory();

    // Открытие фильтра по цене
    await shoesPage.openPriceFilter();

    // Перемещение ползунков для разблокировки полей ввода
    await shoesPage.moveSlider();

    // Установка диапазона цены от 50 BYN до 100 BYN
    await shoesPage.setPriceRange(50, 100);

    // Применение фильтров
    await shoesPage.applyFilters();

    await shoesPage.verifyProductsPriceRange(50, 100);


} catch (error) {
    Logger.error('Ошибка во время выполнения теста:', error);
  } finally {
    await BrowserManager.quitDriver(driver);
  }
}

runTest();