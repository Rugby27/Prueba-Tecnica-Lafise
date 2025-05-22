
const API_URL = "http://localhost:5566";

export async function fetchAllUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}


export async function fetchUser(userId) {
  const res = await fetch(`${API_URL}/users/${userId}`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function fetchAccount(accountId) {
  const res = await fetch(`${API_URL}/accounts/${accountId}`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function fetchTransactions(accountId) {
  const res = await fetch(`${API_URL}/accounts/${accountId}/transactions`);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}
