import { getRequestHeaders, readResponse } from "./api";
import type { Offer } from "./types";

type OffersResponse = {
  offers?: Offer[];
};

type OfferFilter = { storeId: string } | { categoryId: string };

export async function fetchOffers(filter?: OfferFilter): Promise<Offer[]> {
  const api = import.meta.env.VITE_API_URL;

  if (!api) {
    throw new Error("The API URL is not configured.");
  }

  const path = filter
    ? "storeId" in filter
      ? `/api/offers/by-store/${encodeURIComponent(filter.storeId)}`
      : `/api/offers/by-category/${encodeURIComponent(filter.categoryId)}`
    : "/api/offers";

  const response = await fetch(`${api}${path}`, {
    headers: getRequestHeaders(),
  });

  const data = await readResponse<Offer[] | OffersResponse>(
    response,
    "Unable to load offers",
  );

  let offers: Offer[] | undefined;

  if (filter) {
    if (
      typeof data === "object" &&
      data !== null &&
      "offers" in data &&
      Array.isArray(data.offers)
    ) {
      offers = data.offers;
    }
  } else if (Array.isArray(data)) {
    offers = data;
  }

  if (!offers) {
    throw new Error("The server did not return a list of offers.");
  }

  return offers;
}
