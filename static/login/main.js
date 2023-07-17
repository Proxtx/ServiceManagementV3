import { meta } from "../lib/apiLoader.js";

const password = document.getElementById("password");
const login = document.getElementById("login");

login.addEventListener("click", async () => {
  if (await meta.auth(password.component.value)) {
    cookie.pwd = password.component.value;
    location.pathname = "/";
  }
  password.component.value = "";
});
