const { CatalogMock } = require('../../mocks/catalog.js');

module.exports = class BasePage {
    constructor(browser, context, isMocked = true) {
        this.browser = browser;
        this.context = context;
        this.isMocked = isMocked;
    }

    async goTo(
        urlToGo = this.context.sutUri,
        selectorToWait = this.context.defaultSelector,
        timeout = this.context.defaultTimeout
    ) {
        await this.init();
        if (this.isMocked) await this.mock();
        await this.goToUrl(urlToGo);

        const element = await this.browser.$(selectorToWait);
        await this.browser.waitUntil(() => element.isExisting(), { timeout });
        const { height } = await element.getSize();
        const { width } = await this.browser.getWindowSize();
        await this.page.setViewport({
            width: parseInt(width),
            height: parseInt(height),
        });

        return this.page;
    }

    async init() {
        this.puppeteer = await this.browser.getPuppeteer();
        const pages = await this.puppeteer.pages();
        this.page = pages[0];
    }

    async mock() {
        const catalogData = new CatalogMock();

        const productsMock = await this.browser.mock(
            '**' + '/api/products' + '**',
            { method: 'get' }
        );
        productsMock.respond(async (response) => {
            return (await catalogData.getProducts()).data;
        });

        const productMock = await this.browser.mock(
            '**' + '/api/products/' + '**',
            { method: 'get' }
        );
        productMock.respond(async (response) => {
            const id = response.url
                .split('/')
                .filter((slug) => Boolean(slug))
                .at(-1);
            return (await catalogData.getProductById(+id)).data;
        });
    }

    async goToUrl(urlToGo) {
        const relativePathname = urlToGo.startsWith('/')
            ? urlToGo.slice(1)
            : urlToGo;
        const uriToGo = new URL(relativePathname, this.context.sutUri).href;
        await this.page.goto(uriToGo);
        await this.browser.url(uriToGo);
    }

    async takeScreenshot(
        screenshotName = 'plain',
        selector = this.context.defaultSelector
    ) {
        await this.browser.assertView(screenshotName, selector, {
            selectorToScroll: this.context.defaultSelector,
        });
    }
};