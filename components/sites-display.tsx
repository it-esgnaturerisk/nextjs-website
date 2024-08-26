import { StaticImageData } from "next/image";
import SiteCard from "./sites-card";
import { Site, SiteMarker } from "@/lib/types";
import { useEffect, useState } from "react";

export default function SitesDisplay({markers}: { markers: SiteMarker[] }) {
    const [sites, setSites] = useState<Site[]>([]);

    useEffect(() => {   
            // Find address from lat long https://dev.to/shahmir049/how-to-send-emails-using-nextjs-14-resend-and-react-email-2b7g
            // const address = mapbox reverse geo api
            const newSites = markers.map((marker, index) => {
              return {
                key: marker.key.toString(), // Ensuring the key is unique and a string
                name: "Utlipsområde " + (index + 1),
                latitude: marker.latitude,
                longitude: marker.longitude,
                imageurl: null,
                address: "Placeholder Address", // Placeholder for now
              };
            });
            setSites(newSites);
          }, [markers]);

    const onRemove = (key: string) => {
        const newSites = sites.filter((site) => site.key !== key);
        setSites(newSites);
    };

    const handleSitesRequest = () => {
        markers.sort((a, b) => a.key - b.key);
    }

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-1 w-[250px] gap-1 overflow-auto">
          {sites.length === 0 ? (
            <p className="text-center my-5">No existing sites found.</p>
          ) : (
            "Sites found, but functionality not implemented yet."
            // sites.map((site) => ( 
            //   <SiteCard {...site}/>
            // ))
          )}
        </div>
        <div>
          <button
            onClick={handleSitesRequest}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send til Tom
          </button>
        </div>
      </div>
    );
  }

// import site1 from "@/public/_MG_0800.jpg";
// import site2 from "@/public/_MG_1813.jpg";
// import site3 from "@/public/_MG_1830.jpg";
// import site4 from "@/public/_MG_2168.jpg";
// import site5 from "@/public/_MG_2241.jpg";
// import site6 from "@/public/_MG_2337.jpg";
// import site7 from "@/public/_MG_2376.jpg";
// import site8 from "@/public/_MG_2395.jpg";
// import site9 from "@/public/_MG_2853.jpg";
// import site10 from "@/public/_MG_2984.jpg";

// const siteList=[
//     {
//         key: 1,
//         image: site1,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 2,
//         image: site2,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 3,
//         image: site3,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 4,
//         image: site4,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 5,
//         image: site5,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 6,
//         image: site6,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 7,
//         image: site7,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 8,
//         image: site8,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 9,
//         image: site9,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     },
//     {
//         key: 10,
//         image: site10,
//         name: "Tittel på utslippsområdet.",
//         siteStats: "Grad av miljøpåvirkning.",
//         address: "Adressen."    
//     }
// ];