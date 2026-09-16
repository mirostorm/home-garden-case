export enum PlantType {
  Vegetable = 'vegetable',
  Fruit = 'fruit',
  Flower = 'flower',
}

export interface Plant {
  plantId: number;
  gardenId: number;
  plantName: string;
  plantType: PlantType;
  species: string;
  surfaceAreaRequired: number;
  idealHumidityLevel: number;
  plantationDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CreatePlantInput = Omit<Plant, 'plantId' | 'createdAt' | 'updatedAt'>;
