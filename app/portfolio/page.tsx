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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>
      </div>
      <div className="mt-4 m-16">
        <Image src="/images/portfolio_salmar_042025.png" width={1500} height={200} alt="Portfolio image" style={{ objectFit: 'contain' }} />
        {/* <PortfolioScatter pData={pData} /> */}
        {/* <h2 className="text-lg font-semibold mb-4">Recent Portfolios</h2>
        <DataTable data={portfolioTable} emptyMessage={<p>No portfolios yet..</p>} />
        <AddPortfolio disabled={pData.length >= 3} /> */}
      </div>
    </div>
  );
}
