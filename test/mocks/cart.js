class CartMock {
    cart = {};

    getState() {
        return this.cart;
    }

    setState(cart) {
        this.cart = cart;
    }
}

module.exports = {
    CartMock
};