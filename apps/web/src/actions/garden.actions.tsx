'use server';

import { CreateGardenInput } from '@/types/garden.types';
import { revalidatePath } from 'next/cache';

/**
 * **Creates a new garden based on the provided form data.**
 * @param formData - The form data containing the new garden details.
 * @returns A promise that resolves when the garden is created.
 */
export async function createGarden(_prevState: unknown, formData: FormData) {
  const data: CreateGardenInput = {
    gardenName: formData.get('gardenName') as string,
    totalSurfaceArea: Number(formData.get('totalSurfaceArea')),
    locationDescription: (formData.get('locationDescription') as string) || undefined,
    latitude: formData.get('latitude') ? Number(formData.get('latitude')) : undefined,
    longitude: formData.get('longitude') ? Number(formData.get('longitude')) : undefined,
  };

  const response = await fetch('http://localhost:3000/gardens', {
    method: 'POST',
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
export async function deleteGarden(_prevState: unknown, formData: FormData) {
  const gardenId = formData.get('gardenId');

  console.log({ gardenId });

  const response = await fetch(`http://localhost:3000/gardens/${gardenId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    revalidatePath('/gardens');
    revalidatePath(`/gardens/${gardenId}`);
    return true;
  }
  return false;
}

/**
 * **Updates a new garden based on the provided form data.**
 * @param formData - The form data containing the updated garden details.
 * @returns A promise that resolves when the garden is updated.
 */
export async function updateGarden(prevState: unknown, formData: FormData) {
  const gardenId = formData.get('gardenId');
  const data: CreateGardenInput = {
    gardenName: formData.get('gardenName') as string,
    totalSurfaceArea: Number(formData.get('totalSurfaceArea')),
    locationDescription: (formData.get('locationDescription') as string) || undefined,
    latitude: formData.get('latitude') ? Number(formData.get('latitude')) : undefined,
    longitude: formData.get('longitude') ? Number(formData.get('longitude')) : undefined,
  };

  const response = await fetch(`http://localhost:3000/gardens/${gardenId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    revalidatePath('/gardens');
    revalidatePath(`/gardens/${gardenId}`);
    return true;
  }
  return false;
}
