import { useEffect, useState } from "react";
import { latLngBounds } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { Link } from "react-router-dom";
import { getRequestHeaders, readResponse } from "../shared/api";
import type { Store } from "../shared/types";
import "leaflet/dist/leaflet.css";

type StoresResponse = {
  stores?: Store[];
};

type LocatedStore = Store & {
  latitude: number;
  longitude: number;
};

function FitStores({ stores }: { stores: LocatedStore[] }) {
  const map = useMap();

  useEffect(() => {
    if (stores.length === 0) {
      return;
    }

    const bounds = latLngBounds(
      stores.map((store) => [store.latitude, store.longitude]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [map, stores]);

  return null;
}

export default function MapContent() {
  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;
  const api = import.meta.env.VITE_API_URL;
  const [stores, setStores] = useState<LocatedStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadStores(): Promise<void> {
      try {
        if (!api) {
          throw new Error("The API URL is not configured.");
        }

        const response = await fetch(`${api}/api/stores/get`, {
          headers: getRequestHeaders(),
        });
        const data = await readResponse<StoresResponse>(
          response,
          "Unable to load stores",
        );

        if (!Array.isArray(data.stores)) {
          throw new Error("The server did not return a list of stores.");
        }

        const locatedStores = data.stores
          .map((store) => ({
            ...store,
            latitude: Number(store.latitude),
            longitude: Number(store.longitude),
          }))
          .filter(
            (store) =>
              Number.isFinite(store.latitude) &&
              Number.isFinite(store.longitude) &&
              Math.abs(store.latitude) <= 90 &&
              Math.abs(store.longitude) <= 180,
          );

        if (isCurrent) {
          setStores(locatedStores);
        }
      } catch (loadError: unknown) {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load stores.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    void loadStores();
    return () => {
      isCurrent = false;
    };
  }, [api]);

  return (
    <section
      aria-label="Interactive map"
      className="relative min-h-0 flex-1 p-3 md:p-4"
    >
      {error && (
        <p
          className="absolute left-6 top-6 z-1000 rounded-lg bg-white px-4 py-3 text-sm text-red-700 shadow"
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && !isLoading && stores.length === 0 && (
        <p className="absolute left-6 top-6 z-1000 rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow">
          No stores with valid coordinates found.
        </p>
      )}
      <MapContainer
        center={[55.7033, 21.1443]}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
        className="h-full min-h-0 w-full overflow-hidden rounded-[20px] border border-[#d9e4d7] shadow-[0_8px_24px_#263c2a0a]"
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoApiKey}`}
        />
        <FitStores stores={stores} />
        {stores.map((store) => (
          <CircleMarker
            key={store.id}
            center={[store.latitude, store.longitude]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
            }}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#15803d",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>{store.name}</strong>
              {store.address && <div>{store.address}</div>}
              <div>{store.city}</div>
              <Link
                to={`/main/add?store=${encodeURIComponent(store.id)}`}
                className="mt-2 inline-block rounded bg-green-700 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-green-800 cursor-pointer"
                style={{ color: "#fff" }}
              >
                Add offer
              </Link>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </section>
  );
}
