import { CreateGardenForm, GardensTable } from '@/components/@gardens';
import { getGardens } from '@/queries/garden.queries';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Home Garden - Your Gardens',
  description: 'View your gardens and add new ones',
};

const GardensPage = async () => {
  const gardens = await getGardens();

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
