"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import SitesDisplay from "@/components/sites-display";
import Header from "@/components/header";
import { useState } from "react";
import { SiteMarker } from "@/lib/types";
import CreateSiteForm from "@/components/createSite/create-site-form";

export default function newSite() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [marker, setMarker] = useState<SiteMarker>();

  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    const newMarker = {
      key: 0,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    };
    setMarker(newMarker);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex h-full">
        <CreateSiteForm latitude={marker?.latitude} longitude={marker?.longitude}/>
        <div className="flex-grow">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: 13.7522,
              latitude: 52.8,
              zoom: 3,
            }}
            mapStyle={"mapbox://styles/mapbox/streets-v11"}
            onClick={handleMapClick}
          >{marker &&
            <Marker
            key={marker.key}
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="red"
            anchor="bottom"/>}
          </Map>
        </div>
      </div>
    </div>
  );
}