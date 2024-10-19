import React, { useRef, useState } from 'react';
import { SiteMarkerType } from '@/lib/types';
import Map, { MapRef, Marker } from 'react-map-gl';
import GeocoderControl from '@/misc/Geocoder/GeocoderControl'; // Import the GeocoderControl component correctly

export default function MapWithMarker({
  updateMarker,
  marker,
}: {
  updateMarker: (newMarker: SiteMarkerType) => void;
  marker: React.ReactElement | null;
}) {
  const mapRef = useRef<MapRef>(null);
  let mapboxToken: string = '';
  if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }
  const updateLocalMarker = (event: { result: any }) => {
    const { result } = event;
    const location = result
    && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
    updateMarker({
      lng: location ? location[0] : 0,
      lat: location ? location[1] : 0,
    });
  };

  function handleMapClick(event: any) {
    const { lngLat } = event;
    if (lngLat) {
      updateMarker({
        lng: lngLat.lng,
        lat: lngLat.lat,
      });
    }
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
      {marker}
      <GeocoderControl
        mapboxAccessToken={mapboxToken}
        position="top-left"
        onResult={updateLocalMarker}
      />
    </Map>
  );
}
