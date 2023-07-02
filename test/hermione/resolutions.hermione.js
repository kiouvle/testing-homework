const BasePage = require('./page-objects/BasePage.js');
const Catalog = require('./page-objects/Catalog.js');

describe('Верстка должна адаптироваться под ширину экрана', async () => {
    it('Главная страница', async ({ browser }) => {
        const pageObject = new BasePage(browser, hermione.ctx);
        await pageObject.goTo();
        await pageObject.takeScreenshot();
    });

    it('Каталог', async ({ browser }) => {
        const pageObject = new Catalog(browser, hermione.ctx);
        await pageObject.goTo();
        await pageObject.takeScreenshot();
    });

    it('Продукт', async ({ browser }) => {
        const catalog = new Catalog(browser, hermione.ctx);
        const page = await catalog.goTo();
        const linkDetails = await browser.$(
            '[data-testid="69420"] [data-testid=link-details]'
        );
        await linkDetails.click();
        await page.waitForSelector('[data-testid=button-add-to-cart]');
        await catalog.takeScreenshot();
    });

    it('Доставка', async ({ browser }) => {
        const pageObject = new BasePage(browser, hermione.ctx);
        await pageObject.goTo('/delivery');
        await pageObject.takeScreenshot();
    });

    it('Контакты', async ({ browser }) => {
        const pageObject = new BasePage(browser, hermione.ctx);
        await pageObject.goTo('/contacts');
        await pageObject.takeScreenshot();
    });

    it('Корзина', async ({ browser }) => {
        const pageObject = new BasePage(browser, hermione.ctx);
        await pageObject.goTo('/cart');
        await pageObject.takeScreenshot();
    });
});
