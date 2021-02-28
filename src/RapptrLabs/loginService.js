export async function handleLoginAPI(data = {}) {
  const url = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return response.json();
}
