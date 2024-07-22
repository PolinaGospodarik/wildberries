"use strict";

export function updateCartItem (cardId){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const itemIndex = cartItems.findIndex(item => item.id === cardId);

    if (itemIndex >= 0) {
        cartItems[itemIndex].quantity += 1;
    } else {
        cartItems.push({ id: cardId, quantity: 1});
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function clearAll (){
    localStorage.removeItem('cartItems');
}

export function clearCartItem (cardId){
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const updateCartItems = cartItems.filter(item => item.id !== cardId);

    localStorage.setItem('cartItems', JSON.stringify(updateCartItems));
}

export function updateItemQuantity(cardId, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === cardId);

    if (itemIndex !== -1) {
        if (quantity <= 0) {
            cartItems = cartItems.filter(item => item.id !== cardId);
        } else {
            cartItems[itemIndex].quantity = quantity;
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

