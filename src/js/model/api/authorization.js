export default async function authorization(login, password) {
  const data = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await data.json();

  response.payload
    ? sessionStorage.setItem("token", response.payload.token)
    : false;

  return response;
}
