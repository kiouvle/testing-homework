const Catalog = require('../page-objects/Catalog.js');

describe('Каталог', async () => {
    describe('Сниппет товара', () => {
        it('Есть название', async ({ browser }) => {
            const catalog = new Catalog(browser, hermione.ctx, false);
            await catalog.goTo();
            const name = await browser.$(
                '[data-testid="0"] [data-testid="product-name"]'
            );

            expect(name).toBeDefined();
            expect(await name.getText()).not.toEqual('');
        });
    });

    describe('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', () => {
        it('Сказки о главном', async ({ browser }) => {
            const catalog = new Catalog(browser, hermione.ctx);
            await catalog.goTo();

            const product = await catalog.getProduct(69420);

            expect(product).toBeDefined();
            await expect(product.$('[data-testid=product-name]')).toHaveText(
                'Сказки о главном'
            );
            await expect(product.$('[data-testid=product-price]')).toHaveText(
                '$11235'
            );
            const linkDetails = await product.$('[data-testid=link-details]');
            await expect(linkDetails).toHaveText('Details');
            await expect(linkDetails).toHaveHrefContaining('/catalog/69420');

            await catalog.takeScreenshot('Сказки о главном', '[data-testid="69420"]');
        });

        it('Для сына маминой подруги', async ({ browser }) => {
            const catalog = new Catalog(browser, hermione.ctx);
            await catalog.goTo();

            const product = await catalog.getProduct(1337);

            expect(product).toBeDefined();
            await expect(product.$('[data-testid=product-name]')).toHaveText(
                'Для сына маминой подруги'
            );
            await expect(product.$('[data-testid=product-price]')).toHaveText(
                '$81321'
            );
            const linkDetails = await product.$('[data-testid=link-details]');
            await expect(linkDetails).toHaveText('Details');
            await expect(linkDetails).toHaveHrefContaining('/catalog/1337');

            await catalog.takeScreenshot('Для сына маминой подруги', '[data-testid="1337"]');
        });

        it('Lost (полное собрание)', async ({ browser }) => {
            const catalog = new Catalog(browser, hermione.ctx);
            await catalog.goTo();

            const product = await catalog.getProduct(666);

            expect(product).toBeDefined();
            await expect(product.$('[data-testid=product-name]')).toHaveText(
                'Good 3'
            );
            await expect(product.$('[data-testid=product-price]')).toHaveText(
                '$3455'
            );
            const linkDetails = await product.$('[data-testid=link-details]');
            await expect(linkDetails).toHaveText('Details');
            await expect(linkDetails).toHaveHrefContaining('/catalog/666');

            await catalog.takeScreenshot('Lost (полное собрание)', '[data-testid="666"]');
        });
    });
});