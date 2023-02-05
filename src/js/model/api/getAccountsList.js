export default async function getAccountsList(token) {
  const res = await fetch("http://localhost:3000/accounts", {
    method: "GET",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
  });
  return (await res.json()).payload || [];
}
