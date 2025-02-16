import React from 'react';
import { selectSites } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';
import { generateSiteTable } from '@/misc/helpers';
import { SiteType } from '@/lib/types';
import Button from '@/components/buttons/Button';

export const dynamic = 'force-dynamic'; // Forces dynamic rendering

export default async function Home() {
  const sites: SiteType[] = await selectSites();
  const siteTable = generateSiteTable(sites);

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
          <Button href="example-sites" text="Example" />
          <Button href="new-site" text="New Site" />
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
