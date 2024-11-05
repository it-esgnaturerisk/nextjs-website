import React from 'react';
import Image from 'next/image';
import DashboardItem from '@/app/dashboard/DashboardItem';
import StatsCard from '@/app/dashboard/StatsCard';
import NewSiteButton from '@/components/NewSiteButton';
import { selectSites } from '@/lib/db/queries';
import { SiteType } from '@/lib/types';
import { formatDateLocale } from '@/misc/helpers';
import DataTable from '@/components/DataTable';
import Heatmap from './Heatmap';

export default async function Home() {
  const sites: SiteType[] = await selectSites();
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
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 flex flex-col gap-6">
          <DashboardItem classNameArgs="col-span-1 h-1/2">
            <StatsCard number={42} label="Projects" />
          </DashboardItem>
          <DashboardItem classNameArgs="col-span-1 h-1/2 ">
            <StatsCard number={45} label="Reports" additionalClasses="mt-4" />
          </DashboardItem>
        </div>
        <DashboardItem classNameArgs="col-span-2 h-full">
          <Image
            src="/circular-progress.svg"
            alt="Circular progress bar"
            width={400}
            height={400}
            quality={100}
          />
          {/* <CircularProgress /> */}
          <div className="flex-1 ml-6">
            <div className="flex justify-between text-gray-600">
              <div>14 ↑ ESP</div>
              <div>12 ↓ ESD</div>
              <div>4 ↑ ECS</div>
            </div>
          </div>
        </DashboardItem>

        <DashboardItem classNameArgs="col-span-1 h-full">
          <Heatmap />
        </DashboardItem>
      </div>

      {/* Recent Sites Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Sites</h2>
        <DataTable data={siteTable} emptyMessage={emptyMessage} />
      </div>
    </div>
  );
}
