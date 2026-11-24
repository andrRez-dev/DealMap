
import { Link } from "react-router-dom";
import ShareDeal from "../components/images/shareDeal.png";
import DealPlace from "../components/images/dealPlace.png";

export default function InfoPage() {
  return (
    <div className="min-h-dvh w-full min-w-0 overflow-x-hidden bg-green-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 md:min-h-20 lg:px-8">
          <Link
            to="/"
            className="shrink-0 text-xl font-bold sm:text-2xl"
          >
            Deal<span className="text-green-400">Map</span>
          </Link>

          <nav
            aria-label="Landing page navigation"
            className="order-3 flex w-full items-center justify-center gap-4 text-xs font-medium text-gray-300 sm:gap-8 sm:text-sm md:order-2 md:w-auto lg:gap-12"
          >
            <a
              href="#features"
              className="transition-colors hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition-colors hover:text-white"
            >
              How it works
            </a>

            <a
              href="#community"
              className="transition-colors hover:text-white"
            >
              Community
            </a>
          </nav>

          <div className="order-2 flex shrink-0 items-center gap-2 sm:gap-3 md:order-3">
            <Link
              to="/login"
              className="rounded-md border border-gray-400 px-3 py-2 text-xs transition-colors hover:bg-white hover:text-black sm:px-4 sm:text-sm"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="rounded-md bg-white px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-300 sm:px-4 sm:text-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-green-700 bg-green-900 px-3 py-2 text-[10px] font-semibold text-green-300 sm:px-4 sm:text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
              LOCAL DEALS IN ONE PLACE
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Spend less.
              <span className="block text-green-400">
                Find more.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
              Discover discounts in nearby stores, compare
              offers and help the community keep local deals
              up to date.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="rounded-md bg-white px-6 py-3 text-center font-medium text-black transition-colors hover:bg-gray-300 sm:px-7"
              >
                Get started →
              </Link>

              <Link
                to="/login"
                className="rounded-md border border-gray-400 px-6 py-3 text-center font-medium transition-colors hover:bg-white hover:text-black sm:px-7"
              >
                I already have an account
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-400 sm:text-sm">
              <span>Find deals</span>
              <span aria-hidden="true">•</span>
              <span>Compare prices</span>
              <span aria-hidden="true">•</span>
              <span>Save money</span>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="relative flex min-h-[300px] min-w-0 items-center justify-center overflow-hidden sm:min-h-[420px] lg:min-h-[480px]">
            <div className="absolute h-[260px] w-[260px] overflow-hidden rounded-full border border-green-700 bg-green-900/50 sm:h-[400px] sm:w-[400px]">
              <div className="absolute top-1/3 h-5 w-full rotate-12 bg-green-800/60" />
              <div className="absolute top-2/3 h-5 w-full -rotate-12 bg-green-800/60" />
              <div className="absolute left-1/3 h-full w-5 rotate-12 bg-green-800/60" />
              <div className="absolute left-2/3 h-full w-5 -rotate-12 bg-green-800/60" />
            </div>

            <div className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-green-950 bg-green-400 font-bold text-green-950 sm:right-14 sm:top-10 sm:h-12 sm:w-12">
              %
            </div>

            <div className="absolute bottom-12 left-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-green-950 bg-green-400 font-bold text-green-950 sm:bottom-16 sm:left-10 sm:h-12 sm:w-12">
              %
            </div>

            <div className="absolute bottom-3 right-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-green-950 bg-green-400 font-bold text-green-950 sm:bottom-5 sm:right-20 sm:h-12 sm:w-12">
              %
            </div>

            {/* Example deal card */}
            <div className="relative z-10 w-full max-w-[320px] min-w-0 rounded-xl border border-white bg-gray-900 p-4 shadow-2xl sm:max-w-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  DEAL NEAR YOU
                </div>

                <span className="rounded-md border border-green-700 bg-green-900 px-2 py-1 text-xs text-green-300">
                  0.8 km
                </span>
              </div>

              <p className="mt-5 text-sm text-gray-400">
                Grocery
              </p>

              <h3 className="mt-1 break-words text-xl font-semibold sm:text-2xl">
                Discounted product
              </h3>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-sm text-gray-500 line-through sm:text-base">
                    €5.29
                  </span>

                  <span className="text-2xl font-bold sm:text-3xl">
                    €3.99
                  </span>
                </div>

                <span className="rounded-md bg-green-400 px-3 py-1 font-bold text-green-950">
                  -25%
                </span>
              </div>

              <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-gray-700 pt-4 text-xs">
                <span className="text-gray-400">
                  📍 Local store
                </span>

                <span className="text-green-400">
                  ✓ Recently verified
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-y border-white/10 bg-gray-900 py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xs font-bold tracking-widest text-green-400">
              THE PROBLEM
            </p>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              Great deals exist.
              <span className="mt-2 block text-gray-400">
                Finding them shouldn't be difficult.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
              Discounts are scattered across store websites,
              apps, advertisements and flyers. DealMap brings
              them together so you can spend less time
              searching and more time saving.
            </p>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto w-full max-w-7xl scroll-mt-6 px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <p className="text-xs font-bold tracking-widest text-green-400">
            WHY DEALMAP?
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl md:text-5xl">
            Everything you need to find a better deal.
          </h2>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2 md:gap-5">
            {[
              {
                number: "01",
                icon: "📍",
                title: "Explore nearby deals",
                description:
                  "Discover promotions around you using an interactive map with discount locations and nearby stores.",
              },
              {
                number: "02",
                icon: "🔎",
                title: "Search products",
                description:
                  "Search for products or categories and quickly find stores offering available promotions.",
              },
              {
                number: "03",
                icon: "€",
                title: "Compare offers",
                description:
                  "Compare prices, discounts and distance before deciding which store is worth visiting.",
              },
              {
                number: "04",
                icon: "✓",
                title: "Verify discounts",
                description:
                  "Confirm whether a promotion is still active and help keep DealMap accurate for everyone.",
              },
            ].map((feature) => (
              <article
                key={feature.number}
                className="min-w-0 rounded-xl border border-gray-700 bg-gray-900 p-5 transition-colors hover:border-green-600 sm:p-7 lg:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-700 bg-green-900 text-2xl text-green-300 sm:h-14 sm:w-14">
                    {feature.icon}
                  </div>

                  <span className="font-bold text-gray-600">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-6 border-y border-white/10 bg-gray-900 py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold tracking-widest text-green-400">
              HOW IT WORKS
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              From search to savings.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {[
                [
                  "1",
                  "Search",
                  "Enter a product or browse a category.",
                ],
                [
                  "2",
                  "Discover",
                  "Find available discounts at nearby stores.",
                ],
                [
                  "3",
                  "Compare",
                  "Compare price, discount and distance.",
                ],
                [
                  "4",
                  "Save",
                  "Choose the best offer and save money.",
                ],
              ].map(([number, title, description]) => (
                <div key={number} className="min-w-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-400 text-lg font-bold text-green-950">
                    {number}
                  </div>

                  <div className="mt-6 hidden h-px bg-green-800 lg:block" />

                  <h3 className="mt-5 text-xl font-semibold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section
          id="community"
          className="mx-auto w-full max-w-7xl scroll-mt-6 px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="grid min-w-0 overflow-hidden rounded-2xl border border-green-700 bg-green-900 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 md:p-12 lg:p-14">
              <p className="text-xs font-bold tracking-widest text-green-300">
                COMMUNITY POWERED
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                See a deal?
                <span className="block text-green-300">
                  Share it.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-green-100/70 sm:text-base">
                DealMap is powered by its users. Add
                promotions you find in local stores and help
                others save money. Other users can confirm
                whether the deal is still available.
              </p>
            </div>

            <div className="relative flex min-h-[260px] w-full min-w-0 items-center justify-center overflow-hidden sm:min-h-[380px] lg:min-h-[480px]">
              <img
                src={ShareDeal}
                alt="DealMap community"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-green-950/25" />

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white bg-gray-900/95 p-3 sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 sm:text-xs">
                      COMMUNITY DEAL
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold sm:text-base">
                      Added by a DealMap user
                    </p>
                  </div>

                  <span className="text-sm font-medium text-green-400">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local offers */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid min-w-0 overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 lg:grid-cols-2">
            <div className="relative min-h-[240px] min-w-0 sm:min-h-[340px] lg:min-h-[400px]">
              <img
                src={DealPlace}
                alt="Discover local deals"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-green-950/20" />
            </div>

            <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 md:p-12 lg:p-14">
              <p className="text-xs font-bold tracking-widest text-green-400">
                DISCOVER LOCAL OFFERS
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                One place for deals around you.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                Instead of checking multiple store websites
                and applications, use DealMap to discover
                and compare nearby promotions.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-gray-900 py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-green-400 text-2xl font-bold text-green-950">
              %
            </div>

            <h2 className="mt-7 text-3xl font-bold sm:text-4xl md:text-5xl">
              Ready to start saving?
            </h2>

            <p className="mt-5 text-base text-gray-400 sm:text-lg">
              Create your DealMap account and discover
              discounts near you.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="rounded-md bg-white px-7 py-3 text-center font-medium text-black transition-colors hover:bg-gray-300"
              >
                Create free account
              </Link>

              <Link
                to="/login"
                className="rounded-md border border-gray-500 px-7 py-3 text-center transition-colors hover:bg-white hover:text-black"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold"
          >
            Deal<span className="text-green-400">Map</span>
          </Link>

          <p className="text-sm text-gray-400">
            Local discounts on one map.
          </p>

          <p className="text-sm text-gray-500">
            Agile Software Development Team Project
          </p>
        </div>
      </footer>
    </div>
  );
}
