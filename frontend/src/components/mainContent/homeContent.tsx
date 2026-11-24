<<<<<<< HEAD

import { MoveUpRight, SearchCode, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeContent() {
  const date = new Date();

  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
  }).format(date);

  const dayAndMonth = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
  }).format(date);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 sm:py-6 lg:flex-row lg:gap-6 lg:px-8 lg:py-3">
      {/* Left section */}
      <div className="w-full min-w-0 lg:w-1/2">
        <p className="text-sm text-gray-700 sm:text-base">
          {weekday}, {dayAndMonth}
        </p>

        <h1 className="mt-2 break-words text-xl font-semibold text-[#26332a] sm:text-2xl">
          What's the good deal today?
        </h1>

        <div className="mt-7 flex min-w-0 flex-wrap items-center justify-between gap-3 sm:mt-10 lg:mt-5">
          <h2 className="text-lg font-medium">
            Deals nearby
          </h2>

          <Link
            to="/main/search"
            className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 sm:text-base"
          >
            All deals
            <MoveUpRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        {/* Example filters */}
        <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <span className="rounded-2xl border border-green-900 bg-green-100 px-3 py-2 text-xs font-medium text-green-900 sm:text-sm">
            All deals
          </span>

          <span className="rounded-2xl border border-gray-400 bg-white px-3 py-2 text-xs sm:text-sm">
            Groceries
          </span>

          <span className="rounded-2xl border border-gray-400 bg-white px-3 py-2 text-xs sm:text-sm">
            Within 1 km
          </span>

          <span className="rounded-2xl border border-gray-400 bg-white px-3 py-2 text-xs sm:text-sm">
            20% off or more
          </span>
        </div>

        {/* Temporary map example */}
        <div className="relative mt-4 h-[220px] w-full min-w-0 overflow-hidden rounded-[19px] border border-[#dce7d8] bg-[#e3eddf] shadow-lg sm:h-[260px] lg:h-[300px]">
          <svg
            viewBox="0 0 360 190"
            preserveAspectRatio="none"
            className="block h-full w-full"
            aria-label="Illustrative deals map"
            role="img"
          >
            <rect
              width="360"
              height="190"
              fill="#e7efe3"
            />

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

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
            <div className="rounded-lg bg-white/95 px-3 py-2 text-xs font-bold shadow-sm">
              ⌖ Deals map
            </div>

            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white text-lg text-[#37443c] shadow-sm">
              ⌗
            </div>
          </div>

          <div className="absolute left-[24%] top-[43%]">
            <span className="rounded-xl border-2 border-white bg-[#17865a] px-2 py-1 text-[10px] font-bold text-white shadow">
              €3,99
            </span>
          </div>

          <div className="absolute left-[60%] top-[29%]">
            <span className="rounded-xl border-2 border-white bg-[#17865a] px-2 py-1 text-[10px] font-bold text-white shadow">
              −20%
            </span>
          </div>

          <div className="absolute left-[70%] top-[65%]">
            <span className="rounded-xl border-2 border-white bg-[#17865a] px-2 py-1 text-[10px] font-bold text-white shadow">
              −15%
            </span>
          </div>

          <div className="absolute left-[44%] top-[61%] h-[13px] w-[13px] rounded-full border-[3px] border-white bg-[#3979e7] shadow-[0_0_0_5px_#3979e733]" />

          <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-lg bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#59665e]">
            12 deals within 2 km
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex w-full min-w-0 flex-col lg:w-1/2">
        {/* Search placeholder */}
        <div className="relative w-full min-w-0">
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          <SearchCode
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          />
<<<<<<< HEAD

          <input
            className="w-full min-w-0 rounded-lg border border-gray-400 bg-white py-3.5 pl-12 pr-4 text-sm sm:py-4 sm:text-base"
            placeholder="Search products or stores"
            disabled
            aria-label="Search products or stores (coming soon)"
          />
        </div>

        <div className="mt-7 flex items-center justify-between gap-3 sm:mt-10 lg:mt-5">
          <h2 className="text-lg font-medium">
            Deals
          </h2>

          <Link
            to="/main/search"
            className="text-sm font-medium text-green-700 hover:text-green-800 sm:text-base"
          >
            View all
          </Link>
        </div>

        {/* Example products */}
        <div
          className="mt-3 flex min-w-0 flex-col gap-3"
          id="offers"
        >
          {/* Chicken */}
          <article className="grid min-w-0 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-[#edf0eb] bg-white p-2.5 shadow-sm sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-3 sm:p-4">
            <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-[#f7eee6] text-2xl sm:h-16 sm:w-16 sm:text-3xl">
              🍗
              <span className="absolute left-0.5 top-0.5 rounded bg-[#17865a] px-1 py-0.5 text-[8px] font-bold text-white">
                −25%
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xs font-bold sm:text-sm">
                Chicken breast
              </h3>

              <p className="mt-1 break-words text-[10px] text-[#7a857e] sm:text-xs">
                Lidl · Taikos Ave. · 0.8 km
              </p>

              <p className="mt-1 text-[10px] font-semibold text-[#42815b]">
                Recently verified
              </p>
            </div>

            <div className="min-w-0 text-right">
              <strong className="block text-sm sm:text-base">
                €3.99
              </strong>

              <del className="block text-[10px] text-[#a6aea8]">
                €5.29
              </del>

              <p className="mt-1 text-[9px] text-[#79847d] sm:text-[11px]">
                until Oct 27
              </p>
            </div>
          </article>

          {/* Milk */}
          <article className="grid min-w-0 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-[#edf0eb] bg-white p-2.5 shadow-sm sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-3 sm:p-4">
            <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-[#eaf3fb] text-2xl sm:h-16 sm:w-16 sm:text-3xl">
              🥛
              <span className="absolute left-0.5 top-0.5 rounded bg-[#17865a] px-1 py-0.5 text-[8px] font-bold text-white">
                −20%
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xs font-bold sm:text-sm">
                Milk 2.5%, 1 L
              </h3>

              <p className="mt-1 break-words text-[10px] text-[#7a857e] sm:text-xs">
                Rimi · Liepų St. · 1.4 km
              </p>

              <p className="mt-1 text-[10px] font-semibold text-[#42815b]">
                Confirmed by 8 people
              </p>
            </div>

            <div className="min-w-0 text-right">
              <strong className="block text-sm sm:text-base">
                €0.95
              </strong>

              <del className="block text-[10px] text-[#a6aea8]">
                €1.19
              </del>

              <p className="mt-1 text-[9px] text-[#79847d] sm:text-[11px]">
                until Oct 26
              </p>
            </div>
          </article>

          {/* Spaghetti */}
          <article className="grid min-w-0 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-[#edf0eb] bg-white p-2.5 shadow-sm sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-3 sm:p-4">
            <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-[#faf1d9] text-2xl sm:h-16 sm:w-16 sm:text-3xl">
              🍝
              <span className="absolute left-0.5 top-0.5 rounded bg-[#17865a] px-1 py-0.5 text-[8px] font-bold text-white">
                −15%
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xs font-bold sm:text-sm">
                Spaghetti
              </h3>

              <p className="mt-1 break-words text-[10px] text-[#7a857e] sm:text-xs">
                Maxima · H. Manto St. · 0.6 km
              </p>

              <p className="mt-1 text-[10px] font-semibold text-[#42815b]">
                Added 1 hour ago
              </p>
            </div>

            <div className="min-w-0 text-right">
              <strong className="block text-sm sm:text-base">
                €1.69
              </strong>

              <del className="block text-[10px] text-[#a6aea8]">
                €1.99
              </del>

              <p className="mt-1 text-[9px] text-[#79847d] sm:text-[11px]">
                until Oct 29
              </p>
            </div>
          </article>
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
        </div>

        <Link
          to="/main/add"
<<<<<<< HEAD
          className="ml-auto mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-green-950 px-5 font-medium text-white transition-colors hover:bg-green-900 sm:w-auto"
        >
          <Plus
            aria-hidden="true"
            className="mr-2 h-5 w-5 text-lime-300"
          />
=======
          className="ml-auto mt-7 flex h-10 w-30 items-center justify-center rounded-lg bg-green-950 hover:bg-green-800 transition-all text-white cursor-pointer"
        >
          <Plus className="mr-2 scale-95 text-lime-300" />
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          Add Deal
        </Link>
      </div>
    </div>
  );
}
