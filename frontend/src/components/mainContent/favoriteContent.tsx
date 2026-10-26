import { Heart, LoaderCircle } from "lucide-react";

const skeletonItems = [0, 1, 2];

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-[#e2e9df] motion-reduce:animate-none ${className}`}
    />
  );
}

export default function FavoriteContent() {
  return (
    <section
      aria-busy="true"
      aria-label="Favorite deals"
      className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6 md:px-8 md:py-7 xl:px-10"
    >
      <div className="flex w-full min-w-0 flex-col gap-5">
        <div className="mb-1 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#26332a]">
              Your favorites
            </h2>
            <p className="mt-0.5 text-xs text-[#7a857e]">
              Your saved deals are on their way
            </p>
          </div>
          <span
            role="status"
            className="mb-0.5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#68766c] shadow-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600 motion-reduce:animate-none" />
            Loading favorites
          </span>
        </div>

        {skeletonItems.map((item) => (
          <article
            key={item}
            aria-hidden="true"
            className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#e9eee7] bg-white p-3.5 shadow-[0_5px_18px_#263c2a0a] md:grid-cols-[76px_minmax(0,1fr)_auto] md:gap-4 md:p-4"
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
              <Heart
                aria-hidden="true"
                className="h-4 w-4 fill-[#e2e9df] text-[#e2e9df]"
              />
            </div>
          </article>
        ))}

        <div className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d9e3d6] py-4 text-xs text-[#77837a]">
          <LoaderCircle
            aria-hidden="true"
            className="h-4 w-4 animate-spin text-green-700 motion-reduce:animate-none"
          />
          Loading your saved deals
        </div>
      </div>
    </section>
  );
}
