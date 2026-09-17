import { render, screen } from '@testing-library/react';
import BasePlantForm from './BasePlantForm';

describe('BasePlantForm component', () => {
  it('renders the hidden availableSurfaceArea input and the surface area field', () => {
    const { container } = render(<BasePlantForm gardenId={1} availableSurfaceArea={5} />);

    const hidden = container.querySelector(
      'input[name="availableSurfaceArea"]',
    ) as HTMLInputElement;
    expect(hidden).toBeTruthy();
    expect(hidden.value).toBe('5');

    const surfaceField = screen.getByLabelText(/Required surface area/i) as HTMLInputElement;
    expect(surfaceField).toBeTruthy();
  });

  it('displays field-level errors when provided via props', () => {
    render(
      <BasePlantForm
        gardenId={1}
        availableSurfaceArea={5}
        errors={{ surfaceAreaRequired: { errors: ['There is only space for 5m²'] } }}
      />,
    );

    expect(screen.getByText(/There is only space for 5/)).toBeTruthy();
  });
});
