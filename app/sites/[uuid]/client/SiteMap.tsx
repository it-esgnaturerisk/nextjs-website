/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RangesType } from '@/lib/types';
import Map, {
  MapRef, Source, Layer, Marker,
} from 'react-map-gl';
import { createCircle } from '@/misc/helpers';
import { useRouter, useSearchParams } from 'next/navigation';
import 'mapbox-gl/dist/mapbox-gl.css';

const years = [2010, 2015, 2020, 2025];

export default function SiteMap({
  ranges,
  latitude,
  longitude,
}: {
  ranges: RangesType[];
  latitude: number | null;
  longitude: number | null;
}) {
  const mapRef = useRef<MapRef>(null);
  const [circleData, setCircleData] = useState<any | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialYear = searchParams.get('year') || years[0].toString();
  const [year, setYear] = useState<number>(parseInt(initialYear, 10));
  let mapboxToken: string = '';
  if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }

  useEffect(() => {
    if (longitude && latitude) {
      const circleFeatures = ranges.map((c) => createCircle(longitude, latitude, c.value));
      setCircleData({
        type: 'FeatureCollection',
        features: circleFeatures,
      });
    }
  }, [ranges, latitude, longitude]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = years[parseInt(e.target.value, 10)];
    setYear(newYear);

    const params = new URLSearchParams(window.location.search);
    params.set('year', newYear.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!circleData) {
    return null;
  }

  return (
    <div className="h-full flex flex-col relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        style={{
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          borderWidth: 1,
        }}
        initialViewState={
      latitude && longitude
        ? {
          latitude,
          longitude,
          zoom: 7.5,
        }
        : {}
    }
      >
        {latitude && longitude && (
        <Marker longitude={longitude} latitude={latitude} offset={[0, -10]}>
          <div className="text-3xl">📍</div>
        </Marker>
        )}
        {circleData && (
        <Source id="circleSource" type="geojson" data={circleData}>
          <Layer
            id="circleFillLayer"
            type="fill"
            paint={{
              'fill-color': '#ebebeb',
              'fill-opacity': 0.2,
            }}
          />
          <Layer
            id="circleBorderLayer"
            type="line"
            paint={{
              'line-color': '#88A189',
              'line-width': 3,
            }}
          />
        </Source>
        )}
        <div className="absolute bottom-5 bg-transparent left-0 w-full p-2 shadow-md rounded-t-lg">
          <h2 className="block m-0 mb-2.5 leading-6 text-3xl font-semibold text-right text-white">
            {year}
          </h2>
          <label htmlFor="year" />
          <input
            id="slider"
            type="range"
            min="0"
            max={years.length - 1}
            step="1"
            value={years.indexOf(year)}
            onChange={(e) => handleChange(e)}
            className="w-full cursor-ew-resize bg-transparent accent-[#FFAE73]"
          />
        </div>
      </Map>
    </div>

  );
}
