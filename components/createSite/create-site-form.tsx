import React, { useState } from "react";
import logo_small from "@/public/logo_liten.png";
import Image from "next/image";
import SiteRange from "./site-range";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CreateSiteForm({
  latitude,
  longitude,
}: {
  latitude: number | undefined;
  longitude: number | undefined;
}) {
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  const [siteLatitude, setSiteLatitude] = useState<string>(
    latitude !== undefined ? latitude.toFixed(6) : ""
  );
  const [parsedLatitude, setParsedLatitude] = useState<number | undefined>(latitude);


  function setRange(selectedValues: number[]) {
    setSelectedRanges(selectedValues);
  }

  function handleLatitudeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    // Allow empty input
    if (value === "") {
      setSiteLatitude(value);
      setParsedLatitude(undefined);
      return;
    }

    // Check if the value is a valid float or a partial float like "45."
    const floatValue = parseFloat(value);

    if (!isNaN(floatValue) && floatValue >= -90 && floatValue <= 90) {
      setSiteLatitude(value);
      setParsedLatitude(floatValue);
    } else {
      // Allow temporary invalid input (e.g., "45.")
      setSiteLatitude(value);
      setParsedLatitude(undefined);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
      <Link href="/sites">
        <IoMdArrowRoundBack className="text-gray-700" />
      </Link>
      <p className="block text-gray-700 font-bold mb-2 text-2xl">Create New Site</p>
      </div>
      {/* Site Name */}
      <form>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="siteName"
          >
            Site name*
          </label>
          <input
            type="text"
            id="siteName"
            placeholder="Define site name"
            className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Site Location */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="longitude"
          >
            Site Location*
          </label>
          <p className="text-sm text-gray-500 mb-2">
            ⚠ Pin point on map or write in Longitude and Latitude
          </p>
          <div className="flex space-x-4">
            <input
              type="text"
              id="latitude"
              placeholder={
                latitude ? latitude.toFixed(6).toString() : "Latitude"
              }
              className="w-1/2 border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
              value={siteLatitude}
              onChange={handleLatitudeChange}
            />
            <input
              type="text"
              id="longitude"
              placeholder={
                longitude ? longitude.toFixed(6).toString() : "Longitude"
              }
              className="w-1/2 border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <SiteRange onRangeUpdate={setRange}/>

        {/* Portfolio */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="portfolio"
          >
            Portfolio*
          </label>
          <select
            id="portfolio"
            className="w-full border-b-2 border-gray-300 py-2 px-4 bg-white focus:outline-none focus:border-green-500"
          >
            <option>Select Portfolio</option>
            {/* Add options here */}
          </select>
        </div>

        {/* Add Notes */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="notes"
          >
            Add notes
          </label>
          <textarea
            id="notes"
            placeholder="Add notes about the site or autofill with NatureRisk AI"
            className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500 h-24"
          />
          <button className="bg-greengray py-1 px-5 shadow-md rounded-3xl text-sm flex items-center space-x-2">
            <Image src={logo_small} width={20} height={20} alt="Logo" />
            <span>Autofill with NatureRisk AI</span>
          </button>
        </div>

        {/* Add New Site Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-greenlight text-black py-2 px-8 rounded-lg shadow-md "
          >
            Add new site
          </button>
        </div>
      </form>
    </div>
  );
}
