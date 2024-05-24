const { Builder, By, until } = require('selenium-webdriver');

async function run() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // Переход на сайт
    await driver.get('https://www.lamoda.by/');

    // Закрытие всплывающего уведомления, если оно появляется
    const closeNotificationButtonSelector = 'section._notifyForm_1x9k4_2._notifyBar_1h0rw_2 button';
    const notificationElements = await driver.findElements(By.css(closeNotificationButtonSelector));
    if (notificationElements.length > 0) {
      const closeNotificationButton = await driver.findElement(By.css(closeNotificationButtonSelector));
      await closeNotificationButton.click();
      console.log('Закрыто всплывающее уведомление');
    }

    // Переход на страницу с каталогом товаров "Обувь"
    const shoesCategoryLinkSelector = 'a[href="/c/15/shoes-women/?sitelink=topmenuW&l=3"]';
    await driver.wait(until.elementLocated(By.css(shoesCategoryLinkSelector)), 15000);
    console.log('Ссылка на категорию "Обувь" найдена');

    const shoesLink = await driver.findElement(By.css(shoesCategoryLinkSelector));
    await shoesLink.click();
    console.log('Переход на страницу с обувью');

    await driver.wait(until.elementLocated(By.css('div._content_pjvgk_16')), 15000);

    // Нахождение и нажатие на кнопку для открытия фильтра по размеру
    const brandFilterButton = await driver.findElement(By.xpath("//div[@class='_text_pjvgk_26']//span[text()='Размер']"));
    await brandFilterButton.click();
    console.log('Нажата кнопка для открытия фильтра по размеру');

    await driver.sleep(1000); // Дадим время на обновление результатов

    //XPath для поиска чекбокса
    const sizeCheckboxXPath = "//span[text()='48,5']/ancestor::div[contains(@class, 'x-checkbox')]//input[@type='checkbox']";
    await driver.wait(until.elementLocated(By.xpath(sizeCheckboxXPath)), 10000);
    const sizeCheckbox = await driver.findElement(By.xpath(sizeCheckboxXPath));
    console.log('Чекбокс 48,5 найден');

    // Проверка, выбран ли чекбокс
    const isChecked = await sizeCheckbox.getAttribute('aria-checked');
    if (isChecked !== 'true') {
      // Изменение атрибута aria-checked с помощью JavaScript и вызов клика на родительском элементе
      await driver.executeScript(`
        const checkbox = arguments[0];
        checkbox.setAttribute('aria-checked', 'true');
        const parentDiv = checkbox.closest('div');
        if (parentDiv) {
          parentDiv.click();
        }
      `, sizeCheckbox);
      console.log('Чекбокс 48,5 выбран');
    } else {
      console.log('Чекбокс 48,5 уже выбран');
    }

    await driver.sleep(1000);

    // Найти и кликнуть кнопку "Применить" (если такая есть)
    const applyButtonExists = await driver.findElements(By.css('button._apply_1x1qp_20'));
    if (applyButtonExists.length > 0) {
      const applyButton = await driver.findElement(By.css('button._apply_1x1qp_20'));
      await applyButton.click();
      console.log('Нажата кнопка "Применить"');
    }

    // Подождать немного, чтобы результаты могли обновиться
    await driver.sleep(3000);
 
    // Проверка наличия размера 48.5 на карточках товаров
const productCardSelector = 'div.x-product-card__card';
const productCards = await driver.findElements(By.css(productCardSelector));

let allCardsHaveSize = true;

for (let productCard of productCards) {
  const sizeElement = await productCard.findElements(By.xpath(".//a[contains(@class, 'x-product-card-sizes__size') and text()='48,5']"));
  if (sizeElement.length === 0) {
    allCardsHaveSize = false;
    break;
  }
}

if (allCardsHaveSize) {
  console.log('Все карточки содержат размер 48,5');
} else {
  console.log('Не все карточки содержат размер 48,5');
}

   
  } catch (error) {
    console.error('Ошибка во время выполнения теста:', error);
  } finally {
    await driver.quit();
  }
}

run();
