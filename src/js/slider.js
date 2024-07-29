"use strict";

import {createElement} from "./utils";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, Keyboard]);

export function createSlider(containerMain) {
    // /*СЛАЙДЕР*/
    const slider = createElement('section', "slider", null, containerMain );
    const swiperContainer = createElement("section", "swiper", null, slider);
    swiperContainer.classList.add("mySwiper")
    const swiperWrapper = createElement("div", "swiper-wrapper", null, swiperContainer);

// Добавляем кнопки навигации и пагинацию
    const swiperButtonNext = createElement("div", "swiper-button-next", null,  swiperContainer );
    const swiperButtonPrev = createElement("div", "swiper-button-prev", null, swiperContainer );
    const swiperPagination = createElement("div", "swiper-pagination", null, swiperContainer);

    async function showPicture(){
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
    showPicture().then(result => result);

    function showSlider(){
        slider.style.display = "block";
    }

    function hideSlider(){
        slider.style.display = "none";
    }

    return { showSlider, hideSlider};
}