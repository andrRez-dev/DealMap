import { LoaderCircle, Search } from "lucide-react";

const skeletonItems = [0, 1, 2];

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-[#e2e9df] motion-reduce:animate-none ${className}`}
    />
  );
}

export default function SearchContent() {
  return (
    <section
      aria-busy="true"
      aria-label="Nearby deals"
      className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6 md:px-8 md:py-7 xl:px-10"
    >
      <div className="flex w-full min-w-0 flex-col gap-5">
        <label className="relative block w-full">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          />
          <input
            aria-label="Search products or stores"
            className="w-full cursor-not-allowed rounded-lg border border-gray-400 bg-white py-4 pl-12 pr-4"
            placeholder="Search products or stores"
            disabled
          />
        </label>

        <div className="mb-1 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#26332a]">
              Deals near you
            </h2>
            <p className="mt-0.5 text-xs text-[#7a857e]">
              Fresh savings are on their way
            </p>
          </div>
          <span className="mb-0.5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#68766c] shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600 motion-reduce:animate-none" />
            Finding offers
          </span>
        </div>

        {skeletonItems.map((item) => (
          <article
            key={item}
            aria-hidden="true"
            className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#e9eee7] bg-white p-3.5 shadow-[0_5px_18px_#263c2a0a] transition-transform duration-300 hover:-translate-y-0.5 md:grid-cols-[76px_minmax(0,1fr)_auto] md:gap-4 md:p-4"
          >
            <SkeletonBlock
              className="h-16 w-16 rounded-xl md:h-[76px] md:w-[76px]"
            />
            <div className="flex min-w-0 flex-col gap-2.5">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-1/2" />
              <SkeletonBlock className="h-3 w-2/3" />
            </div>
            <div className="flex flex-col items-end gap-2.5">
              <SkeletonBlock className="h-4 w-14" />
              <SkeletonBlock className="h-3 w-10" />
              <SkeletonBlock className="h-3 w-14" />
            </div>
          </article>
        ))}

        <div className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d9e3d6] py-4 text-xs text-[#77837a]">
          <LoaderCircle
            aria-hidden="true"
            className="h-4 w-4 animate-spin text-green-700 motion-reduce:animate-none"
          />
          Gathering local deals
        </div>
      </div>
    </section>
  );
}
