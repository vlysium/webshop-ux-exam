"use strict";
import {matchPassword, validatePassword, validateEmail, checkExistingUserMail, invalidPassword, invalidEmail} from "./validateAccount.js"

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
if (document.querySelector("#formSubmitLogin")) {
  document.querySelector("#formSubmitLogin").addEventListener('click', checkUserLogin)
}

// For signup page
if (document.querySelector("#formSubmitSignup")) {
  document.querySelector("#formSubmitSignup").addEventListener('click', checkUserSignup)
}


/* ---------- LOGIN -------- */

/* Check if user entered the correct infomation */
/* This does not work as i completely forgot about adding the user to session storage
once they have logged in, and also i need to compare the login info with Json server not Session storage */
function checkUserLogin() {
  let form = event.target.form
  let login_email = form.login_email.value
  let login_password = form.login_password.value

  profiles.forEach((profile, i) => {
    console.log(profile)
    if (profile.email === login_email && profile.password === login_password) {
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

function checkUserSignup() {
  let form = event.target.form
  let signup_email = form.signup_email.value
  let signup_password = form.signup_password.value
  let signup_repeat_password = form.signup_repeat_password.value
  
  // if email already exist
  if (checkExistingUserMail(signup_email, profiles)) {
  } else {
    console.log("false mail")
    return
  }
  if(!(validateEmail(signup_email))){
    invalidEmail(true, "Starts with one or more word characters, hyphens, or dots. Followed by the at symbol (@). Followed by one or more groups of subdomains, each containing word characters, hyphens, and a dot. Ends with a top-level domain (TLD) containing between 2 and 4 word characters")
    return
  } else{
    invalidEmail(false)
  }

  // check id both password match
  if (matchPassword(signup_password, signup_repeat_password, profiles)) {
  } else {
    console.log("false password")
    return
  }
   if(!validatePassword(signup_password)){
    console.log("invalid password")
    invalidPassword(true, "At least one digit. At least one lowercase letter. At least one uppercase letter. At least one letter (either uppercase or lowercase). A minimum length of 8 characters.")
    return
  } else{
    invalidPassword(false)
  }
  // push new user to DB
  const newUser = { 'email': signup_email, 'password': signup_password }
  postUserToDb(newUser)

  // add user to session
  const userInfo = { 'email': signup_email }
  const jsonArray = JSON.stringify(userInfo);
  sessionStorage.setItem('user', jsonArray);

  // redirect to shop.html
  window.location.href = "shop.html"

}




// Send data om ny bruge til Json Server
async function postUserToDb(newUser) {
  // link til server
  let url = baseUrl + '/profiles';
  // post da vi sender data
  let httpMethod = 'POST';

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

