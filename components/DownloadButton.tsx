/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import { DownloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function DownloadButton({ fileName }: { fileName: string }) {
  return (
    <Link
      href={`https://esg-reports-bucket.s3.amazonaws.com/${fileName}`}
      legacyBehavior
    >
      <a
        target="_blank"
        className="bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md"
      >
        Download Example Report
        {/* <DownloadIcon /> */}
      </a>
    </Link>
  );
}

export default DownloadButton;
