import { validationInputs } from "./validation.js";
export function checkInputsValue(inputOne, inputTwo, btn, msg) {
  const valid = {
    inputFirst: false,
    inputSecond: false,
  };

  [inputOne, inputTwo].forEach((elem) =>
    elem.addEventListener("input", (e) => {
      unsetValid(e.target);
    })
  );

  inputOne.addEventListener("blur", (e) => {
    valid.inputFirst = validationInputs(e.target.value);
    setValid(e.target, valid.inputFirst);
  });

  inputTwo.addEventListener("blur", (e) => {
    valid.inputSecond = validationInputs(e.target.value);
    setValid(e.target, valid.inputSecond);
  });

  function setValid(target, value) {
    if (value) {
      target.classList.add("is-valid");
    } else {
      target.classList.add("is-invalid");
      createErrorMSg(msg).style.visibility = "visible";
    }
    setButtonDisable(false);
  }

  function unsetValid(target) {
    target.classList.remove("is-valid");
    target.classList.remove("is-invalid");
    createErrorMSg(msg).style.visibility = "hidden";
    setButtonDisable(true);
  }
  function setButtonDisable(state) {
    btn.disabled = state || Object.values(valid).includes(false);
  }
}

/**сообщение об ошибке */
export function createErrorMSg(text) {
  const errorField = document.querySelector(".error-field");
  errorField.textContent = text;
  return errorField;
}
