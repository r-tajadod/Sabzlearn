import { register } from "./funcs/auth.js";

const formRegister = document.querySelector("#form-register");

formRegister.addEventListener("submit", (event) => {
  event.preventDefault();
  register();
});
