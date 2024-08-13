
export default function SitesPage() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        This page will display the sites.
        
        If the user selects to create a new site, the next page will display a map where users may select (multiple) points of interest from a map.
        For each point, the coordinates will be appended to a list, which on the users push of a button are
        sent for automatic processing. Once the results are in, they are notified on their email,
        and the analysis results will be available on their Sites page.

        Additional features will include the options to remove already selected points of interest, adding messages to the analysis request. 
        The analysis will not be performed unless validated and confirmed by the ESGNatureRisk staff.
      </main>
    );
  }
  