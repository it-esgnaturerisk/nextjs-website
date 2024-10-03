import { Site } from "@/lib/types";
import NewSiteButton from "./new-site-button";

async function get_sites(): Promise<Site[] | null> {
  try {
    const response = await fetch("http://localhost:3000/api/get_sites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching sites: ${response.status}");
    }
    const data = await response.json(); // Parse the JSON response
    return data.sites; // Return the data
  } catch (error: any) {
    console.error("Error fetching sites:", error);
    return null; // Return an error message
  }
}

export default async function RecentSitesTable() {
  const sites = await get_sites();
  if (!sites) {
    return (
      <div>
        No sites found. Get started by pressing the <NewSiteButton />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-greenlight">
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Country</th>
            <th className="py-2 px-4 border-b text-center">Species Risk</th>
            <th className="py-2 px-4 border-b text-center">
              Geographical Risk
            </th>
            <th className="py-2 px-4 border-b text-left">Portfolio</th>
            <th className="py-2 px-4 border-b text-left">Report</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">{site.name}</td>
              <td className="py-2 px-4 border-b text-left">
                {(site.country && site.country) || "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <span className={`text-${site.species_risk}-500`}>●</span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <span className={`text-${site.geographical_risk}-500`}>●</span>
              </td>
              <td className="py-2 px-4 border-b text-left">
                {site.portfolio_id}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {site.report_link ? (
                  <a href={site.report_link} className="text-blue-500">
                    Download
                  </a>
                ) : (
                  "Processing..."
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
