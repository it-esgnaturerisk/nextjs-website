'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import Form from '@/app/new-site/Form';
import { Marker } from 'react-map-gl';
import MapWithMarker from '@/app/new-site/MapWithMarker';
import { selectPortfolios } from '@/lib/db/queries';

export default function NewSite() {
  const [markerLng, setMarkerLng] = useState<number>();
  const [markerLat, setMarkerLat] = useState<number>();
  const [markerElement, setMarkerElement] = useState<React.ReactElement | null>(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
  const [circles, setCircles] = useState<number[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const response = await selectPortfolios();
      console.log(response);
      setPortfolios(response);
    };
    fetchPortfolios();
  }, []);

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
        <Form
          markerLng={markerLng}
          markerLat={markerLat}
          setMarker={updateMarker}
          setCircles={setCircles}
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
    </div>
  );
}
