'use client';

import { FormInput, FormSelect } from '../@form';

import { formatDate } from '@/lib/utils';
import { CreatePlantInput, PlantType } from '@/types/plant.types';

const DEFAULT_PLANT: CreatePlantInput = {
  plantName: '',
  species: '',
  plantType: PlantType.Vegetable,
  plantationDate: new Date().toISOString(),
  surfaceAreaRequired: 0,
  idealHumidityLevel: 0,
  gardenId: 0,
};

interface Props {
  gardenId: number;
  /** `plantId` should only be passed when updating a plant */
  plantId?: number;
  /** `plant` should only be passed when updating a plant */
  plant?: CreatePlantInput;
  isPending?: boolean;
}

const BasePlantForm = ({ isPending, gardenId, plantId, plant = DEFAULT_PLANT }: Props) => {
  // gardenId is separated as we don't pass the plant prop when we need a form to create a new plant
  const { plantName, plantType, species, idealHumidityLevel, plantationDate, surfaceAreaRequired } =
    plant;

  return (
    <>
      {!!plantId && (
        <FormInput hidden id="plantId" defaultValue={plantId} required disabled={isPending} />
      )}
      <FormInput hidden id="gardenId" defaultValue={gardenId} required disabled={isPending} />

      <FormInput
        id="plantName"
        label="Plant name"
        placeholder="My new plant"
        required
        defaultValue={plantName}
        disabled={isPending}
        maxLength={40}
        message="The plant name must be between 1 and 40 characters long."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormSelect
          id="plantType"
          label="Plant type"
          options={Object.entries(PlantType).map(([label, value]) => ({ label, value }))}
          required
          defaultValue={plantType}
          disabled={isPending}
        />

        <FormInput
          id="species"
          label="Species"
          placeholder="Rose"
          required
          defaultValue={species}
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
        />
      </div>
      <FormInput
        id="plantationDate"
        label="Plantation date"
        type="date"
        required
        value={formatDate(new Date(plantationDate))}
        disabled={isPending}
      />
    </>
  );
};

export default BasePlantForm;
