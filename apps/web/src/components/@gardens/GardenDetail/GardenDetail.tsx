'use client';

import { Garden } from '@/types/garden.types';
import DeleteGardenDialog from '../DeleteGardenDialog';
import UpdateGardenForm from '../UpdateGardenForm';
import GardenInfo from './GardenInfo';

const GardenDetail = (garden: Garden) => {
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
    </div>
  );
};

export default GardenDetail;
