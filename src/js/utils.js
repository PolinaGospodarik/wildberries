"use strict";

 export function createElement (tag, className, text, parent) {
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

export function createModalWindow(type, body) {
    const modal = createElement("div", `modal__${type}`, null, body);
    const modalInner = createElement("div", `${type}-inner`, null, modal);
    const modalClose = createElement('button', 'close', '&times;', modalInner);
    return { modal, modalInner, modalClose };
}

export function setupModalClose(modal, closeModalWindow ) {
    const modalClose = modal.querySelector('.close');

    function closeModal() {
        modal.style.display = 'none';
        if (closeModalWindow) {
            closeModalWindow();
        }
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}
