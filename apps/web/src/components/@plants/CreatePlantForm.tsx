'use client';

import { useActionState } from 'react';
import { FormDialog } from '../@form';

import { createPlant } from '@/actions/plant.actions';
import { Button } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';
import BasePlantForm from './BasePlantForm';

const CreatePlantForm = ({ gardenId }: { gardenId: number }) => {
  const [state, action, pending] = useActionState(createPlant, null);

  console.log({ state });

  return (
    <FormDialog
      title="Add new plant to garden"
      submitText="Add plant"
      formAction={action}
      isPending={pending}
      error={typeof state?.error === 'string' ? state.error : undefined}
      trigger={
        <Button variant="default">
          <PlusIcon data-icon="inline-start" />
          Add new plant
        </Button>
      }
    >
      <BasePlantForm gardenId={gardenId} isPending={pending} />
    </FormDialog>
  );
};

export default CreatePlantForm;
