<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
import { Link } from "react-router-dom";
import ShareDeal from "../components/images/shareDeal.png";
import DealPlace from "../components/images/dealPlace.png";

export default function InfoPage() {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen w-full bg-green-950 text-white overflow-x-hidden">
      <header className="border-b border-white/10">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Deal<span className="text-green-400">Map</span>
          </Link>

          <div className="hidden md:flex items-center gap-20 text-gray-300 font-medium">
            <a href="#features" className="hover:text-white transition-all">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-all">
              How it works
            </a>
            <a href="#community" className="hover:text-white transition-all">
              Community
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="border border-gray-400 px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition-all"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            >
              Log in
            </Link>

            <Link
              to="/register"
<<<<<<< HEAD
              className="rounded-md bg-white px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-300 sm:px-4 sm:text-sm"
=======
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-all"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main>
<<<<<<< HEAD
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
=======
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-900 border border-green-700 px-4 py-2 rounded-full text-xs text-green-300 font-semibold">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              LOCAL DEALS IN ONE PLACE
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mt-7">
              Spend less.
              <span className="block text-green-400">Find more.</span>
            </h1>

            <p className="text-gray-300 text-lg leading-8 max-w-xl mt-7">
              Discover discounts in nearby stores, compare offers and help the
              community keep local deals up to date.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <Link
                to="/register"
                className="bg-white text-black px-7 py-3 rounded-md font-medium text-center hover:bg-gray-300 transition-all"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              >
                Get started →
              </Link>

              <Link
                to="/login"
<<<<<<< HEAD
                className="rounded-md border border-gray-400 px-6 py-3 text-center font-medium transition-colors hover:bg-white hover:text-black sm:px-7"
=======
                className="border border-gray-400 px-7 py-3 rounded-md font-medium text-center hover:bg-white hover:text-black transition-all"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              >
                I already have an account
              </Link>
            </div>

<<<<<<< HEAD
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-400 sm:text-sm">
              <span>Find deals</span>
              <span aria-hidden="true">•</span>
              <span>Compare prices</span>
              <span aria-hidden="true">•</span>
=======
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-8">
              <span>Find deals</span>
              <span>•</span>
              <span>Compare prices</span>
              <span>•</span>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              <span>Save money</span>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          <div className="relative min-h-125 flex items-center justify-center">
            <div className="absolute w-105 h-105 rounded-full bg-green-900/50 border border-green-700 overflow-hidden">
              <div className="absolute top-1/3 w-full h-5 bg-green-800/60 rotate-12" />
              <div className="absolute top-2/3 w-full h-5 bg-green-800/60 -rotate-12" />
              <div className="absolute left-1/3 h-full w-5 bg-green-800/60 rotate-12" />
              <div className="absolute left-2/3 h-full w-5 bg-green-800/60 -rotate-12" />
            </div>

            <div className="absolute top-10 right-14 w-12 h-12 bg-green-400 text-green-950 rounded-full border-4 border-green-950 flex items-center justify-center font-bold">
              %
            </div>

            <div className="absolute bottom-16 left-10 w-12 h-12 bg-green-400 text-green-950 rounded-full border-4 border-green-950 flex items-center justify-center font-bold">
              %
            </div>

            <div className="absolute bottom-5 right-20 w-12 h-12 bg-green-400 text-green-950 rounded-full border-4 border-green-950 flex items-center justify-center font-bold">
              %
            </div>

            <div className="relative z-10 bg-gray-900 border border-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  DEAL NEAR YOU
                </div>

                <span className="text-xs bg-green-900 border border-green-700 text-green-300 px-2 py-1 rounded-md">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                  0.8 km
                </span>
              </div>

<<<<<<< HEAD
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
=======
              <p className="text-gray-400 text-sm mt-6">Grocery</p>

              <h3 className="text-2xl font-semibold mt-1">
                Discounted product
              </h3>

              <div className="flex justify-between items-end mt-6">
                <div className="flex items-center gap-3">
                  <span className="line-through text-gray-500">€5.29</span>
                  <span className="text-3xl font-bold">€3.99</span>
                </div>

                <span className="bg-green-400 text-green-950 px-3 py-1 rounded-md font-bold">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                  -25%
                </span>
              </div>

<<<<<<< HEAD
              <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-gray-700 pt-4 text-xs">
                <span className="text-gray-400">
                  📍 Local store
                </span>

                <span className="text-green-400">
                  ✓ Recently verified
                </span>
=======
              <div className="border-t border-gray-700 mt-6 pt-5 flex justify-between text-xs">
                <span className="text-gray-400">📍 Local store</span>

                <span className="text-green-400">✓ Recently verified</span>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Problem */}
        <section className="border-y border-white/10 bg-gray-900 py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xs font-bold tracking-widest text-green-400">
              THE PROBLEM
            </p>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              Great deals exist.
              <span className="mt-2 block text-gray-400">
=======
        <section className="bg-gray-900 border-y border-white/10 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-green-400 text-xs font-bold tracking-widest">
              THE PROBLEM
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-5">
              Great deals exist.
              <span className="block text-gray-400 mt-2">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                Finding them shouldn't be difficult.
              </span>
            </h2>

<<<<<<< HEAD
            <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
              Discounts are scattered across store websites,
              apps, advertisements and flyers. DealMap brings
              them together so you can spend less time
              searching and more time saving.
=======
            <p className="text-gray-300 text-lg leading-8 mt-7">
              Discounts are scattered across store websites, apps,
              advertisements and flyers. DealMap brings them together so you can
              spend less time searching and more time saving.
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            </p>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        <section id="features" className="max-w-7xl mx-auto px-6 py-28">
          <p className="text-green-400 text-xs font-bold tracking-widest">
            WHY DEALMAP?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mt-4">
            Everything you need to find a better deal.
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mt-14">
            <article className="bg-gray-900 border border-gray-700 hover:border-green-600 rounded-xl p-8 transition-all">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-green-900 border border-green-700 rounded-xl flex items-center justify-center text-2xl">
                  📍
                </div>

                <span className="text-gray-600 font-bold">01</span>
              </div>

              <h3 className="text-xl font-semibold mt-7">
                Explore nearby deals
              </h3>

              <p className="text-gray-400 leading-7 mt-3">
                Discover promotions around you using an interactive map with
                discount locations and nearby stores.
              </p>
            </article>

            <article className="bg-gray-900 border border-gray-700 hover:border-green-600 rounded-xl p-8 transition-all">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-green-900 border border-green-700 rounded-xl flex items-center justify-center text-2xl">
                  🔎
                </div>

                <span className="text-gray-600 font-bold">02</span>
              </div>

              <h3 className="text-xl font-semibold mt-7">Search products</h3>

              <p className="text-gray-400 leading-7 mt-3">
                Search for products or categories and quickly find stores
                offering available promotions.
              </p>
            </article>

            <article className="bg-gray-900 border border-gray-700 hover:border-green-600 rounded-xl p-8 transition-all">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-green-900 border border-green-700 rounded-xl flex items-center justify-center text-green-300 text-xl font-bold">
                  €
                </div>

                <span className="text-gray-600 font-bold">03</span>
              </div>

              <h3 className="text-xl font-semibold mt-7">Compare offers</h3>

              <p className="text-gray-400 leading-7 mt-3">
                Compare prices, discounts and distance before deciding which
                store is worth visiting.
              </p>
            </article>

            <article className="bg-gray-900 border border-gray-700 hover:border-green-600 rounded-xl p-8 transition-all">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-green-900 border border-green-700 rounded-xl flex items-center justify-center text-green-300 text-xl font-bold">
                  ✓
                </div>

                <span className="text-gray-600 font-bold">04</span>
              </div>

              <h3 className="text-xl font-semibold mt-7">Verify discounts</h3>

              <p className="text-gray-400 leading-7 mt-3">
                Confirm whether a promotion is still active and help keep
                DealMap accurate for everyone.
              </p>
            </article>
          </div>
        </section>

        <section
          id="how-it-works"
          className="bg-gray-900 border-y border-white/10 py-28"
        >
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-green-400 text-xs font-bold tracking-widest">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              From search to savings.
            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-16">
              {[
                ["1", "Search", "Enter a product or browse a category."],
                ["2", "Discover", "Find available discounts at nearby stores."],
                ["3", "Compare", "Compare price, discount and distance."],
                ["4", "Save", "Choose the best offer and save money."],
              ].map(([number, title, description]) => (
                <div key={number}>
                  <div className="w-14 h-14 bg-green-400 text-green-950 rounded-full flex items-center justify-center font-bold text-lg">
                    {number}
                  </div>

                  <div className="hidden md:block h-px bg-green-800 mt-6" />

                  <h3 className="text-xl font-semibold mt-6">{title}</h3>

                  <p className="text-gray-400 leading-6 mt-2">{description}</p>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                </div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        <section id="community" className="max-w-7xl mx-auto px-6 py-28">
          <div className="bg-green-900 border border-green-700 rounded-2xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 md:p-14 lg:p-16 flex flex-col justify-center">
              <p className="text-green-300 text-xs font-bold tracking-widest">
                COMMUNITY POWERED
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                See a deal?
                <span className="block text-green-300">Share it.</span>
              </h2>

              <p className="text-green-100/70 leading-7 mt-6">
                DealMap is powered by its users. Add promotions you find in
                local stores and help others save money. Other users can confirm
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                whether the deal is still available.
              </p>
            </div>

<<<<<<< HEAD
            <div className="relative flex min-h-[260px] w-full min-w-0 items-center justify-center overflow-hidden sm:min-h-[380px] lg:min-h-[480px]">
              <img
                src={ShareDeal}
                alt="DealMap community"
                className="absolute inset-0 h-full w-full object-cover"
=======
            <div className="relative min-h-110">
              <img
                src={ShareDeal}
                alt="DealMap community"
                className="absolute inset-0 w-full h-full object-cover"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              />

              <div className="absolute inset-0 bg-green-950/25" />

<<<<<<< HEAD
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white bg-gray-900/95 p-3 sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 sm:text-xs">
                      COMMUNITY DEAL
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold sm:text-base">
=======
              <div className="absolute bottom-6 left-6 right-6 bg-gray-900/95 border border-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">COMMUNITY DEAL</p>

                    <p className="font-semibold mt-1">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                      Added by a DealMap user
                    </p>
                  </div>

<<<<<<< HEAD
                  <span className="text-sm font-medium text-green-400">
                    ✓ Verified
                  </span>
=======
                  <div className="text-green-400 font-medium">✓ Verified</div>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                </div>
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Local offers */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid min-w-0 overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 lg:grid-cols-2">
            <div className="relative min-h-[240px] min-w-0 sm:min-h-[340px] lg:min-h-[400px]">
              <img
                src={DealPlace}
                alt="Discover local deals"
                className="absolute inset-0 h-full w-full object-cover"
=======
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden grid lg:grid-cols-2">
            <div className="relative min-h-100">
              <img
                src={DealPlace}
                alt="Discover local deals"
                className="absolute inset-0 w-full h-full object-cover"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              />

              <div className="absolute inset-0 bg-green-950/20" />
            </div>

<<<<<<< HEAD
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
=======
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <p className="text-green-400 text-xs font-bold tracking-widest">
                DISCOVER LOCAL OFFERS
              </p>

              <h2 className="text-4xl font-bold mt-4">
                One place for deals around you.
              </h2>

              <p className="text-gray-400 leading-7 mt-5">
                Instead of checking multiple store websites and applications,
                use DealMap to discover and compare nearby promotions.
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              </p>
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        <section className="bg-gray-900 border-t border-white/10 py-28">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-400 text-green-950 rounded-xl flex items-center justify-center text-2xl font-bold">
              %
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mt-8">
              Ready to start saving?
            </h2>

            <p className="text-gray-400 text-lg mt-5">
              Create your DealMap account and discover discounts near you.
            </p>

            <div className="flex justify-center gap-3 mt-8">
              <Link
                to="/register"
                className="bg-white text-black px-7 py-3 rounded-md font-medium hover:bg-gray-300 transition-all"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              >
                Create free account
              </Link>

              <Link
                to="/login"
<<<<<<< HEAD
                className="rounded-md border border-gray-500 px-7 py-3 text-center transition-colors hover:bg-white hover:text-black"
=======
                className="border border-gray-500 px-7 py-3 rounded-md hover:bg-white hover:text-black transition-all"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              >
                Log in
              </Link>
            </div>
          </div>
        </section>
      </main>

<<<<<<< HEAD
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
=======
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-between items-center gap-5">
          <Link to="/" className="text-xl font-bold">
            Deal<span className="text-green-400">Map</span>
          </Link>

          <p className="text-gray-400 text-sm">Local discounts on one map.</p>

          <p className="text-gray-500 text-sm">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            Agile Software Development Team Project
          </p>
        </div>
      </footer>
    </div>
  );
}
