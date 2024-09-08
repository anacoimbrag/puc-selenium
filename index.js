const { Builder, Browser, By } = require("selenium-webdriver");

(async function firstTest() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get('https://pucminas.br');

    let title = await driver.getTitle();
    console.log(title);

    let url = await driver.getCurrentUrl();
    console.log(url);

    let searchBox = await driver.findElement(By.id('ctl00_SmallSearchInputBox1_csr_sbox'));
    let searchButton = await driver.findElement(By.id('ctl00_SmallSearchInputBox1_csr_SearchLink'));

    searchBox.sendKeys('Pós graduação');
    await driver.manage().setTimeouts({ implicit: 1000 });

    searchButton.click();

    // await driver.quit();
})();