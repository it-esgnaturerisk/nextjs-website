'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import Form from '@/app/new-site/Form';
import { Marker } from 'react-map-gl';
import MapWithMarker from '@/app/new-site/MapWithMarker';

export default function NewSite() {
  const [markerLng, setMarkerLng] = useState<number>();
  const [markerLat, setMarkerLat] = useState<number>();
  const [markerElement, setMarkerElement] = useState<React.ReactElement | null>(null);

  const updateMarker = ({ lng, lat }: { lng: number | undefined, lat: number | undefined }) => {
    if (!lng || !lat) setMarkerElement(null);
    else {
      setMarkerElement(
        <Marker
          longitude={lng}
          latitude={lat}
          offset={[0, -10]}
        >
          <div className="text-3xl">📍</div>
        </Marker>,
      );
    }
    setMarkerLat(lat);
    setMarkerLng(lng);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-full">
        <Form markerLng={markerLng} markerLat={markerLat} setMarker={updateMarker} />
        <div className="flex-grow">
          <MapWithMarker marker={markerElement} updateMarker={updateMarker} />
        </div>
      </div>
    </div>
  );
}
