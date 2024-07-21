"use strict";

import {createElement, createModalWindow, setupModalClose} from "./utils";

export function createCart (body){
    const { modal, modalInner } = createModalWindow("cart", body);

    const modalTitle = createElement('h3', 'title', 'Ваша корзина', modalInner);
    const modalList = createElement('div', 'cart-list', null, modalInner);

    function openModalCart() {
        modalList.innerHTML = '';  // Очистка предыдущих данных

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            modalList.textContent = 'Ваша корзина пуста.';
        } else {
            // Получаем данные о карточках из API
            const url = `https://6691928a26c2a69f6e90289e.mockapi.io/wildberries`;
            fetch(url)
                .then(response => response.json())
                .then(allCards => {
                    cartItems.forEach(cartItem => {
                        const card = allCards.find(card => card.id === cartItem.id);
                        if (card) {
                            const cardElement = createElement('div', 'cart-item', null, modalList);
                            const title = createElement('h3', null, card.title, cardElement);
                            const price = createElement('span', null, `${card.price} р.`, cardElement);
                            const quantity = createElement('span', null, `Количество: ${cartItem.quantity}`, cardElement);
                        }
                    });
                })
                .catch(error => console.error('Ошибка при получении данных:', error));
        }
        modal.style.display = 'flex';
    }

    setupModalClose(modal, body);

    return { modal, openModalCart};
}

