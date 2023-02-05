import authorization from "../model/api/authorization.js";
import { createErrorMSg } from "../view/components/mainDOMElements.js";

/**authorizes the user, sending the login/password to the server,
 * receiving a response, going to the account page*/
export default function makeAuthorization(router) {
  const form = document.querySelector(".entry_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = document.querySelector(".js-logo").value.trim();
    const password = document.querySelector(".js-pass").value.trim();

    authorization(login, password).then((data) => {
      if (data.payload === null) {
        if (data.error == "No such user") {
          createErrorMSg(data.error).style.visibility = "visible";
        }
        if (data.error == "Invalid password") {
          createErrorMSg(data.error).style.visibility = "visible";
        }
      } else {
        router.navigate("/accounts");
      }
    });
  });
}
