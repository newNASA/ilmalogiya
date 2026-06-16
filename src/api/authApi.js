const BASE = import.meta.env.VITE_API_BASE_URL;

function getTokens() {
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
  };
}

function saveTokens(access, refresh) {
  localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
}

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function refreshAccessToken() {
  const { refresh } = getTokens();
  if (!refresh) return null;

  const res = await fetch(`${BASE}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) { clearTokens(); return null; }
  const data = await res.json();
  saveTokens(data.access, null);
  return data.access;
}

async function authFetch(url, options = {}) {
  let { access } = getTokens();
  const doRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

  let res = await doRequest(access);
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return res;
    res = await doRequest(newToken);
  }
  return res;
}

export async function loginWithGoogle(idToken) {
  const res = await fetch(`${BASE}/auth/google/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  if (!res.ok) throw new Error("Login xatoligi");
  const data = await res.json();
  saveTokens(data.access, data.refresh);
  return data.user;
}

export function logout() {
  clearTokens();
}

export async function getProfile() {
  const res = await authFetch(`${BASE}/auth/me/`);
  if (!res.ok) return null;
  return res.json();
}

export async function getSavedItems() {
  const res = await authFetch(`${BASE}/auth/me/saved/`);
  if (!res.ok) return null;
  return res.json();
}

export async function savePost(postId) {
  const res = await authFetch(`${BASE}/auth/me/saved/posts/`, {
    method: "POST",
    body: JSON.stringify({ post_id: postId }),
  });
  return res.ok;
}

export async function unsavePost(postId) {
  const res = await authFetch(`${BASE}/auth/me/saved/posts/`, {
    method: "DELETE",
    body: JSON.stringify({ post_id: postId }),
  });
  return res.ok;
}

export async function saveQuote(quoteId) {
  const res = await authFetch(`${BASE}/auth/me/saved/quotes/`, {
    method: "POST",
    body: JSON.stringify({ quote_id: quoteId }),
  });
  return res.ok;
}

export async function unsaveQuote(quoteId) {
  const res = await authFetch(`${BASE}/auth/me/saved/quotes/`, {
    method: "DELETE",
    body: JSON.stringify({ quote_id: quoteId }),
  });
  return res.ok;
}

export function hasToken() {
  return !!localStorage.getItem("access_token");
}
