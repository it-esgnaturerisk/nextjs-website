"server-only"; // Because of the get_sites with the API key.
import NewSiteButton from "./NewSiteButton";
import { getSites } from "@/lib/db/queries";

export default async function RecentSitesTable() {
  const sites = await getSites();
  if (!sites) {
    return (
      <div>
        No sites found. Get started by pressing the <NewSiteButton />
      </div>
    );
  } else {
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
            {/* {sites.map((site, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-left">{site.name}</td>
                <td className="py-2 px-4 border-b text-left">
                  {(site.country && site.country) || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`text-${site.speciesRisk}-500`}>●</span>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`text-${site.geographicalRisk}-500`}>●</span>
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {site.portfolioId}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {site.reportLink ? (
                    <a href={site.reportLink} className="text-blue-500">
                      Download
                    </a>
                  ) : (
                    "Processing..."
                  )}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    );
  }
}
