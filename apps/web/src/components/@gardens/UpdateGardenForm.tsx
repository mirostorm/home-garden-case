'use client';

import { updateGarden } from '@/actions/garden.actions';
import { useActionState } from 'react';
import { FormDialog, FormInput, FormTextArea } from '../@form';

import { Button } from '@/components/ui';
import { Garden } from '@/types/garden.types';
import { PencilIcon } from '@phosphor-icons/react';

type Props = Garden & {
  triggerLabel?: string;
};

const UpdateGardenForm = ({
  triggerLabel,
  gardenId,
  gardenName,
  totalSurfaceArea,
  locationDescription,
  latitude,
  longitude,
}: Props) => {
  const [_state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await updateGarden(previousState, formData);
    },
    null,
  );

  return (
    <FormDialog
      formAction={action}
      title={
        <>
          Edit garden: "<strong>{gardenName}</strong>"
        </>
      }
      submitText="Update garden"
      isPending={pending}
      trigger={
        <Button variant="secondary">
          <PencilIcon data-icon="inline-start" />
          {triggerLabel}
        </Button>
      }
    >
      <FormInput id="gardenId" required defaultValue={gardenId} hidden />
      <FormInput
        id="gardenName"
        label="Garden name"
        placeholder="My garden"
        required
        defaultValue={gardenName}
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
        defaultValue={totalSurfaceArea}
      />
      <FormTextArea
        id="locationDescription"
        label="Garden description"
        placeholder="A description of my garden..."
        disabled={pending}
        defaultValue={locationDescription}
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
          defaultValue={latitude}
        />
        <FormInput
          id="longitude"
          label="Longitude"
          type="number"
          placeholder="0"
          min={-180}
          max={180}
          disabled={pending}
          defaultValue={longitude}
        />
      </div>
    </FormDialog>
  );
};

export default UpdateGardenForm;
