import { fetchChargers } from "../api/chargersApi";

export async function getChargers(options = {}) {
  const data = await fetchChargers(options);
  if (!Array.isArray(data)) {
    throw new Error("Invalid API response.");
  }

  return data;
}
