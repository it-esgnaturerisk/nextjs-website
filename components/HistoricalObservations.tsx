import BarChartObservationsOverYears from './BarChartObservationsOverYears';

export default function HistoricalObservations({ site }: any) {
  return (

    <div className="border-2 border-gray-300 rounded-xl bg-white p-6">
      <h4 className="text-2xl text-center">Years of Observation</h4>
      {site.years.lenght === 0 ? (
        <div className="text-center">
          No yearly observational data found for this site.
        </div>
      )
        : <BarChartObservationsOverYears data={site.years} />}
    </div>
  );
}
