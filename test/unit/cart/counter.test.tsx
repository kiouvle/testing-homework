import React from "react";
import { render } from "@testing-library/react";
import { Application } from "../../../src/client/Application";
import { StubWrapper } from "../misc/store";

describe("Счетчик товаров", () => {
  it("Счетчик не отображается при пустой корзине", () => {
    const overrides = {
      cart: {
        getState: () => ({}),
      },
    };

    const component = (
      <StubWrapper overrides={overrides}>
        <Application />
      </StubWrapper>
    );

    const { getByTestId } = render(component);

    const cartLink = getByTestId("cart-link");
    expect(cartLink.textContent).toBe("Cart");
  });

  it("Счетчик показывает корректное число товаров", () => {
    const overrides = {
      cart: {
        getState: () => ({
          0: {
            name: "a",
            price: 1,
            count: 1,
          },
          1: {
            name: "b",
            price: 1,
            count: 4,
          },
          2: {
            name: "a",
            price: 1,
            count: 2,
          },
        }),
      },
    };

    const component = (
      <StubWrapper overrides={overrides}>
        <Application />
      </StubWrapper>
    );

    const { getByTestId } = render(component);

    const cartLink = getByTestId("cart-link");
    expect(cartLink.textContent).toBe("Cart (3)");
  });
});