/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { selectSiteDataByUuid } from '@/lib/db/queries';
import Link from 'next/link';
import DataTable from '@/components/DataTable';
import { geoSiteTableData } from '@/misc/helpers/siteTableData';
import { generateSpeciesTable } from '@/misc/helpers';
import BarChartComponent from '@/components/BarChartComponent';
import SiteMap from './client/SiteMap';
import Images from './client/Images';

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
  const tab = searchParams?.tab || 'map';

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
        <div className={`py-2 px-4 ${tab === 'map' ? 'border-b-2 border-blue-500' : ''}`}>
          <Link href={`${baseUrl}&tab=map`}>
            Map
          </Link>
        </div>
        <div className={`py-2 px-4 ${tab === 'images' ? 'border-b-2 border-blue-500' : ''}`}>
          <Link href={`${baseUrl}&tab=images`}>
            Images
          </Link>
        </div>
      </div>
      <div className="flex h-full p-6 m-3 mt-0">
        <div className="flex-grow w-[100%]">
          {tab === 'map' && (
            site.ranges
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
              )
          )}
          {tab === 'images' && (
            <Images
              imageUrl={imageUrl}
            />
          )}
        </div>
        <div className="w-[100%] bg-white rounded-tr-xl rounded-br-xl overflow-auto">
          <div className="bg-[#E1E5E1] rounded-tr-xl p-2 px-12">
            <h4 className="text-xl mx-3 text-black">Site information</h4>
          </div>
          <div className="px-12">
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
                <span className="font-bold">{site.portfolio ? site.portfolio.name : 'Unspecified'}</span>
              </p>
            </div>
            <div className="m-3 text-sm">
              <p>
                🔍 Artsgrupper: leddormer (54%), etterfulgt av bløtdyr og fugler.
                <br />
                🏢 Mest aktive institusjonelle bidrag til observasjoner: Miljødirektoratet med 910 observasjoner og 252 unike arter.
                <br />
                Andre institusjoner med observasjoner inkluderer: Birdlife Norge, Norsk botanisk forening, and NTNU.
                <br />
                📈 Observasjoner strekker seg fra 1986 to 2024, hvilket er 17 år med observasjoner.
              </p>
            </div>
            <div className="m-3 mt-6 mb-0">
              <h3 className="text-2xl">Exposure</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
          <div className="px-12">
            <div className="md:grid md:grid-cols-4 md:gap-4 block">
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Threatened Species:
                </p>
                <p className="text-2xl content-center text-center my-2">{site.species.length}</p>
              </div>
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Total Species:
                </p>
                <p className="text-1xl content-center text-center my-2">Coming soon</p>
              </div>
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Key Biodiversity areas
                </p>
                <p className="text-ms content-center text-center my-2">Coming soon</p>
              </div>
              <div className="my-6">
                <p className="text-bold text-xs text-center my-2">
                  Protected Areas:
                </p>
                <p className="text-1xl content-center text-center my-2">Coming soon</p>
              </div>
            </div>
            <div className="m-3 mt-6 mb-0">
              <h3 className="text-2xl">Species Risk</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
          <div className="px-12 my-3 mb-0">
            {
              site.species.length === 0 ? (
                <div className="text-center">
                  No species found for this site.
                </div>
              )
                : <DataTable data={generateSpeciesTable(site.species)} />
            }
            <div className="m-3 mt-6 mb-0">
              <h4 className="text-2xl">Years of Observation</h4>
              {site.years.lenght === 0 ? (
                <div className="text-center">
                  No yearly observational data found for this site.
                </div>
              )
                : <BarChartComponent data={site.years} />}
            </div>

            <div className="m-3 mt-6 mb-0">
              <h3 className="text-2xl">Geographical Risk</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
          <div className="px-12 my-3">
            <DataTable data={geoSiteTableData[2025]} />
          </div>
        </div>
      </div>
    </div>
  );
}
