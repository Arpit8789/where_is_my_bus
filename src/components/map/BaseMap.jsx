import { MapContainer, TileLayer } from 'react-leaflet';
import { MAP_CONFIG } from '@/utils/constants';
import 'leaflet/dist/leaflet.css';

const BaseMap = ({ 
  center = MAP_CONFIG.DEFAULT_CENTER, 
  zoom = MAP_CONFIG.DEFAULT_ZOOM,
  children,
  className = 'h-96 w-full rounded-lg',
  ...props 
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={true}
      {...props}
    >
      <TileLayer
        attribution={MAP_CONFIG.ATTRIBUTION}
        url={MAP_CONFIG.TILE_LAYER}
      />
      {children}
    </MapContainer>
  );
};

export default BaseMap;
