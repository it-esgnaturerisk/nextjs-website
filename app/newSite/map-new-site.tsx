import { SiteMarker } from "@/lib/types";
import Map, { Marker } from "react-map-gl";

export default function MapNewSite({ marker, setMarker }: { marker: SiteMarker | undefined, setMarker: (newMarker: SiteMarker) => void }) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
    function handleMapClick (event: any) {
      const { lngLat } = event;
      const newMarker: SiteMarker = {
        key: 0,
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      };
      setMarker(newMarker);
    };
    return (
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
      )
}