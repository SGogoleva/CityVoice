import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

interface MapWithAddressProps {
  onLocationSelected: (locationResponse: any) => void;
}

const MapWithAddress: React.FC<MapWithAddressProps> = ({ onLocationSelected }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [address, setAddress] = useState();

  const fetchAddress = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=he`
      );
      const data = await response.json();
      setAddress(data);
      onLocationSelected(data);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        fetchAddress(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div>
      <MapContainer center={[32.05043, 34.75224]} zoom={8} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        {position && (
          <Marker position={position}>
            <Popup>
              {address ? (
                <div>
                  <p><strong>You clicked here</strong></p>
                  <p><strong>Address:</strong> {address}</p>
                </div>
              ) : (
                "Fetching address..."
              )}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithAddress;
