// components/RecentSitesTable.js
export default function RecentSitesTable() {
    const sites = [
      {
        name: "Cruceiro II N 22",
        location: "Spain",
        speciesRisk: "green",
        geographicalRisk: "orange",
        portfolio: "ESP",
        lastUpdated: "22/09/23",
        reportLink: "#",
      },
      // Add more rows as necessary
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Species Risk</th>
              <th className="py-2 px-4 border-b">Geographical Risk</th>
              <th className="py-2 px-4 border-b">Portfolio</th>
              <th className="py-2 px-4 border-b">Last Updated</th>
              <th className="py-2 px-4 border-b">Report</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{site.name}</td>
                <td className="py-2 px-4 border-b">{site.location}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`text-${site.speciesRisk}-500`}>●</span>
                </td>
                <td className="py-2 px-4 border-b">
                  <span className={`text-${site.geographicalRisk}-500`}>●</span>
                </td>
                <td className="py-2 px-4 border-b">{site.portfolio}</td>
                <td className="py-2 px-4 border-b">{site.lastUpdated}</td>
                <td className="py-2 px-4 border-b">
                  <a href={site.reportLink} className="text-blue-500">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  