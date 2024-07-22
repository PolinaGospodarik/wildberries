"use strict";

import { createElement, createModalWindow, setupModalClose } from "./utils.js";
import { updateItemQuantity, clearAll, clearCartItem } from "./cart-storage.js";

export function createCart(body) {
    const { modal, modalInner } = createModalWindow("cart", body);
    const modalContent = createElement('div', 'cart-content', null, modalInner);
    const modalTitle = createElement('h3', 'cart-title', 'Ваша корзина', modalContent);
    const modalList = createElement('div', 'cart-list', null, modalContent);
    const modalFooter = createElement('div', 'footer', null, modalInner);
    const totalPriceContainer = createElement('div', 'total-price', "Итоговая сумма: 0 р.", modalFooter);
    const clearButton = createElement('button', 'clear-button', "Очистить корзину", modalFooter);

    clearButton.addEventListener('click', function () {
        clearAll();
        openModalCart();
    });

    function calculateTotalPrice(cartItems, allCards) {
        let totalPrice = 0;
        cartItems.forEach(cartItem => {
            const card = allCards.find(card => card.id === cartItem.id);
            if (card) {
                totalPrice += (card.price * (1 - (card.sale * 5) / 100)) * cartItem.quantity;
            }
        });
        return totalPrice;
    }

    function updateQuantityDisplay(cartItem, newQuantity, allCards) {
        const itemElement = document.getElementById(`cart-item-${cartItem.id}`);
        const quantityElement = itemElement.querySelector('.quantity');

        quantityElement.textContent = newQuantity;
        cartItem.quantity = newQuantity;

        const totalPrice = calculateTotalPrice(JSON.parse(localStorage.getItem('cartItems')), allCards);
        totalPriceContainer.textContent = `Итоговая сумма: ${totalPrice.toFixed(2)} р.`;
    }

    function openModalCart() {
        modalList.innerHTML = '';  // Очистка предыдущих данных

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            modalList.textContent = 'Ваша корзина пуста.';
            totalPriceContainer.textContent = `Итоговая сумма: 0 р.`;
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
                            cardElement.id = `cart-item-${cartItem.id}`;
                            const title = createElement('h3', "cart__title", card.title, cardElement);
                            const price = createElement('span', "cart__price", `${(card.price * (1 - (card.sale * 5) / 100)).toFixed(2)} р.`, cardElement);
                            const quantityContainer = createElement('div', "quantity__container", null, cardElement);
                            const minusButton = createElement('button', "quantity-minus", "-", quantityContainer);
                            const quantity = createElement('span', "quantity", cartItem.quantity, quantityContainer);
                            const plusButton = createElement('button', "quantity-plus", "+", quantityContainer);
                            const clear = createElement('button', "cart__clear", null, cardElement);
                            const clearIcon = createElement('i', "fa-solid", null, clear);
                            clearIcon.classList.add("fa-trash-can");

                            clear.addEventListener("click", function () {
                                clearCartItem(cartItem.id);
                                openModalCart();
                            });

                            minusButton.addEventListener("click", function () {
                                if (cartItem.quantity > 1) {
                                    updateItemQuantity(cartItem.id, cartItem.quantity - 1);
                                    updateQuantityDisplay(cartItem, cartItem.quantity - 1, allCards);
                                } else {
                                    clearCartItem(cartItem.id);
                                    openModalCart();
                                }
                            });

                            plusButton.addEventListener("click", function () {
                                updateItemQuantity(cartItem.id, cartItem.quantity + 1);
                                updateQuantityDisplay(cartItem, cartItem.quantity + 1, allCards);
                            });
                        }
                    });

                    const totalPrice = calculateTotalPrice(cartItems, allCards);
                    totalPriceContainer.textContent = `Итоговая сумма: ${totalPrice.toFixed(2)} р.`;
                })
                .catch(error => console.error('Ошибка при получении данных:', error));
        }

        modal.style.display = 'flex';
        localStorage.setItem('isCartOpen', 'true');
    }

    function restoreModalCart() {
        const isCartOpen = localStorage.getItem('isCartOpen');
        if (isCartOpen) {
            openModalCart();
        }
    }

    function closeModalCart() {
        modal.style.display = 'none';
        localStorage.removeItem('isCartOpen');
    }

    restoreModalCart();
    setupModalClose(modal, closeModalCart);

    return { modal, openModalCart };
}
