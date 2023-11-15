

document.getElementById("next").addEventListener("click", nextSlide)
document.getElementById("pre").addEventListener("click", preSlide)

let currentSlide = 0

function nextSlide() {
  if (currentSlide === 0) {
    /* From Fieldset */
    document.getElementById("shippingAddress").classList.remove("slideToCenter")
    document.getElementById("shippingAddress").classList.add("slideToLeft")
    document.getElementById("billingAddress").classList.remove("slideToRight")
    document.getElementById("billingAddress").classList.add("slideToCenter")
    /* Buttons */
    btnAppear("pre")
    //document.getElementById("pre").classList.remove("hide")
    /* Indicator */
    document.getElementById("indictor0").classList.remove("selectedIndictor")
    document.getElementById("indictor1").classList.add("selectedIndictor")
    /* Opdate current slide */
    currentSlide = 1
    return
  }
  if (currentSlide === 1) {
    /* From Fieldset */
    document.getElementById("billingAddress").classList.remove("slideToCenter")
    document.getElementById("billingAddress").classList.add("slideToLeft")
    document.getElementById("creditCard").classList.remove("slideToRight")
    document.getElementById("creditCard").classList.add("slideToCenter")
    /* Buttons */
    document.getElementById("next").classList.add("hide")
    document.getElementById("subFormBtn").classList.remove("hide")
    /* Indicator */
    document.getElementById("indictor1").classList.remove("selectedIndictor")
    document.getElementById("indictor2").classList.add("selectedIndictor")
    /* Opdate current slide */
    currentSlide = 2
    return
  }
}

function preSlide() {
  if (currentSlide === 2) {
    /* From Fieldset */
    document.getElementById("creditCard").classList.remove("slideToCenter")
    document.getElementById("creditCard").classList.add("slideToRight")
    document.getElementById("billingAddress").classList.add("slideToCenter")
    document.getElementById("billingAddress").classList.remove("slideToLeft")
    /* Buttons */
    document.getElementById("next").classList.remove("hide")
    document.getElementById("subFormBtn").classList.add("hide")
    /* Indicator */
    document.getElementById("indictor2").classList.remove("selectedIndictor")
    document.getElementById("indictor1").classList.add("selectedIndictor")
    /* Opdate current slide */
    currentSlide = 1
    return
  }
  if (currentSlide === 1) {
    /* From Fieldset */
    document.getElementById("billingAddress").classList.remove("slideToCenter")
    document.getElementById("billingAddress").classList.add("slideToRight")
    document.getElementById("shippingAddress").classList.remove("slideToLeft")
    document.getElementById("shippingAddress").classList.add("slideToCenter")
    /* Buttons */
    document.getElementById("next").classList.remove("hide")
    btnDisappear("pre")
    /* Indicator */
    document.getElementById("indictor1").classList.remove("selectedIndictor")
    document.getElementById("indictor0").classList.add("selectedIndictor")
    /* Opdate current slide */
    currentSlide = 0
    return
  }
}

/* Make The "Previous" Button disappear with an opacity fade */
function btnDisappear(el) {
  document.getElementById(el).classList.remove("opacity")
  setTimeout(() => {

    document.getElementById(el).classList.remove("hide")
  }, 300)
  return
}
/* Make The "Previous" Button appear with an opacity fade */
function btnAppear(el) {
  console.log(el)
  document.getElementById(el).classList.remove("opacity")
  document.getElementById(el).classList.remove("hide")
  setTimeout(() => {
    document.getElementById(el).classList.add("opacity")
  }, 1)
  return
}

// Succesfull order
const submitBtn = document.querySelector("#subFormBtn");
submitBtn.addEventListener("click", orderSucces);

function orderSucces() {
  const mainCheckout = document.querySelector("#checkout");

  mainCheckout.classList.remove("opacity")
  setTimeout(() => {

    mainCheckout.innerHTML = "";
    localStorage.removeItem("basket");
    mainCheckout.innerHTML = "<p>Order succesful</p>"
    mainCheckout.classList.add("opacity")
  }, 300)

}


// working solution


// document.getElementById("next").addEventListener("click", nextSlide)
// document.getElementById("pre").addEventListener("click", preSlide)

// let currentSlide = 0

// function nextSlide() {
//     if(currentSlide === 0){
//         /* From Fieldset */
//         document.getElementById("shippingAddress").classList.remove("slideToCenter")
//         document.getElementById("shippingAddress").classList.add("slideToLeft")
//         document.getElementById("billingAddress").classList.remove("slideToRight")
//         document.getElementById("billingAddress").classList.add("slideToCenter")
//         /* Buttons */
//         document.getElementById("pre").classList.remove("hide")
//         /* Indicator */
//         document.getElementById("indictor0").classList.remove("selectedIndictor")
//         document.getElementById("indictor1").classList.add("selectedIndictor")
//         /* Opdate current slide */
//         currentSlide = 1
//         return
//     }
//     if(currentSlide === 1){
//         /* From Fieldset */
//         document.getElementById("billingAddress").classList.remove("slideToCenter")
//         document.getElementById("billingAddress").classList.add("slideToLeft")
//         document.getElementById("creditCard").classList.remove("slideToRight")
//         document.getElementById("creditCard").classList.add("slideToCenter")
//         /* Buttons */
//         document.getElementById("next").classList.add("hide")
//         document.getElementById("subFormBtn").classList.remove("hide")
//         /* Indicator */
//         document.getElementById("indictor1").classList.remove("selectedIndictor")
//         document.getElementById("indictor2").classList.add("selectedIndictor")
//         /* Opdate current slide */
//         currentSlide = 2
//         return
//     }
// }

// function preSlide() {
//     if(currentSlide === 2){
//         /* From Fieldset */
//         document.getElementById("creditCard").classList.remove("slideToCenter")
//         document.getElementById("creditCard").classList.add("slideToRight")
//         document.getElementById("billingAddress").classList.add("slideToCenter")
//         document.getElementById("billingAddress").classList.remove("slideToLeft")
//         /* Buttons */
//         document.getElementById("next").classList.remove("hide")
//         document.getElementById("subFormBtn").classList.add("hide")
//         /* Indicator */
//         document.getElementById("indictor2").classList.remove("selectedIndictor")
//         document.getElementById("indictor1").classList.add("selectedIndictor")
//         /* Opdate current slide */
//         currentSlide = 1
//         return
//     }
//     if(currentSlide === 1){
//         /* From Fieldset */
//         document.getElementById("billingAddress").classList.remove("slideToCenter")
//         document.getElementById("billingAddress").classList.add("slideToRight")
//         document.getElementById("shippingAddress").classList.remove("slideToLeft")
//         document.getElementById("shippingAddress").classList.add("slideToCenter")
//         /* Buttons */
//         document.getElementById("next").classList.remove("hide")
//         document.getElementById("pre").classList.add("hide")
//         /* Indicator */
//         document.getElementById("indictor1").classList.remove("selectedIndictor")
//         document.getElementById("indictor0").classList.add("selectedIndictor")
//         /* Opdate current slide */
//         currentSlide = 0
//         return
//     }
// }