
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

type MapView = {
  center: [number, number];
  zoom: number;
};

export default function MainPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
          </Link>

          <Link
            to="/main/search"
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
          </Link>

          <Link
            to="/main/add"
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
          </Link>

          <Link
            to="/main/map"
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
          </Link>

          <Link
            to="/main/favorites"
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
      </footer>
    </div>
  );
}
