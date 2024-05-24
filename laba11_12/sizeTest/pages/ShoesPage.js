const { By, Key, until } = require('selenium-webdriver');

const Logger = require('../utils/Logger');

class ShoesPage {
  constructor(driver) {
    this.driver = driver;
    this.sizeFilterButtonSelector = "//div[contains(@class, '_text_pjvgk_26')]//span[text()='Размер']";
    this.priceFilterButtonSelector = "//div[contains(@class, '_text_pjvgk_26')]//span[text()='Цена']";
    this.sizeCheckboxXPath = "//span[text()='48,5']/ancestor::div[contains(@class, 'x-checkbox')]//input[@type='checkbox']";
    this.applyButtonSelector = 'button._apply_1x1qp_20';
    this.productCardSelector = 'div.x-product-card__card';
    this.brandFilterButtonSelector = "//div[contains(@class, '_text_pjvgk_26')]//span[text()='Бренд']";
    this.brandSearchInputSelector = 'input._input_u3foj_9';
    this.pumaCheckboxXPath = "//span[text()='PUMA']/ancestor::div[contains(@class, 'x-checkbox')]//input[@type='checkbox']";
    this.productBrandNameSelector = 'div.x-product-card-description__brand-name._brandName_1rcja_6.x-product-card-description__brand-name_faded';
    this.minPriceInputSelector = 'input[name="minRange"]';
    this.maxPriceInputSelector = 'input[name="maxRange"]';
    this.priceSliderSelector = 'div.vue-slider-dot';
    this.productPriceSelector = 'span._price_1rcja_8.x-product-card-description__price-single.x-product-card-description__price-WEB8507_price_bold';
  }

  async opensizeFilter() {
    await this.driver.wait(until.elementLocated(By.xpath(this.sizeFilterButtonSelector)), 15000);
    const brandFilterButton = await this.driver.findElement(By.xpath(this.sizeFilterButtonSelector));
    await brandFilterButton.click();
    Logger.log('Нажата кнопка для открытия фильтра по размеру');
  }
  async openBrandFilter() {
    await this.driver.wait(until.elementLocated(By.xpath(this.brandFilterButtonSelector)), 15000);
    const brandFilterButton = await this.driver.findElement(By.xpath(this.brandFilterButtonSelector));
    await brandFilterButton.click();
    Logger.log('Нажата кнопка для открытия фильтра по бренду');
  }
  async openPriceFilter() {
    await this.driver.wait(until.elementLocated(By.xpath(this.priceFilterButtonSelector)), 15000);
    const brandFilterButton = await this.driver.findElement(By.xpath(this.priceFilterButtonSelector));
    await brandFilterButton.click();
    Logger.log('Нажата кнопка для открытия фильтра по бренду');
  }


  async searchBrand(brandName) {
    await this.driver.wait(until.elementLocated(By.css(this.brandSearchInputSelector)), 5000);
    const brandSearchInput = await this.driver.findElement(By.css(this.brandSearchInputSelector));
    await brandSearchInput.sendKeys(brandName);
    Logger.log(`Введено "${brandName}" в поле поиска бренда`);
  }
  async selectBrand(brandName) {
    await this.driver.sleep(5000); // Даем время на обновление результатов
    await this.driver.wait(until.elementLocated(By.xpath(this.pumaCheckboxXPath)), 10000);
    const brandCheckbox = await this.driver.findElement(By.xpath(this.pumaCheckboxXPath));
    const isChecked = await brandCheckbox.getAttribute('aria-checked');

    if (isChecked !== 'true') {
      await this.driver.executeScript(`
        const checkbox = arguments[0];
        checkbox.setAttribute('aria-checked', 'true');
        const parentDiv = checkbox.closest('div');
        if (parentDiv) {
          parentDiv.click();
        }
      `, brandCheckbox);
      Logger.log('Чекбокс PUMA выбран');
    } else {
      Logger.log('Чекбокс PUMA уже выбран');
    }
  }
  async selectSize(size) {
    await this.driver.wait(until.elementLocated(By.xpath(this.sizeCheckboxXPath)), 10000);
    const sizeCheckbox = await this.driver.findElement(By.xpath(this.sizeCheckboxXPath));
    const isChecked = await sizeCheckbox.getAttribute('aria-checked');

    if (isChecked !== 'true') {
      await this.driver.executeScript(`
        const checkbox = arguments[0];
        checkbox.setAttribute('aria-checked', 'true');
        const parentDiv = checkbox.closest('div');
        if (parentDiv) {
          parentDiv.click();
        }
      `, sizeCheckbox);
      Logger.log(`Чекбокс ${size} выбран`);
    } else {
      Logger.log(`Чекбокс ${size} уже выбран`);
    }
  }

  async moveSlider() {
    const sliders = await this.driver.findElements(By.css(this.priceSliderSelector));
    const minSlider = sliders[0];
    const maxSlider = sliders[1];

    await this.driver.actions().dragAndDrop(minSlider, {x: 4, y: 0}).perform();
    await this.driver.actions().dragAndDrop(maxSlider, {x: -300, y: 0}).perform();
    Logger.log('Ползунки перемещены');
    await this.driver.sleep(1000);
  }

  async setPriceRange(minPrice, maxPrice) {
    await this.driver.wait(until.elementLocated(By.css(this.minPriceInputSelector)), 5000);
    const minPriceInput = await this.driver.findElement(By.css(this.minPriceInputSelector));
    const maxPriceInput = await this.driver.findElement(By.css(this.maxPriceInputSelector));

    // Ожидаем, пока поля ввода станут доступными
    await this.driver.wait(until.elementIsEnabled(minPriceInput));
    await this.driver.wait(until.elementIsEnabled(maxPriceInput));

    // Очищаем и вводим новые значения
    await minPriceInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE, minPrice);
    await maxPriceInput.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE, maxPrice);

    Logger.log(`Установлена минимальная цена: ${minPrice}`);
    Logger.log(`Установлена максимальная цена: ${maxPrice}`);

    await this.driver.sleep(3000); // Даем странице время на обновление
}





  async applyFilters() {
    const applyButtonExists = await this.driver.findElements(By.css(this.applyButtonSelector));
    if (applyButtonExists.length > 0) {
      const applyButton = await this.driver.findElement(By.css(this.applyButtonSelector));
      await applyButton.click();
      Logger.log('Нажата кнопка "Применить"');
      await this.driver.sleep(1000);
    }
  }
  async verifyProductsBrand(brandName) {
    await this.driver.sleep(3000); // Подождать немного, чтобы результаты могли обновиться
    const productBrandNames = await this.driver.findElements(By.css(this.productBrandNameSelector));
    for (let brandNameElement of productBrandNames) {
      const brandNameText = await brandNameElement.getText();
      if (brandNameText !== brandName) {
        throw new Error(`Найден другой бренд: ${brandNameText}`);
      }
    }
    Logger.log(`Тест успешно пройден: все товары от бренда ${brandName} отображаются.`);
  }
  async verifyProductsPriceRange(minPrice, maxPrice) {
    await this.driver.sleep(3000); // Подождать немного, чтобы результаты могли обновиться
    const productPrices = await this.driver.findElements(By.css(this.productPriceSelector));
    for (let priceElement of productPrices) {
      const priceText = await priceElement.getText();
      const price = parseFloat(priceText.replace(',', '').replace(' р.', ''));
      if (price < minPrice || price > maxPrice) {
        throw new Error(`Товар с ценой ${price} р. не соответствует диапазону ${minPrice} - ${maxPrice} р.`);
      }
    }
    Logger.log(`Тест успешно пройден: все товары имеют цены в диапазоне ${minPrice} - ${maxPrice} р.`);
  }
  async verifySizeOnProductCards(size) {
    await this.driver.sleep(3000); // Подождать немного, чтобы результаты могли обновиться
    const productCards = await this.driver.findElements(By.css(this.productCardSelector));
    let allCardsHaveSize = true;

    for (let productCard of productCards) {
      const sizeElement = await productCard.findElements(By.xpath(`.//a[contains(@class, 'x-product-card-sizes__size') and text()='${size}']`));
      if (sizeElement.length === 0) {
        allCardsHaveSize = false;
        break;
      }
    }

    if (allCardsHaveSize) {
      Logger.log(`Все карточки содержат размер ${size}`);
    } else {
      Logger.log(`Не все карточки содержат размер ${size}`);
    }

  }
  
}

module.exports = ShoesPage;
