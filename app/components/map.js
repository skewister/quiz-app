// components/MapComponent.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ onClick, capitals }) => {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={4} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {capitals.map(capital => (
        <Marker key={capital.name} position={[capital.lat, capital.lng]}>
          <Popup>{capital.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
