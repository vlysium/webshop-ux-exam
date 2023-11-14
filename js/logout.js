"use strict";

/* if(!sessionStorage.getItem("user")){
  window.location.href = "index.html"
} */


document.querySelector("#logout").addEventListener("click", logout)

function logout() {
  sessionStorage.removeItem('user');
  window.location.href = "index.html"
}