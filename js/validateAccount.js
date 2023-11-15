

/* Check If Password Matches */
export function matchPassword(signup_password, signup_repeat_password, profiles) {
  // Sammenligner brugers input af deres password, for at se om de matcher
  if (signup_password !== signup_repeat_password) {

    invalidPassword(true, "Both Password Most Match")
    return false
  }

  return true
}

export function validatePassword(userInput) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/.test(userInput);
}

export function validateEmail(userInput) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInput);
}


/* Check Email */
export function checkExistingUserMail(signup_email, profiles) {

  let mailCheck;

  // loop igennem alle shoppens profiler
  profiles.forEach((profile, i) => {
    // For hver profil sammeligner vi den nye email med de nuværende bruges email
    if (signup_email === profile.email) {
      console.log(signup_email)
      invalidEmail(true, "User Email Already Exist")
      mailCheck = true
      return
    }
  })
  if (mailCheck) {
    // exit funktion
    return false
  }
  // hvis den nye e-mail er unik. 
  document.querySelector("#email_exist_issue").classList.add("hidden")
  document.querySelector("#signup_email").classList.remove("inputBorder")
  return true

}


export function invalidPassword(state, message) {
  if (state) {
    document.querySelector("#password_match_issue").classList.remove("hidden")
    document.querySelector("#password_match_issue").textContent = message
    document.querySelector("#signup_password").classList.add("inputBorder")
    document.querySelector("#signup_repeat_password").classList.add("inputBorder")
  } else {
    document.querySelector("#password_match_issue").classList.add("hidden")
    document.querySelector("#signup_password").classList.remove("inputBorder")
    document.querySelector("#signup_repeat_password").classList.remove("inputBorder")
  }
}


export function invalidEmail(state, message) {
  if (state) {
    document.querySelector("#email_exist_issue").classList.remove("hidden")
    document.querySelector("#email_exist_issue").textContent = message
    // vi gir input feltet for email noget styling
    document.querySelector("#signup_email").classList.add("inputBorder")
  } else {
    document.querySelector("#email_exist_issue").classList.add("hidden")
    document.querySelector("#signup_email").classList.remove("inputBorder")
  }
}