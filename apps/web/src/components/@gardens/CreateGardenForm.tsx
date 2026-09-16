'use client';

import { createGarden } from '@/actions/garden.actions';
import { useActionState } from 'react';
import { FormDialog, FormInput, FormTextArea } from '../@form';

import { Button } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';

const CreateGardenForm = () => {
  const [_state, action, pending] = useActionState(createGarden, null);

  return (
    <FormDialog
      submitText="Add garden"
      formAction={action}
      isPending={pending}
      title="Add new garden"
      trigger={
        <Button variant="default">
          <PlusIcon data-icon="inline-start" />
          New Garden
        </Button>
      }
    >
      <FormInput
        id="gardenName"
        label="Garden name"
        placeholder="My garden"
        required
        disabled={pending}
      />
      <FormInput
        id="totalSurfaceArea"
        label="Total surface area"
        type="number"
        placeholder="0"
        min={0}
        endAdornment={<span className="font-semibold ml-3">m²</span>}
        required
        disabled={pending}
      />
      <FormTextArea
        id="locationDescription"
        label="Garden description"
        placeholder="A description of my garden..."
        disabled={pending}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          id="latitude"
          label="Latitude"
          type="number"
          placeholder="0"
          min={-90}
          max={90}
          disabled={pending}
        />
        <FormInput
          id="longitude"
          label="Longitude"
          type="number"
          placeholder="0"
          min={-180}
          max={180}
          disabled={pending}
        />
      </div>
    </FormDialog>
  );
};

export default CreateGardenForm;
