'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SiteMap from './SiteMap';

export default function TogglableSiteMap({
  latitude,
  longitude,
  originalRanges,
}: {
  latitude: number;
  longitude: number;
  originalRanges: Array<{ uuid: string; id: number; label: string; value: number }> | null;
}) {
  const [useEmptyRange, setUseEmptyRange] = useState(false);

  const ranges = useEmptyRange || !originalRanges?.length
    ? [{
      uuid: '', id: 0, label: '', value: 0,
    }]
    : originalRanges;

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4 mb-2">
        <Label htmlFor="range-toggle" className="text-sm">
          Use empty range
        </Label>
        <Switch
          id="range-toggle"
          checked={useEmptyRange}
          onCheckedChange={setUseEmptyRange}
        />
      </div>
      <SiteMap latitude={latitude} longitude={longitude} ranges={ranges} />
    </div>
  );
}
