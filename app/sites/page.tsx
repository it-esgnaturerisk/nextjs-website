import RecentSitesTable from '@/components/recent-sites-table';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sites</h1>
          <Link href="/newSite" className="bg-greendark text-white py-2 px-4 rounded-lg shadow-md">
            + New Site
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4"></h2>
          <RecentSitesTable />
        </div>
    </div>
  );
}
