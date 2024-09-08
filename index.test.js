const { Builder, Browser, By } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get('https://pucminas.br');

    let searchBox = await driver.findElement(By.id('ctl00_SmallSearchInputBox1_csr_sbox'));
    let searchButton = await driver.findElement(By.id('ctl00_SmallSearchInputBox1_csr_SearchLink'));

    searchBox.sendKeys('Pós graduação');
    await driver.manage().setTimeouts({ implicit: 1000 });

    searchButton.click();

    await driver.manage().setTimeouts({ implicit: 5000 });
}, 30000)

test('search redirect to correct page', async () => {
    let url = await driver.getCurrentUrl();
    expect(url).toMatch(/results.aspx/);
})

test('search return 10 results', async () => {
    let searchItems = await driver.findElements(By.css('.ms-srch-item'));
    expect(searchItems.length).toBe(10);
})

afterEach(async () => {
    await driver.quit();
})