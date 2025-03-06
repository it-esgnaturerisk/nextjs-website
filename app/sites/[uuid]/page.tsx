import React from 'react';
import { getSiteDataByUuid } from '@/lib/db/queries';
import DataTable from '@/components/DataTable';
import { siteTableData, geoSiteTableData } from '@/misc/helpers/siteTableData';
import SiteMap from './client/SiteMap';

interface AreaOverviewData {
  [key: string]: {
    threatenedSpecies: number;
    totalSpecies: number;
    keyBiodiversityAreas: number;
    protectedAreas: number;
  };
}

const areaOverviewData: AreaOverviewData = {
  2010: {
    threatenedSpecies: 63,
    totalSpecies: 633,
    keyBiodiversityAreas: 80,
    protectedAreas: 0,
  },
  2015: {
    threatenedSpecies: 85,
    totalSpecies: 615,
    keyBiodiversityAreas: 60,
    protectedAreas: 5,
  },
  2020: {
    threatenedSpecies: 83,
    totalSpecies: 600,
    keyBiodiversityAreas: 52,
    protectedAreas: 10,
  },
  2025: {
    threatenedSpecies: 93,
    totalSpecies: 533,
    keyBiodiversityAreas: 41,
    protectedAreas: 15,
  },
};

export default async function Site({ params, searchParams }: { params: { uuid: string }, searchParams: { year: keyof typeof geoSiteTableData } }) {
  const { uuid } = params;
  const site = await getSiteDataByUuid(uuid);
  const year = searchParams?.year || 2015;
  if (site.longitude === null || site.latitude === null) {
    return (<h1 className="text-4xl p-6 py-3 m-3  h-1/2 w-1/2">This site is still being processed.</h1>);
  }
  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="p-6 py-3 m-3 mb-0">
        <h1 className="text-4xl">{site.name}</h1>
      </div>
      <div className="flex h-full p-6 m-3 mt-0">
        <div className="flex-grow w-[100%]">
          <SiteMap
            latitude={site.latitude}
            longitude={site.longitude}
            ranges={site.ranges}
          />
        </div>
        <div className="w-[100%] bg-white rounded-tr-xl rounded-br-xl overflow-auto">
          <div className="bg-[#E1E5E1] rounded-tr-xl p-2 px-16">
            <h4 className="text-xl mx-3 text-black">Site information</h4>
          </div>
          <div className="px-16">
            <div className="flex w-[100%] m-3">
              <p className="w-[100%]">
                Location:
                {' '}
                {' '}
                <span className="font-bold">{site.country || `${site.longitude.toFixed(6)} / ${site.latitude.toFixed(6)} ` }</span>

              </p>
              <p className="w-[100%]">
                Portfolio:
                {' '}
                {' '}
                <span className="font-bold">{site.portfolio.name}</span>
              </p>
            </div>
            <div className="m-3 text-sm">
              <p>
                lorem ipsum dolor sit amet lorem i lorem ipsum dolor sit amet
                lorem ilorem ipsum dolor sit amet lorem ilorem ipsum dolor sit
                amet lorem ilorem ipsum dolor sit amet lorem ilorem ipsum dolor
                sit amet lorem i
              </p>
            </div>
            <div className="m-3 mt-6 mb-0">
              <h3 className="text-2xl">Exposure</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
          <div className="px-16">
            <div className="md:grid md:grid-cols-4 md:gap-4 block">
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Threatened Species:
                </p>
                <p className="text-2xl content-center text-center my-2">{areaOverviewData[year].threatenedSpecies}</p>
              </div>
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Total Species:
                </p>
                <p className="text-2xl content-center text-center my-2">{areaOverviewData[year].totalSpecies}</p>
              </div>
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Key Biodiversity areas
                </p>
                <p className="text-2xl content-center text-center my-2">{areaOverviewData[year].keyBiodiversityAreas}</p>
              </div>
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Protected Areas:
                </p>
                <p className="text-2xl content-center text-center my-2">{areaOverviewData[year].protectedAreas}</p>
              </div>
            </div>
            <div className="m-3 mt-6 mb-0">
              <h3 className="text-2xl">Species Risk</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
          <div className="px-16 my-3 mb-0">
            <DataTable data={siteTableData[year]} />
            <div className="m-3 mt-6 mb-0">
              <h3 className="text-2xl">Geographical Risk</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
          <div className="px-16 my-3">
            <DataTable data={geoSiteTableData[year]} />
          </div>
        </div>
      </div>
    </div>
  );
}
