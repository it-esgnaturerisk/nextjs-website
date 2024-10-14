// import React from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { SiteType } from "@/lib/types";

// const SiteCard = (site: SiteType) => {
//   const [removed, setRemoved] = React.useState(false);

//   const handleClick = () => {
//     setRemoved(true);
//     // onRemove(site.key); // Uncomment this if you want to trigger the onRemove prop
//   };

//   return (
//     <div>
//       {removed ? null : (
//         <Card className="relative">
//           {/* {site.imageurl ? (
//                         <Image alt="site" src={site.imageurl} className="rounded-md" /> */}
//           {/* ) : null} */}
//           <CardHeader>
//             <CardTitle>{site.name}</CardTitle>
//             <CardDescription>
//               Latitude: {site.latitude ? site.latitude.toFixed(4) : "N/A"}
//             </CardDescription>
//             <CardDescription>
//               Longitude: {site.longitude ? site.longitude.toFixed(4) : "N/A"}
//             </CardDescription>
//             <CardDescription>Address: {site.address}</CardDescription>
//           </CardHeader>
//           <div className="flex justify-end pb-1 px-1">
//             <Button size={"sm"}>View Details</Button>
//           </div>
//           {/* X button */}
//           <button
//             onClick={handleClick}
//             className="absolute top-1 right-1 text-black rounded-full p-1 text-xs"
//           >
//             X
//           </button>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default SiteCard;
