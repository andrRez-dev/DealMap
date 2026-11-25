import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { divIcon, latLngBounds } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { Link, useOutletContext } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";
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

type UserPosition = {
  latitude: number;
  longitude: number;
};

const initialMapCenter: [number, number] = [55.7033, 21.1443];
const initialMapZoom = 13;
const storeIcon = divIcon({
  className: "",
  html: renderToStaticMarkup(
    <MapPin size={26} color="#15803d" fill="#ffffff" strokeWidth={2.5} />,
  ),
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [locationError, setLocationError] = useState("");
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

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationError("");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location access was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Your location is currently unavailable.");
        } else {
          setLocationError("Unable to determine your location.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30_000,
        timeout: 10_000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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
      {locationError && (
        <p
          className="absolute right-6 bottom-6 z-1000 rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow"
          role="status"
        >
          {locationError}
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
        {userPosition && (
          <CircleMarker
            center={[userPosition.latitude, userPosition.longitude]}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#4285F4",
              fillOpacity: 1,
              weight: 3,
            }}
          >
            <Popup>Your location</Popup>
          </CircleMarker>
        )}
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.latitude, store.longitude]}
            icon={storeIcon}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
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
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
