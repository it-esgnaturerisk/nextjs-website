import CircularProgress from "@/components/circular-progress";
import DashboardItem from "@/components/dashboard-item";
import Heatmap from "@/components/heatmap";
import RecentSitesTable from "@/components/recent-sites-table";
import StatsCard from "@/components/stats-card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/newSite"
          className="bg-greendark text-white py-2 px-4 rounded-lg shadow-md"
        >
          + New Site
        </Link>
      </div>

      <Image
        src="/dashboard-status-example.svg"
        alt="Dashboard Status Example"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        quality={100}
      ></Image>
      {/* <div className="grid grid-cols-4 gap-6">
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
      {/* <div className="flex-1 ml-6">
            <div className="flex justify-between text-gray-600">
              <div>14 ↑ ESP</div>
              <div>12 ↓ ESD</div>
              <div>4 ↑ ECS</div>
            </div>
          </div>
        </DashboardItem>

        {/* <DashboardItem classNameArgs="col-span-1 h-full">
          <Heatmap />
        </DashboardItem>
      </div> */}

      {/* Recent Sites Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Sites</h2>
        <RecentSitesTable />
      </div>
    </div>
  );
}
