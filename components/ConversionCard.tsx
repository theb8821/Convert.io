"use client";

import {useState, useMemo, useCallback} from "react";
import {CategorySelector} from "./CategorySelector";
import {UnitInput} from "./UnitInput";
import {UnitCategory} from "@/lib/units/types";
import {categories, convert} from "@/lib/conversions";
import {Button} from "@nextui-org/react";
import {ArrowDownUp} from "lucide-react";

function formatResult(value: number): string {
  let formatted = value.toString();
  if (formatted.includes('.')) {
    formatted = parseFloat(value.toFixed(6)).toString();
  }
  return formatted;
}

export function ConversionCard() {
  const [activeCategory, setActiveCategory] = useState<UnitCategory>('Length');
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('km');
  const [fromValue, setFromValue] = useState<string>("1");
  const [lastEdited, setLastEdited] = useState<'from' | 'to'>('from');

  const categoryData = categories[activeCategory];
  const unitList = useMemo(() => Object.values(categoryData.units), [categoryData]);

  // Derive toValue from fromValue (or vice versa) — no effects needed
  const toValue = useMemo(() => {
    if (lastEdited === 'to') return undefined; // signal to use stored value
    if (fromValue === "" || fromValue === "-") return "";
    const numValue = parseFloat(fromValue);
    if (isNaN(numValue)) return "";
    return formatResult(convert(numValue, fromUnitId, toUnitId, activeCategory));
  }, [fromValue, fromUnitId, toUnitId, activeCategory, lastEdited]);

  const [storedToValue, setStoredToValue] = useState<string>("");

  const derivedFromValue = useMemo(() => {
    if (lastEdited === 'from') return undefined;
    if (storedToValue === "" || storedToValue === "-") return "";
    const numValue = parseFloat(storedToValue);
    if (isNaN(numValue)) return "";
    return formatResult(convert(numValue, toUnitId, fromUnitId, activeCategory));
  }, [storedToValue, fromUnitId, toUnitId, activeCategory, lastEdited]);

  const displayFromValue = lastEdited === 'from' ? fromValue : (derivedFromValue ?? fromValue);
  const displayToValue = lastEdited === 'to' ? storedToValue : (toValue ?? storedToValue);

  const handleCategoryChange = useCallback((category: UnitCategory) => {
    const units = Object.values(categories[category].units);
    setActiveCategory(category);
    setFromUnitId(units[0].id);
    setToUnitId(units[1]?.id || units[0].id);
    setFromValue("1");
    setStoredToValue("");
    setLastEdited('from');
  }, []);

  const handleFromValueChange = useCallback((val: string) => {
    setFromValue(val);
    setLastEdited('from');
  }, []);

  const handleToValueChange = useCallback((val: string) => {
    setStoredToValue(val);
    setLastEdited('to');
  }, []);

  const handleSwap = useCallback(() => {
    const currentTo = displayToValue;
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
    setFromValue(currentTo);
    setLastEdited('from');
  }, [toUnitId, fromUnitId, displayToValue]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      <CategorySelector 
        selectedCategory={activeCategory} 
        onSelectionChange={handleCategoryChange} 
      />
      
      <div className="bg-content1 rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-divider/10 relative">
        <div className="flex flex-col gap-4 relative">
          <UnitInput
            label="From"
            value={displayFromValue}
            onValueChange={handleFromValueChange}
            selectedUnit={fromUnitId}
            onUnitChange={setFromUnitId}
            units={unitList}
          />
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              isIconOnly
              radius="full"
              size="lg"
              className="bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
              onClick={handleSwap}
              aria-label="Swap units"
            >
              <ArrowDownUp size={20} />
            </Button>
          </div>
          
          <UnitInput
            label="To"
            value={displayToValue}
            onValueChange={handleToValueChange}
            selectedUnit={toUnitId}
            onUnitChange={setToUnitId}
            units={unitList}
          />
        </div>
      </div>
    </div>
  );
}
