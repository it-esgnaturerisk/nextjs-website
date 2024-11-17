import React, { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
  SiteMarkerType, PortfolioType, RangesType, ValidationType,
  NewSiteType,
} from '@/lib/types';
import { insertSite } from '@/lib/db/queries';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import SiteRange from '@/app/sites/new-site/client/Range';

export default function Form({
  markerLng,
  markerLat,
  setMarker,
  setCircles,
  portfolios,
  allRanges,
}: {
  markerLng: number | undefined;
  markerLat: number | undefined;
  setMarker: (newMarker: SiteMarkerType) => void;
  setCircles: (newCircles: number[]) => void;
  portfolios: PortfolioType[];
  allRanges: RangesType[];
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | string >();
  const [longitude, setLongitude] = useState<number | string >();
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('');
  const [siteName, setSiteName] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);
  const [nameError, setNameError] = useState<ValidationType | null>({
    valid: true,
    message: '',
  });
  const [latitudeError, setLatitudeError] = useState<ValidationType | null>({
    valid: true,
    message: '',
  });
  const [longitudeError, setLongitudeError] = useState<ValidationType | null>({
    valid: true,
    message: '',
  });
  const [selectedPortfolioError, setSelectedPortfolioError] = useState<ValidationType | null>({
    valid: true,
    message: '',
  });
  const [selectedRangesError, setSelectedRangesError] = useState<ValidationType | null>({
    valid: true,
    message: '',
  });

  function setRange(selectedValues: number[]) {
    setCircles(selectedValues);
    setSelectedRanges(selectedValues);
  }

  useEffect(() => {
    setLatitude(markerLat);
    setLongitude(markerLng);
  }, [markerLat, markerLng]);

  // Handle when the input field is no longer in focus.
  // Should validate the input fields for latitude and longitude
  // and update the marker if the input is valid.
  async function handleUpdateMarker(event: React.FocusEvent<HTMLInputElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const { id } = event.currentTarget;
      const { value } = event.currentTarget;

      const floatValue = parseFloat(value);

      if (Number.isNaN(floatValue)) {
        return;
      }

      if (id === 'latitude' && (floatValue < -90 || floatValue > 90)) {
        return;
      }
      if (id === 'latitude') {
        setLatitude(floatValue);
      }

      if (id === 'longitude' && (floatValue < -180 || floatValue > 180)) {
        return;
      }
      if (id === 'longitude') {
        setLongitude(floatValue);
      }

      if (id === 'latitude' && !longitude) {
        return;
      }
      if (id === 'longitude' && !latitude) {
        return;
      }

      if (id === 'latitude' && longitude) {
        const newMarker: SiteMarkerType = {
          lng: longitude as number,
          lat: floatValue,
        };
        setMarker(newMarker);
      }

      if (id === 'longitude' && latitude) {
        const newMarker: SiteMarkerType = {
          lng: floatValue,
          lat: latitude as number,
        };
        setMarker(newMarker);
      }
    } catch (e: any) {
      // Capture the error message to display to the user
      throw new Error(`Error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  const onLatLonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    if (id === 'latitude') {
      setLatitude(parseFloat(value) || value);
    }
    if (id === 'longitude') {
      setLongitude(parseFloat(value) || value);
    }
  };

  const validate = () => {
    let valid = true;
    if (siteName === '') {
      setNameError({
        valid: false,
        message: 'Site name is required',
      });
      valid = false;
    } else {
      setNameError({
        valid: true,
        message: '',
      });
    }

    if (latitude === '' || latitude === undefined) {
      setLatitudeError({
        valid: false,
        message: 'Latitude is required',
      });
      valid = false;
    } else {
      setLatitudeError({
        valid: true,
        message: '',
      });
    }

    if (longitude === '' || longitude === undefined) {
      setLongitudeError({
        valid: false,
        message: 'Longitude is required',
      });
      valid = false;
    } else {
      setLongitudeError({
        valid: true,
        message: '',
      });
    }

    if (selectedPortfolio === '') {
      setSelectedPortfolioError({
        valid: false,
        message: 'Portfolio is required',
      });
      valid = false;
    } else {
      setSelectedPortfolioError({
        valid: true,
        message: '',
      });
    }

    if (selectedRanges.length === 0) {
      setSelectedRangesError({
        valid: false,
        message: 'Range is required',
      });
      valid = false;
    } else {
      setSelectedRangesError({
        valid: true,
        message: '',
      });
    }

    return valid;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const newSite: NewSiteType = {
        name: siteName,
        latitude: latitude as number,
        longitude: longitude as number,
        address: null,
        country: null,
        reportLink: null,
        speciesRisk: null,
        geographicalRisk: null,
      };
      try {
        await insertSite(newSite, selectedPortfolio, selectedRanges);
        toast({
          title: 'success',
          description: 'Site created successfully',
        });
      } catch (e: any) {
        setError(e.message);
      }
    } catch (e: any) {
      setError(e.message);
      throw new Error(`Error: ${e}`);
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
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 font-semibold mb-2">
            Site name*
            <input
              type="text"
              id="siteName"
              placeholder="Define site name"
              className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
            {nameError && !nameError.valid && (
              <p className="text-red text-sm">{nameError.message}</p>
            )}
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
              <div className="w-full">
                <input
                  type="number"
                  id="latitude"
                  step={0.0001}
                  placeholder="Latitude"
                  className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
                  onBlur={(event) => handleUpdateMarker(event)}
                  value={latitude}
                  onChange={onLatLonChange}
                />
                {latitudeError && !latitudeError.valid && (
                  <p className="text-red text-sm">{latitudeError.message}</p>
                )}

              </div>
              <div className="w-full">
                <input
                  type="number"
                  id="longitude"
                  step={0.0001}
                  placeholder="Longitude"
                  className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
                  onBlur={(event) => handleUpdateMarker(event)}
                  value={longitude}
                  onChange={onLatLonChange}
                />
                {longitudeError && !longitudeError.valid && (
                  <p className="text-red text-sm">{longitudeError.message}</p>
                )}
              </div>
            </div>
          </label>
        </div>

        <SiteRange
          // eslint-disable-next-line react/jsx-no-bind
          onRangeUpdate={setRange}
          allRanges={allRanges}
        />
        {selectedRangesError && !selectedRangesError.valid && (
          <p className="text-red text-sm">{selectedRangesError.message}</p>
        )}

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
              value={selectedPortfolio || ''}
              onChange={(e) => setSelectedPortfolio(e.target.value)}
            >
              <option value="" disabled>Select Portfolio</option>
              {(portfolios) ? portfolios.map((portfolio) => (
                <option
                  key={portfolio.uuid}
                  value={portfolio.uuid || ''}
                >
                  {portfolio.name}
                </option>
              )) : <option>Example Portfolio</option>}
            </select>
          </label>
          {selectedPortfolioError && !selectedPortfolioError.valid && (
            <p className="text-red text-sm">{selectedPortfolioError.message}</p>
          )}
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
            {isLoading ? 'Loading...' : 'Add new site'}
          </button>
          <Link href="/example-site">
            <button
              type="button"
              disabled={isLoading}
              className="bg-greenlight text-black py-2 px-8 mx-2 rounded-lg shadow-md "
            >
              {isLoading ? 'Loading...' : 'Example'}
            </button>
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
