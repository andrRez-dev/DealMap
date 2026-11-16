import { useState, useEffect } from "react";
import { fetchStores } from "../../../shared/getStores";
import { type Store } from "../../../shared/types";
import { StoreIcon, ChevronDown } from "lucide-react";

type StoreSelectProps = {
  selectedStore: string;
  setSearchParams: (
    nextInit:
      URLSearchParams | ((previous: URLSearchParams) => URLSearchParams),
  ) => void;
};

export default function StoreSelect({
  selectedStore,
  setSearchParams,
}: StoreSelectProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [isStoresLoading, setIsStoresLoading] = useState(true);
  const [storesError, setStoresError] = useState("");

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
    if (selectedStore) {
      localStorage.setItem("selectedStore", selectedStore);
    } else {
      localStorage.removeItem("selectedStore");
    }
  }, [selectedStore]);

  return (
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
          className="w-full truncate appearance-none rounded-xl border border-[#dfe7dc] bg-[#fbfcfa] py-2.5 pl-3 pr-10 text-sm font-medium text-[#26332a] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={
            isStoresLoading || Boolean(storesError) || stores.length === 0
          }
          value={selectedStore}
          onChange={(event) => {
            const storeId = event.target.value;

            if (storeId) {
              localStorage.setItem("selectedStore", storeId);
              setSearchParams((current) => {
                const next = new URLSearchParams(current);
                next.set("store", storeId);
                return next;
              });
              //reset the values when user chooses the "All stores" option
            } else {
              localStorage.removeItem("selectedStore");
              setSearchParams((current) => {
                const next = new URLSearchParams(current);
                next.delete("store");
                return next;
              });
            }
          }}
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
          role={storesError ? "alert" : isStoresLoading ? "status" : undefined}
        >
          {isStoresLoading
            ? "Loading stores…"
            : storesError || "No active stores are available."}
        </p>
      )}
    </div>
  );
}
