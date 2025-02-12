'use client';

import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';
import MapWithMarker from '@/app/new-site/client/MapWithMarker';
import { PortfolioType, RangesType } from '@/lib/types';
import Form from '@/app/new-site/client/Form';

export default function NewSite({
  allPortfolios,
  allRanges,
}: {
  allPortfolios: PortfolioType[],
  allRanges: RangesType[],
}) {
  const [markerLng, setMarkerLng] = useState<number>();
  const [markerLat, setMarkerLat] = useState<number>();
  const [markerElement, setMarkerElement] = useState<React.ReactElement | null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([]);
  const [circles, setCircles] = useState<number[]>([]);

  useEffect(() => {
    setPortfolios(allPortfolios);
  }, [allPortfolios]);

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
    <div className="flex h-full">
      <Form
        markerLng={markerLng}
        markerLat={markerLat}
        setMarker={updateMarker}
        setCircles={setCircles}
        portfolios={portfolios}
        allRanges={allRanges}
      />
      <div className="flex-grow">
        <MapWithMarker
          marker={markerElement}
          updateMarker={updateMarker}
          markerLng={markerLng}
          markerLat={markerLat}
          circles={circles}
        />
      </div>
    </div>
  );
}
