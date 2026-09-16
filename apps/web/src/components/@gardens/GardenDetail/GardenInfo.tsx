'use client';

import { Garden } from '@/types/garden.types';
import DetailTextBox from './DetailTextBox';

interface Props extends Garden {
  occupiedSurfaceArea: number;
  averageRequiredHumidity?: number;
}

const GardenInfo = ({
  gardenName,
  locationDescription,
  totalSurfaceArea,
  targetHumidityLevel,
  latitude,
  longitude,
  createdAt,
  occupiedSurfaceArea = 0,
  averageRequiredHumidity,
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

        <div className="grid grid-cols-2 gap-4 w-1/2">
          {/* Surface area */}
          <DetailTextBox>
            <h2 className="font-bold">Total surface area available</h2>
            <span className="font-heading text-6xl font-bold text-gray-700">
              {Math.round(((totalSurfaceArea - occupiedSurfaceArea) / totalSurfaceArea) * 1000) /
                10}
              %
            </span>
            <span className="font-heading text-xl font-black tracking-wide text-gray-500">
              ({totalSurfaceArea - occupiedSurfaceArea} / {totalSurfaceArea} m²)
            </span>
            <p className="italic text-sm font-medium text-gray-500">
              You are currently using {occupiedSurfaceArea} m² of the total {totalSurfaceArea} m²
              surface area in this garden.
            </p>
          </DetailTextBox>

          {/* Target humidity */}
          <DetailTextBox>
            <h2 className="font-bold">Humidity level</h2>

            <div>
              <h3 className="font-semibold">Target humidity</h3>
              <p className="font-heading text-4xl font-bold text-gray-700">
                {targetHumidityLevel}%
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Average required humidity</h3>
              <p className="font-heading text-4xl font-bold text-gray-700">
                {averageRequiredHumidity ? `${averageRequiredHumidity}%` : 'Unknown'}
              </p>
            </div>

            {targetHumidityLevel && averageRequiredHumidity && (
              <p className="italic text-sm font-medium text-gray-500">
                {targetHumidityLevel > averageRequiredHumidity ? (
                  <span className="text-cyan-700">
                    Your garden is approximately {targetHumidityLevel - averageRequiredHumidity}%
                    too humid for the plants to thrive.
                  </span>
                ) : (
                  <span className="text-orange-700">
                    Your garden is approximately {averageRequiredHumidity - targetHumidityLevel}%
                    too dry for the plants to thrive.
                  </span>
                )}
              </p>
            )}
          </DetailTextBox>

          {/* Location */}
          <DetailTextBox className="col-span-2">
            <h2 className="font-bold">Location</h2>
            {latitude && longitude ? (
              <div className="flex gap-4 w-full">
                <div className="flex flex-col h-full gap-2">
                  <div>
                    <h3 className="font-semibold">Latitude</h3>
                    <p className="font-heading text-4xl font-bold text-gray-700">
                      {latitude.toFixed(9)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Longitude</h3>
                    <p className="font-heading text-4xl font-bold text-gray-700">
                      {longitude.toFixed(9)}
                    </p>
                  </div>
                </div>
                <div className="w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
                  <iframe
                    width="100%"
                    height="200"
                    allowFullScreen
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVizdQeh3udy11xDc5Ao2YStR2gLc-rfc&amp;q=51.243543500%2C%204.123450000&amp;maptype=roadmap&amp;zoom=13"
                  >
                    <a href="https://www.maps.ie/world-time-zone-map/">time zone</a>
                  </iframe>
                </div>
              </div>
            ) : (
              <p className="font-heading text-4xl font-bold text-gray-700">Unknown</p>
            )}
          </DetailTextBox>
        </div>
      </div>
    </>
  );
};

export default GardenInfo;
