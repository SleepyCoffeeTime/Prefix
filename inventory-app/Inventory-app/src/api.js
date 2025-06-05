const API_URL = 'http://localhost:3000';

export async function signupUser(data) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getItems() {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
}

export async function getItemById(id) {
  const res = await fetch(`${API_URL}/items/${id}`);
  return res.json();
}

export async function createItem(data) {
  const res = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
