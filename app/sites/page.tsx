'use server';

import React from 'react';
import NewSiteButton from '@/components/NewSiteButton';
import { selectSites } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';

export default async function Home() {
  const sites = await selectSites();
  const headStyle = 'py-2 px-4 border-b text-left';
  const bodyStyle = 'py-2 px-4 border-b text-left';
  const siteTable = {
    head: [
      {
        label: 'Name',
        style: headStyle,
      },
      {
        label: 'Location',
        style: headStyle,
      },
      {
        label: 'Species Risk',
        style: headStyle,
      },
      {
        label: 'Geo. Risk',
        style: headStyle,
      },
      {
        label: 'Red List',
        style: headStyle,
      },
      {
        label: 'PAs',
        style: headStyle,
      },
      {
        label: 'KBAs',
        style: headStyle,
      },
      {
        label: 'Portfolio',
        style: headStyle,
      },
      {
        label: 'Date',
        style: headStyle,
      },
      {
        label: 'Report',
        style: headStyle,
      },
    ],
    body: sites.map((site) => [
      {
        label: site.name,
        style: bodyStyle,
      },
      {
        label: (site.country && site.country) || 'N/A',
        style: bodyStyle,
      },
      {
        label: <span className={`text-${site.speciesRisk}-500`}>●</span>,
        style: bodyStyle,
      },
      {
        label: <span className={`text-${site.geographicalRisk}-500`}>●</span>,
        style: bodyStyle,
      },
      {
        label: 'N/A',
        style: bodyStyle,
      },
      {
        label: 'N/A',
        style: bodyStyle,
      },
      {
        label: 'N/A',
        style: bodyStyle,
      },
      {
        label: site.fkPortfolios || 'N/A',
        style: bodyStyle,
      },
      {
        label: site.created?.getDate() || 'N/A',
        style: bodyStyle,
      },
      {
        label: site.reportLink ? (
          <a href={site.reportLink} className="text-blue-500">
            Download
          </a>
        ) : (
          'Processing...'
        ),
        style: bodyStyle,
      },
    ]),
  };

  const emptyMessage = (
    <div>
      No sites were found. Get started by pressing the
      <NewSiteButton />
      button to mark your first site
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        <div>
          <NewSiteButton href="example-sites"> Example </NewSiteButton>
          <NewSiteButton />
        </div>
      </div>

      <div className="mt-8">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="text-lg font-semibold mb-4" />
        <DataTable data={siteTable} emptyMessage={emptyMessage} />
      </div>
    </div>
  );
}
