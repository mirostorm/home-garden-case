'use server';

import { CreatePlantInput, PlantType } from '@/types/plant.types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const plantValidationSchema = (availableSurfaceArea: number) =>
  z.object({
    plantName: z.string().min(1).max(40).trim(),
    species: z.string().min(1).max(40).trim(),
    plantType: z.enum(PlantType),
    plantationDate: z.string().transform((value) => new Date(value).toISOString()),
    surfaceAreaRequired: z
      .number()
      .min(0)
      .max(
        availableSurfaceArea,
        `There is only space for ${availableSurfaceArea}m² of surface area`,
      ),
    idealHumidityLevel: z.number().min(0).max(100),
    gardenId: z.number(),
  });

/** Parses the plant data from the form data. */
const getPlantData = (formData: FormData): CreatePlantInput => {
  return {
    plantName: formData.get('plantName') as string,
    species: formData.get('species') as string,
    plantType: formData.get('plantType') as PlantType,
    plantationDate: new Date(formData.get('plantationDate') as string).toISOString(),
    surfaceAreaRequired: Number(formData.get('surfaceAreaRequired')),
    idealHumidityLevel: Number(formData.get('idealHumidityLevel')),
    gardenId: Number(formData.get('gardenId')),
  };
};

/**
 * **Creates a new plant based on the provided form data.**
 * @param formData - The form data containing the new plant details.
 * @returns A promise that resolves when the plant is created.
 */
export async function createPlant(_prevState: unknown, formData: FormData) {
  const data = getPlantData(formData);
  const availableSurfaceArea = Number(formData.get('availableSurfaceArea'));

  const schema = plantValidationSchema(availableSurfaceArea);
  const validatedFields = schema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const response = await fetch('http://localhost:3000/plants', {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    revalidatePath('/plants');
    revalidatePath(`/gardens/${data.gardenId}`);
    return {
      success: true,
      error: null,
    };
  }

  return {
    success: false,
    error: 'Failed to create plant, please try again',
  };
}

/**
 * **Updates a new plant based on the provided form data.**
 * @param formData - The form data containing the updated plant details.
 * @returns A promise that resolves when the plant is updated.
 */
export async function updatePlant(_prevState: unknown, formData: FormData) {
  const plantId = formData.get('plantId');
  const availableSurfaceArea = Number(formData.get('availableSurfaceArea'));
  const data = getPlantData(formData);

  const schema = plantValidationSchema(availableSurfaceArea);
  const validatedFields = schema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const response = await fetch(`http://localhost:3000/plants/${plantId}`, {
    method: 'PUT',
    body: JSON.stringify(validatedFields.data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    revalidatePath('/plants');
    revalidatePath(`/gardens/${data.gardenId}`);
    return {
      success: true,
      error: null,
    };
  }

  return {
    success: false,
    error: 'Failed to update garden, please try again',
  };
}

/**
 * **Deletes a plant based on the provided form data.**
 * @param formData - The form data containing the plant ID.
 * @returns A promise that resolves when the plant is deleted.
 */
export async function deletePlant(_prevState: unknown, formData: FormData) {
  const gardenId = formData.get('gardenId');
  const plantId = formData.get('plantId');

  const response = await fetch(`http://localhost:3000/plants/${plantId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    revalidatePath('/plants');
    revalidatePath(`/gardens/${gardenId}`);
  }
}
