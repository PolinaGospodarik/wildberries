"use strict";

export function updateCartItem (cardId){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const itemIndex = cartItems.findIndex(item => item.id === cardId);

    if (itemIndex >= 0) {
        cartItems[itemIndex].quantity += 1;
    } else {
        cartItems.push({ id: cardId, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}