"use strict";

import { calculateTotalPrice } from "./calculateTotalPrice.js"

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

// add product to basket
function addToBasket(product) {
  //console.log(`Added ${product.title} to basket`)

  const productObj = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
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

  // set notification circle on basket icon
  if (userBasket.length > 0) {
    document.querySelector("#show-basket").classList.add("notification");
  }

  //console.log("userBasket:", userBasket)
}

function viewBasket() {
  const userBasket = JSON.parse(localStorage.getItem("basket")) ?? []; // assign userBasket to the content of basket in local storage if it exists, otherwise assign it an empty array
  
  const basketModal = document.querySelector("#basket-modal");
  const basketContainer = basketModal.querySelector("ul");

  userBasket.length === 0 ? basketContainer.innerText = "Your cart is empty" : basketContainer.innerText = ""; // display text if the cart is empty, otherwise clear child nodes

  userBasket.forEach(product => {
    const basketTemplate = document.querySelector("#basket-template").content.cloneNode(true);
    basketTemplate.querySelector(".basket-img").src = product.image;
    basketTemplate.querySelector(".basket-img").alt = product.title;
    basketTemplate.querySelector(".basket-title").textContent = product.title;
    basketTemplate.querySelector(".basket-quantity").textContent = "Quantity: " + product.quantity;
    basketTemplate.querySelector(".basket-price").textContent = "$" + (product.price * product.quantity).toFixed(2) + " total";

    basketContainer.appendChild(basketTemplate);
  });

  basketModal.querySelector(".basket-total").textContent = "Total: $" + calculateTotalPrice(userBasket);

  basketModal.querySelector(".close-modal").addEventListener("click", () => basketModal.close());

  basketModal.showModal();

  //console.log(userBasket);
}

export { addToBasket, viewBasket };