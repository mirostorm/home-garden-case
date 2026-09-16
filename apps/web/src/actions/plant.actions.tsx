'use server';

import { CreatePlantInput, PlantType } from '@/types/plant.types';
import { revalidatePath } from 'next/cache';

/**
 * **Creates a new plant based on the provided form data.**
 * @param formData - The form data containing the new plant details.
 * @returns A promise that resolves when the plant is created.
 */
export async function createPlant(_prevState: unknown, formData: FormData) {
  const data: CreatePlantInput = {
    plantName: formData.get('plantName') as string,
    species: formData.get('species') as string,
    plantType: formData.get('plantType') as PlantType,
    plantationDate: new Date(formData.get('plantationDate') as string).toISOString(),
    surfaceAreaRequired: Number(formData.get('surfaceAreaRequired')),
    idealHumidityLevel: Number(formData.get('idealHumidityLevel')),
    gardenId: Number(formData.get('gardenId')),
  };

  const response = await fetch('http://localhost:3000/plants', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  if (response.ok) {
    revalidatePath('/plants');
    revalidatePath(`/gardens/${data.gardenId}`);
    return true;
  }
  return false;
}

/**
 * **Updates a new plant based on the provided form data.**
 * @param formData - The form data containing the updated plant details.
 * @returns A promise that resolves when the plant is updated.
 */
export async function updatePlant(_prevState: unknown, formData: FormData) {
  const plantId = formData.get('plantId');
  const data: CreatePlantInput = {
    plantName: formData.get('plantName') as string,
    species: formData.get('species') as string,
    plantType: formData.get('plantType') as PlantType,
    plantationDate: new Date(formData.get('plantationDate') as string).toISOString(),
    surfaceAreaRequired: Number(formData.get('surfaceAreaRequired')),
    idealHumidityLevel: Number(formData.get('idealHumidityLevel')),
    gardenId: Number(formData.get('gardenId')),
  };

  const response = await fetch(`http://localhost:3000/plants/${plantId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    revalidatePath('/plants');
    revalidatePath(`/gardens/${data.gardenId}`);
    return true;
  }
  return false;
}
