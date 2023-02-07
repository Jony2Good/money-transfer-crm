import { el, setChildren } from "redom";
import {
  mainField,
  createTitleSection,
} from "../components/mainDOMElements.js";
import { createBanksPoints } from "../../controllers/createMap.js";

export default function createBanksPage() {
  const container = mainField();
  const mapSection = el("section.container");
  const title = createTitleSection("h2", "ATMs map", "title mb-5");
  const map = el("div.container.banks-map", { id: "map" });

  createBanksPoints();

  setChildren(mapSection, [title, map]);
  setChildren(container, mapSection);

  return container;
}
