
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
  if (pass.value !== confirmpass.value) {
    console.log("");
    e.preventDefault();
    document.getElementById("error").innerText = "Passwords do not match";
  }
});

document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("lpassword").value;

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("status", "logged-in");
        sessionStorage.setItem("email", email);
        window.location.href = "/home.html";
      } else {
        document.getElementById("loginerror").innerText =
          "Incorrect username or password";
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

function postwith(to, p) {
  var myForm = document.createElement("form");
  myForm.method = "post";
  myForm.action = to;
  for (var k in p) {
    var myInput = document.createElement("input");
    myInput.setAttribute("name", k);
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput);
  }
  document.body.appendChild(myForm);
  myForm.submit();
  document.body.removeChild(myForm);
}

document.getElementById("register").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("remail").value;
  const password = document.getElementById("rpassword").value;

  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.exists) {
        if (data.success) {
          localStorage.setItem("status", "logged-in");
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("name", name);
          window.location.href = "/home.html";
        }
      } else {
        document.getElementById("exists").innerText = "User already exists";
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
