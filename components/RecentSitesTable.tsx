import React from 'react';
import { SiteType } from '@/lib/types';
import NewSiteButton from './NewSiteButton';

interface RecentSitesTablePros {
  sites: SiteType[];
}

function RecentSitesTable({ sites }: RecentSitesTablePros) {
  if (sites.length === 0) {
    return (
      <div>
        No sites were found. Get started by pressing the
        <NewSiteButton />
        button to mark your first site.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-greenlight">
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Location</th>
            <th className="py-2 px-4 border-b text-center">Species Risk</th>
            <th className="py-2 px-4 border-b text-center">Geo. Risk</th>
            <th className="py-2 px-4 border-b text-left">Red List</th>
            <th className="py-2 px-4 border-b text-left">PAs</th>
            <th className="py-2 px-4 border-b text-left">KBAs</th>
            <th className="py-2 px-4 border-b text-left">Portfolio</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Report</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.uuid}>
              <td className="py-2 px-4 border-b text-left">{site.name}</td>
              <td className="py-2 px-4 border-b text-left">
                {(site.country && site.country) || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <span className={`text-${site.speciesRisk}-500`}>●</span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <span className={`text-${site.geographicalRisk}-500`}>●</span>
              </td>
              <td className="py-2 px-4 border-b text-center">N/A</td>
              <td className="py-2 px-4 border-b text-center">N/A</td>
              <td className="py-2 px-4 border-b text-left">
                {site.fkPortfolios || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {site.created?.getDate() || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {site.reportLink ? (
                  <a href={site.reportLink} className="text-blue-500">
                    Download
                  </a>
                ) : (
                  'Processing...'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentSitesTable;
