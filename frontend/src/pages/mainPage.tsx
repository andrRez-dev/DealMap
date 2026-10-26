import { MapPin, UserRoundArrowLeft, ChevronDown } from "lucide-react";
import { Outlet } from "react-router-dom";
import { House, Search, MapPinned, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const panelElement = "flex flex-col items-center text-sm gap-1";

export default function MainPage() {
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
        <UserRoundArrowLeft className="scale-110" />
      </header>

      {/* main content of the page ⬇️  */}
      <Outlet />

      <footer>
        <div className="flex flex-row min-h-22 w-full bg-white items-center justify-center gap-25">
          <Link to="/main/home" className={panelElement}>
            <House />
            <p>Home</p>
          </Link>

          <Link to="/main/search" className={panelElement}>
            <Search />
            <p>Search</p>
          </Link>

          <Link to="/main/map" className={panelElement}>
            <MapPinned />
            <p>Map</p>
          </Link>

          <Link to="/main/favorites" className={panelElement}>
            <Heart />
            <p>Favorites</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
