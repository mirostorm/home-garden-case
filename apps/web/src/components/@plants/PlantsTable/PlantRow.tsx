'use client';

import { TableCell, TableRow } from '@/components/ui/table';

import { Plant } from '@/types/plant.types';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '../../ui';

const PlantRow = ({
  plantId,
  plantName,
  plantType,
  species,
  surfaceAreaRequired,
  idealHumidityLevel,
  plantationDate,
  updatedAt,
}: Plant) => {
  return (
    <TableRow key={plantId}>
      <TableCell className=" text-lg font-medium">{plantName}</TableCell>
      <TableCell>{plantType}</TableCell>
      <TableCell>{species}</TableCell>
      <TableCell>{surfaceAreaRequired} m²</TableCell>
      <TableCell>{idealHumidityLevel}%</TableCell>
      <TableCell>{plantationDate}</TableCell>
      <TableCell>{updatedAt}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Link href={`/plants/${plantId}`}>
          <Button size="icon" variant="secondary" title={`View ${plantName}`}>
            <ArrowRightIcon />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default PlantRow;
