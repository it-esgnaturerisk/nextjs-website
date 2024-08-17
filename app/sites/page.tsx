"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import SitesDisplay from "@/components/sites-display";
import { useTheme } from "next-themes";
import { markCurrentScopeAsDynamic } from "next/dist/server/app-render/dynamic-rendering";
import Header from "@/components/header";

const markers = [
  {
    key:1,
    longitude: 10.8,
    latitude: 59.2,
  },
  {
    key:2,
    longitude: 10.4,
    latitude: 59.8,
  },
  {
    key:3,
    longitude: 10.7,
    latitude: 59.69,
  },
  {
    key:4,
    longitude: 10.8,
    latitude: 59.3,
  },
  {
    key:5,
    longitude: 10.9,
    latitude: 59.8,
  },
  {
    key:6,
    longitude: 10.7,
    latitude: 59.1,
  },
  {
    key:7,
    longitude: 10.7,
    latitude: 59.9,
  },
  {
    key:8,
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
              zoom: 10,
            }}
            mapStyle={
              theme === "dark"
                ? "mapbox://styles/mapbox/dark-v10"
                : "mapbox://styles/mapbox/streets-v10"
            }
          >
            {markers.map((marker, index) => (
          <Marker
            key={marker.key}
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
