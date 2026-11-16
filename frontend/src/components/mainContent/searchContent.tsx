import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchOffers } from "../shared/getOffers";

import { type Offer } from "../shared/types";

import OfferCard from "./search/OfferCard";
import CategoryFilter from "./search/categoryFilter";
import StoreFilter from "./search/storeFilter";

import StoreSelect from "./search/selectors/storeSelect";
import CategorySelect from "./search/selectors/categorySelect";

export default function SearchContent() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isOffersLoading, setIsOffersLoading] = useState(true);
  const [offersError, setOffersError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStore =
    searchParams.get("store") ?? localStorage.getItem("selectedStore") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem("selectedCategory") ?? "",
  );

  useEffect(() => {
    // do not update the component's state if the user has navigated away from the page while the request was still in progress
    let isCurrent = true;

    async function loadOffers(): Promise<void> {
      try {
        const data = await fetchOffers();

        if (isCurrent) {
          setOffers(data);
          setOffersError("");
        }
      } catch (loadError: unknown) {
        if (isCurrent) {
          setOffersError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load offers.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsOffersLoading(false);
        }
      }
    }

    void loadOffers();
    return () => {
      isCurrent = false;
    };
  }, []);

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

        {!selectedStore && !selectedCategory && isOffersLoading && (
          <p
            className="rounded-xl border border-[#e3eae0] bg-white p-5 text-sm text-gray-500 shadow-sm"
            role="status"
          >
            Loading offers…
          </p>
        )}

        {!selectedStore && !selectedCategory && offersError && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {offersError}
          </p>
        )}

        {!selectedStore &&
          !selectedCategory &&
          !isOffersLoading &&
          !offersError &&
          offers.length === 0 && (
            <p className="rounded-xl border border-dashed border-[#d9e3d6] bg-white p-8 text-center text-sm text-gray-500">
              No offers available yet.
            </p>
          )}

        {selectedStore ? (
          <div className="w-full">
            <StoreFilter storeId={selectedStore} />
          </div>
        ) : selectedCategory ? (
          <div className="w-full">
            <CategoryFilter categoryId={selectedCategory} />
          </div>
        ) : (
          <ul className="grid w-full grid-cols-1 gap-3">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
