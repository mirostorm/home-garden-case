'use client';

import { useActionState } from 'react';
import { FormDialog } from '../@form';

import { updatePlant } from '@/actions/plant.actions';
import { Button } from '@/components/ui';
import { Plant } from '@/types/plant.types';
import { PencilIcon } from '@phosphor-icons/react';
import BasePlantForm from './BasePlantForm';

const UpdatePlantForm = (plant: Plant) => {
  const { plantId, gardenId, plantName } = plant;
  const [_state, action, pending] = useActionState(updatePlant, null);

  return (
    <FormDialog
      title={
        <span>
          Update plant: "<strong>{plantName}</strong>"
        </span>
      }
      submitText="Update plant"
      formAction={action}
      isPending={pending}
      trigger={
        <Button variant="secondary" title="Edit plant">
          <PencilIcon data-icon="inline-start" />
        </Button>
      }
    >
      <BasePlantForm gardenId={gardenId} plantId={plantId} plant={plant} isPending={pending} />
    </FormDialog>
  );
};

export default UpdatePlantForm;
