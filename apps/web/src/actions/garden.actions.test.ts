import { revalidatePath } from 'next/cache';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createGarden, deleteGarden, updateGarden } from './garden.actions';

const API_BASE_URL = process.env.API_BASE_URL;

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => {
    throw new Error('redirect called');
  }),
}));

describe('garden actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('creates a garden when all properties are filled out correctly', async () => {
    const formData = new FormData();
    formData.set('gardenName', 'The Backyard');
    formData.set('totalSurfaceArea', '120');
    formData.set('locationDescription', 'The backyard of my home');
    formData.set('latitude', '51.5');
    formData.set('longitude', '4.7');
    formData.set('targetHumidityLevel', '65');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(createGarden({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/gardens`, {
      method: 'POST',
      body: JSON.stringify({
        gardenName: 'The Backyard',
        totalSurfaceArea: 120,
        locationDescription: 'The backyard of my home',
        latitude: 51.5,
        longitude: 4.7,
        targetHumidityLevel: 65,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(revalidatePath).toHaveBeenCalledWith('/gardens');
  });

  it('creates a garden with only the required properties filled out', async () => {
    const formData = new FormData();
    formData.set('gardenName', 'Minimal Garden');
    formData.set('totalSurfaceArea', '40');
    formData.set('latitude', '10');
    formData.set('longitude', '20');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(createGarden({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/gardens`, {
      method: 'POST',
      body: JSON.stringify({
        gardenName: 'Minimal Garden',
        totalSurfaceArea: 40,
        latitude: 10,
        longitude: 20,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('rejects a garden with no properties filled out', async () => {
    const formData = new FormData();

    const result = await createGarden({}, formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('rejects likely invalid garden inputs with a few edge cases', async () => {
    const invalidCases = [
      { name: 'negative surface area', data: { gardenName: 'Bad', totalSurfaceArea: '-1' } },
      {
        name: 'latitude out of range',
        data: { gardenName: 'Bad', totalSurfaceArea: '20', latitude: '91' },
      },
      {
        name: 'humidity out of range',
        data: { gardenName: 'Bad', totalSurfaceArea: '20', targetHumidityLevel: '101' },
      },
    ];

    for (const testCase of invalidCases) {
      const formData = new FormData();
      formData.set('gardenName', String(testCase.data.gardenName));
      formData.set('totalSurfaceArea', String(testCase.data.totalSurfaceArea));

      if ('latitude' in testCase.data) {
        formData.set('latitude', String(testCase.data.latitude));
      }
      if ('targetHumidityLevel' in testCase.data) {
        formData.set('targetHumidityLevel', String(testCase.data.targetHumidityLevel));
      }

      const result = await createGarden({}, formData);
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    }
  });

  it('updates a garden when all properties are filled out correctly', async () => {
    const formData = new FormData();
    formData.set('gardenId', '7');
    formData.set('gardenName', 'Updated Garden');
    formData.set('totalSurfaceArea', '90');
    formData.set('locationDescription', 'Front yard');
    formData.set('latitude', '12');
    formData.set('longitude', '34');
    formData.set('targetHumidityLevel', '70');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(updateGarden({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/gardens/7`, {
      method: 'PUT',
      body: JSON.stringify({
        gardenName: 'Updated Garden',
        totalSurfaceArea: 90,
        locationDescription: 'Front yard',
        latitude: 12,
        longitude: 34,
        targetHumidityLevel: 70,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(revalidatePath).toHaveBeenCalledWith('/gardens');
    expect(revalidatePath).toHaveBeenCalledWith('/gardens/7');
  });

  it('updates a garden with only the required properties filled out', async () => {
    const formData = new FormData();
    formData.set('gardenId', '8');
    formData.set('gardenName', 'Minimal Update');
    formData.set('totalSurfaceArea', '22');
    formData.set('latitude', '1');
    formData.set('longitude', '2');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    await expect(updateGarden({}, formData)).resolves.toEqual({ success: true, error: null });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/gardens/8`, {
      method: 'PUT',
      body: JSON.stringify({
        gardenName: 'Minimal Update',
        totalSurfaceArea: 22,
        latitude: 1,
        longitude: 2,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('rejects invalid garden updates with a few likely wrong values', async () => {
    const cases = [
      { gardenName: '', totalSurfaceArea: '25', latitude: '1', longitude: '2' },
      { gardenName: 'Still bad', totalSurfaceArea: '0', latitude: '1', longitude: '2' },
      { gardenName: 'Bad lat', totalSurfaceArea: '25', latitude: '100', longitude: '2' },
    ];

    for (const values of cases) {
      const formData = new FormData();
      formData.set('gardenId', '9');
      formData.set('gardenName', values.gardenName);
      formData.set('totalSurfaceArea', values.totalSurfaceArea);
      formData.set('latitude', values.latitude);
      formData.set('longitude', values.longitude);

      const result = await updateGarden({}, formData);
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    }
  });

  it('deletes a valid garden and redirects', async () => {
    const formData = new FormData();
    formData.set('gardenId', '11');

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 200 })));

    await expect(deleteGarden({}, formData)).rejects.toThrow('redirect called');
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/gardens/11`, {
      method: 'DELETE',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/gardens');
    expect(revalidatePath).toHaveBeenCalledWith('/gardens/11');
  });

  it('tries to delete a garden with a missing id', async () => {
    const formData = new FormData();

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 200 })));

    await expect(deleteGarden({}, formData)).rejects.toThrow('redirect called');
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/gardens/null`, {
      method: 'DELETE',
    });
  });
});
