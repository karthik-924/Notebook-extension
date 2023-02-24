const login = document.getElementById("login");
const register = document.getElementById("register");
const link = document.getElementById("link");
link.addEventListener("click", () => {
  login.style.display = "none";
  register.style.display = "flex";
});
const loginlink = document.getElementById("loginlink");
loginlink.addEventListener("click", () => {
  login.style.display = "flex";
  register.style.display = "none";
});
const pass = document.getElementById("rpassword");
const confirmpass = document.getElementById("crpassword");
const submit = document.getElementById("register");
submit.addEventListener("submit", (e) => {
  console.log("Working", pass.value, confirmpass.value);
  if (pass.value !== confirmpass.value) {
    console.log("");
    e.preventDefault();
    document.getElementById("error").innerText = "Passwords do not match";
  }
});
