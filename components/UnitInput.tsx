"use client";

import {Input} from "@nextui-org/react";
import {UnitDefinition} from "@/lib/units/types";
import {ChangeEvent} from "react";
import {UnitSelector} from "./UnitSelector";

interface UnitInputProps {
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  selectedUnit: string;
  onUnitChange: (unitId: string) => void;
  units: UnitDefinition[];
}

export function UnitInput({
  label,
  value,
  onValueChange,
  selectedUnit,
  onUnitChange,
  units,
}: UnitInputProps) {
  
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers, decimals, and leading minus
    const val = e.target.value;
    if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
      onValueChange(val);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded-3xl bg-content2/40 hover:bg-content2/60 transition-colors border border-divider/5">
      <div className="text-sm font-medium text-default-500 px-2">{label}</div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          type="text"
          inputMode="decimal"
          variant="flat"
          value={value}
          onChange={handleValueChange}
          className="flex-1"
          classNames={{
            inputWrapper: "bg-transparent hover:bg-transparent focus-within:!bg-transparent shadow-none border-none h-16 px-2",
            input: "text-4xl font-semibold bg-transparent data-[has-start-content=true]:ps-0",
          }}
          placeholder="0"
          aria-label={label}
        />
        <UnitSelector
          selectedUnit={selectedUnit}
          onUnitChange={onUnitChange}
          units={units}
        />
      </div>
    </div>
  );
}
