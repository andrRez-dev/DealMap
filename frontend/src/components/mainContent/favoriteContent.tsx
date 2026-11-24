<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
import { Heart, LoaderCircle } from "lucide-react";

const skeletonItems = [0, 1, 2];

<<<<<<< HEAD
function SkeletonBlock({
  className,
}: {
  className: string;
}) {
=======
function SkeletonBlock({ className }: { className: string }) {
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
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
<<<<<<< HEAD
      className="flex w-full min-w-0 min-h-0 flex-1 flex-col px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-4 sm:gap-5">
        {/* Page heading */}
        <div className="mb-1 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-[#26332a] sm:text-2xl">
              Your favorites
            </h2>

            <p className="mt-1 break-words text-xs text-[#7a857e] sm:text-sm">
              Your saved deals are on their way
            </p>
          </div>

          <span
            role="status"
            className="flex w-fit max-w-full shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#68766c] shadow-sm"
          >
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-600 motion-reduce:animate-none" />
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            Loading favorites
          </span>
        </div>

<<<<<<< HEAD
        {/* Loading cards */}
=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
        {skeletonItems.map((item) => (
          <article
            key={item}
            aria-hidden="true"
<<<<<<< HEAD
            className="grid w-full min-w-0 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-[#e9eee7] bg-white p-3 shadow-[0_5px_18px_#263c2a0a] sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-3 sm:p-4 md:grid-cols-[76px_minmax(0,1fr)_auto] md:gap-4"
          >
            {/* Product image placeholder */}
            <SkeletonBlock className="h-12 w-12 rounded-xl sm:h-16 sm:w-16 md:h-[76px] md:w-[76px]" />

            {/* Product text placeholders */}
            <div className="flex min-w-0 flex-col gap-2 sm:gap-2.5">
              <SkeletonBlock className="h-4 w-3/4 max-w-full" />
              <SkeletonBlock className="h-3 w-1/2 max-w-full" />
              <SkeletonBlock className="h-3 w-2/3 max-w-full" />
            </div>

            {/* Price and favorite placeholders */}
            <div className="flex min-w-0 flex-col items-end gap-2 sm:gap-2.5">
              <SkeletonBlock className="h-4 w-10 sm:w-14" />
              <SkeletonBlock className="h-3 w-8 sm:w-10" />

              <Heart
                aria-hidden="true"
                className="h-4 w-4 shrink-0 fill-[#e2e9df] text-[#e2e9df]"
=======
            className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#e9eee7] bg-white p-3.5 shadow-[0_5px_18px_#263c2a0a] md:grid-cols-[76px_minmax(0,1fr)_auto] md:gap-4 md:p-4"
          >
            <SkeletonBlock className="h-16 w-16 rounded-xl md:h-19 md:w-19" />
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              />
            </div>
          </article>
        ))}

<<<<<<< HEAD
        {/* Loading indicator */}
        <div className="mt-1 flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d9e3d6] px-3 py-4 text-center text-xs text-[#77837a] sm:text-sm">
          <LoaderCircle
            aria-hidden="true"
            className="h-4 w-4 shrink-0 animate-spin text-green-700 motion-reduce:animate-none"
          />

          <span className="min-w-0 break-words">
            Loading your saved deals
          </span>
=======
        <div className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d9e3d6] py-4 text-xs text-[#77837a]">
          <LoaderCircle
            aria-hidden="true"
            className="h-4 w-4 animate-spin text-green-700 motion-reduce:animate-none"
          />
          Loading your saved deals
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
        </div>
      </div>
    </section>
  );
}
