export default function sendTransfer(from, to, amount, token) {
  return fetch("http://localhost:3000/transfer-funds", {
    method: "POST",
    body: JSON.stringify({
      from: from,
      to: to,
      amount: amount,
    }),
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
