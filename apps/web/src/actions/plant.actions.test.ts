import { revalidatePath } from 'next/cache';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPlant, deletePlant, updatePlant } from './plant.actions';

const API_BASE_URL = process.env.API_BASE_URL;

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

describe('plant actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('creates a plant when all properties are filled out correctly', async () => {
    const formData = new FormData();
    formData.set('plantName', 'Tomato');
    formData.set('species', 'Solanum lycopersicum');
    formData.set('plantType', 'vegetable');
    formData.set('plantationDate', '2025-03-15');
    formData.set('surfaceAreaRequired', '12');
    formData.set('idealHumidityLevel', '65');
    formData.set('gardenId', '7');
    formData.set('availableSurfaceArea', '100');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(createPlant({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/plants`, {
      method: 'POST',
      body: JSON.stringify({
        plantName: 'Tomato',
        species: 'Solanum lycopersicum',
        plantType: 'vegetable',
        plantationDate: new Date('2025-03-15').toISOString(),
        surfaceAreaRequired: 12,
        idealHumidityLevel: 65,
        gardenId: 7,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(revalidatePath).toHaveBeenCalledWith('/plants');
    expect(revalidatePath).toHaveBeenCalledWith('/gardens/7');
  });

  it('creates a plant with only the required properties filled out', async () => {
    const formData = new FormData();
    formData.set('plantName', 'Rose');
    formData.set('species', 'Rosa');
    formData.set('plantType', 'flower');
    formData.set('plantationDate', '2025-04-01');
    formData.set('surfaceAreaRequired', '3');
    formData.set('idealHumidityLevel', '55');
    formData.set('gardenId', '8');
    formData.set('availableSurfaceArea', '50');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(createPlant({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/plants`, {
      method: 'POST',
      body: JSON.stringify({
        plantName: 'Rose',
        species: 'Rosa',
        plantType: 'flower',
        plantationDate: new Date('2025-04-01').toISOString(),
        surfaceAreaRequired: 3,
        idealHumidityLevel: 55,
        gardenId: 8,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('rejects a plant with no properties filled out', async () => {
    const formData = new FormData();

    const result = await createPlant({}, formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('rejects a plant when its required surface area exceeds the remaining garden capacity', async () => {
    const formData = new FormData();
    formData.set('plantName', 'Cucumber');
    formData.set('species', 'Cucumis sativus');
    formData.set('plantType', 'vegetable');
    formData.set('plantationDate', '2025-03-15');
    formData.set('surfaceAreaRequired', '26');
    formData.set('idealHumidityLevel', '60');
    formData.set('gardenId', '1');
    formData.set('availableSurfaceArea', '25');

    const result = await createPlant({}, formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('accepts a plant that uses the exact remaining garden surface area', async () => {
    const formData = new FormData();
    formData.set('plantName', 'Cucumber');
    formData.set('species', 'Cucumis sativus');
    formData.set('plantType', 'vegetable');
    formData.set('plantationDate', '2025-03-15');
    formData.set('surfaceAreaRequired', '25');
    formData.set('idealHumidityLevel', '60');
    formData.set('gardenId', '1');
    formData.set('availableSurfaceArea', '25');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(createPlant({}, formData)).resolves.toEqual({ success: true, error: null });
  });

  it('rejects likely invalid plant inputs with a few edge cases', async () => {
    const invalidCases = [
      {
        name: 'invalid plant type',
        data: {
          plantName: 'Bad',
          species: 'X',
          plantType: 'tree',
          plantationDate: '2025-03-15',
          surfaceAreaRequired: '2',
          idealHumidityLevel: '60',
          gardenId: '1',
          availableSurfaceArea: '50',
        },
      },
      {
        name: 'surface area too large',
        data: {
          plantName: 'Bad',
          species: 'X',
          plantType: 'vegetable',
          plantationDate: '2025-03-15',
          surfaceAreaRequired: '200',
          idealHumidityLevel: '60',
          gardenId: '1',
          availableSurfaceArea: '50',
        },
      },
      {
        name: 'humidity out of range',
        data: {
          plantName: 'Bad',
          species: 'X',
          plantType: 'vegetable',
          plantationDate: '2025-03-15',
          surfaceAreaRequired: '2',
          idealHumidityLevel: '120',
          gardenId: '1',
          availableSurfaceArea: '50',
        },
      },
    ];

    for (const testCase of invalidCases) {
      const formData = new FormData();
      Object.entries(testCase.data).forEach(([key, value]) => {
        formData.set(key, String(value));
      });

      const result = await createPlant({}, formData);
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    }
  });

  it('updates a plant when all properties are filled out correctly', async () => {
    const formData = new FormData();
    formData.set('plantId', '9');
    formData.set('plantName', 'Updated Tomato');
    formData.set('species', 'Solanum lycopersicum');
    formData.set('plantType', 'fruit');
    formData.set('plantationDate', '2025-03-20');
    formData.set('surfaceAreaRequired', '18');
    formData.set('idealHumidityLevel', '70');
    formData.set('gardenId', '7');
    formData.set('availableSurfaceArea', '100');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(updatePlant({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/plants/9`, {
      method: 'PUT',
      body: JSON.stringify({
        plantName: 'Updated Tomato',
        species: 'Solanum lycopersicum',
        plantType: 'fruit',
        plantationDate: new Date('2025-03-20').toISOString(),
        surfaceAreaRequired: 18,
        idealHumidityLevel: 70,
        gardenId: 7,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(revalidatePath).toHaveBeenCalledWith('/plants');
    expect(revalidatePath).toHaveBeenCalledWith('/gardens/7');
  });

  it('updates a plant with only the required properties filled out', async () => {
    const formData = new FormData();
    formData.set('plantId', '10');
    formData.set('plantName', 'Updated Rose');
    formData.set('species', 'Rosa');
    formData.set('plantType', 'flower');
    formData.set('plantationDate', '2025-05-01');
    formData.set('surfaceAreaRequired', '4');
    formData.set('idealHumidityLevel', '57');
    formData.set('gardenId', '8');
    formData.set('availableSurfaceArea', '100');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(updatePlant({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/plants/10`, {
      method: 'PUT',
      body: JSON.stringify({
        plantName: 'Updated Rose',
        species: 'Rosa',
        plantType: 'flower',
        plantationDate: new Date('2025-05-01').toISOString(),
        surfaceAreaRequired: 4,
        idealHumidityLevel: 57,
        gardenId: 8,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('rejects invalid plant updates with a few likely wrong values', async () => {
    const cases = [
      {
        plantName: '',
        species: 'Rosa',
        plantType: 'flower',
        plantationDate: '2025-05-01',
        surfaceAreaRequired: '4',
        idealHumidityLevel: '57',
        gardenId: '8',
        availableSurfaceArea: '100',
      },
      {
        plantName: 'Bad',
        species: 'Rosa',
        plantType: 'flower',
        plantationDate: '2025-05-01',
        surfaceAreaRequired: '999',
        idealHumidityLevel: '57',
        gardenId: '8',
        availableSurfaceArea: '50',
      },
      {
        plantName: 'Bad',
        species: 'Rosa',
        plantType: 'flower',
        plantationDate: '2025-05-01',
        surfaceAreaRequired: '4',
        idealHumidityLevel: '150',
        gardenId: '8',
        availableSurfaceArea: '100',
      },
    ];

    for (const values of cases) {
      const formData = new FormData();
      formData.set('plantId', '11');
      Object.entries(values).forEach(([key, value]) => {
        formData.set(key, String(value));
      });

      const result = await updatePlant({}, formData);
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    }
  });

  it('deletes a valid plant and revalidates the garden page', async () => {
    const formData = new FormData();
    formData.set('gardenId', '12');
    formData.set('plantId', '13');

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 200 })));

    await expect(deletePlant({}, formData)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/plants/13`, {
      method: 'DELETE',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/plants');
    expect(revalidatePath).toHaveBeenCalledWith('/gardens/12');
  });

  it('tries to delete a plant with a missing id', async () => {
    const formData = new FormData();
    formData.set('gardenId', '12');

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 200 })));

    await expect(deletePlant({}, formData)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/plants/null`, {
      method: 'DELETE',
    });
  });
});
