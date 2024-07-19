"use strict";

export function createSearch(inputElement, showCards, showSlider, hideSlider) {
    inputElement.addEventListener('input', function(event) {
        const searchText = event.target.value.trim();
        showCards(searchText);
        if (searchText === "") {
            showSlider();
        } else {
            hideSlider();
        }
    });
}
