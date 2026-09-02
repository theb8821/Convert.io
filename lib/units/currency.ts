import { UnitCategoryDefinition } from './types';

export const currency: UnitCategoryDefinition = {
  id: 'Currency',
  name: 'Currency',
  baseUnit: 'usd',
  units: {
    usd: { id: 'usd', name: 'US Dollar', symbol: '$', multiplier: 1 },
    eur: { id: 'eur', name: 'Euro', symbol: '€', multiplier: 1.09 },
    gbp: { id: 'gbp', name: 'British Pound', symbol: '£', multiplier: 1.27 },
    jpy: { id: 'jpy', name: 'Japanese Yen', symbol: '¥', multiplier: 0.0067 },
    aud: { id: 'aud', name: 'Australian Dollar', symbol: 'A$', multiplier: 0.65 },
    cad: { id: 'cad', name: 'Canadian Dollar', symbol: 'C$', multiplier: 0.74 },
    chf: { id: 'chf', name: 'Swiss Franc', symbol: 'CHF', multiplier: 1.13 },
    cny: { id: 'cny', name: 'Chinese Yuan', symbol: '¥', multiplier: 0.14 },
    inr: { id: 'inr', name: 'Indian Rupee', symbol: '₹', multiplier: 0.012 },
  },
};
