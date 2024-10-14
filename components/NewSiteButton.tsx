import React from 'react';
import Link from 'next/link';

interface NewSiteButtonProps {
  classNameArgs?: '';
  children?: null;
  href?: string;
}

const NewSiteButton = ({
  classNameArgs = '',
  children = null,
  href = '',
}: NewSiteButtonProps) => {
  return (
    <Link
      href={href || '/new-site'}
      aria-label={
        href
          ? `${href.substring(1, href.length)}-button`
          : 'button-label-no-href'
      }
      className={`${classNameArgs} bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md`}
    >
      {children || '+ New Site'}
    </Link>
  );
};

export default NewSiteButton;
