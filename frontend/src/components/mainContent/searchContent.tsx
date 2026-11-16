import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRequestHeaders, readResponse } from "../shared/api";

import { type Offer } from "../shared/types";

import OfferCard from "./search/OfferCard";

import StoreSelect from "./search/selectors/storeSelect";
import CategorySelect from "./search/selectors/categorySelect";

type OfferFilter = {
  storeId?: string;
  categoryId?: string;
};

type OfferResponse = {
  offers?: Offer[];
};

async function fetchOffers(filter?: OfferFilter): Promise<Offer[]> {
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

export default function SearchContent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedStore =
    searchParams.get("store") ?? localStorage.getItem("selectedStore") ?? "";
  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem("selectedCategory") ?? "",
  );

  const {
    data: offers = [],
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "offers",
      {
        storeId: selectedStore,
        categoryId: selectedCategory,
      },
    ],
    queryFn: () =>
      fetchOffers({
        storeId: selectedStore || undefined,
        categoryId: selectedCategory || undefined,
      }),
  });

  return (
    <section className="h-full flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 overflow-hidden">
      <div className="w-full">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#26332a]">
              Deals near you
            </h2>
            <p className="mt-1 text-sm text-[#7a857e]">
              Find your next great deal
            </p>
          </div>

          <div className="flex flex-row gap-5">
            <StoreSelect
              setSearchParams={setSearchParams}
              selectedStore={selectedStore}
            />

            {/* CATEGORY FILTER  */}
            <CategorySelect
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </header>

        {isPending && (
          <p
            className="rounded-xl border border-[#e3eae0] bg-white p-5 text-sm text-gray-500 shadow-sm"
            role="status"
          >
            Loading offers…
          </p>
        )}

        {error?.message && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {error.message}
          </p>
        )}

        {!isPending && !error?.message && offers.length === 0 && (
          <p className="rounded-xl border border-dashed border-[#d9e3d6] bg-white p-8 text-center text-sm text-gray-500">
            No offers available yet.
          </p>
        )}

        <ul className="grid w-full grid-cols-1 gap-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </ul>
      </div>
    </section>
  );
}
