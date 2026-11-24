<<<<<<< HEAD

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { latLngBounds } from "leaflet";
import {
  CircleMarker,
  MapContainer,
=======
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { divIcon, latLngBounds } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { Link, useOutletContext } from "react-router-dom";
<<<<<<< HEAD
=======
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
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

<<<<<<< HEAD
const initialMapCenter: [number, number] = [55.7033, 21.1443];
const initialMapZoom = 13;
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1

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
<<<<<<< HEAD
      stores.map((store) => [
        store.latitude,
        store.longitude,
      ]),
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
=======
      stores.map((store) => [store.latitude, store.longitude]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
  }, [map, stores, shouldFit]);

  return null;
}

<<<<<<< HEAD
function CaptureMapView({
  onChange,
}: {
  onChange: (view: MapView) => void;
}) {
=======
function CaptureMapView({ onChange }: { onChange: (view: MapView) => void }) {
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
  const map = useMap();

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
      onChange({
        center: [center.lat, center.lng],
        zoom: map.getZoom(),
      });
    },
  });

  return null;
}

<<<<<<< HEAD
function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({
        pan: false,
        debounceMoveend: true,
      });
    });

    resizeObserver.observe(container);

    map.invalidateSize({
      pan: false,
      debounceMoveend: true,
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

export default function MapContent() {
  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;

  const { mapView, setMapView } =
    useOutletContext<MapOutletContext>();

=======
export default function MapContent() {
  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [locationError, setLocationError] = useState("");
  const { mapView, setMapView } = useOutletContext<MapOutletContext>();
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
  const {
    data: stores = [],
    isPending: isLoading,
    error,
  } = useQuery({
<<<<<<< HEAD
    queryKey: ["stores"],
    queryFn: fetchStores,
    select: getLocatedStores,
  });

  return (
    <section
      aria-label="Interactive map"
      className="relative flex h-[calc(100dvh-150px)] min-h-[350px] w-full min-w-0 flex-1 flex-col p-2 sm:h-[calc(100dvh-120px)] sm:min-h-[450px] sm:p-3 lg:h-full lg:min-h-[500px] lg:p-4"
    >
      {error && (
        <p
          className="absolute left-4 right-4 top-4 z-[1000] max-w-sm break-words rounded-lg bg-white px-4 py-3 text-sm text-red-700 shadow sm:left-6 sm:right-auto sm:top-6"
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          role="alert"
        >
          {error.message}
        </p>
      )}
<<<<<<< HEAD

      {!error && !isLoading && stores.length === 0 && (
        <p className="absolute left-4 right-4 top-4 z-[1000] max-w-sm break-words rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow sm:left-6 sm:right-auto sm:top-6">
          No stores with valid coordinates found.
        </p>
      )}

      <div className="relative min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#d9e4d7] shadow-[0_8px_24px_#263c2a0a]">
        <MapContainer
          center={mapView?.center ?? initialMapCenter}
          zoom={mapView?.zoom ?? initialMapZoom}
          scrollWheelZoom
          zoomControl={false}
          className="h-full w-full"
        >
          <ResizeMap />

          <ZoomControl position="topright" />

          <CaptureMapView onChange={setMapView} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${cartoApiKey}`}
          />

          <FitStores
            stores={stores}
            shouldFit={!mapView}
          />

          {stores.map((store) => (
            <CircleMarker
              key={store.id}
              center={[
                store.latitude,
                store.longitude,
              ]}
              eventHandlers={{
                mouseover: (event) =>
                  event.target.openPopup(),
              }}
              radius={9}
              pathOptions={{
                color: "#ffffff",
                weight: 3,
                fillColor: "#15803d",
                fillOpacity: 1,
              }}
            >
              <Popup
                maxWidth={280}
                minWidth={160}
                autoPan
              >
                <div className="min-w-0 max-w-[260px]">
                  <strong className="block break-words">
                    {store.name}
                  </strong>

                  {store.address && (
                    <div className="mt-1 break-words">
                      {store.address}
                    </div>
                  )}

                  <div className="mt-1 break-words">
                    {store.city}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      to={`/main/add?store=${encodeURIComponent(
                        store.id,
                      )}`}
                      className="inline-flex items-center justify-center rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white no-underline hover:bg-green-800"
                      style={{ color: "#fff" }}
                    >
                      Add offer
                    </Link>

                    <Link
                      to={`/main/search?store=${encodeURIComponent(
                        store.id,
                      )}`}
                      className="inline-flex items-center justify-center rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white no-underline hover:bg-green-800"
                      style={{ color: "#fff" }}
                    >
                      See offers
                    </Link>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
    </section>
  );
}
