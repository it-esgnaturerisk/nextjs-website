"use server";
import RecentSitesTable from "@/components/RecentSitesTable";
import Image from "next/image";
import NewSiteButton from "@/components/NewSiteButton";

export default async function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <NewSiteButton />
      </div>

      <Image
        src="/figma/dashboard.svg"
        alt="Dashboard Status Example"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        quality={100}
      ></Image>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Sites</h2>
        <RecentSitesTable />
      </div>
    </div>
  );
}
