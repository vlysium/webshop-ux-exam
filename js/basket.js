"use strict";

const userBasket = JSON.parse(localStorage.getItem("basket")) ?? []; // assign userBasket to the content of basket in local storage if it exists, otherwise assign it an empty array
/* ↓ same as below, but in one line ↓
  if (JSON.parse(localStorage.getItem("basket")) !== null) {
    const userBasket = localStorage.getItem("basket");
  } else {
    const userBasket = [];
  }
*/

// return true if the added product id exists in the basket, false if it doesn't exists
function productExistsInBasket(product) {
  return userBasket.some(productInBasket => productInBasket.id === product.id)
}

// add product to cart
function addToCart(product) {
  //console.log(`Added ${product.title} to basket`)

  const productObj = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1
  }

  // increment the quantity instead if the product is already in the basket
  if (productExistsInBasket(product)) {
    userBasket.find(productInBasket => productInBasket.id === product.id).quantity++;
  } else { // otherwise add a new product entry in the basket
    userBasket.push(productObj);
  }

  // update basket local storage
  localStorage.setItem("basket", JSON.stringify(userBasket));

  console.log("userBasket:", userBasket)
}

export { addToCart };