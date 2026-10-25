import { Link } from "react-router-dom";
import LoginImg from "../components/images/loginImg.png";
import RegisterImg from "../components/images/registerImg.png";

export default function InfoPage() {
  return (
    <div className="min-h-screen w-full bg-green-950 text-white overflow-x-hidden">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Deal<span className="text-green-400">Map</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition-all">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-all">
              How it works
            </a>
            <a href="#community" className="hover:text-white transition-all">
              Community
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="border border-gray-400 px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition-all"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-all"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main>
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
              >
                Get started →
              </Link>

              <Link
                to="/login"
                className="border border-gray-400 px-7 py-3 rounded-md font-medium text-center hover:bg-white hover:text-black transition-all"
              >
                I already have an account
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mt-8">
              <span>Find deals</span>
              <span>•</span>
              <span>Compare prices</span>
              <span>•</span>
              <span>Save money</span>
            </div>
          </div>

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
                  0.8 km
                </span>
              </div>

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
                  -25%
                </span>
              </div>

              <div className="border-t border-gray-700 mt-6 pt-5 flex justify-between text-xs">
                <span className="text-gray-400">📍 Local store</span>

                <span className="text-green-400">✓ Recently verified</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 border-y border-white/10 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-green-400 text-xs font-bold tracking-widest">
              THE PROBLEM
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-5">
              Great deals exist.
              <span className="block text-gray-400 mt-2">
                Finding them shouldn't be difficult.
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-8 mt-7">
              Discounts are scattered across store websites, apps,
              advertisements and flyers. DealMap brings them together so you can
              spend less time searching and more time saving.
            </p>
          </div>
        </section>

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
                </div>
              ))}
            </div>
          </div>
        </section>

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
                whether the deal is still available.
              </p>

              <Link
                to="/register"
                className="w-fit bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-all mt-8"
              >
                Join the community →
              </Link>
            </div>

            <div className="relative min-h-110">
              <img
                src={RegisterImg}
                alt="DealMap community"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-green-950/25" />

              <div className="absolute bottom-6 left-6 right-6 bg-gray-900/95 border border-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">COMMUNITY DEAL</p>

                    <p className="font-semibold mt-1">
                      Added by a DealMap user
                    </p>
                  </div>

                  <div className="text-green-400 font-medium">✓ Verified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden grid lg:grid-cols-2">
            <div className="relative min-h-100">
              <img
                src={LoginImg}
                alt="Discover local deals"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-green-950/20" />
            </div>

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
              </p>

              <Link
                to="/register"
                className="w-fit border border-gray-400 px-6 py-3 rounded-md hover:bg-white hover:text-black transition-all mt-7"
              >
                Start exploring →
              </Link>
            </div>
          </div>
        </section>

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
              >
                Create free account
              </Link>

              <Link
                to="/login"
                className="border border-gray-500 px-7 py-3 rounded-md hover:bg-white hover:text-black transition-all"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-between items-center gap-5">
          <Link to="/" className="text-xl font-bold">
            Deal<span className="text-green-400">Map</span>
          </Link>

          <p className="text-gray-400 text-sm">Local discounts on one map.</p>

          <p className="text-gray-500 text-sm">
            Agile Software Development Team Project
          </p>
        </div>
      </footer>
    </div>
  );
}
