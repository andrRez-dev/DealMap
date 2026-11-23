
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
      stores.map((store) => [
        store.latitude,
        store.longitude,
      ]),
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [map, stores, shouldFit]);

  return null;
}

function CaptureMapView({
  onChange,
}: {
  onChange: (view: MapView) => void;
}) {
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

  const {
    data: stores = [],
    isPending: isLoading,
    error,
  } = useQuery({
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
          role="alert"
        >
          {error.message}
        </p>
      )}

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
    </section>
  );
}
