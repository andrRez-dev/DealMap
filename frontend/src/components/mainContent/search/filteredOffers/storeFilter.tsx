import { useQuery } from "@tanstack/react-query";
import { fetchOffers } from "../../../shared/getOffers";

import OfferCard from "../OfferCard";

type StoreFilterProps = {
  storeId: string;
};

export default function StoreFilter({ storeId }: StoreFilterProps) {
  const {
    data: offers = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["offers", { storeId }],
    queryFn: () => fetchOffers({ storeId }),
  });

  return (
    <section className="h-full w-full flex-1 overflow-y-auto overflow-hidden">
      <div className="w-full">
        {isPending && (
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
            {error.message}
          </p>
        )}

        {!isPending && !error && offers.length === 0 && (
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
