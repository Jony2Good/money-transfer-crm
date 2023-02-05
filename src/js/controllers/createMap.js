import getCoordinates from "../model/api/getCoordinates";
import ymaps from "ymaps";

function createBanksMap(data) {
  ymaps
    .load(
      "https://api-maps.yandex.ru/2.1/?apikey=0c61dc80-6967-49f4-b0be-8b4ff68d5dda&load=package.standard&lang=ru-RU'"
    )
    .then((maps) => {
      maps.ready(function () {
        var myMap = new maps.Map("map", {
          center: [55.750121480776485, 37.59909037548824],
          zoom: 13,
          controls: ["searchControl", "typeSelector", "trafficControl"],
        });

        data.forEach((item) => {
          const placemark = new maps.Placemark([item.lat, item.lon]);
          myMap.geoObjects.add(placemark);
        });
      });
    });
}

export function createBanksPoints() {
  const token = sessionStorage.getItem("token");
  getCoordinates(token).then((res) => {
    if (res !== null) createBanksMap(res);
  });
}
