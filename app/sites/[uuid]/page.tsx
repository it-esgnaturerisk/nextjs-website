/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { selectSiteDataByUuid } from '@/lib/db/queries';
import Link from 'next/link';
import DataTable from '@/components/DataTable';
import { geoSiteTableData } from '@/misc/helpers/siteTableData';
import { generateSpeciesTable } from '@/misc/helpers';
import BarChartGeographical from '@/components/BarChartGeographical';
import HistoricalObservations from '@/components/HistoricalObservations';
import SiteInformation from '@/components/SiteInformation';
import Images from './client/Images';
import SiteMap from './client/SiteMap';

const getImage = async (uuid: string) => {
  try {
    const response = await fetch(`${process.env.AUTH0_BASE_URL}/api/images/${uuid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const { url } = await response.json(); // Make sure your API returns `{ url }`
    return url;
  } catch (error) {
    return null;
  }
};

export default async function Site({ params, searchParams }: { params: { uuid: string }, searchParams: { year: keyof typeof geoSiteTableData, tab: string } }) {
  const { uuid } = params;
  const site = await selectSiteDataByUuid(uuid);
  const imageUrl = await getImage(uuid);
  const year = searchParams?.year || 2025;
  const tab = searchParams?.tab || 'site_information';

  if (!site) {
    return (<h1 className="text-4xl p-6 py-3 m-3  h-1/2 w-1/2">Site not found</h1>);
  }

  if (site.longitude === null || site.latitude === null) {
    return (<h1 className="text-4xl p-6 py-3 m-3  h-1/2 w-1/2">This site is still being processed.</h1>);
  }

  const baseUrl = `/sites/${uuid}?year=${year}`;

  return (
    <div className="flex flex-col h-[calc(100vh-200px-20px)]">

      <div className="p-6 py-3 m-3 mb-0">
        <h1 className="text-4xl">{site.name}</h1>
      </div>
      <div className="flex border-b h-16 py-0 my-0 px-6 mx-3">
        <div className={`py-2 px-4 cursor-pointer transition-all duration-200 ${
          tab === 'site_information' ? 'border-b-4 border-blue-600 font-semibold text-blue-600 bg-blue-50 rounded-t-md' : 'text-gray-600'
        }`}
        >
          <Link href={`${baseUrl}&tab=site_information`}>
            Site Information
          </Link>
        </div>
        <div className={`py-2 px-4 cursor-pointer transition-all duration-200 ${
          tab === 'images' ? 'border-b-4 border-blue-600 font-semibold text-blue-600 bg-blue-50 rounded-t-md' : 'text-gray-600'
        }`}
        >
          <Link href={`${baseUrl}&tab=images`}>
            Images
          </Link>
        </div>
        <div className={`py-2 px-4 cursor-pointer transition-all duration-200 ${
          tab === 'species' ? 'border-b-4 border-blue-600 font-semibold text-blue-600 bg-blue-50 rounded-t-md' : 'text-gray-600'
        }`}
        >
          <Link href={`${baseUrl}&tab=species`}>
            Species Risk
          </Link>
        </div>
        <div className={`py-2 px-4 cursor-pointer transition-all duration-200 ${
          tab === 'geographical' ? 'border-b-4 border-blue-600 font-semibold text-blue-600 bg-blue-50 rounded-t-md' : 'text-gray-600'
        }`}
        >
          <Link href={`${baseUrl}&tab=geographical`}>
            Geographical Risk
          </Link>
        </div>
      </div>

      <div className="flex h-full p-6 m-3 mt-0">
        {tab === 'site_information' && (
        <>
          <div className="flex-grow w-[100%] h-[60vh]">
            {site.ranges
              ? (
                <SiteMap
                  latitude={site.latitude}
                  longitude={site.longitude}
                  ranges={site.ranges}
                />
              )
              : (
                <SiteMap
                  latitude={site.latitude}
                  longitude={site.longitude}
                  ranges={[{
                    uuid: '', id: 0, label: '', value: 0,
                  }]}
                />
              )}
          </div>
          <div className="w-[100%] bg-white rounded-tr-xl rounded-br-xl overflow-auto height-full">
            <SiteInformation site={site} />
          </div>
        </>
        )}

        {tab === 'images' && (
          <div className="flex-grow w-[100%] h-[60vh]">
            <Images
              imageUrl={imageUrl}
            />
          </div>
        )}

        {tab === 'species' && (
          <div>
            {/* <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" /> */}
            <div className="px-12 my-3 mb-0">
              {site.species.length === 0 ? (
                <div className="text-center">
                  No species found for this site.
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/2 w-full">
                    <DataTable data={generateSpeciesTable(site.species)} />
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <HistoricalObservations site={site} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'geographical' && (
        <BarChartGeographical
          data={site.valuedNatureTypes}
        />
        )}

      </div>
    </div>
  );
}
