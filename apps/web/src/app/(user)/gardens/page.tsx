import { CreateGardenForm, GardensTable } from '@/components/@gardens';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Home Garden - Your Gardens',
  description: 'View your gardens and add new ones',
};

const getGardens = async () => {
  const response = await fetch('http://localhost:3000/gardens');
  if (!response.ok) {
    console.error('Failed to fetch gardens');
    return [];
  }
  const data = await response.json();
  return data;
};

const GardensPage = async () => {
  const gardensData = getGardens();
  const gardens = await gardensData;

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="flex items-center justify-end mb-6">
        <CreateGardenForm />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <GardensTable gardens={gardens} />
      </Suspense>
    </div>
  );
};

export default GardensPage;
