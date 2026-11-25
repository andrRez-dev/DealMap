import { useState } from "react";
import { SearchCode, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchOffers } from "../shared/getStores";
import { useQuery } from "@tanstack/react-query";

function getCategoryEmoji(categoryName: string | null | undefined): string {
  if (!categoryName) {
    return "🛒";
  }

  const name = categoryName.toLocaleLowerCase();

  if (/milk|dairy|cheese|cream|yogurt|yoghurt|butter/.test(name)) {
    return "🥛";
  }
  if (/meat|fish|seafood|poultry/.test(name)) {
    return "🥩";
  }
  if (/bread|bakery|bakery products/.test(name)) {
    return "🍞";
  }
  if (/fruit|fruits|berry|berries/.test(name)) {
    return "🍎";
  }
  if (/vegetable|vegetables/.test(name)) {
    return "🥕";
  }
  if (/pasta|grain|grains|rice|noodle/.test(name)) {
    return "🍝";
  }
  if (/sweet|sweets|chocolate|candy|dessert|snack/.test(name)) {
    return "🍫";
  }
  if (
    /drink|beverage|coffee|tea|juice|water|beer|wine|напиток|напитки|gėrimai|gėrimas/.test(
      name,
    )
  ) {
    return "🥤";
  }

  return "🛒";
}

function getOfferEmoji(offer: {
  category_name?: string | null;
  product_name: string;
}): string {
  return getCategoryEmoji(offer.category_name);
}

export default function HomeContent() {
  const {
    data: offers = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: () => fetchOffers(),
  });

  const [dateLabel] = useState(() => {
    const date = new Date();

    return {
      weekday: new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
      }).format(date),
      dayAndMonth: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
      }).format(date),
    };
  });

  const latestOffer = [...offers]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="flex flex-row w-full h-full mt-15">
      <div className="w-1/2 px-10">
        <p className="text-gray-700">
          {dateLabel.weekday}, {dateLabel.dayAndMonth}
        </p>
        <h1 className="text-xl font-semibold mt-2">
          What's the good deal today ?
        </h1>
        <div className="flex flex-row justify-between mt-10">
          <p className="text-lg font-medium">Deals nearby</p>
        </div>

        {/* TEMPORARY MAP EXAMPLE */}
        <Link to="/main/map">
          <div className="relative h-47.5 overflow-hidden rounded-[19px] border border-[#dce7d8] bg-[#e3eddf] min-[900px]:h-87.5 max-[780px]:h-41.25 mt-3 shadow-xl cursor-pointer">
            <svg
              viewBox="0 0 360 190"
              preserveAspectRatio="none"
              className="block h-full w-full"
            >
              <rect width="360" height="190" fill="#e7efe3" />
              <path
                d="M-10 42 370 118M-10 160 370 26M72-10 158 205M265-10 196 205"
                stroke="#fff"
                strokeWidth="13"
              />
              <path
                d="M-10 42 370 118M-10 160 370 26M72-10 158 205M265-10 196 205"
                stroke="#d4dfd1"
                strokeWidth="1.2"
              />
              <path
                d="M0 94 360 161M119 0 52 190M309 0 350 190"
                stroke="#fff"
                strokeWidth="7"
              />
              <path
                d="M0 94 360 161M119 0 52 190M309 0 350 190"
                stroke="#d4dfd1"
                strokeWidth=".8"
              />
              <path
                d="M0 0h46v22H0zm293 28h48v25h-48zm-12 137h68v25h-68zM12 128h32v32H12zm101-99h37v20h-37zm118 40h26v25h-26z"
                fill="#dbe8d6"
              />
              <path
                d="M0 176c55-13 77-3 116 5s81-2 117-17 78-6 127 2"
                stroke="#b8dce5"
                strokeWidth="7"
                fill="none"
              />
            </svg>
            <div className="absolute left-2.5 right-2.5 top-2.5 flex items-center justify-between">
              <div className="rounded-[10px] bg-white/95 px-2.5 py-1.75 text-[10px] font-bold shadow-[0_3px_8px_#20352212]">
                ⌖ &nbsp;Deals map
              </div>
            </div>
            <div className="absolute left-[24%] top-[43%] flex flex-col items-center drop-shadow-[0_2px_2px_#1233] after:-mt-1 after:h-1.75 after:w-1.75 after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:bg-[#17865a]">
              <b className="whitespace-nowrap rounded-xl border-2 border-white bg-[#17865a] px-2 py-1.25 text-[10px] text-white">
                €3,99
              </b>
            </div>
            <div className="absolute left-[60%] top-[29%] flex flex-col items-center drop-shadow-[0_2px_2px_#1233] after:-mt-1 after:h-1.75 after:w-1.75 after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:bg-[#17865a]">
              <b className="whitespace-nowrap rounded-xl border-2 border-white bg-[#17865a] px-2 py-1.25 text-[10px] text-white">
                −20%
              </b>
            </div>
            <div className="absolute left-[70%] top-[65%] flex flex-col items-center drop-shadow-[0_2px_2px_#1233] after:-mt-1 after:h-1.75 after:w-1.75 after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:bg-[#17865a]">
              <b className="whitespace-nowrap rounded-xl border-2 border-white bg-[#17865a] px-2 py-1.25 text-[10px] text-white">
                −15%
              </b>
            </div>
            <div className="absolute left-[44%] top-[61%] h-3.25 w-3.25 rounded-full border-[3px] border-white bg-[#3979e7] shadow-[0_0_0_5px_#3979e733]" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col w-1/2 px-10">
        <Link
          to="/main/search"
          state={{ focusSearch: true }}
          className="relative w-full"
        >
          <SearchCode
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          />
          <div className="w-full rounded-lg border border-gray-400 bg-white py-4 pl-12 pr-4 cursor-text">
            <p className="text-gray-500">Search products or stores</p>
          </div>
        </Link>

        <div className="flex flex-row justify-between items-center mt-10">
          <p className="text-lg font-medium">Available offers</p>
          <Link to="/main/search">
            <p className="font-medium text-green-700 cursor-pointer hover:underline">
              View all
            </p>
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-2" id="offers">
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

          {!isPending &&
            !error?.message &&
            latestOffer.map((offer) => (
              <article
                key={offer.id}
                className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-2.75 rounded-[15px] border border-[#edf0eb] bg-white p-2.5 shadow-[0_3px_10px_#263c2a06] min-[900px]:grid-cols-[68px_minmax(0,1fr)_auto] min-[900px]:gap-3.75 min-[900px]:p-3.5 max-[780px]:p-2"
              >
                <div className="relative grid h-13.5 w-13.5 place-items-center rounded-xl bg-[#f7eee6] text-[28px] min-[900px]:h-17 min-[900px]:w-17 min-[900px]:text-[34px]">
                  {getOfferEmoji(offer)}
                  {offer.discount_percent &&
                    Number(offer.discount_percent) > 0 && (
                      <span className="absolute left-0.75 top-0.75 rounded-[5px] bg-[#17865a] px-1 py-0.75 text-[8px] font-extrabold text-white">
                        −{offer.discount_percent}%
                      </span>
                    )}
                </div>
                <div className="min-w-0">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold min-[900px]:text-[15px]">
                    {offer.title || offer.product_name}
                  </div>
                  {offer.store_name && (
                    <div className="mt-1 text-[10px] text-[#7a857e] min-[900px]:text-xs">
                      {offer.store_name}
                      {offer.store_address ? ` · ${offer.store_address}` : ""}
                      {offer.store_city ? ` · ${offer.store_city}` : ""}
                    </div>
                  )}
                  {offer.created_at && (
                    <div className="mt-1.25 inline-flex items-center gap-1 text-[9px] font-semibold text-[#42815b] min-[900px]:text-[10px]">
                      <i className="h-1.25 w-1.25 rounded-full bg-[#57b36d]" />
                      Recently added
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <strong className="text-[15px] tracking-[-.4px] min-[900px]:text-[17px]">
                    €{offer.discounted_price}
                  </strong>
                  {offer.original_price && (
                    <del className="mt-0.5 block text-[10px] text-[#a6aea8] min-[900px]:text-[11px]">
                      €{offer.original_price}
                    </del>
                  )}
                  {offer.expires_at && (
                    <div className="mt-1 text-[9px] text-[#79847d] min-[900px]:text-[11px]">
                      until {offer.expires_at}
                    </div>
                  )}
                </div>
              </article>
            ))}

          {!isPending && !error?.message && latestOffer.length === 0 && (
            <p className="rounded-xl border border-dashed border-[#d9e3d6] bg-white p-8 text-center text-sm text-gray-500">
              No offers available yet.
            </p>
          )}
        </div>

        <Link
          to="/main/add"
          className="ml-auto mt-7 flex h-10 w-30 items-center justify-center rounded-lg bg-green-950 hover:bg-green-800 transition-all text-white cursor-pointer"
        >
          <Plus className="mr-2 scale-95 text-lime-300" />
          Add Deal
        </Link>
      </div>
    </div>
  );
}
