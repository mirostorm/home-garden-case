'use server';

import { CreateGardenInput } from '@/types/garden.types';
import { revalidatePath } from 'next/cache';

/**
 * **Creates a new garden based on the provided form data.**
 * @param formData - The form data containing the new garden details.
 * @returns A promise that resolves when the garden is created.
 */
export async function createGarden(prevState: unknown, formData: FormData) {
  const data: CreateGardenInput = {
    gardenName: formData.get('gardenName') as string,
    totalSurfaceArea: Number(formData.get('totalSurfaceArea')),
    locationDescription: (formData.get('locationDescription') as string) || undefined,
    latitude: formData.get('latitude') ? Number(formData.get('latitude')) : undefined,
    longitude: formData.get('longitude') ? Number(formData.get('longitude')) : undefined,
  };

  const response = await fetch('http://localhost:3000/gardens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    revalidatePath('/gardens');
    return true;
  }
  return false;
}

/**
 * **Deletes a garden based on the provided form data.**
 * @param formData - The form data containing the garden ID.
 * @returns A promise that resolves when the garden is deleted.
 */
export async function deleteGarden(formData: FormData) {
  const id = formData.get('gardenId');

  // @TODO: Delete garden from database
  // @TODO: Update data
  // @TODO: Revalidate cache
}
