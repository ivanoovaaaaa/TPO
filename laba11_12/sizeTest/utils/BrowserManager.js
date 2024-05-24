const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class BrowserManager {
  static async createDriver() {
    const options = new chrome.Options();
    options.addArguments('--disable-webrtc');  // Отключаем WebRTC для устранения ошибок

    return new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  static async quitDriver(driver) {
    if (driver) {
      await driver.quit();
    }
  }
}

module.exports = BrowserManager;
