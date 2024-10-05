import React from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const DownloadButton = () => (
  <Link
    className="bg-greendark text-white rounded-lg shadow-md"
    href="https://esg-reports-bucket.s3.amazonaws.com/ESG_Nature_Risk_Report_Example.pdf"
    // passHref
    legacyBehavior
  >
    <a target="_blank">
      <DownloadIcon />
    </a>
  </Link>
);

export default DownloadButton;
