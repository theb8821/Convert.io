import { UnitCategoryDefinition } from './types';

export const temperature: UnitCategoryDefinition = {
  id: 'Temperature',
  name: 'Temperature',
  baseUnit: 'c', // Celsius is base
  units: {
    c: {
      id: 'c',
      name: 'Celsius',
      symbol: '°C',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    f: {
      id: 'f',
      name: 'Fahrenheit',
      symbol: '°F',
      toBase: (val) => (val - 32) * (5 / 9),
      fromBase: (val) => val * (9 / 5) + 32,
    },
    k: {
      id: 'k',
      name: 'Kelvin',
      symbol: 'K',
      toBase: (val) => val - 273.15,
      fromBase: (val) => val + 273.15,
    },
  },
};
