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

