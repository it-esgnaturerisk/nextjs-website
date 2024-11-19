'use server';

import React from 'react';
import NewSiteButton from '@/components/NewSiteButton';
import { selectSites } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';
import { generateSiteTable } from '@/misc/helpers';
import { SiteType } from '@/lib/types';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 5;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const sites: SiteType[] = await selectSites();
  return sites;
}

export default async function Home({ sites }: {sites: SiteType[]}) {
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
