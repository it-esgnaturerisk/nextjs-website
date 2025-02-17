/* eslint-disable react/react-in-jsx-scope */
import * as turf from '@turf/turf';
import { Units } from '@turf/helpers';
import { SiteType } from '@/lib/types';
import { selectPortfolioWhereID } from '@/lib/db/queries';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { IoMdDownload } from 'react-icons/io';

// eslint-disable-next-line import/prefer-default-export
export function createCircle(lng: number, lat: number, radiusInKm: number) {
  const center = [lng, lat];
  const units: Units = 'kilometers';
  const options = { steps: 64, units };

  const circle = turf.circle(center, radiusInKm, options);

  return circle;
}

export function formatDateLocale(dateString: Date | null) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
}

function sitesCompareFn(a: SiteType, b: SiteType) {
  if (!a.reportLink && !b.reportLink) { return 0; }
  if (a.reportLink && !b.reportLink) { return -1; }
  return 1;
}

const getLabel = (site: SiteType) => {
  if (!site.reportLink) {
    return 'Processing...';
  }
  if (site.reportLink === 'PROCESS') {
    return (
      <div className="flex align-center justify-center">
        <Button
          href={`sites/${site.uuid!}`}
          text="Visit"
          classNameArgs="bg-greendark text-white py-2 px-4 m-1 rounded-lg shadow-md"
        />
        <div className="py-2 px-5">
          <Link
          // This link not functional atm (which is good, as the reportLinks are dysfunctional)
            href={`sites/${site.uuid!}`}
          >
            <IoMdDownload width={20} height={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex align-center justify-center">
      <Button
        href={`sites/${site.uuid!}`}
        text="Visit"
        classNameArgs="bg-greendark text-white py-2 px-4 m-1 rounded-lg shadow-md"
      />
      <div className="py-2 px-5">
        <Link
          // This link not functional atm (which is good, as the reportLinks are dysfunctional)
          href="not-found"// https://esg-reports-bucket.s3.amazonaws.com/${site.reportLink}
        >
          <IoMdDownload width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export function generateSiteTable(sites: SiteType[]) {
  sites.sort(sitesCompareFn);
  const riskCircleColors = ['#79937A', '#FFAE73', '#B93E3E', '#808080'];
  const headStyle = 'py-2 px-4 border-b text-center text-bold';
  const bodyStyle = 'py-2 px-4 border-b text-center';
  const siteTable = {
    head: [
      {
        label: 'Name',
        style: 'py-2 px-4 border-b text-left text-bold',
      },
      {
        label: 'Location',
        style: headStyle,
      },
      {
        label: 'Species Risk',
        style: headStyle,
      },
      {
        label: 'Geo. Risk',
        style: headStyle,
      },
      {
        label: 'Red List',
        style: headStyle,
      },
      {
        label: 'PAs',
        style: headStyle,
      },
      {
        label: 'KBAs',
        style: headStyle,
      },
      {
        label: 'Portfolio',
        style: headStyle,
      },
      {
        label: 'Date',
        style: headStyle,
      },
      {
        label: 'Analysis',
        style: headStyle,
      },
    ],
    body: sites.map((site, i) => [
      {
        label: site.uuid,
        hidden: true,
        idColumn: true,
        style: bodyStyle,
      },
      {
        label: site.email,
        hidden: true,
        idColumn: false,
        style: bodyStyle,
      },
      {
        label: site.name,
        style: 'py-2 px-4 border-b text-left',
        hidden: false,
        idColumn: false,
      },
      {
        label: (site.country && site.country) || 'N/A',
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: <span style={{ backgroundColor: riskCircleColors[site.reportLink ? (i * 7 + 13 + i + 0) % 3 : 3] }} className="inline-block w-4 h-4 rounded-full" />,
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: <span style={{ backgroundColor: riskCircleColors[site.reportLink ? (i * 7 + 13 + i + 1) % 3 : 3] }} className="inline-block w-4 h-4 rounded-full" />,
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: site.reportLink ? 1200 + i * 10 + i : 'N/A',
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: site.reportLink ? (i * 14 + 1) % 20 : 'N/A',
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: site.reportLink ? (i * 14 + 1) % 5 : 'N/A',
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: site.fkPortfolios ? selectPortfolioWhereID(site.fkPortfolios).then((p) => p.name) : 'N/A',
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: formatDateLocale(site.created) || 'N/A',
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: getLabel(site),
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
    ]),
  };
  return siteTable;
}
