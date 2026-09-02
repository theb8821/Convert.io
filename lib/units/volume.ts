import { UnitCategoryDefinition } from './types';

export const volume: UnitCategoryDefinition = {
  id: 'Volume',
  name: 'Volume',
  baseUnit: 'l',
  units: {
    l: { id: 'l', name: 'Liters', symbol: 'L', multiplier: 1 },
    ml: { id: 'ml', name: 'Milliliters', symbol: 'mL', multiplier: 0.001 },
    cum: { id: 'cum', name: 'Cubic Meters', symbol: 'm³', multiplier: 1000 },
    gal: { id: 'gal', name: 'Gallons (US)', symbol: 'gal', multiplier: 3.78541178 },
    qt: { id: 'qt', name: 'Quarts (US)', symbol: 'qt', multiplier: 0.946352946 },
    pt: { id: 'pt', name: 'Pints (US)', symbol: 'pt', multiplier: 0.473176473 },
    cup: { id: 'cup', name: 'Cups (US)', symbol: 'cup', multiplier: 0.24 },
    floz: { id: 'floz', name: 'Fluid Ounces (US)', symbol: 'fl oz', multiplier: 0.0295735296 },
  },
};
