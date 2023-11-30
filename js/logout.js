"use strict";

/* if(!sessionStorage.getItem("user")){
  window.location.href = "index.html"
} */


document.querySelector("#logout").addEventListener("click", logout)

// Removes sessionStorage from the user upon logout
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html" // Redirect to index.html on logout
}