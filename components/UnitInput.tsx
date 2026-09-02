"use client";

import {Input, Select, SelectItem} from "@nextui-org/react";
import {UnitDefinition} from "@/lib/units/types";
import {ChangeEvent} from "react";

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
    // Only allow numbers and decimals
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
        />
        <Select
          items={units}
          selectedKeys={[selectedUnit]}
          onChange={(e) => {
            if(e.target.value) onUnitChange(e.target.value)
          }}
          aria-label="Select unit"
          variant="flat"
          className="w-full sm:w-48"
          classNames={{
            trigger: "bg-content3/50 hover:bg-content3 shadow-sm h-14 rounded-2xl",
            value: "text-md font-medium"
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex gap-2 items-center">
                <span>{item.data?.name}</span>
                <span className="text-default-400 text-xs">({item.data?.symbol})</span>
              </div>
            ));
          }}
        >
          {(unit) => (
            <SelectItem key={unit.id} textValue={unit.name}>
              <div className="flex justify-between items-center w-full">
                <span>{unit.name}</span>
                <span className="text-default-400 text-xs">{unit.symbol}</span>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
}
