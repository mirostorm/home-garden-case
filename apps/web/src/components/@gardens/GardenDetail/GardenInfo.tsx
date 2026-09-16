'use client';

import { Garden } from '@/types/garden.types';
import { cn } from 'cn';
import { PropsWithChildren } from 'react';

const GardenInfo = ({
  gardenName,
  locationDescription,
  totalSurfaceArea,
  latitude,
  longitude,
  createdAt,
}: Garden) => {
  return (
    <>
      <div className="flex gap-4 w-full">
        <DetailTextBox className="max-w-1/2">
          <span className="leading-4 text-sm italic">
            Created on: {new Date(createdAt).toLocaleDateString()}
          </span>
          <h1
            className="font-heading text-6xl font-bold line-clamp-2 leading-16 pb-2"
            title={gardenName}
          >
            {gardenName}
          </h1>
          {locationDescription && (
            <p className="font-bold line-clamp-4" title={locationDescription}>
              {locationDescription}
            </p>
          )}
        </DetailTextBox>
        <DetailTextBox className="max-w-1/4">
          <h2 className="font-bold">Total surface area</h2>
          <p className="font-heading text-4xl font-bold text-gray-700">{totalSurfaceArea} m²</p>
        </DetailTextBox>
        <DetailTextBox className="max-w-1/4">
          <h2 className="font-bold">Location</h2>
          {latitude && longitude ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-6">
                <div>
                  <p className="font-heading text-4xl font-bold text-gray-700">{latitude},</p>
                  <h3 className="font-semibold">Latitude</h3>
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-gray-700">{longitude}</p>
                  <h3 className="font-semibold">Longitude</h3>
                </div>
              </div>
              <div className="text-blue-600 font-medium hover:underline active:underline">
                <a
                  href={`https://www.google.com/maps/@${longitude},${latitude},10z`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
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
