import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { latLngBounds } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { Link, useOutletContext } from "react-router-dom";
import { fetchStores } from "../shared/getStores";
import type { Store } from "../shared/types";
import "leaflet/dist/leaflet.css";

type LocatedStore = Store & {
  latitude: number;
  longitude: number;
};

type MapView = {
  center: [number, number];
  zoom: number;
};

type MapOutletContext = {
  mapView: MapView | null;
  setMapView: (view: MapView) => void;
};

const initialMapCenter: [number, number] = [55.7033, 21.1443];
const initialMapZoom = 13;

function getLocatedStores(stores: Store[]): LocatedStore[] {
  return stores
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
}

function FitStores({
  stores,
  shouldFit,
}: {
  stores: LocatedStore[];
  shouldFit: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (!shouldFit || stores.length === 0) {
      return;
    }

    const bounds = latLngBounds(
      stores.map((store) => [store.latitude, store.longitude]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [map, stores, shouldFit]);

  return null;
}

function CaptureMapView({ onChange }: { onChange: (view: MapView) => void }) {
  const map = useMap();

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onChange({
        center: [center.lat, center.lng],
        zoom: map.getZoom(),
      });
    },
  });

  return null;
}

export default function MapContent() {
  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;
  const { mapView, setMapView } = useOutletContext<MapOutletContext>();
  const {
    data: stores = [],
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["stores"], // the key under which the result is stored in the cache
    queryFn: fetchStores, // function which requests stores
    select: getLocatedStores, // converts coordinates to numbers and discards stores with incorrect coordinates
  });

  return (
    <section
      aria-label="Interactive map"
      className="relative h-full min-h-0 p-3 md:p-4"
    >
      {error && (
        <p
          className="absolute left-6 top-6 z-1000 rounded-lg bg-white px-4 py-3 text-sm text-red-700 shadow"
          role="alert"
        >
          {error.message}
        </p>
      )}
      {!error && !isLoading && stores.length === 0 && (
        <p className="absolute left-6 top-6 z-1000 rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow">
          No stores with valid coordinates found.
        </p>
      )}
      <MapContainer
        center={mapView?.center ?? initialMapCenter}
        zoom={mapView?.zoom ?? initialMapZoom}
        scrollWheelZoom
        zoomControl={false}
        className="h-full min-h-0 w-full overflow-hidden rounded-[20px] border border-[#d9e4d7] shadow-[0_8px_24px_#263c2a0a]"
      >
        <ZoomControl position="topright" />
        <CaptureMapView onChange={setMapView} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoApiKey}`}
        />
        <FitStores stores={stores} shouldFit={!mapView} />
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
              <Link
                to={`/main/search?store=${encodeURIComponent(store.id)}`}
                className="ml-2 mt-2 inline-block rounded bg-green-700 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-green-800 cursor-pointer"
                style={{ color: "#fff" }}
              >
                See offers
              </Link>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </section>
  );
}
