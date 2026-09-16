'use client';

import { Button, TableCell, TableRow } from '@/components/ui';

import { Garden } from '@/types/garden.types';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { DeleteGardenDialog, UpdateGardenForm } from '../GardenForms';

const GardenRow = (garden: Garden) => {
  const {
    gardenId,
    gardenName,
    totalSurfaceArea,
    locationDescription,
    latitude,
    longitude,
    targetHumidityLevel,
    updatedAt,
  } = garden;

  return (
    <TableRow>
      <TableCell
        title={gardenName}
        className="max-w-40 text-lg font-medium overflow-hidden text-ellipsis"
      >
        {gardenName}
      </TableCell>

      <TableCell className="max-w-48 text-ellipsis overflow-hidden" title={locationDescription}>
        {locationDescription ?? '-'}
      </TableCell>

      <TableCell>{totalSurfaceArea} m²</TableCell>
      <TableCell>{targetHumidityLevel ? `${targetHumidityLevel}%` : '-'}</TableCell>

      <TableCell>{latitude && longitude ? `${latitude}, ${longitude}` : '-'}</TableCell>
      <TableCell>{updatedAt}</TableCell>

      <TableCell className="flex items-center gap-2">
        <Link href={`/gardens/${gardenId}`}>
          <Button size="icon" variant="secondary" title={`View ${gardenName}`}>
            <ArrowRightIcon />
          </Button>
        </Link>
        <UpdateGardenForm garden={garden} />
        <DeleteGardenDialog gardenId={gardenId} gardenName={gardenName} />
      </TableCell>
    </TableRow>
  );
};

export default GardenRow;
