import React from 'react';
import Image from 'next/image';
import NewSiteButton from '@/components/buttons/NewSiteButton';

export default async function Home() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>

        <div className="flex items-center space-x-4 ml-auto">
          {/* <DownloadButton fileName="ESG_Nature_Risk_Report_Example.pdf" /> */}
          <NewSiteButton />
        </div>
      </div>

      <div className="mt-8">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="text-lg font-semibold mb-4" />
        <Image
          src="/figma/sites-list.svg"
          alt="Sites example"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          quality={100}
        />
      </div>
    </div>
  );
}
