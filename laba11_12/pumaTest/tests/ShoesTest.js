const BrowserManager = require('../utils/BrowserManager');
const Logger = require('../utils/Logger');
const MainPage = require('../pages/MainPage');
const ShoesPage = require('../pages/ShoesPage');

(async function run() {
  const driver = await BrowserManager.createDriver();
  const mainPage = new MainPage(driver);
  const shoesPage = new ShoesPage(driver);

  try {
    // Переход на главную страницу
    await mainPage.open();

    // Переход на страницу с каталогом товаров "Обувь"
    await mainPage.goToShoesCategory();

    // Открытие фильтра по бренду
    await shoesPage.openBrandFilter();

    // Поиск бренда PUMA и выбор его
    await shoesPage.searchBrand('PUMA');

    await shoesPage.selectBrand('PUMA');

    // Применение фильтров
    await shoesPage.applyFilters();

    // Проверка, что вся обувь отображаема действительно PUMA
    await shoesPage.verifyProductsBrand('PUMA');
  } catch (error) {
    Logger.error('Ошибка во время выполнения теста: ' + error);
  } finally {
    await BrowserManager.quitDriver(driver);
  }
})();
