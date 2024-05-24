const { By, until } = require('selenium-webdriver');
const Logger = require('../utils/Logger');

class ShoesPage {
  constructor(driver) {
    this.driver = driver;
    this.brandFilterButtonSelector = "//div[contains(@class, '_text_pjvgk_26')]//span[text()='Бренд']";
    this.brandSearchInputSelector = 'input._input_u3foj_9';
    this.pumaCheckboxXPath = "//span[text()='PUMA']/ancestor::div[contains(@class, 'x-checkbox')]//input[@type='checkbox']";
    this.applyButtonSelector = 'button._apply_1x1qp_20';
    this.productBrandNameSelector = 'div.x-product-card-description__brand-name._brandName_1rcja_6.x-product-card-description__brand-name_faded';
  }

  async openBrandFilter() {
    await this.driver.wait(until.elementLocated(By.xpath(this.brandFilterButtonSelector)), 15000);
    const brandFilterButton = await this.driver.findElement(By.xpath(this.brandFilterButtonSelector));
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

  async applyFilters() {
    const applyButtonExists = await this.driver.findElements(By.css(this.applyButtonSelector));
    if (applyButtonExists.length > 0) {
      const applyButton = await this.driver.findElement(By.css(this.applyButtonSelector));
      await applyButton.click();
      Logger.log('Нажата кнопка "Применить"');
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
}

module.exports = ShoesPage;
