import { MoveUpRight, SearchCode, Plus } from "lucide-react";

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
    <div className="flex flex-row w-full h-full mt-15">
      <div className="w-1/2 px-10">
        <p className="text-gray-700">
          {weekday}, {dayAndMonth}
        </p>
        <h1 className="text-xl font-semibold mt-2">
          What's the good deal today ?
        </h1>
        <div className="flex flex-row justify-between mt-10">
          <p className="text-lg">Deals nearby</p>
          <p className="flex flex-row items-center text-green-700 font-medium">
            All deals
            <span className="scale-80">
              <MoveUpRight />
            </span>
          </p>
        </div>

        <div className="flex flex-row items-center gap-5 mt-2">
          <p className="text-green-900 bg-green-100 p-2 px-3 rounded-2xl border border-green-900">
            All deals
          </p>
          <p className="bg-white p-2 px-3 rounded-2xl border border-gray-400">
            Groceries
          </p>
          <p className="bg-white p-2  px-3 rounded-2xl border border-gray-400">
            Within 1 km
          </p>
          <p className="bg-white p-2  px-3 rounded-2xl border border-gray-400">
            20% off or more
          </p>
        </div>

        {/* TEMPORARY MAP EXAMPLE */}
        <div className="relative h-[190px] overflow-hidden rounded-[19px] border border-[#dce7d8] bg-[#e3eddf] min-[900px]:h-[350px] max-[780px]:h-[165px] mt-3 shadow-xl cursor-not-allowed">
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
          <div className="absolute left-[10px] right-[10px] top-[10px] flex items-center justify-between">
            <div className="rounded-[10px] bg-white/95 px-[10px] py-[7px] text-[10px] font-bold shadow-[0_3px_8px_#20352212]">
              ⌖ &nbsp;Deals map
            </div>
            <div className="grid h-[31px] w-[31px] place-items-center rounded-[10px] bg-white text-[17px] text-[#37443c] shadow-[0_3px_8px_#20352212]">
              ⌗
            </div>
          </div>
          <div className="absolute left-[24%] top-[43%] flex flex-col items-center drop-shadow-[0_2px_2px_#1233] after:-mt-1 after:h-[7px] after:w-[7px] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:bg-[#17865a]">
            <b className="whitespace-nowrap rounded-xl border-2 border-white bg-[#17865a] px-2 py-[5px] text-[10px] text-white">
              €3,99
            </b>
          </div>
          <div className="absolute left-[60%] top-[29%] flex flex-col items-center drop-shadow-[0_2px_2px_#1233] after:-mt-1 after:h-[7px] after:w-[7px] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:bg-[#17865a]">
            <b className="whitespace-nowrap rounded-xl border-2 border-white bg-[#17865a] px-2 py-[5px] text-[10px] text-white">
              −20%
            </b>
          </div>
          <div className="absolute left-[70%] top-[65%] flex flex-col items-center drop-shadow-[0_2px_2px_#1233] after:-mt-1 after:h-[7px] after:w-[7px] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:bg-[#17865a]">
            <b className="whitespace-nowrap rounded-xl border-2 border-white bg-[#17865a] px-2 py-[5px] text-[10px] text-white">
              −15%
            </b>
          </div>
          <div className="absolute left-[44%] top-[61%] h-[13px] w-[13px] rounded-full border-[3px] border-white bg-[#3979e7] shadow-[0_0_0_5px_#3979e733]" />
          <div className="absolute bottom-[10px] left-[11px] rounded-[10px] bg-white/95 px-[9px] py-1.5 text-[10px] font-semibold text-[#59665e]">
            12 deals within 2 km
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/2 px-10">
        <div className="relative w-full">
          <SearchCode
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          />
          <input
            className="w-full rounded-lg border border-gray-400 bg-white py-4 pl-12 pr-4 cursor-not-allowed"
            placeholder="Search products or stores"
            disabled
          />
        </div>
        <div className="flex flex-row justify-between items-center mt-10">
          <p className="text-lg font-medium">Deals</p>
          <p className="font-medium text-green-700 cursor-not-allowed">
            View all
          </p>
        </div>

        {/* EXAMPLE OF PRODUCTS */}
        <div className="flex flex-col gap-3 mt-2" id="offers">
          <article className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-[11px] rounded-[15px] border border-[#edf0eb] bg-white p-[10px] shadow-[0_3px_10px_#263c2a06] min-[900px]:grid-cols-[68px_minmax(0,1fr)_auto] min-[900px]:gap-[15px] min-[900px]:p-[14px] max-[780px]:p-2">
            <div className="relative grid h-14 w-[54px] place-items-center rounded-xl bg-[#f7eee6] text-[28px] min-[900px]:h-[68px] min-[900px]:w-[68px] min-[900px]:text-[34px]">
              🍗
              <span className="absolute left-[3px] top-[3px] rounded-[5px] bg-[#17865a] px-1 py-[3px] text-[8px] font-extrabold text-white">
                −25%
              </span>
            </div>
            <div className="min-w-0">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold min-[900px]:text-[15px]">
                Chicken breast
              </div>
              <div className="mt-1 text-[10px] text-[#7a857e] min-[900px]:text-xs">
                Lidl · Taikos Ave. · 0.8 km
              </div>
              <div className="mt-[5px] inline-flex items-center gap-1 text-[9px] font-semibold text-[#42815b] min-[900px]:text-[10px]">
                <i className="h-[5px] w-[5px] rounded-full bg-[#57b36d]" />
                Recently verified
              </div>
            </div>
            <div className="text-right">
              <strong className="text-[15px] tracking-[-.4px] min-[900px]:text-[17px]">
                €3.99
              </strong>
              <del className="mt-0.5 block text-[10px] text-[#a6aea8] min-[900px]:text-[11px]">
                €5.29
              </del>
              <div className="mt-1 text-[9px] text-[#79847d] min-[900px]:text-[11px]">
                until Oct 27
              </div>
            </div>
          </article>

          <article className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-[11px] rounded-[15px] border border-[#edf0eb] bg-white p-[10px] shadow-[0_3px_10px_#263c2a06] min-[900px]:grid-cols-[68px_minmax(0,1fr)_auto] min-[900px]:gap-[15px] min-[900px]:p-[14px] max-[780px]:p-2">
            <div className="relative grid h-14 w-[54px] place-items-center rounded-xl bg-[#eaf3fb] text-[28px] min-[900px]:h-[68px] min-[900px]:w-[68px] min-[900px]:text-[34px]">
              🥛
              <span className="absolute left-[3px] top-[3px] rounded-[5px] bg-[#17865a] px-1 py-[3px] text-[8px] font-extrabold text-white">
                −20%
              </span>
            </div>
            <div className="min-w-0">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold min-[900px]:text-[15px]">
                Milk 2.5%, 1 L
              </div>
              <div className="mt-1 text-[10px] text-[#7a857e] min-[900px]:text-xs">
                Rimi · Liepų St. · 1.4 km
              </div>
              <div className="mt-[5px] inline-flex items-center gap-1 text-[9px] font-semibold text-[#42815b] min-[900px]:text-[10px]">
                <i className="h-[5px] w-[5px] rounded-full bg-[#57b36d]" />
                Confirmed by 8 people
              </div>
            </div>
            <div className="text-right">
              <strong className="text-[15px] tracking-[-.4px] min-[900px]:text-[17px]">
                €0.95
              </strong>
              <del className="mt-0.5 block text-[10px] text-[#a6aea8] min-[900px]:text-[11px]">
                €1.19
              </del>
              <div className="mt-1 text-[9px] text-[#79847d] min-[900px]:text-[11px]">
                until Oct 26
              </div>
            </div>
          </article>

          <article className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-[11px] rounded-[15px] border border-[#edf0eb] bg-white p-[10px] shadow-[0_3px_10px_#263c2a06] min-[900px]:grid-cols-[68px_minmax(0,1fr)_auto] min-[900px]:gap-[15px] min-[900px]:p-[14px] max-[780px]:p-2">
            <div className="relative grid h-14 w-[54px] place-items-center rounded-xl bg-[#faf1d9] text-[28px] min-[900px]:h-[68px] min-[900px]:w-[68px] min-[900px]:text-[34px]">
              🍝
              <span className="absolute left-[3px] top-[3px] rounded-[5px] bg-[#17865a] px-1 py-[3px] text-[8px] font-extrabold text-white">
                −15%
              </span>
            </div>
            <div className="min-w-0">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold min-[900px]:text-[15px]">
                Spaghetti
              </div>
              <div className="mt-1 text-[10px] text-[#7a857e] min-[900px]:text-xs">
                Maxima · H. Manto St. · 0.6 km
              </div>
              <div className="mt-[5px] inline-flex items-center gap-1 text-[9px] font-semibold text-[#42815b] min-[900px]:text-[10px]">
                <i className="h-[5px] w-[5px] rounded-full bg-[#57b36d]" />
                Added 1 hour ago
              </div>
            </div>
            <div className="text-right">
              <strong className="text-[15px] tracking-[-.4px] min-[900px]:text-[17px]">
                €1.69
              </strong>
              <del className="mt-0.5 block text-[10px] text-[#a6aea8] min-[900px]:text-[11px]">
                €1.99
              </del>
              <div className="mt-1 text-[9px] text-[#79847d] min-[900px]:text-[11px]">
                until Oct 29
              </div>
            </div>
          </article>
        </div>

        <button className="ml-auto mt-7 flex h-10 w-30 items-center justify-center rounded-lg bg-green-950 text-white cursor-not-allowed">
          <Plus className="mr-2 scale-95 text-lime-300" />
          Add Deal
        </button>
      </div>
    </div>
  );
}
