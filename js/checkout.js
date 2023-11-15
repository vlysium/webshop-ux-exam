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


function validateCreditcard() {

  /*     const userInput= event.target.value */
  let ele = document.getElementById("cardNumber");
  ele = ele.value.split('-').join('');    // Remove dash (-) if mistakenly entered.

  let finalVal = ele.match(/.{1,4}/g).join('-');
  document.getElementById("cardNumber").value = finalVal;

  const regex = /\d{12}$/

  return regex.test(userInput)
}







