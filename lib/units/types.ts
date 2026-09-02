export type UnitCategory = 'Length' | 'Weight' | 'Temperature' | 'Area' | 'Volume' | 'Currency';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  // Multiplier to convert THIS unit to the BASE unit
  // e.g. if BASE is meter, and THIS is km, multiplier is 1000
  multiplier?: number;
  // Custom functions used when linear multiplier is not enough (e.g. Temperature)
  toBase?: (val: number) => number;
  fromBase?: (val: number) => number;
}

export interface UnitCategoryDefinition {
  id: UnitCategory;
  name: string;
  baseUnit: string;
  units: Record<string, UnitDefinition>;
}
