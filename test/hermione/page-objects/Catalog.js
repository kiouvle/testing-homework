const BaseOPage = require('./BasePage.js');

module.exports = class Catalog extends BaseOPage {
    async goTo(
        urlToGo = '',
        selectorToWait = this.context.defaultSelector,
        timeout = this.context.defaultTimeout
    ) {
        return await super.goTo('/catalog' + urlToGo, selectorToWait, timeout);
    }

    async getProduct(id) {
        const productSelector = `[data-testid="${id}"]`;
        return await this.browser.$(productSelector);
    }
};