/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RangesType } from '@/lib/types';
import Map, {
  MapRef, Source, Layer, Marker,
} from 'react-map-gl';
import { createCircle } from '@/misc/helpers';
import 'mapbox-gl/dist/mapbox-gl.css';

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
      </Map>
    </div>

  );
}
