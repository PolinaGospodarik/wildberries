"use strict";

import {createElement, createModalWindow, setupModalClose} from "./utils";
import {updateCartItem } from "./cart-storage";

export function createModal (body) {
    const { modal, modalInner, modalClose } = createModalWindow("card", body);
    const modalLeft = createElement('div', 'card__left', null, modalInner);
    const modalImage = createElement('img', 'img', null, modalLeft);
    const modalRight = createElement('div', 'card__right', null, modalInner);
    const modalTitle = createElement('h3', 'title', null, modalRight);
    const modalPrice = createElement('div', 'price', null, modalRight);
    const modalPriceSale = createElement('span', 'price-sale', null, modalPrice);
    const modalPriceFull = createElement('span', 'price-full', null, modalPrice);
    const modalDescription = createElement('div', 'description', null, modalRight);
    const descriptionText = createElement('p', null, null, modalDescription);
    const modalButton = createElement("button", "button", "Купить", modalRight);

    modalButton.addEventListener('click', function(event) {
        const cardId = event.target.closest('.modal__card').id;
        updateCartItem(cardId);
    })

    function openModalCard({cardId, imageSrc, title, priceSale, price, description}) {
        localStorage.setItem('openCardData', JSON.stringify({ cardId, imageSrc, title, priceSale, price, description }));
        modal.setAttribute('id', cardId);
        modalImage.src = imageSrc ;
        modalTitle.textContent = title || '';
        modalPriceSale.textContent= `${priceSale}р.`;
        modalPriceFull.textContent= `${price}р.`;
        descriptionText.textContent = description || '';
        modal.style.display = 'flex';
    }

    function restoreModalCard() {
        const openCardData = localStorage.getItem('openCardData');
        if (openCardData) {
            const cardData = JSON.parse(openCardData);
            openModalCard(cardData);
        }
    }

    function closeModal ()  {
        modal.style.display = 'none';
        localStorage.removeItem('openCardData');
    }

    restoreModalCard();
    setupModalClose(modal, closeModal);


    return { modal, openModalCard};
}