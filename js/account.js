"use strict";
import { matchPassword, validatePassword, validateEmail, checkExistingUserMail, invalidPassword, invalidEmail } from "./validateAccount.js"

const profiles = []
const baseUrl = "http://localhost:3000"


// Get profiles from DB

async function getProfiles() {
  const response = await fetch(`${baseUrl}/profiles`);
  const allProfilesJSON = await response.json();
  profiles.push(...allProfilesJSON);
  console.log(profiles)
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

  profiles.forEach((profile, i) => {
    console.log(profile)
    if (profile.email === loginEmail && profile.password === loginPassword) {
      console.log("Welcome")
      const userInfo = { 'email': profile.email }
      const jsonArray = JSON.stringify(userInfo);
      sessionStorage.setItem('user', jsonArray);
      window.location.href = "shop.html"
    }
    else {
      console.log("Wrong info, motherfucker!")
    }
  })
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
    console.log("false mail")
    return
  }
  if (!(validateEmail(signupEmail))) {
    invalidEmail(true, "Starts with one or more word characters, hyphens, or dots. Followed by the at symbol (@). Followed by one or more groups of subdomains, each containing word characters, hyphens, and a dot. Ends with a top-level domain (TLD) containing between 2 and 4 word characters")
    return
  } else {
    invalidEmail(false)
  }

  // check id both password match
  if (matchPassword(signupPassword, signupRepeatPassword, profiles)) {
  } else {
    console.log("false password")
    return
  }
  if (!validatePassword(signupPassword)) {
    console.log("invalid password")
    invalidPassword(true, "At least one digit. At least one lowercase letter. At least one uppercase letter. At least one letter (either uppercase or lowercase). A minimum length of 8 characters.")
    return
  } else {
    invalidPassword(false)
  }
  // push new user to DB
  const newUser = { 'email': signupEmail, 'password': signupPassword }
  postUserToDb(newUser)

  // add user to session
  const userInfo = { 'email': signupEmail }
  const jsonArray = JSON.stringify(userInfo);
  sessionStorage.setItem('user', jsonArray);

  // redirect to shop.html
  window.location.href = "shop.html"

}




// Send data om ny bruge til Json Server
async function postUserToDb(newUser) {
  // link til server
  const url = baseUrl + '/profiles';
  // post da vi sender data
  const httpMethod = 'POST';

  // Fetch
  const response = await fetch(url, {
    method: httpMethod,
    // fortæller hvilken type data vi sender
    headers: {
      'Content-Type': 'application/json'
    },
    // stringify lave vores objekt om til en string så vi kan send den til json server
    body: JSON.stringify(newUser)
  }).then((response) => { console.log(response); })
    .then((data) => { console.log(data); })
    // sender en error in consolen hvis der skulle ske noget.
    .catch((error) => { console.log(error); });

}


// Virker ikke helt men ift. at skifte farve hvis den lever op til password krav
/* window.location.pathname.includes("signup.html") && function() {
  const inputPassword = document.querySelector("#signup-password");
  const lenght = document.querySelector("#lenght");

  inputPassword.onkeyup = function() {
    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    if(inputPassword.value.match(lowerCaseLetters)) {  
      lenght.classList.remove("invalid");
      lenght.classList.add("valid");
    } else {
      lenght.classList.remove("valid");
      lenght.classList.add("invalid");
    }
  }
}
 */