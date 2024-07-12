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
const container = createElement("div", "container", null, header);
const headerNavigation = createElement("div", "header__nav", null, container);

const logo = createElement("span", "header__logo", "Wildberries", headerNavigation);
// const logoLink = createElement("a", null, "Wildberries",  logo);
// logoLink.setAttribute("href", "https://www.wildberries.ru/");

const search = createElement("div", "header__search", null, headerNavigation);

const labelSearch = createElement("label", null, null, search);
labelSearch.setAttribute("for", "search");
const inputSearch = createElement("input", null, null, search);
inputSearch.setAttribute("id", "search");
inputSearch.setAttribute("placeholder", "Поиск...");

const button = createElement("div", "header__button", null, headerNavigation);
const buttonIcon = createElement("i", "fa-solid", null, button);
buttonIcon.classList.add("fa-cart-shopping");


/*MAIN*/
const main = createElement("main", "main", null, root);
const containerMain = document.querySelector(".container");
header.append(containerMain);

// /*СЛАЙДЕР*/

const slider = createElement('div', "main__slider", null, main );
const swiperContainer = createElement("section", "swiper", null, slider);
swiperContainer.classList.add("mySwiper")
const swiperWrapper = createElement("div", "swiper-wrapper", null, swiperContainer);

// Создаем массив с URL изображений
const slideImages = [
    'https://media.istockphoto.com/id/1361394182/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B0%D0%B1%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9-%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%BE%D1%88%D0%B5%D1%80%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D0%BE%D1%88%D0%BA%D0%B8-%D0%B2%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4%D1%8F%D1%89%D0%B8%D0%B9-%D1%88%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B8%D0%BB%D0%B8-%D1%83%D0%B4%D0%B8%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC.jpg?s=1024x1024&w=is&k=20&c=rd5SXiBwoKuVxReaXPdXYf8nJdjIzC5yHJ8RXDwtS7E=',
    'https://media.istockphoto.com/id/1343913156/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9-%D0%B1%D0%B5%D0%BD%D0%B3%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-%D0%BA%D0%BE%D1%82-%D0%BE%D0%B1%D0%BB%D0%B8%D0%B7%D1%8B%D0%B2%D0%B0%D0%B5%D1%82-%D0%B3%D1%83%D0%B1%D1%8B-%D0%BD%D0%B0-%D0%BE%D1%80%D0%B0%D0%BD%D0%B6%D0%B5%D0%B2%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg?s=1024x1024&w=is&k=20&c=STGtnmDY8A7LTtOQeYfP3-FFFyN_ZTdC5wCyOc5tgBw=',
    'https://via.placeholder.com/800x400?text=Слайд+3',
    'https://via.placeholder.com/800x400?text=Слайд+4',
];

// Добавляем слайды с изображениями в .swiper-wrapper
slideImages.forEach(function (imgSrc) {
    const slide = createElement("div", "swiper-slide", null, swiperWrapper)
    const img = createElement('img', null, null, slide);
    img.src = imgSrc;
});

// Добавляем кнопки навигации и пагинацию
const swiperButtonNext = createElement("div", "swiper-button-next", null,  swiperContainer );
const swiperButtonPrev = createElement("div", "swiper-button-prev", null, swiperContainer );
const swiperPagination = createElement("div", "swiper-pagination", null, swiperContainer);

// Инициализируем Swiper
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


// const headerSlider = createElement("div", "header-slider", null, header);
