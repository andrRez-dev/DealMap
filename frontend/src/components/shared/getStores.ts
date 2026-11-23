import { getRequestHeaders, readResponse } from "./api";
import type { Store, Offer } from "./types";

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

type OfferFilter = {
  storeId?: string;
  categoryId?: string;
};

type OfferResponse = {
  offers?: Offer[];
};

export async function fetchOffers(filter?: OfferFilter): Promise<Offer[]> {
  const api = import.meta.env.VITE_API_URL;

  if (!api) {
    throw new Error("API URL is not configured");
  }

  const params = new URLSearchParams();

  if (filter?.storeId) {
    params.set("store_id", filter.storeId);
  }
  if (filter?.categoryId) {
    params.set("category_id", filter.categoryId);
  }

  const query = params.toString();

  const path = `/api/offers${query ? `?${query}` : ""}`;

  const response = await fetch(`${api}${path}`, {
    headers: getRequestHeaders(),
  });

  const data = await readResponse<Offer[] | OfferResponse>(
    response,
    "Unable to load the offers",
  );

  let offers: Offer[] | undefined;

  if (Array.isArray(data)) {
    offers = data;
  } else if (
    typeof data === "object" &&
    data !== null &&
    "offers" in data &&
    Array.isArray(data.offers)
  ) {
    offers = data.offers;
  }

  if (!offers) {
    throw new Error("Server did not return the list of offers");
  }

  return offers;
}
