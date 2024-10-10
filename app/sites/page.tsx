import RecentSitesTable from "@/components/RecentSitesTable";
import NewSiteButton from "@/components/NewSiteButton";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        <div>
          <NewSiteButton href="example-sites"> Example </NewSiteButton>
          <NewSiteButton />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4"></h2>
        <RecentSitesTable />
      </div>
    </div>
  );
}
