import { BASE_URL } from "../../../config/env";

const REQUEST_TIMEOUT_MS = 10000;

export class DemoAvailabilityError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "DemoAvailabilityError";
    this.status = status;
    this.payload = payload;
  }
}

async function request(path, body) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: body ? "POST" : "GET",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      throw new DemoAvailabilityError("Server took too long to respond.", 408, null);
    }
    throw new DemoAvailabilityError("Unable to reach server.", 0, null);
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
    throw new DemoAvailabilityError(message, response.status, data);
  }

  return data;
}

export function fetchDemoAvailability() {
  return request("/api/demo/availability");
}

export function reserveDemoSlot({ chargerId, slot, gunId, source }) {
  return request("/api/demo/reserve", { charger_id: chargerId, slot, gun_id: gunId, source });
}

export function releaseDemoSlot({ chargerId, slot, gunId, source }) {
  return request("/api/demo/release", { charger_id: chargerId, slot, gun_id: gunId, source });
}
