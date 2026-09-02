import { UnitCategoryDefinition } from './types';

export const weight: UnitCategoryDefinition = {
  id: 'Weight',
  name: 'Weight',
  baseUnit: 'kg',
  units: {
    kg: { id: 'kg', name: 'Kilograms', symbol: 'kg', multiplier: 1 },
    g: { id: 'g', name: 'Grams', symbol: 'g', multiplier: 0.001 },
    mg: { id: 'mg', name: 'Milligrams', symbol: 'mg', multiplier: 0.000001 },
    lb: { id: 'lb', name: 'Pounds', symbol: 'lb', multiplier: 0.45359237 },
    oz: { id: 'oz', name: 'Ounces', symbol: 'oz', multiplier: 0.02834952 },
  },
};
