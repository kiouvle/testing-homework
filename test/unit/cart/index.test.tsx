import React from "react";
import { render } from "@testing-library/react";
import { Cart } from "../../../src/client/pages/Cart";
import { StoreOverrides, createStubbedStore } from "../misc/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import events from "@testing-library/user-event";
import { CartState } from "../../../src/common/types";

describe("[Страница] Корзина", () => {
  it("Корзина правильно отображает список товаров в заказе", () => {
    const productsInCart = [
      {
        id: 1,
        name: "abc",
        price: 120,
        count: 2,
      },
      {
        id: 2,
        name: "def",
        price: 480,
        count: 1,
      },
    ];

    const initialCartState: CartState = {};
    for (const product of productsInCart) {
      initialCartState[product.id] = {
        name: product.name,
        price: product.price,
        count: product.count,
      };
    }

    const overrides: StoreOverrides = {
      preloadedState: {
        cart: initialCartState,
      },
    };

    const store = createStubbedStore(overrides);

    const component = (
      <BrowserRouter>
        <Provider store={store}>
          <Cart />
        </Provider>
      </BrowserRouter>
    );

    const { container, getByTestId } = render(component);
    for (const product of productsInCart) {
      const element = getByTestId(product.id.toString());
      const namEl = element.querySelector(".Cart-Name")!;
      const priceEl = element.querySelector(".Cart-Price")!;
      const countEl = element.querySelector(".Cart-Count")!;
      const totalEl = element.querySelector(".Cart-Total")!;

      expect(namEl.textContent).toBe(product.name);
      expect(priceEl.textContent).toBe(`$${product.price}`);
      expect(countEl.textContent).toBe(product.count.toString());
      expect(totalEl.textContent).toBe(`$${product.count * product.price}`);
    }

    let orderPrice = 0;
    for (const product of productsInCart) {
      orderPrice += product.price * product.count;
    }

    const orderPriceEl = container.querySelector(".Cart-OrderPrice")!;
    expect(orderPriceEl.textContent).toBe(`$${orderPrice}`);
  });

  it("Кнопка 'Очистить корзину' работает", async () => {
    const productsInCart = [
      {
        id: 1,
        name: "abc",
        price: 120,
        count: 2,
      },
      {
        id: 2,
        name: "def",
        price: 480,
        count: 1,
      },
    ];

    const initialCartState: CartState = {};
    for (const product of productsInCart) {
      initialCartState[product.id] = {
        name: product.name,
        price: product.price,
        count: product.count,
      };
    }

    const overrides: StoreOverrides = {
      preloadedState: {
        cart: initialCartState,
      },
    };

    const store = createStubbedStore(overrides);

    const component = (
      <BrowserRouter>
        <Provider store={store}>
          <Cart />
        </Provider>
      </BrowserRouter>
    );

    const { container, getByTestId } = render(component);

    const button = getByTestId("clear-cart-btn");
    await events.click(button);

    const table = container.querySelector('[data-testid="cart-table"]');
    expect(table).toBeNull();

    const catalogLink = getByTestId("cart-catalog-link") as HTMLAnchorElement;
    expect(catalogLink.href).toBe("http://localhost/catalog");
  });
});