import { UnitCategoryDefinition } from './types';

export const area: UnitCategoryDefinition = {
  id: 'Area',
  name: 'Area',
  baseUnit: 'sqm',
  units: {
    sqm: { id: 'sqm', name: 'Square Meters', symbol: 'm²', multiplier: 1 },
    sqkm: { id: 'sqkm', name: 'Square Kilometers', symbol: 'km²', multiplier: 1000000 },
    sqcm: { id: 'sqcm', name: 'Square Centimeters', symbol: 'cm²', multiplier: 0.0001 },
    sqmi: { id: 'sqmi', name: 'Square Miles', symbol: 'mi²', multiplier: 2589988.11 },
    sqyd: { id: 'sqyd', name: 'Square Yards', symbol: 'yd²', multiplier: 0.83612736 },
    sqft: { id: 'sqft', name: 'Square Feet', symbol: 'ft²', multiplier: 0.09290304 },
    sqin: { id: 'sqin', name: 'Square Inches', symbol: 'in²', multiplier: 0.00064516 },
    ha: { id: 'ha', name: 'Hectares', symbol: 'ha', multiplier: 10000 },
    ac: { id: 'ac', name: 'Acres', symbol: 'ac', multiplier: 4046.85642 },
  },
};
