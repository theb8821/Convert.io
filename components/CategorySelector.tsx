"use client";

import {Tabs, Tab} from "@nextui-org/react";
import {categoryList} from "@/lib/conversions";
import {UnitCategory} from "@/lib/units/types";
import {Key} from "react";

interface CategorySelectorProps {
  selectedCategory: UnitCategory;
  onSelectionChange: (key: UnitCategory) => void;
}

export function CategorySelector({selectedCategory, onSelectionChange}: CategorySelectorProps) {
  return (
    <div className="flex w-full justify-center overflow-x-auto pb-4 pt-2">
      <Tabs
        aria-label="Unit Categories"
        selectedKey={selectedCategory}
        onSelectionChange={(k: Key) => onSelectionChange(k as UnitCategory)}
        radius="full"
        size="lg"
        variant="light"
        classNames={{
          tabList: "gap-2 relative rounded-full border border-divider/10 bg-content2/50 backdrop-blur-md shadow-sm",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-4 h-10",
          tabContent: "group-data-[selected=true]:text-primary-foreground font-medium"
        }}
      >
        {categoryList.map((category) => (
          <Tab key={category.id} title={category.name} />
        ))}
      </Tabs>
    </div>
  );
}
