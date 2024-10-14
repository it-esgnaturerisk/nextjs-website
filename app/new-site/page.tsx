'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import { SiteMarkerType } from '@/lib/types';
import Form from '@/app/new-site/Form';
import MapWithMarker from '@/app/new-site/MapWithMarker';

export default function NewSite() {
  const [marker, setMarker] = useState<SiteMarkerType>();

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-full">
        <Form marker={marker} setMarker={setMarker} />
        <div className="flex-grow">
          <MapWithMarker marker={marker} setMarker={setMarker} />
        </div>
      </div>
    </div>
  );
}
