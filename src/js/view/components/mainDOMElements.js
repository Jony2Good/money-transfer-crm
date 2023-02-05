import { el, setChildren, mount } from "redom";
import logo from "../../../assets/image/logo.svg";

/**navbar container need for appending buttons*/
export function createNavContainer() {
  return el("nav.navbar.bg-body-tertiary.entry_logo.rounded-top");
}

/**navbar body with logo */
export function createNavBody() {
  return el(
    "div.container",
    el(
      "a.navbar-brand",
      { href: "#", target: "_blank" },
      el("img", { src: logo, alt: "logo" })
    )
  );
}
/**creation of a section with a logo and without buttons */
export function headerSection() {
  const nav = createNavBody();
  const navContainer = createNavContainer();
  setChildren(navContainer, nav);
  return navContainer;
}

/**block with a field for entering a login*/
export function createInput(className, type, placeholder, id, name) {
  return el("input", {
    class: `${className}`,
    type: `${type}`,
    placeholder: `${placeholder}`,
    id: `${id}`,
    name: `${name}`,
    autoComplete: "true",
  });
}

/**creating buttons in the navigation bar */
export function createButtons(router) {
  const wrap = el("div.d-flex");
  const list = el("ul.navbar-nav.flex-row");
  const arr = [];
  const btnsTxt = [
    { name: "ATMs", href: "/banks" },
    { name: "Accounts", href: "/accounts" },
    { name: "Currencies", href: "/exchange" },
    { name: "Log out", href: "/" },
  ];
  const itemsList = btnsTxt.map((item) => {
    const itemBlock = el("li.nav-item");
    const btn = createMainBtn(
      "btn js-btn-account me-3 btn-group descr",
      "button",
      item.name,
      {
        href: item.href,
        router: router,
      }
    );
    if (item.name == "Счета") btn.classList.add("js-active");
    setChildren(itemBlock, [btn]);
    arr.push(btn);
    return itemBlock;
  });
  setChildren(list, itemsList);
  setChildren(wrap, list);

  return { wrap, arr };
}

/**main white field*/
export function mainField() {
  return el("main.entry_field.rounded.shadow");
}

/**title constructor */
export function createTitleSection(tag, text, className) {
  return el(tag, `${text}`, {
    class: `${className}`,
  });
}

export function createBtn(text, iconClass) {
  const btn = document.createElement("button");
  const span = document.createElement("span");

  btn.classList.add("btn", "btn-primary", "descr", "btn-accounts");

  btn.innerHTML = text;
  span.classList.add("btn-accounts__icon", iconClass);

  btn.prepend(span);

  return btn;
}

/**all buttons constructor */
export function createMainBtn(
  className,
  type,
  text,
  attr = { href: "", router: null }
) {
  const btn = el(
    "button",
    {
      class: `btn ${className}`,
      type: `${type}` ?? "button",
    },
    text
  );
  if (attr.href && attr.router) {
    btn.addEventListener("click", () => {
      attr.router.navigate(attr.href);
    });
  }

  return btn;
}

export function createNavSection(router, btnStyle = "") {
  const btn = createButtons(router);
  const nav = createNavBody();
  const navContainer = createNavContainer();

  btn.arr.forEach((item) => {
    if (item.textContent === btnStyle) item.classList.add("btn-style");
    else item.classList.remove("btn-style");
  });

  mount(nav, btn.wrap);
  setChildren(navContainer, nav);

  return navContainer;
}

/**error messages & fields */
export function createErrorMSg(text) {
  const errorField = document.querySelector(".error-field");
  errorField.textContent = text;
  return errorField;
}

/**success mesages & fields */
export function createSuccessMSg(text) {
  const successField = document.querySelector(".success-field");
  if (successField == null) return false;
  successField.textContent = text;
  return successField;
}
