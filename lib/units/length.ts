import { UnitCategoryDefinition } from './types';

export const length: UnitCategoryDefinition = {
  id: 'Length',
  name: 'Length',
  baseUnit: 'm',
  units: {
    m: { id: 'm', name: 'Meters', symbol: 'm', multiplier: 1 },
    km: { id: 'km', name: 'Kilometers', symbol: 'km', multiplier: 1000 },
    cm: { id: 'cm', name: 'Centimeters', symbol: 'cm', multiplier: 0.01 },
    mm: { id: 'mm', name: 'Millimeters', symbol: 'mm', multiplier: 0.001 },
    mi: { id: 'mi', name: 'Miles', symbol: 'mi', multiplier: 1609.344 },
    yd: { id: 'yd', name: 'Yards', symbol: 'yd', multiplier: 0.9144 },
    ft: { id: 'ft', name: 'Feet', symbol: 'ft', multiplier: 0.3048 },
    in: { id: 'in', name: 'Inches', symbol: 'in', multiplier: 0.0254 },
  },
};
