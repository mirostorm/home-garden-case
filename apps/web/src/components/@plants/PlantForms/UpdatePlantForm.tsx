'use client';

import { useActionState, useState } from 'react';
import { FormDialog } from '../../@form';

import { updatePlant } from '@/actions/plant.actions';
import { Button } from '@/components/ui';
import { Plant } from '@/types/plant.types';
import { PencilIcon } from '@phosphor-icons/react';
import BasePlantForm from './BasePlantForm';

const UpdatePlantForm = (plant: Plant) => {
  const { plantId, gardenId, plantName } = plant;

  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await updatePlant(prevState, formData);
      if (res.success) setIsOpen(false);
      return res;
    },
    null,
  );

  return (
    <>
      <Button variant="secondary" title="Edit plant" onClick={() => setIsOpen(true)}>
        <PencilIcon data-icon="inline-start" />
      </Button>

      <FormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={
          <>
            Update plant: "<strong>{plantName}</strong>"
          </>
        }
        submitText="Update plant"
        formAction={action}
        isPending={pending}
        error={typeof state?.error === 'string' ? state.error : undefined}
      >
        <BasePlantForm
          gardenId={gardenId}
          plantId={plantId}
          plant={plant}
          isPending={pending}
          errors={state?.error}
        />
      </FormDialog>
    </>
  );
};

export default UpdatePlantForm;
