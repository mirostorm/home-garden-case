import { render, screen } from '@testing-library/react';
import GardenInfo from './GardenInfo';

describe('GardenInfo component', () => {
  const baseProps = {
    gardenName: 'My Garden',
    locationDescription: 'Backyard',
    totalSurfaceArea: 100,
    targetHumidityLevel: 70,
    latitude: 12.123456789,
    longitude: -1.987654321,
    createdAt: new Date().toISOString(),
  } as any;

  it('renders available surface percentage and counts', () => {
    render(<GardenInfo {...baseProps} occupiedSurfaceArea={25} />);

    // available = 75 / 100 => 75%
    expect(screen.getByText(/75\s*%/i)).toBeTruthy();
    expect(screen.getByText(/\(\s*75\s*\/\s*100\s*m²\s*\)/i)).toBeTruthy();
  });

  it('shows Unknown when average required humidity is not provided', () => {
    render(
      <GardenInfo {...baseProps} occupiedSurfaceArea={0} averageRequiredHumidity={undefined} />,
    );

    expect(screen.getByText(/Unknown/i)).toBeTruthy();
  });

  it('shows humidity comparison message and correct difference when provided', () => {
    render(<GardenInfo {...baseProps} occupiedSurfaceArea={0} averageRequiredHumidity={60} />);

    // target 70 vs average 60 -> too humid by 10%
    const msg = screen.getByText(/Your garden is approximately/i);
    expect(msg).toBeTruthy();
    expect(msg.textContent).toMatch(/10\s*%/);
    expect(msg.textContent).toMatch(/too humid|too dry/i);
  });
});
