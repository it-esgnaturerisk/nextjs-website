/* eslint-disable max-len */
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { HomeIcon } from '@radix-ui/react-icons';
import { TfiBriefcase, TfiMap } from 'react-icons/tfi';
import HeaderButton from './HeaderButton';
import UserButton from './UserButton';

export default function Header() {
  return (
    <div
      role="banner"
      className="bg-greenheader flex justify-between items-center min-h-12 w-full px-6"
    >
      <Link href="/">
        <Image
          src="/logo-white.png"
          width={750} // Set the original width of your logo
          height={212} // Set the original height of your logo
          priority
          sizes="auto"
          className="hidden md:block"
          alt="logo"
          style={{ width: 'auto', height: 'auto', maxHeight: '100px' }} // Adjust max height as needed
        />
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 h-100px items-center">
        <HeaderButton
          activeLocations={['/sites']}
          href="/sites"
        >
          <HomeIcon
            className="h-8 w-8 text-white"
          />
        </HeaderButton>
        <HeaderButton
          activeLocations={['/new-site']}
          href="/new-site"
        >
          <TfiMap
            className="h-8 w-8 text-white"
          />
        </HeaderButton>

        <HeaderButton
          activeLocations={['/portfolio']}
          href="/portfolio"
        >
          <TfiBriefcase
            className="h-8 w-8 text-white"
          />
        </HeaderButton>
      </div>

      <div className="flex justify-end flex-1">
        <UserButton />
      </div>
    </div>
  );
}

