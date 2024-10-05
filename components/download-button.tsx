import React from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ZAxis } from "recharts";

const DownloadButton = ({ fileName }: { fileName: string }) => (
  <Link
    href={`https://esg-reports-bucket.s3.amazonaws.com/${fileName}`}
    legacyBehavior
  >
    <a
      target="_blank"
      className="bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md"
    >
      {"Download Example Report"}
      {/* <DownloadIcon /> */}
    </a>
  </Link>
);

export default DownloadButton;
