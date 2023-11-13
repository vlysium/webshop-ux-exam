"use strict";


const profiles = []
const baseUrl = "http://localhost:3000"
/* 
TODO:
    - Make it work with json server
    - Check json server first then session storage.
    - if user exsist in server and session storage then continue with check login info
    - if user exsist in server but not in session storage, then make a session storage once they login.
    - if user does not exsist in server but does exsist in session storage, then i dont know what to do
    - if user does not exsist in server and also dosent exsist in session storage, Then continue to check login and refer to signup
*/


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
if(document.querySelector("#formSubmitLogin")){
    document.querySelector("#formSubmitLogin").addEventListener('click', checkUserLogin) 
}

// For signup page
if(document.querySelector("#formSubmitSignup")){
        document.querySelector("#formSubmitSignup").addEventListener('click', checkUserSignup) 
}


/* ---------- LOGIN -------- */

/* Check if user entered the correct infomation */
/* This does not work as i completely forgot about adding the user to session storage
once they have logged in, and also i need to compare the login info with Json server not Session storage */
function checkUserLogin () {
    let form = event.target.form
    let login_email = form.login_email.value
    let login_password = form.login_password.value
    
    profiles.forEach((profile,i) =>{
        console.log(profile)
        if(profile.email === login_email && profile.password === login_password ){
            console.log("Welcome")
            const userInfo = {'email':profile.email}
            const jsonArray = JSON.stringify(userInfo);
            sessionStorage.setItem('user',jsonArray);
            window.location.href = "shop.html"
        }
        else{
            console.log("Wrong info, motherfucker!")
        }
    })

}



/* ---------- SIGN UP -------- */

function checkUserSignup (){
     let form = event.target.form
     let signup_email = form.signup_email.value
    let signup_password = form.signup_password.value
    let signup_repeat_password = form.signup_repeat_password.value
    // check id both password match
    if(matchPassword(signup_password,signup_repeat_password)){
    } else {
         console.log("false password")
         return
    }

    // if email already exist
    if(checkExistingUserMail (signup_email)){
    } else {
        console.log("false mail")
        return
    }
    
    
    // push new user to DB
    const newUser = {'email': signup_email, 'password':signup_password}
    postUserToDb(newUser)

    // add user to session
    // THIS DONT WORK FOR SOME REASON
    const userInfo = {'email':profile.email}
    const jsonArray = JSON.stringify(userInfo);
    sessionStorage.setItem('user',jsonArray);
    
    // redirect to shop.html
    window.location.href = "shop.html"

}

/* Check Password */
function matchPassword (signup_password,signup_repeat_password) {
       if(signup_password !== signup_repeat_password){
        document.querySelector("#password_match_issue").classList.remove("hidden")
        document.querySelector("#signup_password").classList.add("inputBorder")
        document.querySelector("#signup_repeat_password").classList.add("inputBorder")
        return false
    }
    document.querySelector("#password_match_issue").classList.add("hidden")
    document.querySelector("#signup_password").classList.remove("inputBorder")
    document.querySelector("#signup_repeat_password").classList.remove("inputBorder")
    return true
}

/* Check Email */
function checkExistingUserMail (signup_email) {
    let mailCheck;
   
    profiles.forEach((profile,i) =>{
        
        if(signup_email === profile.email){
            console.log("check mail", profile.email)
             document.querySelector("#email_exist_issue").classList.remove("hidden")
    document.querySelector("#signup_email").classList.add("inputBorder")
            mailCheck = true
        } 
    })
    
    if(mailCheck){
        return
    } 
        document.querySelector("#email_exist_issue").classList.add("hidden")
        document.querySelector("#signup_email").classList.remove("inputBorder")
    return true


}

async function postUserToDb (newUser){
    let url = baseUrl + '/profiles';
    let httpMethod = 'POST';

   const response = await fetch(url, {
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then((response) => { console.log(response); })
    .then((data) => { console.log(data); })
    .catch((error) => { console.log(error); });

}