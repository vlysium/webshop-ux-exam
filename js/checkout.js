"use strict";

import { calculateTotalPrice } from "./calculateTotalPrice.js"

function getBasketItems() {
  const userBasket = JSON.parse(localStorage.getItem("basket")) ?? [];
  const basketContainer = document.querySelector("#productContainer");

  basketContainer.innerText = ""; // clear all child nodes


  userBasket.forEach(product => {
    const basketTemplate = document.querySelector("#basket-temp").content.cloneNode(true);
    basketTemplate.querySelector(".basket-img").src = product.image;
    basketTemplate.querySelector(".basket-img").alt = product.title;
    basketTemplate.querySelector(".basket-title").textContent = product.title;
    basketTemplate.querySelector(".basket-quantity").textContent = "Quantity: " + product.quantity;
    basketTemplate.querySelector(".basket-price").textContent = "$" + (product.price * product.quantity) + " total";

    basketContainer.appendChild(basketTemplate);
  });
  createTotale(userBasket, basketContainer)
}

getBasketItems()

function createTotale(userBasket, basketContainer) {

  const total = document.createElement("h5")
  /*  total.textContent = "Total: $" + calculateTotalPrice(userBasket)
   basketContainer.appendChild(total) */
  total.innerHTML = `<span>Total:</span> $${calculateTotalPrice(userBasket)}`
  basketContainer.appendChild(total)

}




/* Validate */


document.querySelector("#cardNumber").addEventListener("input", validateCreditcard)


export function validateCreditcard() {

  /* const userInput= event.target.value 
  let ele = document.getElementById("cardNumber");
  ele = ele.value.split('-').join('');    // Remove dash (-) if mistakenly entered.

  let finalVal = ele.match(/.{1,4}/g).join('-');
  document.getElementById("cardNumber").value = finalVal;

  const regex = /\d{12}$/

  return regex.test(userInput) */
  let name = document.getElementById("cardName")
  let number = document.getElementById("cardNumber")
  let expiration = document.getElementById("cardExpiretion")
  let cvv = document.getElementById("cardCCV")

  
  switch(false) {
    case (name.checkValidity()):
      console.log("false")
      break;
    case (number.checkValidity()):
      console.log("false")
      break;
    case (expiration.checkValidity()):
      console.log("false")
      break;
    case (cvv.checkValidity()):
      console.log("false")
      break;
    default:
      return true
      break;
  }
}



/* Validate FORM FILLOUT */

export function valiContactInfo() {

  let mail = document.getElementById("contactEmail")
  let first = document.getElementById("firstName")
  let last = document.getElementById("lastName")
  let address = document.getElementById("shipAddress")
  let county = document.getElementById("shipCountry")
  let zip = document.getElementById("shipZipCode")
  let phone = document.getElementById("shipPhone")
  
  switch(false) {
    case (mail.checkValidity()):
      console.log("false")
      break;
    case (first.checkValidity()):
      showPopup (first)
      console.log("false")
      break;
    case (last.checkValidity()):
      showPopup (last)
      console.log("false")
      break;
    case (address.checkValidity()):
      showPopup (address)
      console.log("false")
      break;
    case (county.checkValidity()):
      showPopup (county)
      console.log("false")
      break;
    case (zip.checkValidity()):
      showPopup (zip)
      console.log("false")
      break;
    case (phone.checkValidity()):
      showPopup (phone)
      console.log("false")
      break;
    default:
      return true
      break;
  }

  // LEAVE ONLY FOR TESTING
  //return true
}

export function valiBilling() {

  let address = document.getElementById("billAddress")
  let county = document.getElementById("billCountry")
  let zip = document.getElementById("billZipCode")
  let phone = document.getElementById("billPhone")
  
  switch(false) {
    case (address.checkValidity()):
       showPopup (address)
      console.log("false")
      break;
    case (county.checkValidity()):
       showPopup (county)
      console.log("false")
      break;
    case (zip.checkValidity()):
       showPopup (zip)
      console.log("false")
      break;
    case (phone.checkValidity()):
       showPopup (phone)
      console.log("false")
      break;
    default:
      return true
      break;
  } 

  // LEAVE ONLY FOR TESTING
  //return true

}


function showPopup (append) {
  if(document.getElementById("input-popup-container")){
    return
  }
  console.log(append)
  let div = document.createElement("div")
  let arrow = document.createElement("div")
  let svg = document.createElement("svg")
  let popup = document.createElement("div")
  popup.classList.add("input-popup")
  arrow.classList.add("popup-arrow")
  svg.classList.add("popup-svg")
  div.setAttribute("id","input-popup-container")
  popup.innerHTML = `Please fill in this field <svg class="popup-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>`
  //document.getElementById(`${append}`).parentElement.appendChild(div)
  append.parentElement.appendChild(div)
  div.appendChild(popup)

  div.appendChild(arrow)
  append.focus()
  append.addEventListener("blur", ()=>{
    div.remove()
  }) 
}
