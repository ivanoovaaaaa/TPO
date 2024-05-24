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

    // Открытие фильтра по размеру
    await shoesPage.opensizeFilter();

    // Выбор размера 48,5
    await shoesPage.selectSize('48,5');

    // Применение фильтров
    await shoesPage.applyFilters();

    // Проверка наличия размера 48,5 на карточках товаров
    await shoesPage.verifySizeOnProductCards('48,5');
  } catch (error) {
    Logger.error('Ошибка во время выполнения теста:', error);
  } finally {
    await BrowserManager.quitDriver(driver);
  }
}

runTest();
