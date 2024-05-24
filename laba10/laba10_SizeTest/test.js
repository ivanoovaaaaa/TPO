const { Builder } = require('selenium-webdriver');
const MainPage = require('./MainPage');
const ShoesPage = require('./ShoesPage');

async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const mainPage = new MainPage(driver);
  const shoesPage = new ShoesPage(driver);

  try {
    // Переход на главную страницу
    await mainPage.open();

    // Переход на страницу с каталогом товаров "Обувь"
    await mainPage.goToShoesCategory();
    console.log('Переход на страницу с обувью');

    // Открытие фильтра по размеру
    await shoesPage.openBrandFilter();
    console.log('Нажата кнопка для открытия фильтра по размеру');

    // Выбор размера 48,5
    await shoesPage.selectSize('48,5');

    // Применение фильтров
    await shoesPage.applyFilters();
    console.log('Нажата кнопка "Применить"');

    // Проверка наличия размера 48,5 на карточках товаров
    await shoesPage.verifySizeOnProductCards('48,5');
  } catch (error) {
    console.error('Ошибка во время выполнения теста:', error);
  } finally {
    await driver.quit();
  }
}

runTest();