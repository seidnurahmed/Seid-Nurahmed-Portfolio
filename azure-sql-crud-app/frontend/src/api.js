const base = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export async function listItems() {
  const res = await fetch(`${base}/items`);
  return res.json();
}

export async function createItem(payload) {
  const res = await fetch(`${base}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateItem(id, payload) {
  const res = await fetch(`${base}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteItem(id) {
  await fetch(`${base}/items/${id}`, { method: "DELETE" });
}
