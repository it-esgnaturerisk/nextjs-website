import RecentSitesTable from "@/components/recent-sites-table";
import Image from "next/image";
import DashboardItem from "@/components/dashboard-item";
import StatsCard from "@/components/stats-card";
import Heatmap from "@/components/heatmap";
import NewSiteButton from "@/components/new-site-button";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <NewSiteButton />
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 flex flex-col gap-6">
          <DashboardItem classNameArgs="col-span-1 h-1/2">
            <StatsCard number={42} label="Projects" />
          </DashboardItem>
          <DashboardItem classNameArgs="col-span-1 h-1/2 ">
            <StatsCard number={45} label="Reports" additionalClasses="mt-4" />
          </DashboardItem>
        </div>
        <DashboardItem classNameArgs="col-span-2 h-full">
          <Image
            src="/circular-progress.svg"
            alt="Circular progress bar"
            width={400}
            height={400}
            quality={100}
          ></Image>
          {/* <CircularProgress /> */}
          <div className="flex-1 ml-6">
            <div className="flex justify-between text-gray-600">
              <div>14 ↑ ESP</div>
              <div>12 ↓ ESD</div>
              <div>4 ↑ ECS</div>
            </div>
          </div>
        </DashboardItem>

        <DashboardItem classNameArgs="col-span-1 h-full">
          <Heatmap />
        </DashboardItem>
      </div>

      {/* Recent Sites Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Sites</h2>
        <RecentSitesTable />
      </div>
    </div>
  );
}
