'use client';

import { FormInput, FormTextArea } from '../@form';

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
}

const BaseGardenForm = ({ gardenId, garden = DEFAULT_GARDEN, isPending }: Props) => {
  const { gardenName, totalSurfaceArea, locationDescription, latitude, longitude } = garden;
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
        defaultValue={totalSurfaceArea}
      />
      <FormTextArea
        id="locationDescription"
        label="Garden description"
        placeholder="A description of my garden..."
        disabled={isPending}
        defaultValue={locationDescription}
        maxLength={100}
        message="The garden description can be maximum 100 characters long."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          id="latitude"
          label="Latitude"
          type="number"
          placeholder="0"
          min={-90}
          max={90}
          disabled={isPending}
          defaultValue={latitude}
        />
        <FormInput
          id="longitude"
          label="Longitude"
          type="number"
          placeholder="0"
          min={-180}
          max={180}
          disabled={isPending}
          defaultValue={longitude}
        />
      </div>
    </>
  );
};

export default BaseGardenForm;
