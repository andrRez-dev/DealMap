import { getRequestHeaders, readResponse } from "./api";
import type { Store } from "./types";

type StoresResponse = {
  stores?: Store[];
};

export async function fetchStores(): Promise<Store[]> {
  const api = import.meta.env.VITE_API_URL;

  if (!api) {
    throw new Error("The API URL is not configured.");
  }

  const response = await fetch(`${api}/api/stores/get`, {
    headers: getRequestHeaders(),
  });
  const data = await readResponse<StoresResponse>(
    response,
    "Unable to load stores",
  );

  if (!Array.isArray(data.stores)) {
    throw new Error("The server did not return a list of stores.");
  }

  return data.stores;
}
