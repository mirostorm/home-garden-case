'use client';

import { TableCell, TableRow } from '@/components/ui/table';

import { formatDate } from '@/lib/utils';
import { Plant } from '@/types/plant.types';
import { DeletePlantDialog, UpdatePlantForm } from '../PlantForms';

interface Props {
  availableSurfaceArea: number;
  plant: Plant;
}

const PlantRow = ({ availableSurfaceArea, plant }: Props) => {
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
        <UpdatePlantForm plant={plant} availableSurfaceArea={availableSurfaceArea} />
        <DeletePlantDialog gardenId={gardenId} plantId={plantId} plantName={plantName} />
      </TableCell>
    </TableRow>
  );
};

export default PlantRow;
