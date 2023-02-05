import validator from "validator";
import { createErrorMSg } from "../components/mainDOMElements.js";
import makeUserMessages from "../components/userMessages.js";

function checkLength(value) {
  return validator.isLength(value, { min: 6 });
}

function checkSpaces(value) {
  return validator.contains(value, " ");
}

export function userAvtorization(value) {
  const validateLength = checkLength(value);
  const validateSpaces = checkSpaces(value);

  if (validateLength == false || validateSpaces == true || value <= 0) {
    return false;
  } else {
    return true;
  }
}

function checkAccountLength(value) {
  return (
    validator.isInt(value) &&
    validator.isEmpty(value) == false &&
    value.indexOf("-")
  );
}

export function validationInputs(value) {
  const validInputs = checkAccountLength(value);
  const validateSpaces = checkSpaces(value);

  if (validInputs == false || validateSpaces == true || value <= 0)
    return false;
  else {
    return true;
  }
}

/**validating inputs, creating fields, and displaying an error message */
export function checkUserAvtorization() {
  const inputPas = document.querySelector(".js-pass");
  const inputLogo = document.querySelector(".js-logo");
  const btn = document.querySelector(".js-btn");

  const valid = {
    logo: false,
    password: false,
  };

  [inputPas, inputLogo].forEach((elem) =>
    elem.addEventListener("input", (e) => {
      unsetValid(e.target);
    })
  );

  inputPas.addEventListener("blur", (e) => {
    valid.password = userAvtorization(e.target.value);
    setValid(e.target, valid.password, "Enter at least 6 characters");
  });

  inputLogo.addEventListener("blur", (e) => {
    valid.logo = userAvtorization(e.target.value);
    setValid(e.target, valid.logo);
  });

  function setValid(target, value) {
    if (value) {
      target.classList.add("is-valid");
    } else {
      target.classList.add("is-invalid");
      createErrorMSg("Enter at least 6 characters").style.visibility =
        "visible";
    }
    setButtonDisable(false);
  }

  function unsetValid(target) {
    target.classList.remove("is-valid");
    target.classList.remove("is-invalid");
    createErrorMSg("Enter at least 6 characters").style.visibility = "hidden";
    setButtonDisable(true);
  }
  function setButtonDisable(state) {
    btn.disabled = state || Object.values(valid).includes(false);
  }
}

export function checkExchangeField(input, btn, field) {
  const valid = {
    field: false,
  };
  input.addEventListener("input", (e) => {
    unsetValid(e.target);
  });

  input.addEventListener("blur", (e) => {
    valid.field = validationInputs(e.target.value);
    setValid(e.target, valid.field);
  });

  function setValid(target, value) {
    if (value) {
      target.classList.add("is-valid");
    } else {
      target.classList.add("is-invalid");
      makeUserMessages(field, "Error in the amount input field", "error-icon");
    }
    setButtonDisable(false);
  }

  function unsetValid(target) {
    target.classList.remove("is-valid");
    target.classList.remove("is-invalid");
    setButtonDisable(true);
  }
  function setButtonDisable(state) {
    btn.disabled = state || Object.values(valid).includes(false);
  }
}
