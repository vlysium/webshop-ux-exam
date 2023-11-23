import {
  valiContactInfo,
  valiBilling,
  validateCreditcard,
} from "./checkout.js";

document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("previous").addEventListener("click", preSlide);

let currentSlide = 0;

function nextSlide() {
  if (!valiContactInfo()) {
    return;
  }

  if (currentSlide === 1 && !valiBilling()) {
    return;
  }

  if (currentSlide === 0) {
    /* From Fieldset */
    document
      .getElementById("shipping-address-field")
      .classList.remove("slide-to-center");
    document
      .getElementById("shipping-address-field")
      .classList.add("slide-to-left");
    document
      .getElementById("billing-address-field")
      .classList.remove("slide-to-right");
    document
      .getElementById("billing-address-field")
      .classList.add("slide-to-center");
    /* Buttons */
    btnAppear("previous");
    //document.getElementById("previous").classList.remove("hide")
    /* Indicator */
    document
      .getElementById("indicator-0")
      .classList.remove("selected-indicator");
    document.getElementById("indicator-1").classList.add("selected-indicator");
    /* Opdate current slide */
    currentSlide = 1;
    tabindex();

    return;
  }
  if (currentSlide === 1) {
    /* From Fieldset */
    document
      .getElementById("billing-address-field")
      .classList.remove("slide-to-center");
    document
      .getElementById("billing-address-field")
      .classList.add("slide-to-left");
    document
      .getElementById("credit-card-field")
      .classList.remove("slide-to-right");
    document
      .getElementById("credit-card-field")
      .classList.add("slide-to-center");
    /* Buttons */
    document.getElementById("next").classList.add("hide");
    document.getElementById("submit-form-btn").classList.remove("hide");
    /* Indicator */
    document
      .getElementById("indicator-1")
      .classList.remove("selected-indicator");
    document.getElementById("indicator-2").classList.add("selected-indicator");
    /* Opdate current slide */
    currentSlide = 2;
    tabindex();

    return;
  }
}

function preSlide() {
  if (currentSlide === 2) {
    /* From Fieldset */
    document
      .getElementById("credit-card-field")
      .classList.remove("slide-to-center");
    document
      .getElementById("credit-card-field")
      .classList.add("slide-to-right");
    document
      .getElementById("billing-address-field")
      .classList.add("slide-to-center");
    document
      .getElementById("billing-address-field")
      .classList.remove("slide-to-left");
    /* Buttons */
    document.getElementById("next").classList.remove("hide");
    document.getElementById("submit-form-btn").classList.add("hide");
    /* Indicator */
    document
      .getElementById("indicator-2")
      .classList.remove("selected-indicator");
    document.getElementById("indicator-1").classList.add("selected-indicator");
    /* Opdate current slide */
    currentSlide = 1;
    tabindex();

    return;
  }
  if (currentSlide === 1) {
    /* From Fieldset */
    document
      .getElementById("billing-address-field")
      .classList.remove("slide-to-center");
    document
      .getElementById("billing-address-field")
      .classList.add("slide-to-right");
    document
      .getElementById("shipping-address-field")
      .classList.remove("slide-to-left");
    document
      .getElementById("shipping-address-field")
      .classList.add("slide-to-center");
    /* Buttons */
    document.getElementById("next").classList.remove("hide");
    btnDisappear("previous");
    /* Indicator */
    document
      .getElementById("indicator-1")
      .classList.remove("selected-indicator");
    document.getElementById("indicator-0").classList.add("selected-indicator");
    /* Opdate current slide */
    currentSlide = 0;
    tabindex();

    return;
  }
}

//tilføj tabindex
function tabindex() {
  // få alle fieldsets og deres inputfelter
  const fieldset1 = document.querySelectorAll("#shipping-address-field input");
  const fieldset2 = document.querySelectorAll("#billing-address-field input");
  const fieldset3 = document.querySelectorAll("#credit-card-field input");
  // afhængig af hvilket fieldset/slide man er på, så tilføj/fjen tabindex
  if (currentSlide === 0) {
    // loop igennem hvert inputfelt
    fieldset1.forEach((input) => {
      //console.log(input)
      input.removeAttribute("tabindex");
    });
    fieldset2.forEach((input) => {
      //console.log(input)
      input.setAttribute("tabindex", -1);
    });
    fieldset3.forEach((input) => {
      //console.log(input)
      input.setAttribute("tabindex", -1);
    });
  }
  if (currentSlide === 1) {
    fieldset2.forEach((input) => {
      //console.log(input)
      input.removeAttribute("tabindex");
    });
    fieldset1.forEach((input) => {
      //console.log(input)
      input.setAttribute("tabindex", -1);
    });
    fieldset3.forEach((input) => {
      //console.log(input)
      input.setAttribute("tabindex", -1);
    });
  }
  if (currentSlide === 2) {
    fieldset3.forEach((input) => {
      //console.log(input)
      input.removeAttribute("tabindex");
    });
    fieldset1.forEach((input) => {
      //console.log(input)
      input.setAttribute("tabindex", -1);
    });
    fieldset2.forEach((input) => {
      //console.log(input)
      input.setAttribute("tabindex", -1);
    });
  }
}
tabindex();

/* Make The "Previous" Button disappear with an opacity fade */
function btnDisappear(el) {
  document.getElementById(el).classList.remove("opacity");
  setTimeout(() => {
    document.getElementById(el).classList.add("hide");
  }, 300);
  return;
}
/* Make The "Previous" Button appear with an opacity fade */
function btnAppear(el) {
  document.getElementById(el).classList.remove("opacity");
  document.getElementById(el).classList.remove("hide");
  setTimeout(() => {
    document.getElementById(el).classList.add("opacity");
  }, 1);
  return;
}

// Succesfull order
const submitBtn = document.querySelector("#submit-form-btn");
submitBtn.addEventListener("click", orderSucces);

function orderSucces(event) {
  event.preventDefault();

  if (!validateCreditcard()) {
    return;
  }
  const mainCheckout = document.querySelector("#checkout");

  mainCheckout.classList.remove("opacity");
  setTimeout(() => {
    mainCheckout.innerHTML = "";
    localStorage.removeItem("basket");
    mainCheckout.innerHTML =
      "<div class=space><p>Order succesful</p> <a href=shop.html class=btn-shop>Back to shop</a></div>";
    mainCheckout.classList.add("opacity");
  }, 300);
}
