'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const years = [1971, 1997, 2008, 2025];

export default function SatImages({ image }: { image: string }) {
  const [year, setYear] = React.useState<number>(years[years.length - 1]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize the slider's year from the URL query param, or default to the last year
    const initialYear = searchParams.get('year') || years[years.length - 1].toString();
    setYear(parseInt(initialYear, 10));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = years[parseInt(e.target.value, 10)];
    setYear(newYear);

    // Update the URL search parameter without a full page reload
    const params = new URLSearchParams(window.location.search);
    params.set('year', newYear.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* The image fills the container (width and height) */}
      <Image
        src={image}
        alt="site"
        className="w-full h-full object-cover"
        fill
      />

      {/* Year label in the bottom-right corner */}
      <div className="absolute bottom-16 right-5 z-10 text-3xl font-semibold text-white">
        {year}
      </div>

      {/* Slider at the very bottom */}
      <div className="absolute bottom-5 left-0 w-full px-4 z-10">
        <input
          id="slider"
          type="range"
          min="0"
          max={years.length - 1}
          step="1"
          value={years.indexOf(year)}
          onChange={handleChange}
          className="w-full cursor-ew-resize accent-[#FFAE73] bg-transparent"
        />
      </div>
    </div>
  );
}
