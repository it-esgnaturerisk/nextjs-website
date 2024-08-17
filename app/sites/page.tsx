"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import SitesDisplay from "@/components/sites-display";
import { useTheme } from "next-themes";
import { markCurrentScopeAsDynamic } from "next/dist/server/app-render/dynamic-rendering";
import Header from "@/components/header";

const markers = [
  {
    longitude: 10.8,
    latitude: 59.2,
  },
  {
    longitude: 10.4,
    latitude: 59.8,
  },
  {
    longitude: 10.7,
    latitude: 59.69,
  },
  {
    longitude: 10.8,
    latitude: 59.3,
  },
  {
    longitude: 10.9,
    latitude: 59.8,
  },
  {
    longitude: 10.7,
    latitude: 59.1,
  },
  {
    longitude: 10.7,
    latitude: 59.9,
  },
  {
    longitude: 10.1,
    latitude: 59.8,
  },
];

export default function Sites() {
  const { theme } = useTheme();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  return (
    <div className="flex flex-col h-screen w-full">
      <Header/>
      <div className="flex h-full">
        <div className="flex-grow h-screen">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: 10.7522,
              latitude: 59.8,
              zoom: 8,
            }}
            mapStyle={
              theme === "light"
                ? "mapbox://styles/mapbox/streets-v10"
                : "mapbox://styles/mapbox/dark-v10"
            }
          >
            {markers.map((marker, index) => (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="red"
            anchor="bottom"
          ></Marker>
          ))}
          </Map>
        </div>
        <SitesDisplay />
      </div>
    </div>
  );
}
