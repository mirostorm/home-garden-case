export const getGardens = async () => {
  const response = await fetch('http://localhost:3000/gardens');
  if (!response.ok) {
    console.error('Failed to fetch gardens');
    return [];
  }
  const data = await response.json();
  return data;
};

export const getGarden = async (gardenId: number) => {
  const response = await fetch(`http://localhost:3000/gardens/${gardenId}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.error('Failed to fetch garden');
    return [];
  }

  const data = await response.json();
  return data;
};

export const getGardenPlants = async (gardenId: number) => {
  const response = await fetch(`http://localhost:3000/plants/garden/${gardenId}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.error('Failed to fetch plants in garden');
    return [];
  }

  const data = await response.json();
  return data;
};
