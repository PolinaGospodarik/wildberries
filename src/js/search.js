"use strict";

export function createSearch(inputElement, showCards, showSlider, hideSlider) {
    inputElement.addEventListener('input', function(event) {
        const searchText = event.target.value;
        showCards(searchText.trim());
        if (searchText.trim() === "") {
            showSlider(); // Показываем слайдер, если поле поиска пустое
        } else {
            hideSlider(); // Скрываем слайдер, если есть текст поиска
        }
    });
}
