import {
  isValidLength,
  isContainedSpaces,
  isValidAccount,
} from "../src/js/view/utils/validation-test.js";

test("Проверка логина должна пропускать значения больше 6 символов", () => {
  expect(isValidLength("6666666")).toBe(true);
});

test("Проверка логина не должна пропускать значение с пробелами", () => {
  expect(isContainedSpaces("66 6666")).toBe(true);
});

test("Проверка логина не должна пропускать значения меньше 6 символов", () => {
  expect(isValidLength("99999")).toBe(false);
});

test("Проверка номера счета не пропускает пустую строку, с пробелами, не состоящую только из цифр или равную нулю", () => {
  expect(isValidAccount("900 000 000")).toBe(false);
  expect(isValidAccount("0")).toBe(false);
  expect(isValidAccount("asdf")).toBe(false);
  expect(isValidAccount("")).toBe(false);
});
