"use strict";

import { addToCart } from "./basket.js"

const fetchAllUrl = "https://fakestoreapi.com/products";
const allProducts = [];

// fetch data from fakestoreapi
async function getProducts() {
  const response = await fetch(fetchAllUrl);
  const allProductsJSON = await response.json();
  allProducts.push(...allProductsJSON);

  //console.log(allProducts);

  displayAllProducts(allProducts);
  registerFilterBtns()
}

// 
function truncateText(string, maxCharLength) {
  if (string.length > maxCharLength) {
    return string.substring(0, maxCharLength) + "...";
  }
  return string;
}

// Displaying all of the product, with template
function displayAllProducts(products) {
  const productContainer = document.querySelector("#all-products");
  productContainer.innerHTML = ""; // clear all child nodes

  // For each product put in title, image and price from the API
  products.forEach(product => {
    const productTemplate = document.querySelector("#product-template").content.cloneNode(true);

    // refreshing event listeners to avoid duplication
    const viewSingleProductEvent = () => viewSingleProduct(product);
    productTemplate.querySelector("article").removeEventListener("click", viewSingleProductEvent);

    productTemplate.querySelector(".product-img").src = product.image;
    productTemplate.querySelector(".product-title").textContent = truncateText(product.title, 60);
    productTemplate.querySelector(".product-price").textContent = "$" + product.price;

    productTemplate.querySelector("article").addEventListener("click", viewSingleProductEvent);

    productContainer.appendChild(productTemplate);
  });
}

// show product modal on click
function viewSingleProduct(product) {
  //console.log(product);

  const productModal = document.querySelector("#product-modal");
  const productModalClone = productModal.cloneNode(true); // cloning the modal as a workaround to clear duplicate event listeners
  // ! removeEventListener was not working as intended when passing arguments

  // set product information on the modal
  productModalClone.querySelector(".product-title").textContent = product.title;
  productModalClone.querySelector(".product-img").src = product.image;
  productModalClone.querySelector(".product-price").textContent = "$" + product.price;
  productModalClone.querySelector(".product-description").textContent = product.description;

  productModalClone.querySelector(".product-add-to-cart").addEventListener("click", () => addToCart(product));
  // close() built in function for dialog html tag
  productModalClone.querySelector("#close-modal").addEventListener("click", () => productModalClone.close());

  productModal.parentNode.replaceChild(productModalClone, productModal) // swapping the old modal with the clone, effectively removing all old event listeners

  // showModal() built in function for dialog html tag
  productModalClone.showModal();
}

window.location.pathname.includes("shop.html") && getProducts(); // invoke getProducts if the user is in shop.html

// Selecting all filter buttons
const filterBtn = document.querySelectorAll("[data-action='filter']");

// Adding click on all the filtering buttons
function registerFilterBtns(){
  filterBtn.forEach((button )=>
  button.addEventListener("click", selectFilter))
}

// Selecting filter
function selectFilter(event){
  const filter = event.target.dataset.filter;
  filterProducts(filter);

}

// If filter === category name return those products
function filterProducts(filter){
  let filteredProducts = allProducts;
  if (filter === "men's clothing"){
    filteredProducts = filteredProducts.filter(filterMaleClothing);
  } else if (filter === "women's clothing"){
    filteredProducts = filteredProducts.filter(filterWomenClothing);
  } else if (filter === "jewelery"){
    filteredProducts = filteredProducts.filter(filterJewelery);
  } else if (filter === "electronics"){
    filteredProducts = filteredProducts.filter(filterElectronics);
  } else if (filter === "all"){
    filteredProducts = filteredProducts.filter(filterAllProducts);
  }
  displayAllProducts(filteredProducts);
}

// Returns all products
function filterAllProducts(){
  return allProducts;
}

// Returns all products with category name "men's clothing"
function filterMaleClothing(product){
  return product.category === "men's clothing"
}

// Returns all products with category name "women's clothing"
function filterWomenClothing(product){
  return product.category === "women's clothing"
}

// Returns all products with category name "jewelery"
function filterJewelery(product){
  return product.category === "jewelery"
}

// Returns all products with category name "electronics"
function filterElectronics(product){
  return product.category === "electronics"
}