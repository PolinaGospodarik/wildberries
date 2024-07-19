"use strict";

import {createElement} from "./utils.js";

export function createCatalog(containerMain){
    /*КАТАЛОГ*/
    const catalog = createElement("section", "catalog", null, containerMain);
    const catalogTitle = createElement("h2", "catalog__title", "Хиты продаж", catalog);
    const catalogGrid = createElement("div", "catalog__grid", null, catalog);

    async function showCards() {

        function getCards() {
            //возвращаем новый промис
            return new Promise((resolve, reject) => {
                //запрашиваем ответ
                fetch("https://6691928a26c2a69f6e90289e.mockapi.io/wildberries").then(response => {
                    //если ок - получаем
                    if(response.ok) {
                        resolve(response.json())
                        //если нет - получаем ошибку
                    } else {
                        reject(new Error('Error!!!!'))
                    }
                })
            })
        }

        //вызываем функцию, которая вернет нам полученные данные
        getCards().then(data => {
            console.log(data)
            //отображаем фотографии
            for(let i = 0; i < data.length; i++){
                const cardsItem = createElement("div", "card", null, catalogGrid);

                const cardImage = createElement("div", "card__img", null, cardsItem);
                const image = createElement("img", null, null, cardImage);
                image.src = data[i].picture + `?random=${[i]}`;

                const cardViewButton = createElement("button", "card__img-button", "Быстрый просмотр", cardImage);

                const cardSale = createElement("span", "card__sale", null, cardImage);
                let discountPercent = ("-"+ Math.floor(Math.random() * 100 + 1));
                cardSale.textContent = String(discountPercent + "%");

                const cardPrice = createElement("div", "card__price", null, cardsItem);

                const cardPriceSale = createElement("span", "card__price-sale", null, cardPrice);
                let discountedPrice = Number(data[i].price)  * (1 - discountPercent / 100);
                discountedPrice = Math.round(discountedPrice) ;
                cardPriceSale.textContent = String(discountedPrice + "р.");

                const cardPriceFull = createElement("span", "card__price-full", null, cardPrice);
                cardPriceFull.textContent = (Math.round(data[i].price) + `р.`);

                // cardPrice.textContent = String(discountedPrice);
                // cardPrice.textContent =  data[i].price + (Math.floor(Math.random() * 100) + 1);

                const cardTitle = createElement("h3", "card__title", null, cardsItem);
                cardTitle.textContent = data[i].title;

                // const cardDescription = createElement("div", "card-description", null, CardsItem);
                // const description = createElement("p", null, null, cardDescription);
                // description.textContent = data[i].description;

                const cardButton = createElement("button", "card__button", "Купить", cardsItem);
            }
        })

    }
    showCards().then(result => result);
}