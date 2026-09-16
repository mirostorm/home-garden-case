'use client';

import { TableCell, TableRow } from '@/components/ui/table';

import { formatDate } from '@/lib/utils';
import { Plant } from '@/types/plant.types';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '../../ui';
import DeletePlantDialog from '../DeletePlantDialog';
import UpdatePlantForm from '../UpdatePlantForm';

const PlantRow = (plant: Plant) => {
  const {
    gardenId,
    plantId,
    plantName,
    plantType,
    species,
    surfaceAreaRequired,
    idealHumidityLevel,
    plantationDate,
    updatedAt,
  } = plant;
  return (
    <TableRow key={plantId} className="font-medium">
      <TableCell className="text-lg font-medium max-w-40 overflow-hidden text-ellipsis">
        {plantName}
      </TableCell>
      <TableCell className="capitalize">{plantType}</TableCell>
      <TableCell className="max-w-40 overflow-hidden text-ellipsis">{species}</TableCell>
      <TableCell>{surfaceAreaRequired} m²</TableCell>
      <TableCell>{idealHumidityLevel}%</TableCell>
      <TableCell>{formatDate(new Date(plantationDate))}</TableCell>
      <TableCell className="font-normal">{updatedAt}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Link href={`/plants/${plantId}`}>
          <Button size="icon" variant="secondary" title={`View ${plantName}`}>
            <ArrowRightIcon />
          </Button>
        </Link>
        <UpdatePlantForm {...plant} />
        <DeletePlantDialog gardenId={gardenId} plantId={plantId} plantName={plantName} />
      </TableCell>
    </TableRow>
  );
};

export default PlantRow;
