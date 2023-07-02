import React, { ReactNode } from "react";
import { ExampleApi, CartApi } from "../../../src/client/api";
import { ApplicationState, initStore } from "../../../src/client/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

export type StoreOverrides = {
  basename?: string;
  api?: Record<string, (args: any) => any>;
  cart?: Record<string, (args: any) => any>;
  preloadedState?: Partial<ApplicationState>;
};

export function createStubbedStore(overrides?: StoreOverrides) {
  const basename =
    overrides && overrides.basename ? overrides.basename : "/hw/store";
  const api: any = new ExampleApi(basename);
  const cart: any = new CartApi();

  if (overrides === undefined) {
    return initStore(api, cart);
  }

  const apiOverrides = overrides.api;
  if (apiOverrides) {
    for (const key of Object.getOwnPropertyNames(apiOverrides)) {
      api[key] = apiOverrides[key];
    }
  }

  const cartOverrides = overrides.cart;
  if (cartOverrides) {
    for (const key of Object.getOwnPropertyNames(cartOverrides)) {
      cart[key] = cartOverrides[key];
    }
  }

  const store = initStore(api, cart, overrides.preloadedState);
  return store;
}

export function StubWrapper({
  children,
  overrides,
}: {
  children: ReactNode;
  overrides?: StoreOverrides;
}) {
  const basename =
    overrides && overrides.basename ? overrides.basename : "/hw/store";
  const store = createStubbedStore(overrides);
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}