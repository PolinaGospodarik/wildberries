"use strict";

import {createElement} from "./utils";

export function createModal (body) {
    const modal = createElement("div", "modal", null, body);
    const modalInner = createElement("div", "modal-inner", null, modal);
    const modalClose = createElement('button', 'close', '&times;', modalInner);
    const modalLeft = createElement('div', 'modal__left', null, modalInner);
    const modalImage = createElement('img', 'img', null, modalLeft);
    const modalRight = createElement('div', 'modal__right', null, modalInner);
    const modalTitle = createElement('h3', 'title', null, modalRight);
    const modalPrice = createElement('div', 'price', null, modalRight);
    const modalPriceSale = createElement('span', 'price-sale', null, modalPrice);
    const modalPriceFull = createElement('span', 'price-full', null, modalPrice);
    const modalDescription = createElement('div', 'description', null, modalRight);
    const descriptionText = createElement('p', null, null, modalDescription);
    const modalButton = createElement("button", "button", "Купить", modalRight);

    function openModal(imageSrc, title, priceSale, price, description) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title || '';
        modalPriceSale.textContent= priceSale;
        modalPriceFull.textContent= price;
        descriptionText.textContent = description || '';
        modal.style.display = 'flex';
    }

    modalClose.addEventListener("click", function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    return { modal, openModal};
}