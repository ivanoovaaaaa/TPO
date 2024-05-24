const { Builder, By, until } = require('selenium-webdriver');

async function run() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // Переход на сайт
    await driver.get('https://www.lamoda.by/');

    // Переход на страницу с каталогом товаров "Обувь"
    const shoesCategoryLinkSelector = 'a[href="/c/15/shoes-women/?sitelink=topmenuW&l=3"]';
    await driver.wait(until.elementLocated(By.css(shoesCategoryLinkSelector)), 15000);
    console.log('Ссылка на категорию "Обувь" найдена');

    const shoesLink = await driver.findElement(By.css(shoesCategoryLinkSelector));
    await shoesLink.click();
    console.log('Переход на страницу с обувью');

    await driver.wait(until.elementLocated(By.css('div._content_pjvgk_16')), 15000);

    // Нахождение и нажатие на кнопку для открытия фильтра по бренду
    const brandFilterButton = await driver.findElement(By.xpath("//div[@class='_text_pjvgk_26']//span[text()='Бренд']"));
    await brandFilterButton.click();
    console.log('Нажата кнопка для открытия фильтра по бренду');




    const brandSearchInputSelector = 'input._input_u3foj_9';
    await driver.wait(until.elementLocated(By.css(brandSearchInputSelector)), 5000);
    const brandSearchInput = await driver.findElement(By.css(brandSearchInputSelector));
    await brandSearchInput.sendKeys('PUMA');
    console.log('Введено "PUMA" в поле поиска бренда');


// Дадим время на обновление результатов

    await driver.sleep(5000); // Дадим время на обновление результатов

    // Обновленный XPath для поиска чекбокса
    const pumaCheckboxXPath = "//span[text()='PUMA']/ancestor::div[contains(@class, 'x-checkbox')]//input[@type='checkbox']";
    await driver.wait(until.elementLocated(By.xpath(pumaCheckboxXPath)), 10000);
    const pumaCheckbox = await driver.findElement(By.xpath(pumaCheckboxXPath));
    console.log('Чекбокс PUMA найден');

    // Проверка, выбран ли чекбокс
    const isChecked = await pumaCheckbox.getAttribute('aria-checked');
    if (isChecked !== 'true') {
      // Изменение атрибута aria-checked с помощью JavaScript и вызов клика на родительском элементе
      await driver.executeScript(`
        const checkbox = arguments[0];
        checkbox.setAttribute('aria-checked', 'true');
        const parentDiv = checkbox.closest('div');
        if (parentDiv) {
          parentDiv.click();
        }
      `, pumaCheckbox);
      console.log('Чекбокс PUMA выбран');
    } else {
      console.log('Чекбокс PUMA уже выбран');
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

    // Проверка, что вся обувь отображаема действительно PUMA
    const productBrandNames = await driver.findElements(By.css('div.x-product-card-description__brand-name._brandName_1rcja_6.x-product-card-description__brand-name_faded'));
    let allPuma = true;
    for (let brandNameElement of productBrandNames) {
      const brandNameText = await brandNameElement.getText();
      if (brandNameText !== 'PUMA') {
        allPuma = false;
        console.error(`Найден другой бренд: ${brandNameText}`);
        break;
      }
    }

    if (allPuma) {
      console.log('Тест успешно пройден: все товары от бренда PUMA отображаются.');
    }
  } catch (error) {
    console.error('Ошибка во время выполнения теста:', error);
  } finally {
    await driver.quit();
  }
}

run();
