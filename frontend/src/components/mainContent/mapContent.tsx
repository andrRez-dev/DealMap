import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapContent() {
  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;

  return (
    <section aria-label="Interactive map" className="min-h-0 flex-1 p-3 md:p-4">
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
      </MapContainer>
    </section>
  );
}
