"use strict";

import { addToBasket, viewBasket } from "./basket.js"

const url = "https://fakestoreapi.com/products";
const allProducts = [];

const user = JSON.parse(sessionStorage.getItem("user"));
if (!user) { // 🧙‍♂️ YOU SHALL NOT PASS - without being logged in first
  window.location = "index.html";
}
document.querySelector("#user-name").textContent = user?.email;

const userBasket = JSON.parse(localStorage.getItem("basket")) ?? []; // assign userBasket to the content of basket in local storage if it exists, otherwise assign it an empty array
if (userBasket.length > 0) {
  document.querySelector("#show-basket")?.classList.add("notification");
}

// fetch data from fakestoreapi
async function getProducts() {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  allProducts.push(...data);

  //console.log(allProducts);

  displayAllProducts(allProducts);
  registerFilterBtns()
}

// truncate text and append (...) at the end, if the length of the text exceeds a given max character length
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
  products.forEach((product, index) => {
    const productTemplate = document.querySelector("#product-template").content.cloneNode(true);

    productTemplate.querySelector("article").setAttribute("tabindex", (9 + index)); // start from 9 because 1-8 already exists in the document
    productTemplate.querySelector(".product-img").src = product.image;
    productTemplate.querySelector(".product-img").alt = product.title;
    productTemplate.querySelector(".product-title").textContent = truncateText(product.title, 60);
    productTemplate.querySelector(".product-price").textContent = "$" + product.price;

    productTemplate.querySelector("article").addEventListener("click", () => viewSingleProduct(product));
    
    productTemplate.querySelector("article").addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        event.preventDefault(); // prevent default browser behavior that caused a critical bug in displaying the modal properly
        viewSingleProduct(product);
      }
    });

    productContainer.appendChild(productTemplate);
  });
  //productSelection(products) 
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
  productModalClone.querySelector(".product-img").alt = product.title;
  productModalClone.querySelector(".product-price").textContent = "$" + product.price;
  productModalClone.querySelector(".product-description").textContent = product.description;
  productModalClone.querySelector(".product-rating").textContent = "Rating: " + product.rating.rate + " / 5";
  productModalClone.querySelector(".product-count").textContent = "Reviewed by " + product.rating.count + " customers";

  // change the text briefly after the user clicks
  productModalClone.querySelector(".product-add-to-cart").addEventListener("click", () => {
    addToBasket(product);
    productModalClone.querySelector(".product-add-to-cart").textContent = "Added to cart";
    setTimeout(() => {
      productModalClone.querySelector(".product-add-to-cart").textContent = "Add to cart";
    }, 1500);
  });

  // close() built in function for dialog html tag
  productModalClone.querySelector(".close-modal").addEventListener("click", () => productModalClone.close());

  productModal.parentNode.replaceChild(productModalClone, productModal) // swapping the old modal with the clone, effectively removing all old event listeners

  // showModal() built in function for dialog html tag
  productModalClone.showModal();
  //console.log(productModalClone);
}

window.location.pathname.includes("shop.html") && getProducts(); // invoke getProducts if the user is in shop.html

// Selecting all filter buttons
const filterBtn = document.querySelectorAll("input[name='filter']");

// Adding click on all the filtering buttons
function registerFilterBtns() {
  filterBtn.forEach((button) => button.addEventListener("click", selectFilter));
}

// Selecting filter
function selectFilter(event) {
  const filterValue = event.target.value;

  const filteredProducts = allProducts.filter(product => product.category == filterValue);

  // display all products if the selected category is "all", otherwise display products matching the respective category
  filterValue == "all" ? displayAllProducts(allProducts) : displayAllProducts(filteredProducts);

  // scroll to section
  const catalogSection = document.querySelector("#catalog");
  catalogSection.scrollIntoView({ behavior: "smooth" });
}

document.querySelector("#show-basket")?.addEventListener("click", viewBasket); // add event listener to the basket if it exists on the document


const navbar = document.querySelector("#nav-menu");
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add("nav-scroll");
  } else {
    navbar.classList.remove("nav-scroll");
  }
});

// accessibility

// Radio button selection
const labels = document.querySelectorAll(".side-nav label")

function radiobuttons () {

  labels.forEach(radio =>{
    radio.addEventListener("keydown", (event) => {
      if(event.code =="Enter"){
        radio.click();
        radio.focus()
  
      }
    })
  })


}
radiobuttons ()

// Product selection

function productSelection (product) {
  const tabProducts = document.querySelectorAll(".single-product")
  
  //console.log(tabProducts)
  tabProducts.forEach((item,index) =>{
    item.addEventListener("keydown", (event) => {
      if(event.code =="Enter"){
        //console.log("hello")
        //item.click();
        viewSingleProduct(product[index]);
        
      }
    })
  })

}


