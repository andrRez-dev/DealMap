import { useState, useEffect } from "react";
import { fetchOffers } from "../../shared/getOffers";
import { type Offer } from "../../shared/types";
import OfferCard from "./OfferCard";

type StoreFilterProps = {
  storeId: string;
};

export default function StoreFilter({ storeId }: StoreFilterProps) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // do not update the component's state if the user has navigated away from the page while the request was still in progress
    let isCurrent = true;

    setIsLoading(true);
    setError("");
    setOffers([]);

    async function loadOffers(): Promise<void> {
      try {
        const data = await fetchOffers({ storeId });

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
  }, [storeId]);

  return (
    <section className="h-full w-full flex-1 overflow-y-auto overflow-hidden">
      <div className="w-full">
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
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </ul>
      </div>
    </section>
  );
}
