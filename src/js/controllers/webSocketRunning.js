import { el } from "redom";
import { createExchangeList } from "../view/app/exchangePage.js";

export function startSocketSession() {
  const list = el("ul.list-group.currencies-list.currencies-list--right.pe-3");

  const socket = new WebSocket("ws://localhost:3000/currency-feed");
  socket.addEventListener("open", function () {
    socket.send("Are there changes?");
  });

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    if (data.type == "EXCHANGE_RATE_CHANGE") {
      createExchangeList(data, list);
    }
  };

  return list;
}
