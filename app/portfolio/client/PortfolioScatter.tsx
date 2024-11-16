'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PortfolioWithCompaniesType } from '@/lib/types';

const colors = ['bg-scatteryellow', 'bg-scatterblue', 'bg-scattergreen'];

export default function PortfolioScatter({ pData } : { pData: PortfolioWithCompaniesType[] }) {
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    const slcted: number[] = [];
    pData.map((_, i) => slcted.push(i));
    setSelected(slcted);
  }, [pData]);

  const handleSelect = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    if (selected.includes(i)) {
      setSelected(selected.filter((s) => s !== i));
    } else {
      setSelected([...selected, i]);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="ml-auto mx-auto max-w-[1400px] w-full">
          <div className="px-8 py-2 flex bg-white rounded-tr-lg rounded-tl-lg content-right float-right">
            {pData.map((p, i) => (
              <div className={`${selected.includes(i) ? 'opacity-100' : 'opacity-25'} ${colors[i]} rounded-3xl mx-2 w-6 h-6 md:w-auto md:h-auto`} key={p.portfolios.id}>
                <button
                  type="button"
                  key={p.portfolios.id}
                  onClick={(e) => handleSelect(e, i)}
                  className="text-black py-2 px-8 mx-2"
                >
                  <div className="hidden md:block">
                    {p.portfolios.name}
                  </div>
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className="m-auto bg-white rounded-lg  max-w-[1400px] mx-auto">
        <div className="relative w-full h-[550px] max-w-[1400px] ">
          <div>
            {
              selected.includes(0) && (
                <Image
                  src="/figma/portfolioScatterYellow.svg"
                  alt="Dashboard Status Example"
                  sizes="100vw"
                  height={0}
                  width={0}
                  className="absolute left-0 w-1/2 h-auto m-auto left-0 right-0 bottom-[50%] top-[50%]"
                  quality={100}
                />
              )
            }
            {
              selected.includes(1) && (
                <Image
                  src="/figma/portfolioScatterBlue.svg"
                  alt="Dashboard Status Example"
                  sizes="100vw"
                  height={0}
                  width={0}
                  className="absolute left-0 w-1/2 h-auto m-auto left-0 right-0 bottom-[50%] top-[50%] transform rotate-10"
                  quality={100}
                />
              )
            }
            {
              selected.includes(2) && (
                <Image
                  src="/figma/portfolioScatterGreen.svg"
                  alt="Dashboard Status Example"
                  sizes="100vw"
                  height={0}
                  width={0}
                  className="absolute left-0 w-1/2 h-auto m-auto left-0 right-0 bottom-[50%] top-[50%] transform -rotate-10"
                  quality={100}
                />
              )
            }
            <Image
              src="/figma/portfolioScatterLayout.svg"
              alt="Dashboard Status Example"
              sizes="100vw"
              height={0}
              width={0}
              className="absolute top-0 left-0 w-5/6 h-auto m-auto left-0 right-0 bottom-[50%] top-[50%]"
              quality={100}
            />

          </div>
        </div>
      </div>
    </div>

  );
}
