import React from "react";
import { FaDownload } from "react-icons/fa";

const initialSites = [
  {
    id: 1,
    name: "Crucerio II N 22",
    location: "Spain",
    speciesRisk: 0,
    geoRisk: 1,
    redList: 1259,
    pas: 26,
    kbas: 2,
    portfolio: "ESP",
    date: "22/09/23",
  },
  // Add other site objects here as in the example image
];

const riskColorMap = ["green-500", "orange-500", "red-500"];

const SitesTable = () => {
  const sites = initialSites;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left"></th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-center">Species Risk</th>
            <th className="p-3 text-center">Geo. Risk</th>
            <th className="p-3 text-left">Red List</th>
            <th className="p-3 text-left">PAs</th>
            <th className="p-3 text-left">KBAs</th>
            <th className="p-3 text-left">Portfolio</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Report</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id} className="hover:bg-gray-100">
              <td className="p-3 text-left">
                <input type="checkbox" />
              </td>
              <td className="p-3 text-left">{site.name}</td>
              <td className="p-3 text-left">{site.location}</td>
              <td className="p-3 text-center">
                <span
                  className={`inline-block rounded-full bg-color-${
                    riskColorMap[site.speciesRisk]
                  }`}
                >
                  ●
                </span>
              </td>
              <td className="p-3 text-center">
                <span
                  className={`inline-block rounded-full bg-color-${
                    riskColorMap[site.geoRisk]
                  }`}
                >
                  ●
                </span>
              </td>
              <td className="p-3 text-left">{site.redList}</td>
              <td className="p-3 text-left">{site.pas}</td>
              <td className="p-3 text-left">{site.kbas}</td>
              <td className="p-3 text-left">{site.portfolio}</td>
              <td className="p-3 text-left">{site.date}</td>
              <td className="p-3 text-center">
                <FaDownload className="text-gray-600 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SitesTable;
