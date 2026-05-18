import { BASE_URL } from "../../../config/env";

export async function fetchChargers(options = {}) {
  const response = await fetch(BASE_URL + "/api/chargers", {
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
