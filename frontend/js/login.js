import { login } from "./funcs/auth.js";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  login();
});
