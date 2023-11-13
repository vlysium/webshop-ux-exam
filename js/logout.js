"use strict";

document.querySelector("#logout").addEventListener("click", logout)

function logout(){
     sessionStorage.removeItem('user');
     window.location.href = "index.html"
}