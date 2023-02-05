export default function getMyCurrencies(token) {
  return fetch(`http://localhost:3000/currencies`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.payload);
}
