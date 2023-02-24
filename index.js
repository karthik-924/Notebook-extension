console.log("Hello World");
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

document.getElementById('login').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('lpassword').value;
    
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('status','logged-in');
            window.location.href = '/home.html';
        }
    })
    .catch(error => {
      console.error(error);
    });
  });
  