export default function SiteInformation({ site }:any) {
  // Order site.years by year
  site.years.sort((a: { year: number }, b: { year: number }) => a.year - b.year);
  const firstYearOfObservation = site.years[0].year;
  const lastYearOfObservation = site.years[site.years.length - 1].year;
  const yearsOfObservation: number = lastYearOfObservation - firstYearOfObservation;

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div>

      <div className="bg-[#E1E5E1] rounded-tr-xl p-2 px-12">
        <h4 className="text-xl mx-3 text-black">Site information</h4>
      </div>
      <div className="px-12">
        <div className="flex w-[100%] m-3">
          <p className="w-[100%]">
            Location:
            {' '}
            <span className="font-bold">{site.country || `${site.longitude.toFixed(6)} / ${site.latitude.toFixed(6)} ` }</span>
          </p>
          <p className="w-[100%]">
            {/* Portfolio: <span className="font-bold">{site.portfolio ? site.portfolio.name : 'Unspecified'}</span> */}
          </p>
        </div>

        <div className="m-4 text-base leading-relaxed">
          <p className="font-semibold mb-2">🔍 Mest observerte artsgrupper:</p>
          <ol className="list-decimal list-inside space-y-1">
            {site.speciesGroupsObserved.slice(0, 3).map((group: { name: string; observations: number}) => (
              <li key={group.name}>
                <span className="font-medium">{capitalize(group.name)}</span>
                {' '}
                {' '}
                –
                {group.observations}
                {' '}
                observasjoner
              </li>
            ))}
          </ol>

          <p className="mt-4">
            📈 Observasjoner over
            {' '}
            <span className="font-medium">{yearsOfObservation}</span>
            {' '}
            år, fra
            {' '}
            <span className="font-medium">{firstYearOfObservation}</span>
            {' '}
            til
            {' '}
            <span className="font-medium">{lastYearOfObservation}</span>
            .
          </p>

          <p className="mt-2">
            🏷️ Produksjonskapasitet:
            {' '}
            <span className="font-medium">
              {site.approvedCapacity}
              {' '}
              {site.approvedCapacityUnit}
            </span>
          </p>
        </div>

        {/* <div className="m-3 text-m">
              <p>
              🔍 De mest observerte artsgruppene er {capitalize(site.speciesGroupsObserved[0].name)} ({site.speciesGroupsObserved[0].observations} observasjoner),
                etterfulgt av {capitalize(site.speciesGroupsObserved[1].name)} ({site.speciesGroupsObserved[1].observations} observasjoner)
                og {capitalize(site.speciesGroupsObserved[2].name)} ({site.speciesGroupsObserved[2].observations} observasjoner). <br />

                📈 Området har observasjoner over {yearsOfObservation} år, fra {firstYearOfObservation} til {lastYearOfObservation}.
                <br />
                🏷️ Production volume: {site.approvedCapacity} {site.approvedCapacityUnit}.
              </p>
            </div> */}
        <div className="m-3 mt-6 mb-0">
          {/* <h3 className="text-2xl">Exposure</h3> */}
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#C3C7C3] to-white" />
      <div className="px-12">
        <div className="md:grid md:grid-cols-4 md:gap-4 block">
          <div>
            <p className="text-bold text-xs text-center my-2">
              Threatened Species:
            </p>
            <p className="text-2xl content-center text-center my-2">{site.species.length}</p>
          </div>
          <div>
            <p className="text-bold text-xs text-center my-2">
              Unique Species:
            </p>
            <p className="text-2xl content-center text-center my-2">{site.uniqueSpecies}</p>
          </div>
          <div>
            <p className="text-bold text-xs text-center my-2">
              Key Biodiversity areas
            </p>
            <p className="text-2xl content-center text-center my-2">0</p>
          </div>
          <div>
            <p className="text-bold text-xs text-center my-2">
              Protected Areas:
            </p>
            <p className="text-2xl content-center text-center my-2">
              {/* {site.protectedAreas.map((pa: { rangesValue: number; numberOfPAs: number}) => (
                <span key={pa.rangesValue}> {pa.numberOfPAs} ({pa.rangesValue}km)<br/> </span>
              ))} */}
              {/* <div className="h-1 w-full bg-greenlight" /> */}
              {site.protectedAreas.reduce((acc: number, pa: { numberOfPAs: number }) => acc + pa.numberOfPAs, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
