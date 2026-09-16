'use client';

import { PlantsTable } from '@/components/@plants';
import { Separator } from '@/components/ui';
import { Garden } from '@/types/garden.types';
import { Plant } from '@/types/plant.types';
import DeleteGardenDialog from '../DeleteGardenDialog';
import UpdateGardenForm from '../UpdateGardenForm';
import GardenInfo from './GardenInfo';

interface Props extends Garden {
  plants: Plant[];
}

const GardenDetail = ({ plants, ...garden }: Props) => {
  const { gardenId, gardenName } = garden;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <UpdateGardenForm triggerLabel="Edit garden" {...garden} />
        <DeleteGardenDialog
          gardenId={gardenId}
          gardenName={gardenName}
          buttonLabel="Remove garden"
        />
      </div>

      <GardenInfo {...garden} />

      <Separator />

      <PlantsTable gardenId={gardenId} plants={plants} />
    </div>
  );
};

export default GardenDetail;
