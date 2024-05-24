const { Builder } = require('selenium-webdriver');
const MainPage = require('./MainPage');
const ShoesPage = require('./ShoesPage');

(async function run() {
  const driver = await new Builder().forBrowser('chrome').build();
  const mainPage = new MainPage(driver);
  const shoesPage = new ShoesPage(driver);

  try {
    // Переход на главную страницу
    await mainPage.open();

    // Переход на страницу с каталогом товаров "Обувь"
    await mainPage.goToShoesCategory();
    console.log('Переход на страницу с обувью');

    // Открытие фильтра по бренду
    await shoesPage.openBrandFilter();
    console.log('Нажата кнопка для открытия фильтра по бренду');

    // Поиск бренда PUMA и выбор его
    await shoesPage.searchBrand('PUMA');
    console.log('Введено "PUMA" в поле поиска бренда');

    await shoesPage.selectBrand('PUMA');
    console.log('Чекбокс PUMA выбран');

    // Применение фильтров
    await shoesPage.applyFilters();
    console.log('Нажата кнопка "Применить"');

    // Проверка, что вся обувь отображаема действительно PUMA
    await shoesPage.verifyProductsBrand('PUMA');
  } catch (error) {
    console.error('Ошибка во время выполнения теста:', error);
  } finally {
    await driver.quit();
  }
})();
