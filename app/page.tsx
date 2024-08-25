import Header from "@/components/header";
import CircularProgress from "@/components/circular-progress";
import Heatmap from "@/components/heatmap";
import RecentSitesTable from "@/components/recent-sites-table";
import StatsCard from "@/components/stats-card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link href="/newSite" className="bg-greendark text-white py-2 px-4 rounded-lg shadow-md">
            + New Site
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Projects and Reports */}
          <div className="col-span-1">
            <StatsCard number={42} label="Projects" />
            <StatsCard number={45} label="Reports" additionalClasses="mt-4" />
          </div>

          {/* Circular Progress and Stats */}
          <div className="col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
              <CircularProgress />
              <div className="flex-1 ml-6">
                <div className="flex justify-between text-gray-600">
                  <div>14 ↑ ESP</div>
                  <div>12 ↓ ESD</div>
                  <div>4 ↑ ECS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="col-span-1">
            <Heatmap />
          </div>
        </div>

        {/* Recent Sites Table */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Sites</h2>
          <RecentSitesTable />
        </div>
      </div>
    </div>
  );
}
