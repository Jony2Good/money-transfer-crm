export default function getAccount(token, id) {
  return fetch(`http://localhost:3000/account/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.payload);
}
