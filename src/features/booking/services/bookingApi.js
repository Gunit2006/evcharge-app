import { BASE_URL } from "../../../config/env";

const REQUEST_TIMEOUT_MS = 10000;

const bookingSyncListeners = new Set();

export class BookingApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "BookingApiError";
    this.status = status;
    this.payload = payload;
  }
}

export function subscribeBookingSync(listener) {
  bookingSyncListeners.add(listener);
  return () => bookingSyncListeners.delete(listener);
}

export function notifyBookingSync(payload) {
  bookingSyncListeners.forEach((listener) => {
    try {
      listener(payload);
    } catch (err) {
      // Ignore listener errors to avoid breaking other subscribers.
    }
  });
}

async function request(path, { token, method = "GET", body, onUnauthorized } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      throw new BookingApiError("Server took too long to respond.", 408, null);
    }
    throw new BookingApiError("Unable to reach server.", 0, null);
  } finally {
    clearTimeout(timeoutId);
  }

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (response.status === 401 && typeof onUnauthorized === "function") {
    onUnauthorized();
  }

  if (!response.ok) {
    const message = data?.error || "Request failed";
    throw new BookingApiError(message, response.status, data);
  }

  return data;
}

export function createBooking({ token, payload, onUnauthorized }) {
  return request("/api/bookings", {
    token,
    method: "POST",
    body: payload,
    onUnauthorized,
  });
}

export function fetchMyBookings({ token, onUnauthorized }) {
  return request("/api/bookings/me", {
    token,
    method: "GET",
    onUnauthorized,
  });
}
