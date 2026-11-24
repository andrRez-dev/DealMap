
import { useEffect } from "react";
import { fetchStores } from "../../../shared/getStores";
import { StoreIcon, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type StoreSelectProps = {
  selectedStore: string;
  setSearchParams: (
    nextInit:
      | URLSearchParams
      | ((previous: URLSearchParams) => URLSearchParams),
  ) => void;
};

export default function StoreSelect({
  selectedStore,
  setSearchParams,
}: StoreSelectProps) {
  const {
    data: stores = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: () => fetchStores(),
  });

  useEffect(() => {
    if (selectedStore) {
      localStorage.setItem("selectedStore", selectedStore);
    } else {
      localStorage.removeItem("selectedStore");
    }
  }, [selectedStore]);

  return (
    <div className="w-full min-w-0 rounded-2xl border border-[#e5ebe2] bg-white p-2 shadow-[0_4px_16px_#263c2a0a] sm:w-[280px] sm:max-w-full">
      <label
        htmlFor="offer-store-filter"
        className="mb-2 flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#68766c]"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#edf4eb] text-green-800">
          <StoreIcon aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="min-w-0 break-words">
          Filter offers by store
        </span>
      </label>

      <div className="relative min-w-0">
        <select
          id="offer-store-filter"
          className="block w-full min-w-0 appearance-none truncate rounded-xl border border-[#dfe7dc] bg-[#fbfcfa] py-2.5 pl-3 pr-10 text-sm font-medium text-[#26332a] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending || Boolean(error) || stores.length === 0}
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
            error || isPending || stores.length === 0
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

      {(isPending || error || stores.length === 0) && (
        <p
          id="offer-store-filter-help"
          className={`mt-2 break-words text-xs ${
            error ? "text-red-700" : "text-[#7a857e]"
          }`}
          role={error ? "alert" : isPending ? "status" : undefined}
        >
          {isPending
            ? "Loading stores…"
            : error?.message || "No active stores are available."}
        </p>
      )}
    </div>
  );
}
