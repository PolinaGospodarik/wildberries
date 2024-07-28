"use strict";

import { createElement } from "./utils.js";
import { createModal } from "./modal-card.js";
import { updateCartItem } from "./cart-storage.js"

export function createCatalog(containerMain) {
    const catalog = createElement("section", "catalog", null, containerMain);
    // const catalogTitle = createElement("h2", "catalog__title", "Хиты продаж", catalog);
    const catalogGrid = createElement("div", "catalog__grid", null, catalog);

    const noResultsMessage = createElement("div", "catalog__no-results", "Ничего не найдено", catalog);
    noResultsMessage.style.display = 'none';

    const { openModalCard } = createModal(document.body);


    async function getCards(searchText = "") {
        const url = new URL("https://6691928a26c2a69f6e90289e.mockapi.io/wildberries");
        if (searchText) {
            url.searchParams.append('title', searchText);
        }
        const response = await fetch(url.toString());
        try {
            if (!response.ok) {
                throw new Error('Ошибка сети!');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            return [];
        }
    }

    async function getCardById(id) {
        const url = `https://6691928a26c2a69f6e90289e.mockapi.io/wildberries/${id}`;
        const response = await fetch(url);
        try {
            if (!response.ok) {
                throw new Error('Ошибка сети!');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            return null;
        }
    }

    async function showCards(searchText = "") {
        const data = await getCards(searchText);

        // Очистка предыдущих карточек
        catalogGrid.innerHTML = '';

        if (data.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';

            // Фильтрация данных по заголовку
            // const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

            for (let i = 0; i < data.length; i++) {
                const cardsItem = createElement("div", "card", null, catalogGrid);
                cardsItem.setAttribute('id', data[i].id);

                const cardImage = createElement("div", "card__img", null, cardsItem);
                const image = createElement("img", null, null, cardImage);
                image.src = data[i].picture + `?random=${data[i].id}`;

                const cardViewButton = createElement("button", "card__img-button", null, cardImage);
                const imgButtonText = createElement("span", "img-button__text", "Быстрый просмотр", cardViewButton);
                const imgButtonIcon = createElement("i", "fa-solid", null, cardViewButton);
                imgButtonIcon.classList.add("fa-eye");

                cardViewButton.addEventListener("click", async function (event) {
                    const currentCardId = event.target.closest('.card').id;
                    const cardData = await getCardById(currentCardId);

                    if (cardData) {
                        openModalCard({
                            cardId: cardData.id,
                            imageSrc: cardData.picture + `?random=${cardData.id}`,
                            title: cardData.title,
                            priceSale: (cardData.price * (1 - (cardData.sale * 5 ) / 100)).toFixed(2),
                            price: cardData.price,
                            description: cardData.description
                        });
                    } else {
                        console.error('Данные карточки не найдены');
                    }
                });

                const cardSale = createElement("span", "card__sale", null, cardImage);
                const discountPercent = data[i].sale * 5;
                cardSale.textContent = `-${discountPercent}%`;

                const cardPrice = createElement("div", "card__price", null, cardsItem);

                const cardPriceSale = createElement("span", "card__price-sale", null, cardPrice);
                let discountedPrice = Number(data[i].price) * (1 - discountPercent / 100);
                    cardPriceSale.textContent = `${discountedPrice.toFixed(2)} р.`;

                const cardPriceFull = createElement("span", "card__price-full", null, cardPrice);
                cardPriceFull.textContent = `${data[i].price} р.`;

                const cardTitle = createElement("h3", "card__title", null, cardsItem);
                cardTitle.textContent = data[i].title;

                // const cardDescription = createElement("div", "card__description", null, cardsItem);
                // const description = createElement("p", null, null, cardDescription);
                // description.textContent = data[i].description;

                const cardButton = createElement("button", "card__button", "Купить", cardsItem);

                cardButton.addEventListener("click", function(event){
                    // const currentCard = event.target.closest('.card');
                    const cardId = event.target.closest('.card').id;
                    updateCartItem(cardId);
                })

            }
        }
    }

    showCards();

    return { showCards, catalogGrid };
}
