import { useEffect, useState } from "react";
import { getRequestHeaders, readResponse } from "../shared/api";
import { Clock3, MapPin, Tag } from "lucide-react";

type Offer = {
  id: string;
  title: string | null;
  description: string | null;
  original_price: string | number | null;
  discounted_price: string | number;
  discount_percent: string | number | null;
  starts_at: string | null;
  expires_at: string | null;
  product_name: string;
  product_unit: string;
  store_name: string;
  store_brand: string | null;
  store_address: string | null;
  store_city: string;
  works_votes: string | number;
  expired_votes: string | number;
  my_vote: {
    offer_id: string;
    vote: "works" | "expired";
    created_at: string;
  } | null;
};

export default function SearchContent() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("");
        }
      } catch (loadError: unknown) {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load offers.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    void loadOffers();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
      <div className="w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[#26332a]">
            Deals near you
          </h2>
          <p className="mt-1 text-sm text-[#7a857e]">
            Find your next great deal
          </p>
        </header>

        {isLoading && (
          <p
            className="rounded-xl border border-[#e3eae0] bg-white p-5 text-sm text-gray-500 shadow-sm"
            role="status"
          >
            Loading offers…
          </p>
        )}

        {error && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {!isLoading && !error && offers.length === 0 && (
          <p className="rounded-xl border border-dashed border-[#d9e3d6] bg-white p-8 text-center text-sm text-gray-500">
            No offers available yet.
          </p>
        )}

        <ul className="grid w-full grid-cols-1 gap-3">
          {offers.map((offer) => (
            <li
              key={offer.id}
              className="flex min-h-32 min-w-0 flex-col justify-between gap-5 rounded-2xl border border-[#e5ebe2] bg-white p-4 shadow-[0_4px_16px_#263c2a0a] transition-shadow hover:shadow-[0_8px_24px_#263c2a12] sm:p-5"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf4eb] text-green-800">
                    <Tag aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className=" capitalize wrap-break-words font-semibold text-[#26332a]">
                      {offer.title || offer.product_name}
                    </h3>
                    {offer.title && offer.title !== offer.product_name && (
                      <p className="mt-0.5 text-sm text-[#68766c]">
                        {offer.product_name}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#7a857e]">
                      {offer.store_name}
                      {offer.store_brand &&
                        offer.store_brand !== offer.store_name &&
                        ` · ${offer.store_brand}`}
                    </p>
                  </div>
                </div>
                {offer.discount_percent &&
                  Number(offer.discount_percent) > 0 && (
                    <span className="shrink-0 rounded-full bg-[#e8f5e9] px-2.5 py-1 text-xs font-bold text-green-800">
                      −{offer.discount_percent}%
                    </span>
                  )}
              </div>

              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-2xl font-bold tracking-tight text-[#26332a]">
                    {offer.discounted_price} €
                  </span>
                  {offer.original_price && (
                    <del className="text-sm text-[#9aa49c]">
                      {offer.original_price} €
                    </del>
                  )}
                  <span className="text-xs text-[#7a857e]">
                    / {offer.product_unit}
                  </span>
                </div>
                {offer.expires_at && (
                  <span className="flex items-center gap-1.5 text-xs text-[#7a857e]">
                    <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                    Until {offer.expires_at}
                  </span>
                )}
              </div>

              <div className="flex min-w-0 items-center gap-1.5 border-t border-[#edf0eb] pt-3 text-xs text-[#7a857e]">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="break-words">
                  {[offer.store_address, offer.store_city]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
