import { BASE_URL } from "../../../config/env";

const REQUEST_TIMEOUT_MS = 15000;

async function request(path, payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload || {}),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      throw new Error("Server took too long to respond.");
    }
    throw new Error("Unable to reach server.");
  } finally {
    clearTimeout(timeoutId);
  }

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    const message = data?.error || "Request failed";
    throw new Error(message);
  }

  return data;
}

export function registerUser(payload) {
  return request("/api/auth/register", payload);
}

export function loginUser(payload) {
  return request("/api/auth/login", payload);
}
