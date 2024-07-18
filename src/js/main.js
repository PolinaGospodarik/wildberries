"use strict";

const root = document.querySelector("#root");

function createElement (tag, className, text, parent) {
    const element = document.createElement(tag);
    if (className !== null){
        element.classList.add(className);
    }
    if (text !== null){
        element.innerHTML =text;
    }
    parent.append(element);
    return element;
}

const header = createElement("header", "header", null, root);
const headerContainer = createElement("div", "container", null, header);
const headerNavigation = createElement("div", "header__nav", null, headerContainer);

const logo = createElement("span", "header__logo", "Wildberries", headerNavigation);
// const logoLink = createElement("a", null, "Wildberries",  logo);
// logoLink.setAttribute("href", "https://www.wildberries.ru/");

const search = createElement("div", "header__search", null, headerNavigation);

const labelSearch = createElement("label", null, null, search);
labelSearch.setAttribute("for", "search");
const inputSearch = createElement("input", null, null, search);
inputSearch.setAttribute("id", "search");
inputSearch.setAttribute("placeholder", "Найти на Wildberries");

const button = createElement("div", "header__button", null, headerNavigation);
const buttonIcon = createElement("i", "fa-solid", null, button);
buttonIcon.classList.add("fa-cart-shopping");


/*MAIN*/
const main = createElement("main", "main", null, root);
const containerMain =createElement("div","container", null, main);

// /*СЛАЙДЕР*/

const slider = createElement('section', "slider", null, containerMain );
const swiperContainer = createElement("section", "swiper", null, slider);
swiperContainer.classList.add("mySwiper")
const swiperWrapper = createElement("div", "swiper-wrapper", null, swiperContainer);

// Добавляем кнопки навигации и пагинацию
const swiperButtonNext = createElement("div", "swiper-button-next", null,  swiperContainer );
const swiperButtonPrev = createElement("div", "swiper-button-prev", null, swiperContainer );
const swiperPagination = createElement("div", "swiper-pagination", null, swiperContainer);

// Создаем массив с URL изображений
// const slideImages = [
//     'https://media.istockphoto.com/id/1361394182/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B0%D0%B1%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9-%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%BE%D1%88%D0%B5%D1%80%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D0%BE%D1%88%D0%BA%D0%B8-%D0%B2%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4%D1%8F%D1%89%D0%B8%D0%B9-%D1%88%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B8%D0%BB%D0%B8-%D1%83%D0%B4%D0%B8%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC.jpg?s=1024x1024&w=is&k=20&c=rd5SXiBwoKuVxReaXPdXYf8nJdjIzC5yHJ8RXDwtS7E=',
//     'https://media.istockphoto.com/id/1343913156/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9-%D0%B1%D0%B5%D0%BD%D0%B3%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-%D0%BA%D0%BE%D1%82-%D0%BE%D0%B1%D0%BB%D0%B8%D0%B7%D1%8B%D0%B2%D0%B0%D0%B5%D1%82-%D0%B3%D1%83%D0%B1%D1%8B-%D0%BD%D0%B0-%D0%BE%D1%80%D0%B0%D0%BD%D0%B6%D0%B5%D0%B2%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg?s=1024x1024&w=is&k=20&c=STGtnmDY8A7LTtOQeYfP3-FFFyN_ZTdC5wCyOc5tgBw=',
//     'https://via.placeholder.com/800x400?text=Слайд+3',
//     'https://via.placeholder.com/800x400?text=Слайд+4',
// ];

/*Добавляем слайды с изображениями в .swiper-wrapper*/
async function showwPicture(){
    function getPhotos() {
        //возвращаем новый промис
        return new Promise((resolve, reject) => {
            //запрашиваем ответ
            fetch("https://6691928a26c2a69f6e90289e.mockapi.io/slider").then(response => {
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

    getPhotos().then(data => {
        console.log(data)
        //отображаем фотографии
        for(let i = 0; i < data.length; i++){
            const slide = createElement("div", "swiper-slide", null, swiperWrapper)
            const img = createElement('img', null, null, slide);
            img.src = data[i].imageSlider + `?random=${[i]}`;
            // document.body.append(img);
        }
        const swiper = new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            mousewheel: true,
            keyboard: true,
        });

    })
}
showwPicture().then(result => result);

// slideImages.forEach(function (imgSrc) {
//     const slide = createElement("div", "swiper-slide", null, swiperWrapper)
//     const img = createElement('img', null, null, slide);
//     img.src = imgSrc;
// });



// Инициализируем Swiper

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
            let discountPercent = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
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



