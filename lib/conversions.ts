import { length } from './units/length';
import { weight } from './units/weight';
import { temperature } from './units/temperature';
import { area } from './units/area';
import { volume } from './units/volume';
import { currency } from './units/currency';
import { UnitCategory, UnitCategoryDefinition } from './units/types';

export const categories: Record<UnitCategory, UnitCategoryDefinition> = {
  Length: length,
  Weight: weight,
  Temperature: temperature,
  Area: area,
  Volume: volume,
  Currency: currency,
};

export const categoryList = Object.values(categories);

export function convert(value: number, fromId: string, toId: string, categoryId: UnitCategory): number {
  const category = categories[categoryId];
  if (!category) return value;

  const fromUnit = category.units[fromId];
  const toUnit = category.units[toId];

  if (!fromUnit || !toUnit) return value;
  if (fromId === toId) return value;

  let baseValue = value;

  // Convert to base
  if (fromUnit.toBase) {
    baseValue = fromUnit.toBase(value);
  } else if (fromUnit.multiplier !== undefined) {
    baseValue = value * fromUnit.multiplier;
  }

  // Convert from base to target
  let targetValue = baseValue;
  if (toUnit.fromBase) {
    targetValue = toUnit.fromBase(baseValue);
  } else if (toUnit.multiplier !== undefined) {
    targetValue = baseValue / toUnit.multiplier;
  }

  // Handle slight floating point errors
  return Number(targetValue.toPrecision(15));
}
