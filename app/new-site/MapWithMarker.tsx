import React, { useRef, useState } from 'react';
import { SiteMarkerType } from '@/lib/types';
import Map, { MapRef, Marker } from 'react-map-gl';
import GeocoderControl from '@/misc/Geocoder/GeocoderControl'; // Import the GeocoderControl component correctly

export default function MapWithMarker({
  setMarker,
}: {
  setMarker: (newMarker: SiteMarkerType) => void;
}) {
  const [localMarker, setLocalMarker] = useState<React.ReactElement | null>(null);
  const mapRef = useRef<MapRef>(null);
  let mapboxToken: string = '';
  if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }
  const updateLocalMarker = (event: { result: any }) => {
    const { result } = event;
    const location = result
    && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
    if (location) {
      setLocalMarker(
        <Marker
          longitude={location[0]}
          latitude={location[1]}
          offset={[0, -10]}
        >
          <div className="text-3xl">📍</div>
        </Marker>,
      );
      setMarker({
        longitude: location[0],
        latitude: location[1],
      });
    } else {
      setLocalMarker(null);
      setMarker({
        longitude: 0,
        latitude: 0,
      });
    }
  };

  function handleMapClick(event: any) {
    const { lngLat } = event;
    const newMarker: SiteMarkerType = {
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    };
    if (lngLat) {
      setLocalMarker(
        <Marker
          longitude={lngLat.lng}
          latitude={lngLat.lat}
          offset={[0, -10]}
        >
          <div className="text-3xl">📍</div>
        </Marker>,
      );
    } else {
      setLocalMarker(null);
    }
    setMarker(newMarker);
  }

  if (!mapboxToken) {
    return <div>Mapbox token not set</div>;
  }
  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: 13.7522,
        latitude: 52.8,
        zoom: 3.2,
      }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      // eslint-disable-next-line react/jsx-no-bind
      onClick={handleMapClick}
    >
      {localMarker}
      <GeocoderControl
        mapboxAccessToken={mapboxToken}
        position="top-left"
        onResult={updateLocalMarker}
      />
    </Map>
  );
}
