const openContactBtn = document.getElementById("openmodal");
const closeContactBtn = document.getElementById("closemodal");
const contactModal = document.getElementById("modal");

openContactBtn.addEventListener("click", () => {
    contactModal.classList.add("open");
});

closeContactBtn.addEventListener("click", () => {
    contactModal.classList.remove("open");
});



const openLoginBtn = document.getElementById("open-login-modal");
const closeLoginBtn = document.getElementById("close-login-modal");
const loginModal = document.getElementById("login-modal");

openLoginBtn.addEventListener("click", () => {
    loginModal.classList.add("open");
});

closeLoginBtn.addEventListener("click", () => {
    loginModal.classList.remove("open");
});




const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");

const formLogin = document.getElementById("loginForm");
const formRegister = document.getElementById("registerForm");

tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");

  formLogin.classList.add("active");
  formRegister.classList.remove("active");
});

tabRegister.addEventListener("click", () => {
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");

  formRegister.classList.add("active");
  formLogin.classList.remove("active");
});

