'use server';

import { CreateGardenInput } from '@/types/garden.types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const API_BASE_URL = process.env.API_BASE_URL;

const gardenValidationSchema = z.object({
  gardenName: z.string().min(1).max(40).trim(),
  totalSurfaceArea: z
    .number()
    .min(1, 'The total surface area must be at least 1m²')
    .max(10000, 'The total surface area must be less than 10km²'),
  locationDescription: z.string().max(100).trim().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  targetHumidityLevel: z.number().min(0).max(100).optional(),
});

/** Parses the garden data from the form data. */
const getGardenData = (formData: FormData): CreateGardenInput => {
  return {
    gardenName: formData.get('gardenName') as string,
    totalSurfaceArea: Number(formData.get('totalSurfaceArea')),
    locationDescription: (formData.get('locationDescription') as string) || undefined,
    latitude: formData.get('latitude') ? Number(formData.get('latitude')) : undefined,
    longitude: formData.get('longitude') ? Number(formData.get('longitude')) : undefined,
    targetHumidityLevel: formData.get('targetHumidityLevel')
      ? Number(formData.get('targetHumidityLevel'))
      : undefined,
  };
};

/**
 * **Creates a new garden based on the provided form data.**
 * @param formData - The form data containing the new garden details.
 * @returns A promise that resolves when the garden is created.
 */
export async function createGarden(_prevState: unknown, formData: FormData) {
  const data = getGardenData(formData);

  const validatedFields = gardenValidationSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const response = await fetch(`${API_BASE_URL}/gardens`, {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    revalidatePath('/gardens');
    return {
      success: true,
      error: null,
    };
  }

  return {
    success: false,
    error: 'Failed to create garden, please try again',
  };
}

/**
 * **Updates a new garden based on the provided form data.**
 * @param formData - The form data containing the updated garden details.
 * @returns A promise that resolves when the garden is updated.
 */
export async function updateGarden(_prevState: unknown, formData: FormData) {
  const gardenId = formData.get('gardenId');
  const data = getGardenData(formData);

  const validatedFields = gardenValidationSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const response = await fetch(`${API_BASE_URL}/gardens/${gardenId}`, {
    method: 'PUT',
    body: JSON.stringify(validatedFields.data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    revalidatePath('/gardens');
    revalidatePath(`/gardens/${gardenId}`);
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
 * **Deletes a garden based on the provided form data.**
 * @param formData - The form data containing the garden ID.
 * @returns A promise that resolves when the garden is deleted.
 */
export async function deleteGarden(_prevState: unknown, formData: FormData) {
  const gardenId = formData.get('gardenId');

  const response = await fetch(`${API_BASE_URL}/gardens/${gardenId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    revalidatePath('/gardens');
    revalidatePath(`/gardens/${gardenId}`);
    redirect(`/gardens`);
  }
}
