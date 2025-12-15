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

//Login alertovi i odjava

function toggleLoginLogout() {
  const loginBtn = document.getElementById("open-login-modal");
  const loginIcon = loginBtn.querySelector(".login-icon");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (isLoggedIn) {
    loginIcon.classList.add("flipped");
    
    loginBtn.innerHTML = '<i class="material-symbols-outlined login-icon flipped">login</i>Odjava';
    
    loginBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      toggleLoginLogout();
      alert("Uspješno ste se odjavili!");
    };
  } else {
    loginBtn.innerHTML = '<i class="material-symbols-outlined login-icon">login</i>Prijava';
    
    loginBtn.onclick = () => {
      loginModal.classList.add("open");
    };
  }
}

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const username = document.getElementById("login-username").value;
  
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);
  
  loginModal.classList.remove("open");
  toggleLoginLogout();
  alert("Uspješno ste se prijavili!");
  
  formLogin.reset();
});

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const username = document.getElementById("reg-username").value;
  
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);
  
  loginModal.classList.remove("open");
  toggleLoginLogout();
  alert("Uspješno ste se registrirali i prijavili!");
  
  formRegister.reset();
});

toggleLoginLogout();