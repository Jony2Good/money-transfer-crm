import { el, setChildren } from "redom";
import logo from "../../../assets/image/logo.svg";
import {
  createInput,
  createTitleSection,
  createMainBtn,
  mainField,
} from "../components/mainDOMElements";

/**main field with logo */
export function createMainField() {
  return el(
    ".entry_field.rounded",
    el(".entry_logo.shadow.rounded-top", el("img", { src: logo, alt: "logo" }))
  );
}

/**empty form */
function createForm() {
  return el(
    "form.entry_form",
    el("span.error-field.error-field--layout.error-field-auth.descr"),
    createTitleSection("h2", "Sign in", "text-center mb-3 title")
  );
}

/**block with a field for entering a login */
function createInputLogin() {
  return el("div.row.mb-3", [
    el("label.col-sm-3.col-form-label.descr", { for: "inputLogo" }, "Login"),
    el(
      "div.col-sm-9",
      createInput(
        "form-control js-logo entry_field-color",
        "text",
        "Enter login",
        "inputLogo",
        "login"
      )
    ),
  ]);
}

/**block with a field for entering a password */
function createInputPassword() {
  return el(".row.mb-3", [
    el("label.col-sm-3.col-form-label.descr", { for: "inputPas" }, "Password"),
    el(
      "div.col-sm-9",
      createInput(
        "form-control js-pass entry_field-color",
        "password",
        "Enter password",
        "inputPas",
        "password"
      )
    ),
  ]);
}

/**button block */
function createEntryButton() {
  const btn = createMainBtn(
    "btn btn-primary js-btn entry_btn",
    "submit",
    "Sign in"
  );
  btn.disabled = true;
  return el(
    "div.row",
    el("div.col-sm-3.col-form-label"),
    el("div.col-sm-9", btn)
  );
}

/**creating an authorization page, the function returns the main field */
export function createEntryPage() {
  const main = mainField();
  const form = createForm();
  const inputLogo = createInputLogin();
  const inputPass = createInputPassword();
  const btn = createEntryButton();

  form.append(inputLogo, inputPass, btn);
  setChildren(main, form);

  return main;
}
