'use client';

import { PlantsTable } from '@/components/@plants';
import { Separator } from '@/components/ui';
import { Garden } from '@/types/garden.types';
import { Plant } from '@/types/plant.types';
import { DeleteGardenDialog, UpdateGardenForm } from '../GardenForms';
import GardenInfo from './GardenInfo';

interface Props extends Garden {
  plants: Plant[];
}

const GardenDetail = ({ plants, ...garden }: Props) => {
  const { gardenId, gardenName } = garden;
  const occupiedSurfaceArea = plants.reduce((acc, plant) => acc + plant.surfaceAreaRequired, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <UpdateGardenForm triggerLabel="Edit garden" garden={garden} />
        <DeleteGardenDialog
          gardenId={gardenId}
          gardenName={gardenName}
          buttonLabel="Remove garden"
        />
      </div>

      <GardenInfo {...garden} occupiedSurfaceArea={occupiedSurfaceArea} />

      <Separator />

      <PlantsTable
        gardenId={gardenId}
        plants={plants}
        availableSurfaceArea={garden.totalSurfaceArea - occupiedSurfaceArea}
      />
    </div>
  );
};

export default GardenDetail;
