'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

import { Plant } from '@/types/plant.types';
import { CreatePlantForm } from '../PlantForms';
import PlantRow from './PlantRow';

interface Props {
  gardenId: number;
  plants: Plant[];
  availableSurfaceArea: number;
  targetHumidityLevel?: number;
}

const PlantsTable = ({ gardenId, plants, availableSurfaceArea, targetHumidityLevel }: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 justify-between">
        <h2 className="font-heading font-bold ">Plants in this garden</h2>
        <CreatePlantForm gardenId={gardenId} availableSurfaceArea={availableSurfaceArea} />
      </div>

      <Table className="bg-gray-100 text-gray-700 p-4 rounded-2xl">
        <TableCaption>A list of the plants in this garden.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Required surface area</TableHead>
            <TableHead>Ideal humidity level</TableHead>
            <TableHead>Plantation date</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!plants.length ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-bold">
                No plants found
              </TableCell>
            </TableRow>
          ) : (
            plants.map((plant) => (
              <PlantRow
                plant={plant}
                availableSurfaceArea={availableSurfaceArea}
                targetHumidityLevel={targetHumidityLevel}
                key={plant.plantId}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlantsTable;
