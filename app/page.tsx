import { selectSites } from '@/lib/db/queries';
import { SiteType } from '@/lib/types';
import { redirect } from 'next/navigation';

export default async function NewSite() {
  const sites: SiteType[] = await selectSites();

  if (sites.length === 0) {
    redirect('/new-site');
  } else {
    (
      redirect('/sites')
    );
  }
}
