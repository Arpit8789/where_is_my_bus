import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Use CDN for marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom bus icon with better SVG
const busIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTggMmg4bDQgMnYxNmEyIDIgMCAwIDEtMiAyaC0yYTIgMiAwIDAgMS0yLTJIOGEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY0bDQtMnoiIGZpbGw9IiMzYjgyZjYiLz48cGF0aCBkPSJNMTYgMTdoLTgiIHN0cm9rZT0id2hpdGUiLz48Y2lyY2xlIGN4PSI3LjUiIGN5PSIxNyIgcj0iLjUiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iMTYuNSIgY3k9IjE3IiByPSIuNSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const MapMarker = ({ 
  position, 
  type = 'default',
  title,
  description,
  onClick,
  children 
}) => {
  const markerIcon = type === 'bus' ? busIcon : DefaultIcon;

  return (
    <Marker 
      position={position} 
      icon={markerIcon}
      eventHandlers={{
        click: onClick,
      }}
    >
      {(title || description || children) && (
        <Popup>
          {title && <h3 className="font-semibold text-base mb-1">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
          {children}
        </Popup>
      )}
    </Marker>
  );
};

export default MapMarker;
