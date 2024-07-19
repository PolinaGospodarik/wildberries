"use strict";

import { createElement } from "./utils.js";

export function createCatalog(containerMain) {
    const catalog = createElement("section", "catalog", null, containerMain);
    // const catalogTitle = createElement("h2", "catalog__title", "Хиты продаж", catalog);
    const catalogGrid = createElement("div", "catalog__grid", null, catalog);

    const noResultsMessage = createElement("div", "catalog__no-results", "Ничего не найдено", catalog);
    noResultsMessage.style.display = 'none';

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

                const cardImage = createElement("div", "card__img", null, cardsItem);
                const image = createElement("img", null, null, cardImage);
                image.src = data[i].picture + `?random=${data[i].sale}`;

                const cardViewButton = createElement("button", "card__img-button", "Быстрый просмотр", cardImage);

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

                const cardButton = createElement("button", "card__button", "Купить", cardsItem);
            }
        }
    }

    showCards();

    return { showCards, catalogGrid };
}
