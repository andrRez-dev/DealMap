import { useEffect, useState } from "react";
import { ChevronDown, Store as StoreIcon } from "lucide-react";
import { getRequestHeaders, readResponse } from "../shared/api";
import { type Offer } from "../shared/types";
import OfferCard from "./search/OfferCard";
import { type Store } from "../shared/types";
import { fetchStores } from "../shared/getStores";
import StoreFilter from "./search/storeFilter";

export default function SearchContent() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState(
    () => localStorage.getItem("selectedStoreId") ?? "",
  );

  const [isOffersLoading, setIsOffersLoading] = useState(true);
  const [offersError, setOffersError] = useState("");
  const [isStoresLoading, setIsStoresLoading] = useState(true);
  const [storesError, setStoresError] = useState("");

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    // do not update the component's state if the user has navigated away from the page while the request was still in progress
    let isCurrent = true;

    async function loadOffers(): Promise<void> {
      try {
        if (!api) {
          throw new Error("The API URL is not configured.");
        }

        const response = await fetch(`${api}/api/offers`, {
          headers: getRequestHeaders(),
        });
        const data = await readResponse<Offer[]>(
          response,
          "Unable to load offers",
        );

        if (!Array.isArray(data)) {
          throw new Error("The server did not return a list of offers.");
        }

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

  useEffect(() => {
    let isCurrent = true;

    async function loadStores(): Promise<void> {
      try {
        const data = await fetchStores();

        if (isCurrent) {
          setStores(data);
          setStoresError("");
        }
      } catch (loadError: unknown) {
        if (isCurrent) {
          setStoresError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load stores.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsStoresLoading(false);
        }
      }
    }

    void loadStores();
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (selectedStoreId) {
      localStorage.setItem("selectedStoreId", selectedStoreId);
    } else {
      localStorage.removeItem("selectedStoreId");
    }
  }, [selectedStoreId]);

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

          <div className="w-70 rounded-2xl border border-[#e5ebe2] bg-white p-2 shadow-[0_4px_16px_#263c2a0a]">
            <label
              htmlFor="offer-store-filter"
              className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#68766c]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#edf4eb] text-green-800">
                <StoreIcon aria-hidden="true" className="h-4 w-4" />
              </span>
              Filter offers by store
            </label>
            <div className="relative">
              <select
                id="offer-store-filter"
                className="w-full appearance-none rounded-xl border border-[#dfe7dc] bg-[#fbfcfa] py-2.5 pl-3 pr-10 text-sm font-medium text-[#26332a] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={
                  isStoresLoading || Boolean(storesError) || stores.length === 0
                }
                value={selectedStoreId}
                onChange={(event) => setSelectedStoreId(event.target.value)}
                aria-describedby={
                  storesError || isStoresLoading || stores.length === 0
                    ? "offer-store-filter-help"
                    : undefined
                }
              >
                <option value="">All stores</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                    {store.address ? ` — ${store.address}` : ""}
                    {store.brand ? ` (${store.brand})` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a857e]"
              />
            </div>
            {(isStoresLoading || storesError || stores.length === 0) && (
              <p
                id="offer-store-filter-help"
                className={`mt-2 text-xs ${
                  storesError ? "text-red-700" : "text-[#7a857e]"
                }`}
                role={
                  storesError ? "alert" : isStoresLoading ? "status" : undefined
                }
              >
                {isStoresLoading
                  ? "Loading stores…"
                  : storesError || "No active stores are available."}
              </p>
            )}
          </div>
        </header>

        {!selectedStoreId && isOffersLoading && (
          <p
            className="rounded-xl border border-[#e3eae0] bg-white p-5 text-sm text-gray-500 shadow-sm"
            role="status"
          >
            Loading offers…
          </p>
        )}

        {!selectedStoreId && offersError && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {offersError}
          </p>
        )}

        {!selectedStoreId &&
          !isOffersLoading &&
          !offersError &&
          offers.length === 0 && (
            <p className="rounded-xl border border-dashed border-[#d9e3d6] bg-white p-8 text-center text-sm text-gray-500">
              No offers available yet.
            </p>
          )}

        {selectedStoreId ? (
          <div className="w-full">
            <StoreFilter storeId={selectedStoreId} />
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
