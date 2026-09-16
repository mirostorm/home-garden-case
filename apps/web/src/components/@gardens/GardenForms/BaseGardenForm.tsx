'use client';

import { FormInput, FormTextArea } from '../../@form';

import { CreateGardenInput } from '@/types/garden.types';

const DEFAULT_GARDEN: CreateGardenInput = {
  gardenName: '',
  totalSurfaceArea: 0,
  locationDescription: undefined,
  latitude: undefined,
  longitude: undefined,
};

interface Props {
  /** `gardenId` should only be passed when updating a garden */
  gardenId?: number;
  /** `garden` should only be passed when updating a garden */
  garden?: CreateGardenInput;
  isPending?: boolean;
  errors?: Record<string, { errors: string[] }> | string | null;
}

const BaseGardenForm = ({ gardenId, garden = DEFAULT_GARDEN, isPending, errors }: Props) => {
  const { gardenName, totalSurfaceArea, locationDescription, latitude, longitude } = garden;

  const errorsArray =
    typeof errors === 'string' || !errors
      ? []
      : Object.entries(errors).map(([key, value]) => ({ key, value: value.errors[0] }));

  const getError = (key: string) => errorsArray.find((error) => error.key === key)?.value;

  return (
    <>
      {gardenId && (
        <FormInput hidden id="gardenId" defaultValue={gardenId} required disabled={isPending} />
      )}
      <FormInput
        id="gardenName"
        label="Garden name"
        placeholder="My garden"
        required
        defaultValue={gardenName}
        disabled={isPending}
        maxLength={40}
        error={getError('gardenName')}
        message="The garden name must be between 1 and 40 characters long."
      />
      <FormInput
        id="totalSurfaceArea"
        label="Total surface area"
        type="number"
        placeholder="0"
        min={0}
        endAdornment={<span className="font-semibold ml-3">m²</span>}
        required
        disabled={isPending}
        error={getError('totalSurfaceArea')}
        defaultValue={totalSurfaceArea}
      />
      <FormTextArea
        id="locationDescription"
        label="Garden description"
        placeholder="A description of my garden..."
        disabled={isPending}
        defaultValue={locationDescription}
        maxLength={100}
        error={getError('locationDescription')}
        message="The garden description can be maximum 100 characters long."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          id="latitude"
          label="Latitude"
          type="number"
          placeholder="0.0000"
          step="0.000000001"
          min={-90.000000001}
          max={90.000000001}
          disabled={isPending}
          defaultValue={latitude}
          error={getError('latitude')}
        />
        <FormInput
          id="longitude"
          label="Longitude"
          type="number"
          placeholder="0.0000"
          step="0.000000001"
          min={-180.000000001}
          max={180.000000001}
          disabled={isPending}
          defaultValue={longitude}
          error={getError('longitude')}
        />
      </div>
    </>
  );
};

export default BaseGardenForm;
