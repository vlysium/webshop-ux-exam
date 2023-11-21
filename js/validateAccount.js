

/* Check If Password Matches */
export function matchPassword(signupPassword, signupRepeatPassword, profiles) {
  // Sammenligner brugers input af deres password, for at se om de matcher
  if (signupPassword !== signupRepeatPassword) {

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
  document.querySelector("#email-exist-issue").classList.add("hidden")
  document.querySelector("#signup-email").classList.remove("input-border")
  return true

}


export function invalidPassword(state, message) {
  if (state) {
    document.querySelector("#password-match-issue").classList.remove("hidden")
    document.querySelector("#password-match-issue").textContent = message
    document.querySelector("#signup-password").classList.add("input-border")
    document.querySelector("#signup-repeat-password").classList.add("input-border")
  } else {
    document.querySelector("#password-match-issue").classList.add("hidden")
    document.querySelector("#signup-password").classList.remove("input-border")
    document.querySelector("#signup-repeat-password").classList.remove("input-border")
  }
}


export function invalidEmail(state, message) {
  if (state) {
    document.querySelector("#email-exist-issue").classList.remove("hidden")
    document.querySelector("#email-exist-issue").textContent = message
    // vi gir input feltet for email noget styling
    document.querySelector("#signup-email").classList.add("input-border")
  } else {
    document.querySelector("#email-exist-issue").classList.add("hidden")
    document.querySelector("#signup-email").classList.remove("input-border")
  }
}

