import { describe, it, expect } from 'vitest';
import { convert, categories, categoryList } from '@/lib/conversions';
import { UnitCategory } from '@/lib/units/types';

describe('conversions', () => {
  describe('categories registry', () => {
    it('should have all six categories registered', () => {
      const expectedCategories: UnitCategory[] = [
        'Length', 'Weight', 'Temperature', 'Area', 'Volume', 'Currency',
      ];
      expectedCategories.forEach((cat) => {
        expect(categories[cat]).toBeDefined();
      });
    });

    it('categoryList should match the number of categories', () => {
      expect(categoryList).toHaveLength(Object.keys(categories).length);
    });

    it('each category should have a valid baseUnit that exists in its units', () => {
      categoryList.forEach((cat) => {
        expect(cat.units[cat.baseUnit]).toBeDefined();
      });
    });
  });

  describe('convert() — identity', () => {
    it('should return the same value when converting a unit to itself', () => {
      expect(convert(42, 'm', 'm', 'Length')).toBe(42);
      expect(convert(100, 'kg', 'kg', 'Weight')).toBe(100);
      expect(convert(37, 'c', 'c', 'Temperature')).toBe(37);
    });
  });

  describe('convert() — Length', () => {
    it('should convert meters to kilometers', () => {
      expect(convert(1000, 'm', 'km', 'Length')).toBeCloseTo(1);
    });

    it('should convert kilometers to meters', () => {
      expect(convert(1, 'km', 'm', 'Length')).toBeCloseTo(1000);
    });

    it('should convert miles to feet', () => {
      expect(convert(1, 'mi', 'ft', 'Length')).toBeCloseTo(5280);
    });

    it('should convert inches to centimeters', () => {
      expect(convert(1, 'in', 'cm', 'Length')).toBeCloseTo(2.54);
    });

    it('should handle zero', () => {
      expect(convert(0, 'km', 'mi', 'Length')).toBe(0);
    });
  });

  describe('convert() — Weight', () => {
    it('should convert kilograms to pounds', () => {
      expect(convert(1, 'kg', 'lb', 'Weight')).toBeCloseTo(2.20462, 3);
    });

    it('should convert pounds to ounces', () => {
      expect(convert(1, 'lb', 'oz', 'Weight')).toBeCloseTo(16, 0);
    });

    it('should convert grams to milligrams', () => {
      expect(convert(1, 'g', 'mg', 'Weight')).toBeCloseTo(1000);
    });
  });

  describe('convert() — Temperature', () => {
    it('should convert 0°C to 32°F', () => {
      expect(convert(0, 'c', 'f', 'Temperature')).toBeCloseTo(32);
    });

    it('should convert 100°C to 212°F', () => {
      expect(convert(100, 'c', 'f', 'Temperature')).toBeCloseTo(212);
    });

    it('should convert 32°F to 0°C', () => {
      expect(convert(32, 'f', 'c', 'Temperature')).toBeCloseTo(0);
    });

    it('should convert 0°C to 273.15K', () => {
      expect(convert(0, 'c', 'k', 'Temperature')).toBeCloseTo(273.15);
    });

    it('should convert 0K to -273.15°C', () => {
      expect(convert(0, 'k', 'c', 'Temperature')).toBeCloseTo(-273.15);
    });

    it('should convert Fahrenheit to Kelvin (compound)', () => {
      // 212°F → 100°C → 373.15K
      expect(convert(212, 'f', 'k', 'Temperature')).toBeCloseTo(373.15);
    });
  });

  describe('convert() — Area', () => {
    it('should convert square meters to square feet', () => {
      expect(convert(1, 'sqm', 'sqft', 'Area')).toBeCloseTo(10.7639, 2);
    });

    it('should convert hectares to acres', () => {
      expect(convert(1, 'ha', 'ac', 'Area')).toBeCloseTo(2.47105, 2);
    });
  });

  describe('convert() — Volume', () => {
    it('should convert liters to milliliters', () => {
      expect(convert(1, 'l', 'ml', 'Volume')).toBeCloseTo(1000);
    });

    it('should convert gallons to liters', () => {
      expect(convert(1, 'gal', 'l', 'Volume')).toBeCloseTo(3.78541, 3);
    });
  });

  describe('convert() — Currency (mocked)', () => {
    it('should convert USD to EUR', () => {
      // 1 USD × 1 (to base) / 1.09 (from base)
      expect(convert(1, 'usd', 'eur', 'Currency')).toBeCloseTo(1 / 1.09, 4);
    });

    it('should be roughly reversible', () => {
      const forward = convert(100, 'usd', 'gbp', 'Currency');
      const back = convert(forward, 'gbp', 'usd', 'Currency');
      expect(back).toBeCloseTo(100, 4);
    });
  });

  describe('convert() — edge cases', () => {
    it('should return the input if category is invalid', () => {
      expect(convert(5, 'm', 'km', 'InvalidCategory' as UnitCategory)).toBe(5);
    });

    it('should return the input if fromUnit is invalid', () => {
      expect(convert(5, 'nonexistent', 'km', 'Length')).toBe(5);
    });

    it('should return the input if toUnit is invalid', () => {
      expect(convert(5, 'm', 'nonexistent', 'Length')).toBe(5);
    });

    it('should handle negative values', () => {
      expect(convert(-40, 'c', 'f', 'Temperature')).toBeCloseTo(-40);
    });

    it('should handle very large values', () => {
      const result = convert(1e12, 'mm', 'km', 'Length');
      expect(result).toBeCloseTo(1e6);
    });

    it('should handle very small values', () => {
      const result = convert(0.001, 'km', 'm', 'Length');
      expect(result).toBeCloseTo(1);
    });
  });
});
