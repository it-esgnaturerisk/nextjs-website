import React, { useState, FormEvent } from "react";
import logo_small from "@/public/logo_liten.png";
import Image from "next/image";
import SiteRange from "@/app/newSite/site-range";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Site, SiteMarker } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function insertSite(
  event: FormEvent<HTMLFormElement>
): Promise<Site[] | null> {
  event.preventDefault();
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  // formData.append("ranges", selectedRanges);

  try {
    const response = await fetch("http://localhost:3000/api/insert_new_site", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        "Error inserting sites, response status: ${response.status}"
      );
    }
    const data = await response.json(); // Parse the JSON response
    return data.sites; // Return the data
  } catch (error: any) {
    console.error("Error inserting sites:", error);
    return null; // Return an error message
  }
}

export default function CreateSiteForm({
  marker,
  setMarker,
}: {
  marker: SiteMarker | undefined;
  setMarker: (newMarker: SiteMarker) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let latitude = marker ? marker.latitude : undefined;
  let longitude = marker ? marker.longitude : undefined;

  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  function setRange(selectedValues: number[]) {
    setSelectedRanges(selectedValues);
  }

  // Handle when the input field is no longer in focus. Should validate the input fields for latitude and longitude
  // and update the marker if the input is valid.
  async function handleUpdateMarker(event: React.FocusEvent<HTMLInputElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const id = event.currentTarget.id;
      const value = event.currentTarget.value;

      const floatValue = parseFloat(value);

      if (isNaN(floatValue)) {
        return;
      }

      if (id === "latitude" && (floatValue < -90 || floatValue > 90)) {
        console.log("Latitude must be between -90 and 90.");
        return;
      } else if (id === "latitude") {
        latitude = floatValue;
      }

      if (id === "longitude" && (floatValue < -180 || floatValue > 180)) {
        console.log("Longitude must be between -180 and 180.");
        return;
      } else if (id === "longitude") {
        longitude = floatValue;
      }

      if (id === "latitude" && longitude == undefined) {
        return;
      } else if (id === "longitude" && latitude == undefined) {
        return;
      }

      if (id === "latitude" && longitude) {
        const newMarker: SiteMarker = {
          key: 0,
          longitude: longitude,
          latitude: floatValue,
        };
        setMarker(newMarker);
      }

      if (id === "longitude" && latitude) {
        const newMarker: SiteMarker = {
          key: 0,
          longitude: floatValue,
          latitude: latitude,
        };
        setMarker(newMarker);
      }
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event.currentTarget);
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      insertSite(event);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xxl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Link href="/sites">
          <IoMdArrowRoundBack className="text-gray-700" />
        </Link>
        <p className="block text-gray-700 font-bold mb-2 text-2xl">
          Create New Site
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Site name*
            <input
              type="text"
              id="siteName"
              placeholder="Define site name"
              className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
            />
          </label>
        </div>

        {/* Site Location */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="longitude"
          >
            Site Location*
            <p className="text-sm text-gray-500 mb-2">
              ⚠ Pin point on map or write in Latitude and Longitude
            </p>
            <div className="flex space-x-4">
              <input
                type="number"
                id="latitude"
                step={0.0001}
                placeholder={"Latitude"}
                className="w-1/2 border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
                onBlur={(event) => handleUpdateMarker(event)}
              />
              <input
                type="number"
                id="longitude"
                step={0.0001}
                placeholder={"Longitude"}
                className="w-1/2 border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
                onBlur={(event) => handleUpdateMarker(event)}
              />
            </div>
            <p className="pb-5">
              {marker
                ? `Current marker location: ${latitude
                    ?.toFixed(6)
                    .toString()}, ${longitude?.toFixed(6).toString()}.`
                : "No marker set."}
            </p>
          </label>
        </div>

        <SiteRange onRangeUpdate={setRange} />

        {/* Portfolio */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="portfolio"
          >
            Portfolio*
            <select
              id="portfolio"
              className="w-full border-b-2 border-gray-300 py-2 px-4 bg-white focus:outline-none focus:border-green-500"
            >
              <option>Select Portfolio</option>
              {/* Add options here */}
            </select>
          </label>
        </div>

        {/* Add Notes
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
            className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500 h-12"
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
            disabled={isLoading}
            className="bg-greenlight text-black py-2 px-8 mx-2 rounded-lg shadow-md "
          >
            {isLoading ? "Loading..." : "Add new site"}
          </button>
          <Link href="examplesite">
            <button
              disabled={isLoading}
              className="bg-greenlight text-black py-2 px-8 mx-2 rounded-lg shadow-md "
            >
              {isLoading ? "Loading..." : "Example"}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
