import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { selectPortfolios, selectRanges } from '@/lib/db/queries';
import NewSiteClient from './client/wrapper';

export default async function NewSite() {
  const portfolios = await selectPortfolios();
  const ranges = await selectRanges();
  return (
    <div className="flex flex-col h-full">
      <NewSiteClient
        allPortfolios={portfolios}
        allRanges={ranges}
      />
    </div>
  );
}
