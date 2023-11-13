"use strict";

import { addToCart } from "./basket.js"

const fetchAllUrl = "https://fakestoreapi.com/products";
const allProducts = [];

const userBasket = localStorage.getItem("basket") ?? []; // assign userBasket to the content of basket in local storage if it exists, otherwise assign it an empty array
/* ↓ (det er det samme som det her)
  if (localStorage.getItem("basket") !== null) {
    const userBasket = localStorage.getItem("basket");
  } else {
    const userBasket = [];
  }
*/

// fetch data from fakestoreapi
async function getProducts(){
  const response = await fetch(fetchAllUrl);
  const allProductsJSON = await response.json();
  allProducts.push(...allProductsJSON);
  
  console.log(allProducts);

  displayAllProducts();
}

// Displaying all of the product, with template
function displayAllProducts(){

// For each product put in title, image and price from the API
  allProducts.forEach(product => {
    const productTemplate = document.querySelector("#product-template").content.cloneNode(true);
    const productContainer = document.querySelector("#all-products");

    // refreshing event listeners to avoid duplication
    const viewSingleProductEvent = () => viewSingleProduct(product);
    productTemplate.querySelector("article").removeEventListener("click", viewSingleProductEvent);
    
    productTemplate.querySelector(".product-img").src = product.image;
    productTemplate.querySelector(".product-title").textContent = product.title;
    productTemplate.querySelector(".product-price").textContent = product.price;

    productTemplate.querySelector("article").addEventListener("click", viewSingleProductEvent);

    productContainer.appendChild(productTemplate);
  });
}

// show product modal on click
function viewSingleProduct(product) {
  console.log(product);

  const productModal = document.querySelector("#product-modal");

  // refreshing event listeners to avoid duplication
  const addToCartEvent = () => addToCart(product);
  productModal.querySelector(".product-add-to-cart").removeEventListener("click", addToCartEvent);

  const closeModalEvent = () => productModal.close();
  productModal.querySelector("#close-modal").removeEventListener("click", closeModalEvent);

  productModal.querySelector(".product-title").textContent = product.title;
  productModal.querySelector(".product-img").src = product.image;
  productModal.querySelector(".product-price").textContent = product.price;
  productModal.querySelector(".product-description").textContent = product.description;

  productModal.querySelector(".product-add-to-cart").addEventListener("click", addToCartEvent);

  productModal.querySelector("#close-modal").addEventListener("click", closeModalEvent);

  productModal.showModal();
}

getProducts();