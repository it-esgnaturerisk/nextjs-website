'use server';

import React from 'react';
import Image from 'next/image';
import NewSiteButton from '@/components/NewSiteButton';
import { selectSites } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';
import { formatDateLocale } from '@/misc/helpers';

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
        label: formatDateLocale(site.created) || 'N/A',
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <NewSiteButton />
      </div>
      <Image
        src="/figma/dashboard.svg"
        alt="Dashboard Status Example"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        quality={100}
      />

      <div className="mt-8 overflow-scroll max-h-400 h-100">
        <h2 className="text-lg font-semibold mb-4">Recent Sites</h2>
        <DataTable data={siteTable} emptyMessage={emptyMessage} />
      </div>
    </div>
  );
}
