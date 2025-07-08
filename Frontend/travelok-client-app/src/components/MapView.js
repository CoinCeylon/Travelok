import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ hotels }) {
    return (
        <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hotels.map(h => (
                <Marker key={h._id} position={[h.lat, h.lng]}>
                    <Popup>
                        {h.name} <br /> {h.location}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
