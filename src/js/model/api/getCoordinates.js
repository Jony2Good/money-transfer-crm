export default function getCoordinates(token) {
  return fetch(`http://localhost:3000/banks`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.payload);
}
