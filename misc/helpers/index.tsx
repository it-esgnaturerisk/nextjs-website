/* eslint-disable react/react-in-jsx-scope */
import * as turf from '@turf/turf';
import { Units } from '@turf/helpers';
import { SiteType } from '@/lib/types';
import { selectPortfolioWhereID } from '@/lib/db/queries';

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

export function generateSiteTable(sites: SiteType[]) {
  const colors = ['#79937A', '#FFAE73', '#B93E3E'];
  const headStyle = 'py-2 px-4 border-b text-left';
  const bodyStyle = 'py-2 px-4 border-b text-left';
  const siteTable = {
    head: [
      {
        label: 'Name',
        style: headStyle,
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
        label: 'Report',
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
        label: site.name,
        style: bodyStyle,
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
        label: <span style={{ backgroundColor: colors[(i * 7 + 13 + i + 0) % 3] }} className="inline-block w-4 h-4 rounded-full" />,
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: <span style={{ backgroundColor: colors[(i * 7 + 13 + i + 1) % 3] }} className="inline-block w-4 h-4 rounded-full" />,
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: 1259,
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: 16,
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
      {
        label: 2,
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
        label: site.reportLink ? (
          <a href={site.reportLink} className="text-blue-500">
            Download
          </a>
        ) : (
          'Processing...'
        ),
        style: bodyStyle,
        hidden: false,
        idColumn: false,
      },
    ]),
  };
  return siteTable;
}
