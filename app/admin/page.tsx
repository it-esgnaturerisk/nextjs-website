import { selectUsers, selectSites } from "@/lib/db/queries";
import { SiteType, UserType } from "@/lib/types";
import AdminDashboard from "./AdminDashboard";

export default async function Home() {
  // Fetch data server-side
  const users: UserType[] = await selectUsers();
  const sites: SiteType[] = await selectSites();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <AdminDashboard users={users} sites={sites} />
    </div>
  );
}
