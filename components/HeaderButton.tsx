'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface HeaderButtonProps {
    children: React.ReactNode;
    activeLocations: string[];
    href: string;
}

function HeaderButton({ children, activeLocations, href }: HeaderButtonProps) {
  const path = usePathname();
  const isActive = activeLocations.includes(path);
  return (
    <div
      className="flex items-center justify-center p-6 h-100px rounded-lg"
      // Tailwind is not my strong suit, but bg-color was not working for me so i used inline styles for now..
      style={{
        backgroundImage: isActive ? 'linear-gradient(#272D2A, #8D908F)' : 'inherit',
        position: 'relative',
        opacity: isActive ? 1 : 0.3,
        borderRadius: '8px 8px 0 0',
      }}
    >
      <Link href={href} className="bg-gray-700">
        {children}
      </Link>
      {isActive && (
      <div style={{
        position: 'absolute',
        bottom: 0,
        height: 12,
        width: '50%',
        borderRadius: '8px 8px 0 0',
        backgroundColor: 'white',
      }}
      />
      )}
    </div>
  );
}

export default HeaderButton;
