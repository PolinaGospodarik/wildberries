"use strict";

import { createElement } from "./utils.js";
import {createCart} from "./modal-shopping-cart.js";

const { openModalCart } = createCart(document.body);

export function createHeader(root) {
    const header = createElement("header", "header", null, root);
    const headerContainer = createElement("div", "container", null, header);
    const headerNavigation = createElement("div", "header__nav", null, headerContainer);

    const logo = createElement("span", "header__logo", "Wildberries", headerNavigation);

    const search = createElement("div", "header__search", null, headerNavigation);

    const labelSearch = createElement("label", null, null, search);
    labelSearch.setAttribute("for", "search");
    const inputSearch = createElement("input", null, null, search);
    inputSearch.setAttribute("id", "search");
    inputSearch.setAttribute("placeholder", "Найти на Wildberries");

    const button = createElement("button", "header__button", null, headerNavigation);
    const buttonIcon = createElement("i", "fa-solid", null, button);
    buttonIcon.classList.add("fa-cart-shopping");

    button.addEventListener("click", function() {
        openModalCart();
    })

    return inputSearch;
}
