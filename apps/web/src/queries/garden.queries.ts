import { cache } from 'react';

const API_BASE_URL = process.env.API_BASE_URL;

export const getGardens = cache(async () => {
  const response = await fetch(`${API_BASE_URL}/gardens`, { cache: 'force-cache' });
  if (!response.ok) {
    console.error('Failed to fetch gardens');
    return [];
  }
  const data = await response.json();
  return data;
});

export const getGarden = cache(async (gardenId: number) => {
  const response = await fetch(`${API_BASE_URL}/gardens/${gardenId}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.error('Failed to fetch garden');
    return [];
  }

  const data = await response.json();
  return data;
});

export const getGardenPlants = cache(async (gardenId: number) => {
  const response = await fetch(`${API_BASE_URL}/plants/garden/${gardenId}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.error('Failed to fetch plants in garden');
    return [];
  }

  const data = await response.json();
  return data;
});
