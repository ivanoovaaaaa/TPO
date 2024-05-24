const { By, until } = require('selenium-webdriver');

class ShoesPage {
  constructor(driver) {
    this.driver = driver;
    this.brandFilterButtonSelector = "//div[contains(@class, '_text_pjvgk_26')]//span[text()='Размер']";
    this.sizeCheckboxXPath = "//span[text()='48,5']/ancestor::div[contains(@class, 'x-checkbox')]//input[@type='checkbox']";
    this.applyButtonSelector = 'button._apply_1x1qp_20';
    this.productCardSelector = 'div.x-product-card__card';
  }

  async openBrandFilter() {
    await this.driver.wait(until.elementLocated(By.xpath(this.brandFilterButtonSelector)), 15000);
    const brandFilterButton = await this.driver.findElement(By.xpath(this.brandFilterButtonSelector));
    await brandFilterButton.click();
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
      console.log(`Чекбокс ${size} выбран`);
    } else {
      console.log(`Чекбокс ${size} уже выбран`);
    }
  }

  async applyFilters() {
    const applyButtonExists = await this.driver.findElements(By.css(this.applyButtonSelector));
    if (applyButtonExists.length > 0) {
      const applyButton = await this.driver.findElement(By.css(this.applyButtonSelector));
      await applyButton.click();
    }
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
      console.log(`Все карточки содержат размер ${size}`);
    } else {
      console.log(`Не все карточки содержат размер ${size}`);
    }
  }
}


module.exports = ShoesPage;
