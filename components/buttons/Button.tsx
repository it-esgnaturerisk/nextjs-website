import React from 'react';
import Link from 'next/link';

interface NewSiteButtonProps {
  classNameArgs?: string | null;
  text: React.ReactNode;
  href: string ;
}

const standardClassName = 'bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md';

export default function Button({ classNameArgs = null, text = 'Button', href = '' }: NewSiteButtonProps) {
  return (
    <Link
      href={href}
      aria-label={
        text
          ? `${text}-button`
          : 'button-label-no-href'
      }
      className={`${classNameArgs || standardClassName}`}
    >
      {text}
    </Link>
  );
}
