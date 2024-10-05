import { Site, SiteMarker } from "@/lib/types";
import { useState } from "react";

export default function SitesDisplay({ markers }: { markers: SiteMarker[] }) {
  const [sites, setSites] = useState<Site[]>([]);

  const onRemove = (key: number) => {
    const newSites = sites.filter((site) => parseInt(site.key) !== key);
    setSites(newSites);
  };

  const handleSitesRequest = () => {
    return;
  };

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
