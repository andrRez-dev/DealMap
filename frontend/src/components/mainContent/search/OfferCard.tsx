
import { Clock3, MapPin, Tag } from "lucide-react";
import { type Offer } from "../../shared/types";
import Vote from "./vote";

type Props = {
  offer: Offer;
};

export default function OfferCard({ offer }: Props) {
  return (
    <li className="flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-[#e5ebe2] bg-white p-4 shadow-[0_4px_16px_#263c2a0a] transition-shadow hover:shadow-[0_8px_24px_#263c2a12] sm:gap-5 sm:p-5">
      {/* Product information */}
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf4eb] text-green-800">
            <Tag aria-hidden="true" className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-base font-semibold capitalize leading-snug text-[#26332a] sm:text-lg">
              {offer.title || offer.product_name}
            </h3>

            {offer.title && offer.title !== offer.product_name && (
              <p className="mt-1 break-words text-sm text-[#68766c]">
                {offer.product_name}
              </p>
            )}

            <p className="mt-1 break-words text-xs text-[#7a857e]">
              {offer.store_name}
              {offer.store_brand && offer.store_brand !== offer.store_name
                ? ` · ${offer.store_brand}`
                : ""}
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

      {/* Price and expiration */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="break-words text-2xl font-bold tracking-tight text-[#26332a] sm:text-3xl">
            {offer.discounted_price} €
          </span>

          {offer.original_price && (
            <del className="text-sm text-[#9aa49c]">
              {offer.original_price} €
            </del>
          )}

          <span className="break-words text-xs text-[#7a857e]">
            / {offer.product_unit}
          </span>
        </div>

        {offer.expires_at && (
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-[#7a857e]">
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0"
            />
            <span className="break-words">
              Until {offer.expires_at}
            </span>
          </span>
        )}
      </div>

      {/* Store address */}
      <div className="flex min-w-0 items-start gap-2 border-t border-[#edf0eb] pt-3 text-xs text-[#7a857e]">
        <MapPin
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0"
        />

        <span className="min-w-0 break-words">
          {[offer.store_address, offer.store_city]
            .filter(Boolean)
            .join(", ")}
        </span>
      </div>

      {/* Voting */}
      <div className="min-w-0 w-full">
        <Vote
          offerId={offer.id}
          myVote={offer.my_vote?.vote ?? null}
          worksVotes={offer.works_votes}
          expiredVotes={offer.expired_votes}
        />
      </div>
    </li>
  );
}
