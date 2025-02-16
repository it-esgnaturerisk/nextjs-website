import React from 'react';
import Image from 'next/image';
import { selectSites } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';
import { generateSiteTable } from '@/misc/helpers';
import Button from '@/components/buttons/Button';

export const dynamic = 'force-dynamic'; // Forces dynamic rendering

export default async function Home() {
  const sites = await selectSites();
  const siteTable = generateSiteTable(sites);
  const emptyMessage = (
    <div>
      No sites were found. Get started by pressing
      <Button href="new-site" text="New Site" />
      button to mark your first site!
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button href="new-site" text="New Site" />
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

      <h2 className="text-lg font-semibold mb-2 mt-8">Recent Sites</h2>
      {sites.length > 0 ? (
        <div className="max-h-400 h-100">
          <DataTable data={siteTable} />
        </div>
      ) : (
        <div className="max-h-400 h-100">{emptyMessage}</div>
      )}
    </div>
  );
}
