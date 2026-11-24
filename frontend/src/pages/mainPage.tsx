<<<<<<< HEAD

import {
  MapPin,
  UserRoundArrowLeft,
  ChevronDown,
  House,
  Search,
  MapPinned,
  Heart,
  SquarePlus,
} from "lucide-react";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

const panelElement =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-green-700 sm:gap-1.5 sm:px-3 sm:text-sm";

const chosen =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-green-50 px-1 py-2 text-[10px] font-semibold text-green-700 transition-colors sm:gap-1.5 sm:px-3 sm:text-sm";
=======
import { MapPin, UserRoundArrowLeft, ChevronDown } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { House, Search, MapPinned, Heart, SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const panelElement = "flex flex-col items-center text-sm gap-1";
const chosen = "flex flex-col items-center text-sm gap-1 text-green-700";
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1

type MapView = {
  center: [number, number];
  zoom: number;
};

export default function MainPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
<<<<<<< HEAD

  const [mapView, setMapView] = useState<MapView | null>(
    null
  );

  function logout() {
    localStorage.removeItem("client_token");
    navigate("/login");
  }

  return (
    <div className="flex h-dvh max-h-dvh w-full min-w-0 flex-col overflow-hidden bg-[#e9eee8]">
      {/* Header */}
      <header className="flex h-[64px] min-h-[64px] w-full min-w-0 shrink-0 items-center justify-between gap-3 bg-white px-3 py-2 sm:h-[76px] sm:min-h-[76px] sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-col">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-green-700 sm:h-10 sm:w-10">
              <MapPin
                aria-hidden="true"
                className="h-5 w-5 text-white sm:h-6 sm:w-6"
              />
            </div>

            <h1 className="min-w-0 text-lg font-bold tracking-tight text-[#26332a] sm:text-xl">
              Deal
              <span className="text-green-700">
                Map
              </span>
            </h1>
          </div>

          <div className="mt-1 flex min-w-0 items-center gap-1 pl-1 text-xs text-gray-600 sm:text-sm">
            <p className="min-w-0 truncate">
              <span className="font-semibold text-[#26332a]">
                Klaipėda
              </span>
              {" — near me"}
            </p>

            <ChevronDown
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-gray-500"
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Log out"
          title="Log out"
          onClick={logout}
          className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl text-[#26332a] transition-colors hover:bg-green-50 hover:text-green-700 active:scale-95 sm:h-11 sm:w-11"
        >
          <UserRoundArrowLeft
            aria-hidden="true"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>
      </header>

      {/* Main content */}
      <main className="flex h-0 min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain">
        <Outlet context={{ mapView, setMapView }} />
      </main>

      {/* Bottom navigation */}
      <footer className="z-20 w-full min-w-0 shrink-0 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
        <nav
          aria-label="Main navigation"
          className="mx-auto grid min-h-[64px] w-full max-w-4xl grid-cols-5 items-stretch gap-1 px-2 py-1 sm:min-h-[80px] sm:gap-3 sm:px-6 sm:py-2"
        >
          <Link
            to="/main/home"
            aria-current={
              pathname === "/main/home"
                ? "page"
                : undefined
            }
            className={
              pathname === "/main/home"
                ? chosen
                : panelElement
            }
          >
            <House
              aria-hidden="true"
              className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
            />
            <span>Home</span>
=======
  const [mapView, setMapView] = useState<MapView | null>(null);

  return (
    <div className="flex flex-col justify-between w-full h-full bg-[#e9eee8]">
      <header className="flex items-center justify-between px-10 bg-white min-h-22 w-full">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className="p-2 bg-green-700 rounded-lg">
              <MapPin className="text-white" />
            </div>
            <h1 className="text-xl font-bold ml-2">
              Deal<span className="text-green-700">Map</span>
            </h1>
          </div>
          <div className="flex flex-row items-center mt-0.5">
            <p>
              <span className="font-semibold">Klaipėda</span> - near me
            </p>
            <ChevronDown className="scale-80 mt-1" />
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("client_token");
            navigate("/login");
          }}
          className="hover:scale-110 hover:text-green-700 cursor-pointer transition-all active:scale-90"
        >
          <UserRoundArrowLeft className="scale-110" />
        </button>
      </header>

      {/* main content of the page ⬇️  */}
      <div className="min-h-0 flex-1">
        <Outlet context={{ mapView, setMapView }} />
      </div>

      <footer className="relative">
        <div className="flex flex-row min-h-22 w-full bg-white items-center justify-center gap-25">
          <Link
            to="/main/home"
            className={
              pathname === "/main/home" ? `${chosen}` : `${panelElement}`
            }
          >
            <House />
            <p>Home</p>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          </Link>

          <Link
            to="/main/search"
<<<<<<< HEAD
            aria-current={
              pathname === "/main/search"
                ? "page"
                : undefined
            }
            className={
              pathname === "/main/search"
                ? chosen
                : panelElement
            }
          >
            <Search
              aria-hidden="true"
              className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
            />
            <span>Search</span>
=======
            className={
              pathname === "/main/search" ? `${chosen}` : `${panelElement}`
            }
          >
            <Search />
            <p>Search</p>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          </Link>

          <Link
            to="/main/add"
<<<<<<< HEAD
            aria-current={
              pathname === "/main/add"
                ? "page"
                : undefined
            }
            className={
              pathname === "/main/add"
                ? chosen
                : panelElement
            }
          >
            <SquarePlus
              aria-hidden="true"
              className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
            />
            <span>Add</span>
=======
            className={
              pathname === "/main/add" ? `${chosen}` : `${panelElement}`
            }
          >
            <SquarePlus />
            <p>Add</p>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          </Link>

          <Link
            to="/main/map"
<<<<<<< HEAD
            aria-current={
              pathname === "/main/map"
                ? "page"
                : undefined
            }
            className={
              pathname === "/main/map"
                ? chosen
                : panelElement
            }
          >
            <MapPinned
              aria-hidden="true"
              className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
            />
            <span>Map</span>
=======
            className={
              pathname === "/main/map" ? `${chosen}` : `${panelElement}`
            }
          >
            <MapPinned />
            <p>Map</p>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          </Link>

          <Link
            to="/main/favorites"
<<<<<<< HEAD
            aria-current={
              pathname === "/main/favorites"
                ? "page"
                : undefined
            }
            className={
              pathname === "/main/favorites"
                ? chosen
                : panelElement
            }
          >
            <Heart
              aria-hidden="true"
              className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
            />
            <span>Favorites</span>
          </Link>
        </nav>
=======
            className={
              pathname === "/main/favorites" ? `${chosen}` : `${panelElement}`
            }
          >
            <Heart />
            <p>Favorites</p>
          </Link>
        </div>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
      </footer>
    </div>
  );
}
