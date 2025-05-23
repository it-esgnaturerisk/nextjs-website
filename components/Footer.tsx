import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div role="contentinfo" className="w-full text-center bg-greenheader">
      <div className="flex justify-between items-center w-full bg-white">
        <div className="flex h-full items-center">
          <Link className="justify-start" href="https://flowbite.com">
            <Image
              src="/logo-small.png"
              alt="ESG Nature Risk"
              width={50}
              height={50}
            />
            {' '}
          </Link>
          <p className="font-bold justify-start">ESG Nature Risk</p>
        </div>
        <div className="justify-end mx-5">
          Contact us at
          <Link className="mx-3" href="mailto:tom@esgnaturerisk.com">
            tom@esgnaturerisk.com
          </Link>
          {' '}
          {' or '}
          <Link className="mx-3" href="mailto:anders@esgnaturerisk.com">
            anders@esgnaturerisk.com
          </Link>
          {/* <Link className="mx-3" href="#">
              About
            </Link>
            <Link className="mx-3" href="#">
              Privacy Policy
            </Link>
            <Link className="mx-3" href="#">
              Licensing
            </Link> */}
        </div>
      </div>
      <hr />
      <p className="text-white"> ©2024 ESG Nature Risk</p>
      <p className="text-white">Bjønnstien 14, 2208 Kongsvinger</p>
    </div>
  );
}
