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
  const curriculumLink = document.getElementById("curriculum-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (isLoggedIn) {
    loginIcon.classList.add("flipped");
    
    loginBtn.innerHTML = '<i class="material-symbols-outlined login-icon flipped">login</i>Odjava';

    if (curriculumLink) {
      curriculumLink.style.display = "inline-block";
    }
    
    loginBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("jwtToken");
      toggleLoginLogout();
      alert("Uspješno ste se odjavili!");
    };
  } else {
    loginBtn.innerHTML = '<i class="material-symbols-outlined login-icon">login</i>Prijava';

    if (curriculumLink) {
      curriculumLink.style.display = "none";
    }
    
    loginBtn.onclick = () => {
      loginModal.classList.add("open");
    };
  }
}

//Login form submission handler
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  
  console.log("Attempting login with:", username);
  
  try {
    const response = await fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        username: username, 
        password: password 
      })
    });
    
    const data = await response.json();
    console.log("Server response:", data);
    
    if (data.isSuccess && data.data && data.data.token) {

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("jwtToken", data.data.token);
      
      loginModal.classList.remove("open");
      toggleLoginLogout();
      alert("Uspješno ste se prijavili!");
      formLogin.reset();
    } else {

      const errorMsg = data.errorMessages ? data.errorMessages[0] : "Prijava nije uspjela!";
      alert(errorMsg);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Došlo je do greške pri prijavi!");
  }
});

//Register form submission handler
formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  
  console.log("Attempting registration with:", username);
  
  try {
    const response = await fetch("https://www.fulek.com/data/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        username: username, 
        password: password 
      })
    });
    
    const data = await response.json();
    console.log("Register response:", data);
    
    if (data.isSuccess) {
      alert("Uspješno ste se registrirali! Sada se možete prijaviti.");
      tabLogin.click();
      formRegister.reset();
    } else {
      const errorMsg = data.errorMessages ? data.errorMessages[0] : "Registracija nije uspjela!";
      alert(errorMsg);
    }
  } catch (error) {
    console.error("Register error:", error);
    alert("Došlo je do greške pri registraciji!");
  }
});

toggleLoginLogout();