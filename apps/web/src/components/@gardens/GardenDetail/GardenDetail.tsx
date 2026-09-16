'use client';

import { PlantsTable } from '@/components/@plants';
import { Button, Separator } from '@/components/ui';
import { Garden } from '@/types/garden.types';
import { Plant } from '@/types/plant.types';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { DeleteGardenDialog, UpdateGardenForm } from '../GardenForms';
import GardenInfo from './GardenInfo';

interface Props extends Garden {
  plants: Plant[];
}

const GardenDetail = ({ plants, ...garden }: Props) => {
  const { gardenId, gardenName, targetHumidityLevel } = garden;
  const occupiedSurfaceArea = plants.reduce((acc, plant) => acc + plant.surfaceAreaRequired, 0);
  const averageRequiredHumidity = !!plants.length
    ? plants.reduce((acc, plant) => acc + plant.idealHumidityLevel, 0) / plants.length
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between">
        <Link href="/gardens">
          <Button variant="link">
            <ArrowLeftIcon data-icon="inline-start" />
            Back to Gardens
          </Button>
        </Link>
        <div className="flex gap-2 justify-end">
          <UpdateGardenForm triggerLabel="Edit garden" garden={garden} />
          <DeleteGardenDialog
            gardenId={gardenId}
            gardenName={gardenName}
            buttonLabel="Remove garden"
          />
        </div>
      </div>

      <GardenInfo
        {...garden}
        occupiedSurfaceArea={occupiedSurfaceArea}
        averageRequiredHumidity={averageRequiredHumidity}
      />

      <Separator />

      <PlantsTable
        gardenId={gardenId}
        plants={plants}
        availableSurfaceArea={garden.totalSurfaceArea - occupiedSurfaceArea}
        targetHumidityLevel={targetHumidityLevel}
      />
    </div>
  );
};

export default GardenDetail;
