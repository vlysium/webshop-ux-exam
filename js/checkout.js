"use strict";

import { calculateTotalPrice } from "./calculateTotalPrice.js"

function getBasketItems() {
  const userBasket = JSON.parse(localStorage.getItem("basket")) ?? [];
  const basketContainer = document.querySelector("#product-container");

  basketContainer.innerText = ""; // clear all child nodes

// forEach product display their img and title from the API
  userBasket.forEach(product => {
    const basketTemplate = document.querySelector("#basket-temp").content.cloneNode(true);
    basketTemplate.querySelector(".basket-img").src = product.image;
    basketTemplate.querySelector(".basket-img").alt = product.title;
    basketTemplate.querySelector(".basket-title").textContent = product.title;
    basketTemplate.querySelector(".basket-quantity").textContent = "Quantity: " + product.quantity;
    basketTemplate.querySelector(".basket-price").textContent = "$" + (product.price * product.quantity) + " total";

    basketContainer.appendChild(basketTemplate);
  });
  createTotal(userBasket, basketContainer);
}

getBasketItems();

function createTotal(userBasket, basketContainer) {
  const total = document.createElement("h5");
  total.innerHTML = `<span>Total:</span> $${calculateTotalPrice(userBasket)}`;
  basketContainer.appendChild(total);
}

/* Validate */


document.querySelector("#card-number").addEventListener("input", validateCreditcard);

// This function check every Creditcard field and return true if they are filled in
// if a field is not field in, it triggers the "showPopup" function to notify the user.
export function validateCreditcard() {

  const cardName = document.getElementById("card-name");
  const cardNumber = document.getElementById("card-number");
  const cardExpiration = document.getElementById("card-expiration");
  const cardCCV = document.getElementById("card-ccv")

  
  switch(false) {
    case (cardName.checkValidity()):
      showPopup(cardName);
      //console.log("false");
      break;

    case (cardNumber.checkValidity()):
      showPopup(cardNumber);
      //console.log("false");
      break;

    case (cardExpiration.checkValidity()):
      showPopup(cardExpiration);
      //console.log("false");
      break;
      
    case (cardCCV.checkValidity()):
      showPopup(cardCCV);
      //console.log("false");
      break;

    default:
      return true;
      break;
  }
}



/* Validate FORM FILLOUT */

export function valiContactInfo() {

  //Skaffer alle inputfelter from fieldset
  const mail = document.getElementById("contact-email");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const address = document.getElementById("shipping-address");
  const county = document.getElementById("shipping-country");
  const zip = document.getElementById("shipping-zip-code");
  const phone = document.getElementById("shipping-phone");
  
  // kører en validering for alle inputfelterne
  switch(false) {
    case (mail.checkValidity()):
      showPopup (mail);
      //console.log("false");
      break;

    case (firstName.checkValidity()):
      // hvis ikke udfyldt, så tilføj popup til feltet
      showPopup (firstName);
      //console.log("false");
      break;

    case (lastName.checkValidity()):
      showPopup (lastName);
      //console.log("false");
      break;
      
    case (address.checkValidity()):
      showPopup (address);
      //console.log("false");
      break;
      
    case (county.checkValidity()):
      showPopup (county);
      //console.log("false");
      break;

    case (zip.checkValidity()):
      showPopup (zip);
      //console.log("false");
      break;

    case (phone.checkValidity()):
      showPopup (phone);
      //console.log("false");
      break;

    default:
      return true;
      break;
  }

}

export function valiBilling() {

  //Skaffer alle inputfelter from fieldset
  const address = document.getElementById("billing-address");
  const county = document.getElementById("billing-country");
  const zip = document.getElementById("billing-zip-code");
  const phone = document.getElementById("billing-phone");

  // køre en validering for alle inputfelterne
  switch(false) {
    case (address.checkValidity()):
      // hvis ikke udfyldt, så tilføj popup til feltet
       showPopup (address);
      //console.log("false");
      break;

    case (county.checkValidity()):
       showPopup (county);
      //console.log("false");
      break;

    case (zip.checkValidity()):
       showPopup (zip);
      //console.log("false");
      break;

    case (phone.checkValidity()):
       showPopup (phone);
      //console.log("false");
      break;

    default:
      return true;
      break;
  } 

}

// html popup for at notificer brugeren om felter lever up til "required"
function showPopup (append) {
  // Hvis der allerede er en popup så gør intet
  if(document.getElementById("input-popup-container")){
    return;
  }

  // lav de element der skal bruges
  const div = document.createElement("div");
  const svg = document.createElement("svg");
  const popup = document.createElement("div");

  // tilføj klasse
  popup.classList.add("input-popup");
  svg.classList.add("popup-svg");
  // tilføj et id
  div.setAttribute("id","input-popup-container");
  // tilføj indhold(tekst og svg)
  popup.innerHTML = `Please fill in this field <svg class="popup-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>`;
  //placer inden i label elementet
  append.parentElement.appendChild(div);
  //placer popup inden i div
  div.appendChild(popup);
  //tilføj fokus på det manlgede inputsfelt
  append.focus();
  // når brugen klikker væk fra feltet så fjernes popup'en
  append.addEventListener("blur", () => div.remove())    
}
