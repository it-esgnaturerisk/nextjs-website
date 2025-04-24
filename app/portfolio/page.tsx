// import { selectPortfoliosWithCompanies } from '@/lib/db/queries';
// import { formatDateLocale } from '@/misc/helpers';
import React from 'react';
import Image from 'next/image';

export default async function NewSite() {
  // const pData = await selectPortfoliosWithCompanies();
  // const headStyle = 'py-2 px-4 border-b text-left';
  // const bodyStyle = 'py-2 px-4 border-b text-left';
  // const portfolioTable = {
  //   head: [
  //     {
  //       label: 'Name',
  //       style: headStyle,
  //     },
  //     {
  //       label: 'Description',
  //       style: headStyle,
  //     },
  //     {
  //       label: 'Created',
  //       style: headStyle,
  //     },
  //     {
  //       label: 'Last updated',
  //       style: headStyle,
  //     },
  //     {
  //       label: 'Company',
  //       style: headStyle,
  //     },
  //     {
  //       label: 'Country',
  //       style: headStyle,
  //     },
  //   ],
  //   body: pData.map((p) => [
  //     {
  //       label: p.portfolios.name || '-',
  //       style: bodyStyle,
  //       hidden: false,
  //       idColumn: false,
  //     },
  //     {
  //       label: p.portfolios.description || '-',
  //       style: bodyStyle,
  //       hidden: false,
  //       idColumn: false,
  //     },
  //     {
  //       label: formatDateLocale(p.portfolios.createdAt) || '-',
  //       style: bodyStyle,
  //       hidden: false,
  //       idColumn: false,
  //     },
  //     {
  //       label: formatDateLocale(p.portfolios.updatedAt) || '-',
  //       style: bodyStyle,
  //       hidden: false,
  //       idColumn: false,
  //     },
  //     {
  //       label: p.companies.name || '-',
  //       style: bodyStyle,
  //       hidden: false,
  //       idColumn: false,
  //     },
  //     {
  //       label: p.companies.country || '-',
  //       style: bodyStyle,
  //       hidden: false,
  //       idColumn: false,
  //     },
  //   ]),
  // };
  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold">Portfolio</h1>
      </div>
      <div className="relative h-[75vh] px-6 pb-6">
        <Image
          src="/images/portfolio_salmar_042025.png"
          alt="Portfolio image"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
  
  
}
