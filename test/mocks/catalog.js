class CatalogMock {
    products = [
        {
            id: 69420,
            name: 'Сказки о главном',
            price: 11235,
            description: 'Description by YaGPT',
            material: 'my enemies bones',
            color: 'white',
        },
        {
            id: 1337,
            name: 'Для сына маминой подруги',
            price: 81321,
            description: 'Description by YaGPT',
            material: 'my enemies bones',
            color: 'blue',
        },
        {
            id: 666,
            name: 'Lost (полное собрание)',
            price: 3455,
            description: 'Description by YaGPT',
            material: 'my enemies bones',
            color: 'red',
        },
    ];

    async getProducts() {
        return { data: this.products };
    }

    async getProductById(id) {
        return { data: this.products.find((product) => product.id === id) };
    }

    async checkout(form, cart) {
        return { data: { id: 1 } };
    }
}

module.exports = {
    CatalogMock
};