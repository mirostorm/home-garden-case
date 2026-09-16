import { GardenDetail } from '@/components/@gardens';
import { Garden } from '@/types/garden.types';

const getGarden = async (gardenId: number) => {
  const response = await fetch(`http://localhost:3000/gardens/${gardenId}`);
  if (!response.ok) {
    console.error('Failed to fetch garden');
    return [];
  }
  const data = await response.json();
  return data;
};

export async function generateStaticParams() {
  const response = await fetch('http://localhost:3000/gardens');
  const gardens = await response.json();

  return gardens.map((garden: Garden) => ({
    slug: garden.gardenId.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const garden = await getGarden(Number(slug));

  return <GardenDetail {...garden} />;
}
