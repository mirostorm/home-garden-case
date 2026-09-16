import { GardenDetail } from '@/components/@gardens';
import { getGarden, getGardenPlants } from '@/queries/garden.queries';
import { Garden } from '@/types/garden.types';

export async function generateStaticParams() {
  const response = await fetch('http://localhost:3000/gardens', { cache: 'force-cache' });
  const gardens = await response.json();

  return gardens.map((garden: Garden) => ({
    slug: garden.gardenId.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const garden = await getGarden(Number(slug));
  const plants = await getGardenPlants(Number(slug));

  return <GardenDetail {...garden} plants={plants} />;
}
