'use server';

import React from 'react';
import NewSiteButton from '@/components/NewSiteButton';
import { selectSites } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';
import { generateSiteTable } from '@/misc/helpers';

export default async function Home() {
  const sites = await selectSites();
  const siteTable = generateSiteTable(sites);

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
        <DataTable
          data={siteTable}
          emptyMessage={emptyMessage}
          redirectPath="/sites/"
        />
      </div>
    </div>
  );
}
