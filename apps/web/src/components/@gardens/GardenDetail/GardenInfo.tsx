'use client';

import { Garden } from '@/types/garden.types';
import { MapPinIcon } from '@phosphor-icons/react';
import { cn } from 'cn';
import { PropsWithChildren } from 'react';

interface Props extends Garden {
  occupiedSurfaceArea: number;
}

const GardenInfo = ({
  gardenName,
  locationDescription,
  totalSurfaceArea,
  latitude,
  longitude,
  createdAt,
  occupiedSurfaceArea = 0,
}: Props) => {
  return (
    <>
      <div className="flex gap-4 w-full">
        {/* Main info */}
        <DetailTextBox className="max-w-1/2">
          <span className="font-bold text-gray-500">
            Created on: {new Date(createdAt).toLocaleDateString()}
          </span>

          <h1
            className="font-heading text-6xl font-bold line-clamp-2 leading-16 pb-2"
            title={gardenName}
          >
            {gardenName}
          </h1>

          {locationDescription && (
            <p className="font-semibold" title={locationDescription}>
              {locationDescription}
            </p>
          )}
        </DetailTextBox>

        {/* Surface area */}
        <DetailTextBox className="max-w-1/4">
          <h2 className="font-bold">Total surface area available</h2>
          <span className="font-heading text-6xl font-bold text-gray-700">
            {((totalSurfaceArea - occupiedSurfaceArea) / totalSurfaceArea) * 100}%
          </span>
          <span className="font-heading text-xl font-black tracking-wide text-gray-500">
            ({totalSurfaceArea - occupiedSurfaceArea} / {totalSurfaceArea} m²)
          </span>
          <p className="italic text-sm font-medium text-gray-500">
            You are currently using {occupiedSurfaceArea} m² of the total {totalSurfaceArea} m²
            surface area in this garden.
          </p>
        </DetailTextBox>

        {/* Location */}
        <DetailTextBox className="max-w-1/4">
          <h2 className="font-bold">Location</h2>
          {latitude && longitude ? (
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="font-semibold">Latitude</h3>
                <p className="font-heading text-4xl font-bold text-gray-700">{latitude}</p>
              </div>

              <div>
                <h3 className="font-semibold">Longitude</h3>
                <p className="font-heading text-4xl font-bold text-gray-700">{longitude}</p>
              </div>

              <div className="text-blue-600 font-medium hover:underline active:underline">
                <a
                  href={`https://www.google.com/maps/@${longitude},${latitude},10z`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1"
                >
                  <MapPinIcon className="pt-0.5" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          ) : (
            <p className="font-heading text-4xl font-bold text-gray-700">Unknown</p>
          )}
        </DetailTextBox>
      </div>
    </>
  );
};

export default GardenInfo;

const DetailTextBox = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        'flex flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl w-fit flex-col gap-1',
        className,
      )}
    >
      {children}
    </div>
  );
};
