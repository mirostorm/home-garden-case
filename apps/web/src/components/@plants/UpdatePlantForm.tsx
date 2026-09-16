'use client';

import { useActionState } from 'react';
import { FormDialog, FormInput, FormSelect } from '../@form';

import { updatePlant } from '@/actions/plant.actions';
import { Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Plant, PlantType } from '@/types/plant.types';
import { PencilIcon } from '@phosphor-icons/react';

const UpdatePlantForm = ({
  gardenId,
  plantName,
  plantType,
  species,
  idealHumidityLevel,
  plantationDate,
  surfaceAreaRequired,
}: Plant) => {
  const [_state, action, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      return await updatePlant(previousState, formData);
    },
    null,
  );

  return (
    <FormDialog
      title={
        <>
          Update plant: "<strong>{plantName}</strong>"
        </>
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
      <FormInput hidden id="gardenId" defaultValue={gardenId} required disabled={pending} />

      <FormInput
        id="plantName"
        label="Plant name"
        placeholder="My new plant"
        required
        defaultValue={plantName}
        disabled={pending}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormSelect
          id="plantType"
          label="Plant type"
          options={Object.entries(PlantType).map(([label, value]) => ({ label, value }))}
          required
          defaultValue={plantType}
          disabled={pending}
        />

        <FormInput
          id="species"
          label="Species"
          placeholder="Rose"
          required
          defaultValue={species}
          disabled={pending}
        />

        <FormInput
          id="surfaceAreaRequired"
          label="Required surface area"
          type="number"
          placeholder="0"
          min={0}
          endAdornment={<span className="font-semibold ml-3">m²</span>}
          required
          defaultValue={surfaceAreaRequired}
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
          defaultValue={idealHumidityLevel}
          disabled={pending}
        />
      </div>
      <FormInput
        id="plantationDate"
        label="Plantation date"
        type="date"
        required
        value={formatDate(new Date(plantationDate))}
        disabled={pending}
      />
    </FormDialog>
  );
};

export default UpdatePlantForm;
