import { describe, it, expect } from 'vitest';
import { length } from '@/lib/units/length';
import { weight } from '@/lib/units/weight';
import { temperature } from '@/lib/units/temperature';
import { area } from '@/lib/units/area';
import { volume } from '@/lib/units/volume';
import { currency } from '@/lib/units/currency';
import { UnitCategoryDefinition } from '@/lib/units/types';

const allCategories: UnitCategoryDefinition[] = [
  length, weight, temperature, area, volume, currency,
];

describe('Unit Definitions', () => {
  allCategories.forEach((category) => {
    describe(`${category.name}`, () => {
      it('should have an id matching its name', () => {
        expect(category.id).toBe(category.name);
      });

      it('should have a baseUnit that exists in its units map', () => {
        expect(category.units[category.baseUnit]).toBeDefined();
      });

      it('every unit should have a non-empty id, name, and symbol', () => {
        Object.values(category.units).forEach((unit) => {
          expect(unit.id).toBeTruthy();
          expect(unit.name).toBeTruthy();
          expect(unit.symbol).toBeTruthy();
        });
      });

      it('every unit should have either a multiplier or toBase/fromBase functions', () => {
        Object.values(category.units).forEach((unit) => {
          const hasMultiplier = unit.multiplier !== undefined;
          const hasCustomFns = typeof unit.toBase === 'function' && typeof unit.fromBase === 'function';
          expect(hasMultiplier || hasCustomFns).toBe(true);
        });
      });

      it('unit keys should match their id field', () => {
        Object.entries(category.units).forEach(([key, unit]) => {
          expect(key).toBe(unit.id);
        });
      });
    });
  });

  describe('Temperature special handling', () => {
    it('all temperature units should use toBase/fromBase (not multiplier)', () => {
      Object.values(temperature.units).forEach((unit) => {
        expect(unit.toBase).toBeTypeOf('function');
        expect(unit.fromBase).toBeTypeOf('function');
      });
    });
  });

  describe('Linear units should have positive multipliers', () => {
    [length, weight, area, volume, currency].forEach((category) => {
      it(`${category.name} multipliers should all be > 0`, () => {
        Object.values(category.units).forEach((unit) => {
          if (unit.multiplier !== undefined) {
            expect(unit.multiplier).toBeGreaterThan(0);
          }
        });
      });
    });
  });
});
