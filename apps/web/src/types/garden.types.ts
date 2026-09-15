export interface Garden {
  gardenName: string;
  totalSurfaceArea: number;
  locationDescription?: string;
  latitude?: number;
  longitude?: number;
  gardenId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateGardenInput = Omit<Garden, 'gardenId' | 'createdAt' | 'updatedAt'>;
