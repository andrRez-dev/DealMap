<<<<<<< HEAD

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRequestHeaders, readResponse } from "../shared/api";
=======
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchOffers } from "../shared/getStores";
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1

import { type Offer } from "../shared/types";

import OfferCard from "./search/OfferCard";

import StoreSelect from "./search/selectors/storeSelect";
import CategorySelect from "./search/selectors/categorySelect";

<<<<<<< HEAD
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
    searchParams.get("store") ??
    localStorage.getItem("selectedStore") ??
    "";

=======
//
//
//

export default function SearchContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchProduct, setSearchProduct] = useState("");

  const selectedStore =
    searchParams.get("store") ?? localStorage.getItem("selectedStore") ?? "";
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
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

<<<<<<< HEAD
  return (
    <section className="min-h-0 w-full min-w-0 flex-1 overflow-x-hidden px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <header className="mb-6 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight text-[#26332a] sm:text-3xl">
              Deals near you
            </h2>

            <p className="mt-1 text-sm text-[#7a857e]">
=======
  function findOfferByProductName(
    offers: Offer[],
    searchProduct: string,
  ): Offer[] {
    const query = searchProduct.trim().toLocaleLowerCase();

    if (!query) {
      return offers;
    }

    return offers.filter((offer) =>
      offer.product_name.toLocaleLowerCase().includes(query),
    );
  }

  const filteredOffers = useMemo(
    () => findOfferByProductName(offers, searchProduct),
    [offers, searchProduct],
  );

  useEffect(() => {
    const shouldFocus =
      typeof location.state === "object" &&
      location.state !== null &&
      "focusSearch" in location.state &&
      location.state.focusSearch === true;

    if (shouldFocus) {
      searchInputRef.current?.focus();
    }
  }, [location.state]);

  return (
    <section className="h-full flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 overflow-hidden">
      <div className="w-full">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#26332a]">
              Deals near you
            </h2>
            <p className="mt-1 text-lg text-[#7a857e]">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              Find your next great deal
            </p>
          </div>

<<<<<<< HEAD
          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">
            <div className="min-w-0 max-w-full">
              <StoreSelect
                setSearchParams={setSearchParams}
                selectedStore={selectedStore}
              />
            </div>

            <div className="min-w-0 max-w-full">
              <CategorySelect
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        </header>

=======
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

        <div className="relative w-full">
          <input
            ref={searchInputRef}
            type="text"
            minLength={3}
            maxLength={40}
            value={searchProduct}
            onChange={(event) => setSearchProduct(event.target.value)}
            className="my-5 w-full h-13 rounded-lg border border-gray-300 bg-white px-3 pl-12 text-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/15"
            placeholder="Search for a product"
          />
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        {!isPending &&
          !error?.message &&
          filteredOffers.length === 0 &&
          offers.length !== 0 && (
            <p className="rounded-xl border border-dashed border-[#d9e3d6] p-8 text-center text-sm">
              No matching offers.
            </p>
          )}

>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
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

<<<<<<< HEAD
        <ul className="grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4">
          {offers.map((offer) => (
=======
        <ul className="grid w-full grid-cols-1 gap-3">
          {filteredOffers.map((offer) => (
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </ul>
      </div>
    </section>
  );
}
