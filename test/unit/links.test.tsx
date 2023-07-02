import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";
import { render } from "@testing-library/react";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Store } from "redux";

describe("Шапка", () => {
    
    it("Есть ссылка на каталог", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
    
        const application = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}>
                <Application />
            </Provider></MemoryRouter>
        );
    
        const { getByRole } = render(application);
        const catalogLink = getByRole("link", {name: "Catalog"});

        expect(catalogLink.getAttribute("href")).toBe("/catalog");
    }),
    it("Есть ссылка на доставку", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
    
        const application = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}>
                <Application />
            </Provider></MemoryRouter>
        );
    
        const { getByRole } = render(application);
        const catalogLink = getByRole("link", {name: "Delivery"});

        expect(catalogLink.getAttribute("href")).toBe("/delivery");
    }),
    it("Есть ссылка на контакты", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
    
        const application = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}>
                <Application />
            </Provider></MemoryRouter>
        );
    
        const { getByRole } = render(application);
        const catalogLink = getByRole("link", {name: "Contacts"});

        expect(catalogLink.getAttribute("href")).toBe("/contacts");
    }),
    it("Есть ссылка на корзину", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
    
        const application = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}>
                <Application />
            </Provider></MemoryRouter>
        );
    
        const { getByRole } = render(application);
        const catalogLink = getByRole("link", {name: "Cart"});

        expect(catalogLink.getAttribute("href")).toBe("/cart");
    }),
    it("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
    
        const application = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}>
                <Application />
            </Provider></MemoryRouter>
        );
    
        const { getByRole } = render(application);
        const catalogLink = getByRole("link", {name: "Example store"});

        expect(catalogLink.getAttribute("href")).toBe("/");
    })
})