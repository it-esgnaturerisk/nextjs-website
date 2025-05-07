import React from 'react';
import { selectPAs, selectSites } from '@/lib/db/queries';
import DataTableSites from '@/components/DataTableSites';
import { generateSiteTable } from '@/misc/helpers';
import { SiteType } from '@/lib/types';
import Button from '@/components/buttons/Button';

export const dynamic = 'force-dynamic'; // Forces dynamic rendering

export default async function Home() {
  const sites = await selectSites();
  const protectedCounts = await selectPAs();

  const groupedTotals = new Map<number, number>();
  protectedCounts.forEach((entry) => {
    const currentTotal = groupedTotals.get(entry.siteId || 0) || 0;
    groupedTotals.set(entry.siteId || 0, currentTotal + (entry.PAs || 0));
  });
  const resultArray = Array.from(groupedTotals, ([siteId, totalPAs]) => ({ siteId, totalPAs }));

  const finalSites = sites.map((site: SiteType) => {
    const siteId = site.id;
    const totalPAs = resultArray.find((entry) => entry.siteId === siteId)?.totalPAs || 0;
    return {
      ...site,
      totalPAs,
    };
  });

  const siteTable = await generateSiteTable(finalSites);

  // const sitesPlus: any = await selectSitesPlusPAsAndGeo();
  // const siteTable = await generateSiteTable(sitesPlus);

  const emptyMessage = (
    <div>
      No sites were found. Get started by pressing the
      <Button href="new-site" text="New Site" />
      button to mark your first site
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        <div>
          <Button href="new-site" text="New Site" />
        </div>
      </div>

      <div className="mt-8">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="text-lg font-semibold mb-4" />
        <DataTableSites data={siteTable} emptyMessage={emptyMessage} />
      </div>
    </div>
  );
}
