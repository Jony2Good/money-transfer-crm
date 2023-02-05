/**messages & fields */
export default function makeUserMessages(field, text, className) {
  field.textContent = text;
  field.classList.add(className);
  setTimeout(() => {
    field.textContent = "";
    field.classList.remove(className);
  }, 3000);
}
