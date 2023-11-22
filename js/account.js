"use strict";
import { matchPassword, validateEmail, checkExistingUserMail, invalidPassword, invalidEmail, validatePasswordLowerUpperCase, validatePasswordSpecialNumber, validatePasswordLength} from "./validateAccount.js"
const profiles = []
const baseUrl = "http://localhost:3000"


// Get profiles from DB

async function getProfiles() {
  const response = await fetch(`${baseUrl}/profiles`);
  const allProfilesJSON = await response.json();
  profiles.push(...allProfilesJSON);
}

getProfiles()

/* ---------- EventListeners ---------- */

// For login page
if (document.querySelector("#form-submit-login")) {
  document.querySelector("#form-submit-login").addEventListener('click', checkUserLogin)
}

// For signup page
if (document.querySelector("#form-submit-signup")) {
  document.querySelector("#form-submit-signup").addEventListener('click', checkUserSignup)
}


/* ---------- LOGIN -------- */

/* Check if user entered the correct infomation */
/* This does not work as i completely forgot about adding the user to session storage
once they have logged in, and also i need to compare the login info with Json server not Session storage */
function checkUserLogin(event) {
  event.preventDefault()
  const form = event.target.form
  const loginEmail = form.login_email.value
  const loginPassword = form.login_password.value

  // profiles.forEach((profile, i) => {
  //   if (profile.email === loginEmail && profile.password === loginPassword) {
  //     const userInfo = { "email": profile.email }
  //     const jsonArray = JSON.stringify(userInfo);
  //     sessionStorage.setItem("user", jsonArray);
  //     window.location.href = "shop.html"
  //   }
  //   else {
    
  //   }

  // })

  const userAccount = profiles.filter((profile) => {
    return profile.email === loginEmail && profile.password === loginPassword
  });

  if (userAccount.length === 1) {
    //console.log(userAccount)
    const userInfo = { "email": userAccount[0].email }
    const jsonArray = JSON.stringify(userInfo);
    sessionStorage.setItem("user", jsonArray);
    document.querySelectorAll("input").forEach(e=>{e.classList.remove("input-border")})
    document.getElementById("login-error-message").classList.add("hide")
    window.location.href = "shop.html";
    console.log(userInfo)
  } else {
    document.querySelectorAll("input").forEach(e=>{e.classList.add("input-border")})
    btnAppear("login-error-message")
  }
 
}
/* ---------- SIGN UP -------- */

function checkUserSignup(event) {
  event.preventDefault()
  const form = event.target.form
  const signupEmail = form.signup_email.value
  const signupPassword = form.signup_password.value
  const signupRepeatPassword = form.signup_repeat_password.value

  // if email already exist
  if (checkExistingUserMail(signupEmail, profiles)) {
  } else {
    //console.log("false mail")
    return
  }

  // Tjekker om emailen indeholder de rigtige email tegn
  if (!(validateEmail(signupEmail))) {
    invalidEmail(true, "Starts with one or more word characters, hyphens, or dots. Followed by the at symbol (@). Followed by one or more groups of subdomains, each containing word characters, hyphens, and a dot. Ends with a top-level domain (TLD) containing between 2 and 4 word characters")
    return
  } else {
    invalidEmail(false)
  }

  // check id both password match
  if (matchPassword(signupPassword, signupRepeatPassword, profiles)) {
  } else {
    //console.log("false password")
    return
  }

  // Tjekker om længden er mellem 8-20 karakterer lang, hvis ikke send error besked
  if (!validatePasswordLength(signupPassword)){
    invalidPassword(true, "Password must be between 8 to 20 characters long.");
    return
  }  else {
    invalidPassword(false)
 }

  // Tjekker om der er min. 1 lowercase + uppercase, hvis ikke send error besked
  if(!validatePasswordLowerUpperCase(signupPassword)){
    invalidPassword(true, "Password must contain one uppercase letter and one lowercase letter.");
    return
  }  else {
    invalidPassword(false)
 }

   // Tjekker om 
  if(!validatePasswordSpecialNumber(signupPassword)) {
    invalidPassword(true, "Password must contain one special character and one number.");
    return
  }  else {
    invalidPassword(false)
 }

  // push new user to DB
  const newUser = { "email": signupEmail, "password": signupPassword }
  postUserToDb(newUser)

  // add user to session
  const userInfo = { "email": signupEmail }
  const jsonArray = JSON.stringify(userInfo);
  sessionStorage.setItem("user", jsonArray);

  // redirect to shop.html
  window.location.href = "shop.html"

}




// Send data om ny bruge til Json Server
async function postUserToDb(newUser) {
  // link til server
  const url = baseUrl + "/profiles";
  // post da vi sender data
  const httpMethod = "POST";

  // Fetch
  const response = await fetch(url, {
    method: httpMethod,
    // fortæller hvilken type data vi sender
    headers: {
      "Content-Type": "application/json"
    },
    // stringify lave vores objekt om til en string så vi kan send den til json server
    body: JSON.stringify(newUser)
  }).then((response) => { console.log(response); })
    .then((data) => { console.log(data); })
    // sender en error in consolen hvis der skulle ske noget.
    .catch((error) => { console.log(error); });
}


// Animation Appear
 function btnAppear(el) {
  document.getElementById(el).classList.remove("opacity")
  document.getElementById(el).classList.remove("hide")
  setTimeout(() => {
    document.getElementById(el).classList.add("opacity")
  }, 1)
  return
}