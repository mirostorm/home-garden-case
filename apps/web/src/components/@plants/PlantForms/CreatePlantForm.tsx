'use client';

import { useActionState, useState } from 'react';
import { FormDialog } from '../../@form';

import { createPlant } from '@/actions/plant.actions';
import { Button } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';
import BasePlantForm from './BasePlantForm';

interface Props {
  gardenId: number;
  availableSurfaceArea: number;
}

const CreatePlantForm = ({ gardenId, availableSurfaceArea }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const res = await createPlant(prevState, formData);
      if (res.success) setIsOpen(false);
      return res;
    },
    null,
  );

  return (
    <>
      <Button variant="default" onClick={() => setIsOpen(true)}>
        <PlusIcon data-icon="inline-start" />
        Add new plant
      </Button>

      <FormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add new plant to garden"
        submitText="Add plant"
        formAction={action}
        isPending={pending}
        error={typeof state?.error === 'string' ? state.error : undefined}
      >
        <BasePlantForm
          availableSurfaceArea={availableSurfaceArea}
          gardenId={gardenId}
          isPending={pending}
          errors={state?.error}
        />
      </FormDialog>
    </>
  );
};

export default CreatePlantForm;
