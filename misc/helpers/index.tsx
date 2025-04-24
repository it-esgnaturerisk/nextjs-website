/* eslint-disable react/react-in-jsx-scope */
import * as turf from '@turf/turf';
import { Units } from '@turf/helpers';
import { SiteType, SpeciesType } from '@/lib/types';
import { selectSiteDataByUuid } from '@/lib/db/queries';
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
  if (a.reportLink && !b.reportLink) { return -1; }
  if (!a.reportLink && b.reportLink) { return 1; }
  // None has reportlink
  return a.name.localeCompare(b.name);
}

function speciesCompareFn(a: SpeciesType, b: SpeciesType) {
  if (a.redListStatus === 'CR' && b.redListStatus === 'CR') { return 0; }
  if (a.redListStatus === 'CR' && b.redListStatus === 'EN') { return -1; }
  if (a.redListStatus === 'CR' && b.redListStatus === 'VU') { return -1; }
  if (a.redListStatus === 'EN' && b.redListStatus === 'CR') { return 1; }
  if (a.redListStatus === 'EN' && b.redListStatus === 'EN') { return 0; }
  if (a.redListStatus === 'EN' && b.redListStatus === 'VU') { return -1; }
  if (a.redListStatus === 'VU' && b.redListStatus === 'CR') { return 1; }
  if (a.redListStatus === 'VU' && b.redListStatus === 'EN') { return 1; }
  if (a.redListStatus === 'VU' && b.redListStatus === 'VU') { return 0; }
  return 0;
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

type RiskLevel = 'Low' | 'Medium' | 'High';

const getRiskLevelFromNumber = (risk: number): RiskLevel | undefined => {
  if (risk > 0 && risk <= 10) return 'Low';
  if (risk > 10 && risk <= 20) return 'Medium';
  if (risk > 20) return 'High';
  return undefined;
};

const riskCircleColors = (risk: RiskLevel | number | undefined): string => {
  if (risk == null) return '#cfcfcf';

  let riskLevel: RiskLevel | undefined;

  if (typeof risk === 'number') {
    riskLevel = getRiskLevelFromNumber(risk);
  } else {
    riskLevel = risk;
  }

  switch (riskLevel) {
    case 'Low':
      return '#79937A';
    case 'Medium':
      return '#FFAE73';
    case 'High':
      return '#B93E3E';
    default:
      return '#808080';
  }
};

const riskCircleColorsOneToThree = (risk: number | null): string => {
  if (risk == null) return '#cfcfcf';

  switch (risk) {
    case 1:
      return '#79937A';
    case 2:
      return '#FFAE73';
    case 3:
      return '#B93E3E';
    default:
      return '#808080';
  }
};

export async function generateSiteTable(sites: SiteType[]) {
  sites.sort(sitesCompareFn);

  const siteSpeciesCount = new Map();

  await Promise.all(
    sites.map(async (site) => {
      const siteData = await selectSiteDataByUuid(site.uuid);
      siteSpeciesCount.set(site.uuid, siteData?.species.length);
    }),
  );

  const headStyle = 'py-2 px-4 border-b text-center text-bold';
  const bodyStyle = 'py-2 px-4 border-b text-center';
  const siteTable = {
    head: [
      {
        label: 'Name',
        style: 'py-2 px-4 border-b text-left text-bold',
      },
      {
        label: 'Locality Number',
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
        label: 'Red List Species',
        style: headStyle,
      },
      {
        label: 'Geographical Risk',
        style: headStyle,
      },
      {
        label: 'Protected Areas',
        style: headStyle,
      },
      // {
      //   label: 'Key Biodiversity Areas',
      //   style: headStyle,
      // },
      // {
      //   label: 'Portfolio',
      //   style: headStyle,
      // },
      {
        label: 'Date',
        style: headStyle,
      },
      {
        label: 'Analysis',
        style: headStyle,
      },
    ].filter(Boolean),
    body: sites.map((site) => {
      const row = [
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
          label: site.localityNumber,
          style: bodyStyle,
          hidden: false,
          idColumn: false,
        },
        {
          label: site.country || 'N/A',
          style: bodyStyle,
          hidden: false,
          idColumn: false,
        },
        {
          label: (
            <span
              style={{ backgroundColor: riskCircleColors(siteSpeciesCount.get(site.uuid)) }}
              className="inline-block w-5 h-5 rounded-full"
            />
          ),
          style: bodyStyle,
          hidden: false,
          idColumn: false,
        },
        {
          label: siteSpeciesCount.get(site.uuid) || 'N/A',
          style: bodyStyle,
          hidden: false,
          idColumn: false,
        },
        {
          label: 'Coming soon',
          style: bodyStyle,
          hidden: false,
          idColumn: false,
        },
        {
          label: 'Coming soon',
          style: bodyStyle,
          hidden: false,
          idColumn: false,
        },
        // {
        //   label: 0,
        //   style: bodyStyle,
        //   hidden: false,
        //   idColumn: false,
        // },
        // {
        //   label: site.fkPortfolios
        //     ? selectPortfolioWhereID(site.fkPortfolios).then((p) => p.name)
        //     : 'Unspecified',
        //   style: bodyStyle,
        //   hidden: false,
        //   idColumn: false,
        // },
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
      ];

      return row.filter(Boolean);
    }),
  };
  return siteTable;
}

export function generateSpeciesTable(species: SpeciesType[]) {
  species.sort(speciesCompareFn);
  const headStyle = 'py-2 px-4 border-b text-center text-bold';
  const headStyleLeft = 'py-2 px-4 border-b text-left text-bold';
  const bodyStyle = 'py-2 px-4 border-b text-center';
  const bodyStyleLeft = 'py-2 px-4 border-b text-left';
  const speciesTable = {
    head: [
      {
        label: 'Name',
        style: headStyleLeft,
      },
      {
        label: 'Red List Status',
        style: headStyle,
      },
      {
        label: 'Nutrient Salts',
        style: headStyle,
      },
      {
        label: 'Organic Materials',
        style: headStyle,
      },
      {
        label: 'Medicine and Chemicals',
        style: headStyle,
      },
      {
        label: 'Disturbances',
        style: headStyle,
      },
    ],
    body: species.map((specimen) => [
      {
        label: specimen.uuid,
        hidden: true,
        idColumn: true,
        style: bodyStyle,
      },
      {
        label: specimen.commonName[0].toLocaleUpperCase() + specimen.commonName.slice(1),
        hidden: false,
        idColumn: false,
        style: bodyStyleLeft,
      },
      {
        label: specimen.redListStatus,
        idColumn: false,
        hidden: false,
        style: bodyStyle,
      },
      {
        label: (
          <span
            style={{ backgroundColor: riskCircleColorsOneToThree(specimen.pollutionRiskNutrientSalts) }}
            className="inline-block w-5 h-5 rounded-full"
          />
        ),
        idColumn: false,
        hidden: false,
        style: bodyStyle,
      },

      {
        label: (
          <span
            style={{ backgroundColor: riskCircleColorsOneToThree(specimen.pollutionRiskOrganicMaterals) }}
            className="inline-block w-5 h-5 rounded-full"
          />
        ),
        idColumn: false,
        hidden: false,
        style: bodyStyle,
      },

      {
        label: (
          <span
            style={{ backgroundColor: riskCircleColorsOneToThree(specimen.pollutionRiskChemicals) }}
            className="inline-block w-5 h-5 rounded-full"
          />
        ),
        idColumn: false,
        hidden: false,
        style: bodyStyle,
      },

      {
        label: (
          <span
            style={{ backgroundColor: riskCircleColorsOneToThree(specimen.pollutionRiskDisturbances) }}
            className="inline-block w-5 h-5 rounded-full"
          />
        ),
        idColumn: false,
        hidden: false,
        style: bodyStyle,
      },
    ]),
  };
  return speciesTable;
}
