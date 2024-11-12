import React from 'react';
import { getSiteDataByUuid } from '@/lib/db/queries';
import SiteMap from './client/SiteMap';
import DataTable from '@/components/DataTable';
import { siteTableData, geoSiteTableData } from '@/misc/helpers/siteTableData';
export default async function Site({ params }: { params: { id: string } }) {
  const { id } = params;
  const site = await getSiteDataByUuid(id);
  console.log(site);
  return (
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="p-6 py-3 m-3 mb-0">
          <h1 className="text-4xl">{site.name}</h1>
          <p className="text-gray-500">{site.description}</p>
        </div>
        <div className="flex h-full p-6 m-3 mt-0">
          <div className="flex-grow w-[100%]">
            <SiteMap latitude={site.latitude} longitude={site.longitude} ranges={site.ranges}/>
          </div>
          <div className="w-[100%] bg-white rounded-tr-xl rounded-br-xl overflow-auto">
            <div className="bg-[#E1E5E1] rounded-tr-xl p-2 px-16">
              <h4 className="text-xl mx-3 text-black">Site information</h4>
            </div>
            <div className="px-16">
              <div className="flex w-[100%] m-3">
                <p className="w-[100%]">
                  Location: <span className="font-bold">{site.country}</span>
                </p>
                <p className="w-[100%]">
                  Portfolio: <span className="font-bold">{site.portfolio.name}</span>
                </p>
              </div>
              <div className='m-3 text-sm'>
                <p>
                  lorem ipsum dolor sit amet lorem i lorem ipsum dolor sit amet lorem ilorem ipsum dolor sit amet lorem ilorem ipsum dolor sit amet lorem ilorem ipsum dolor sit amet lorem ilorem ipsum dolor sit amet lorem i
                </p>
              </div>
              <div className='m-3 mt-6 mb-0'>
                <h3 className="text-2xl">
                  Exposure
                </h3>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
            <div className="px-16">
              <div className="md:grid md:grid-cols-4 md:gap-4 block">
                <div className="my-6">
                  <p className="text-bold text-xs text-center my-2">Threatened Species:</p>
                  <p className="text-2xl content-center text-center my-2">63</p>
                </div>
                <div className="my-6">
                  <p className="text-bold text-xs text-center my-2">Total Species:</p>
                  <p className="text-2xl content-center text-center my-2">633</p>
                </div>
                <div className="my-6">
                  <p className="text-bold text-xs text-center my-2">Key Biodiversity areas</p>
                  <p className="text-2xl content-center text-center my-2">80</p>
                </div>
                <div className="my-6">
                  <p className="text-bold text-xs text-center my-2">Protected Areas:</p>
                  <p className="text-2xl content-center text-center my-2">0</p>
                </div>
              </div>
              <div className='m-3 mt-6 mb-0'>
                <h3 className="text-2xl">
                  Species Risk
                </h3>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
            <div className="px-16 my-3 mb-0">
              <DataTable
                data={siteTableData}
              />
              <div className='m-3 mt-6 mb-0'>
                <h3 className="text-2xl">
                  Geographical Risk
                </h3>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
            <div className="px-16 my-3">
              <DataTable
                data={geoSiteTableData}
              />
            </div>
          </div>
        </div>
      </div>
  );
}