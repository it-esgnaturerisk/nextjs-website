"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { SiteMarker } from "@/lib/types";
import CreateSiteForm from "@/app/newSite/create-site-form";
import MapNewSite from "@/app/newSite/map-new-site";

export default function NewSite() {

  const [marker, setMarker] = useState<SiteMarker>();

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex h-full">
        <CreateSiteForm latitude={marker?.latitude} longitude={marker?.longitude}/>
        <div className="flex-grow">
          <MapNewSite marker={marker} setMarker={setMarker}/>
        </div>
      </div>
    </div>
  );
}