import React from 'react';
import { SiteMarkerType } from '@/lib/types';
import Map, { Marker } from 'react-map-gl';

export default function MapWithMarker({
  marker,
  setMarker,
}: {
  marker: SiteMarkerType | undefined;
  setMarker: (newMarker: SiteMarkerType) => void;
}) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  function handleMapClick(event: any) {
    const { lngLat } = event;
    const newMarker: SiteMarkerType = {
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    };
    setMarker(newMarker);
  }
  return (
    <Map
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
      {marker && (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          color="red"
          anchor="bottom"
        />
      )}
    </Map>
  );
}
