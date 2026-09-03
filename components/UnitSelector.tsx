"use client";

import { useState, useRef, useEffect, useCallback, useMemo, KeyboardEvent } from "react";
import { UnitDefinition } from "@/lib/units/types";
import { ChevronDown, Search } from "lucide-react";

interface UnitSelectorProps {
  selectedUnit: string;
  onUnitChange: (unitId: string) => void;
  units: UnitDefinition[];
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export function UnitSelector({ selectedUnit, onUnitChange, units }: UnitSelectorProps) {
  const [open, setOpen] = useState(false);
  // Store query AND activeIndex together so they update atomically — no effect needed to sync them
  const [search, setSearch] = useState({ query: "", activeIndex: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedDef = units.find((u) => u.id === selectedUnit);

  const filtered = useMemo(() => {
    if (!search.query) return units;
    const q = search.query.toLowerCase();
    return units.filter(
      (u) => u.name.toLowerCase().includes(q) || u.symbol.toLowerCase().includes(q)
    );
  }, [units, search.query]);

  const handleQueryChange = (q: string) => {
    // Reset activeIndex to 0 whenever query changes — no effect needed
    setSearch({ query: q, activeIndex: 0 });
  };

  const setActiveIndex = (idx: number) => {
    setSearch((s) => ({ ...s, activeIndex: idx }));
  };

  // Auto-focus search when dropdown opens
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 10);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.querySelector<HTMLLIElement>(
      `[data-index="${search.activeIndex}"]`
    );
    item?.scrollIntoView({ block: "nearest" });
  }, [search.activeIndex]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setSearch({ query: "", activeIndex: 0 });
  }, []);

  const selectUnit = useCallback(
    (id: string) => {
      onUnitChange(id);
      close();
    },
    [onUnitChange, close]
  );

  const handleTriggerClick = () => {
    if (open) {
      close();
    } else {
      setOpen(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { activeIndex } = search;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(Math.min(activeIndex + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) selectUnit(filtered[activeIndex].id);
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full sm:w-52">
      {/* Trigger button — shows current selection, unchanged visually */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select unit"
        className="w-full flex items-center justify-between gap-2 px-3 h-14 rounded-2xl bg-content3/50 hover:bg-content3 shadow-sm transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <span className="text-md font-medium truncate">{selectedDef?.name ?? "Select"}</span>
          <span className="text-default-400 text-xs shrink-0">({selectedDef?.symbol})</span>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 text-default-500 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[220px] rounded-2xl bg-content1 border border-divider/20 shadow-xl overflow-hidden">
          {/* Pinned search box — always visible at the top */}
          <div className="p-2 border-b border-divider/10 bg-content1 sticky top-0">
            <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-content2/60 border border-divider/10 focus-within:border-primary/40 transition-colors">
              <Search size={14} className="shrink-0 text-default-400" />
              <input
                ref={searchRef}
                type="text"
                value={search.query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search units..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-default-400"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Scrollable unit list */}
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Units"
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-default-400 text-center">No results</li>
            ) : (
              filtered.map((unit, idx) => {
                const isActive = idx === search.activeIndex;
                const isSelected = unit.id === selectedUnit;
                return (
                  <li
                    key={unit.id}
                    data-index={idx}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectUnit(unit.id)}
                    className={[
                      "flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-content2/60",
                      isSelected && !isActive ? "text-primary/80 font-medium" : "",
                    ].join(" ")}
                  >
                    <span>{highlight(unit.name, search.query)}</span>
                    <span
                      className={`text-xs ml-2 shrink-0 ${isActive ? "text-primary/70" : "text-default-400"}`}
                    >
                      {highlight(unit.symbol, search.query)}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
