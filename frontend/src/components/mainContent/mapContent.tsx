import { Layers, MapPin, Minus, Plus } from "lucide-react";

export default function MapContent() {
  return (
    <section
      aria-busy="true"
      aria-label="Nearby deals map"
      className="min-h-0 flex-1 p-3 md:p-4"
    >
      <div className="relative h-full min-h-0 overflow-hidden rounded-[20px] border border-[#d9e4d7] bg-[#e4ede1] shadow-[0_8px_24px_#263c2a0a]">
        <svg
          aria-hidden="true"
          viewBox="0 0 900 560"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 z-0 h-full w-full"
        >
          <rect width="900" height="560" fill="#e8f0e5" />
          <path
            d="M-40 85 950 265M-40 450 950 120M130-40 310 610M710-40 520 610"
            stroke="#fff"
            strokeWidth="27"
          />
          <path
            d="M-40 85 950 265M-40 450 950 120M130-40 310 610M710-40 520 610"
            stroke="#d4dfd1"
            strokeWidth="1.5"
          />
          <path
            d="M-30 260 950 420M395-40 340 610M0 35 900 35M485 0 850 560M40 0 0 560"
            stroke="#fff"
            strokeWidth="14"
          />
          <path
            d="M-30 260 950 420M395-40 340 610M0 35 900 35M485 0 850 560M40 0 0 560"
            stroke="#d4dfd1"
            strokeWidth="1"
          />
          <path
            d="M-20 520c140-45 250-15 380-50s210-85 330-58 160 8 230-16"
            fill="none"
            stroke="#b8dce5"
            strokeWidth="18"
          />
          <path
            d="M35 135h132v62H35zm275-72h115v49H310zM615 85h145v63H615zM105 340h108v70H105zm390-5h136v74H495zm263 98h111v65H758zM680 300h95v47h-95z"
            fill="#dce9d7"
          />
        </svg>

        <div className="absolute left-[25%] top-[37%] z-10 grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-green-700 shadow-[0_0_0_8px_#17865a22]">
          <MapPin aria-hidden="true" className="h-5 w-5 text-white" />
        </div>
        <div className="absolute left-[58%] top-[25%] z-10 h-9 w-20 animate-pulse rounded-full border-2 border-white bg-[#b7cbb2] shadow-md motion-reduce:animate-none" />
        <div className="absolute left-[69%] top-[57%] z-10 h-9 w-16 animate-pulse rounded-full border-2 border-white bg-[#b7cbb2] shadow-md motion-reduce:animate-none" />
        <div className="absolute left-[39%] top-[68%] z-10 h-9 w-16 animate-pulse rounded-full border-2 border-white bg-[#b7cbb2] shadow-md motion-reduce:animate-none" />

        <div className="absolute right-4 top-4 z-10 flex flex-col overflow-hidden rounded-xl border border-[#e6ebe4] bg-white shadow-md">
          <button
            type="button"
            aria-label="Zoom in"
            disabled
            className="grid h-10 w-10 place-items-center border-b border-[#edf0eb] text-[#657168]"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            disabled
            className="grid h-10 w-10 place-items-center text-[#657168]"
          >
            <Minus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-xl border border-[#e6ebe4] bg-white text-[#657168] shadow-md">
          <Layers aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
