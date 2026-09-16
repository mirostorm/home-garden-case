'use client';

import { useActionState, useEffect, useRef } from 'react';
import { FormDialog, FormInput, FormSelect } from '../@form';

import { createPlant } from '@/actions/plant.actions';
import { Button } from '@/components/ui';
import { PlantType } from '@/types/plant.types';
import { DialogRootActions } from '@base-ui/react';
import { PlusIcon } from '@phosphor-icons/react';

const CreatePlantForm = ({ gardenId }: { gardenId: number }) => {
  const dialogRef = useRef<DialogRootActions | null>(null);

  const [state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await createPlant(previousState, formData);
    },
    null,
  );

  useEffect(() => {
    if (!!state) dialogRef.current?.close();
  }, [state]);

  return (
    <FormDialog
      title="Add new plant to garden"
      submitText="Add plant"
      formAction={action}
      isPending={pending}
      trigger={
        <Button variant="default">
          <PlusIcon data-icon="inline-start" />
          Add new plant
        </Button>
      }
    >
      <FormInput hidden id="gardenId" defaultValue={gardenId} required disabled={pending} />

      <FormInput
        id="plantName"
        label="Plant name"
        placeholder="My new plant"
        required
        disabled={pending}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormSelect
          id="plantType"
          label="Plant type"
          options={Object.entries(PlantType).map(([label, value]) => ({ label, value }))}
          required
          disabled={pending}
        />

        <FormInput id="species" label="Species" placeholder="Rose" required disabled={pending} />

        <FormInput
          id="surfaceAreaRequired"
          label="Required surface area"
          type="number"
          placeholder="0"
          min={0}
          endAdornment={<span className="font-semibold ml-3">m²</span>}
          required
          disabled={pending}
        />
        <FormInput
          id="idealHumidityLevel"
          label="Ideal humidity level"
          type="number"
          placeholder="0"
          min={0}
          max={100}
          endAdornment={<span className="font-semibold ml-3">%</span>}
          required
          disabled={pending}
        />
      </div>
      <FormInput
        id="plantationDate"
        label="Plantation date"
        type="date"
        required
        disabled={pending}
      />
    </FormDialog>
  );
};

export default CreatePlantForm;
