"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import SitesDisplay from "@/components/sites-display";
import { useTheme } from "next-themes";
import Header from "@/components/header";
import { useState } from "react";
import { SiteMarker } from "@/lib/types";

export default function Sites() {
  const { theme } = useTheme();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [markers, setMarkers] = useState<SiteMarker[]>([]);

  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    const newMarker = {
      key: markers.length + 1,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex h-full">
          <SitesDisplay markers={markers} />
        <div className="flex-grow">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: 13.7522,
              latitude: 52.8,
              zoom: 3,
            }}
            mapStyle={"mapbox://styles/mapbox/streets-v10"}
            onClick={handleMapClick}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.key}
                longitude={marker.longitude}
                latitude={marker.latitude}
                color="red"
                anchor="bottom"
              />
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
}

// type SitesProps = {
//   markers: SiteMarker[];
// }
// const markers = [
//   {
//     key:1,
//     longitude: 10.8,
//     latitude: 59.2,
//   },
//   {
//     key:2,
//     longitude: 10.4,
//     latitude: 59.8,
//   },
//   {
//     key:3,
//     longitude: 10.7,
//     latitude: 59.69,
//   },
//   {
//     key:4,
//     longitude: 10.8,
//     latitude: 59.3,
//   },
//   {
//     key:5,
//     longitude: 10.9,
//     latitude: 59.8,
//   },
//   {
//     key:6,
//     longitude: 10.7,
//     latitude: 59.1,
//   },
//   {
//     key:7,
//     longitude: 10.7,
//     latitude: 59.9,
//   },
//   {
//     key:8,
//     longitude: 10.1,
//     latitude: 59.8,
//   },
// ];
