"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

export interface DropdownItem {
  id: string | number;
  name?: string;
  value?: string;
  title?: string;
  avatar?: string;
}

interface DropdownProps {
  placeholder?: string;
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  initialSelectedId?: string | number;
}

export default function Dropdown({
  items,
  placeholder,
  onSelect,
  initialSelectedId,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem>(
    items.find((i) => i.id === initialSelectedId) || items[0]
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="relative  mt-4" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 transition cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          {selected.avatar && (
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image
                src={selected.avatar}
                alt={`${selected.name} avatar`}
                fill
                className="object-cover"
              />
            </div>
          )}
          {placeholder && <p className="text-sm text-[#7E7E7E]">{placeholder}</p>}
          <div className="text-left">
            <p className="text-sm font-medium">
              {selected.name || selected.value}
            </p>
            <p className="text-xs text-gray-500">{selected.title}</p>
          </div>
        </div>
        <div
          className={clsx(
            "w-4 h-4 relative transition-transform",
            open && "rotate-180"
          )}
        >
          <Image
            src="/icons/chevron-down.svg"
            alt="arrow-down"
            fill
            className="object-contain"
          />
        </div>
      </button>
      {/* DROPDOWN CARD */}
      {open && (
        <div
          role="listbox"
          className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={clsx(
                "flex items-center w-full px-3 py-2 space-x-3 hover:bg-gray-100 transition text-left cursor-pointer",
                selected.id === item.id && "bg-gray-50"
              )}
            >
              {item.avatar && (
                <div className="w-8 h-8 relative rounded-full overflow-hidden">
                  <Image
                    src={item.avatar}
                    alt={`${item.name} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{item.name || item.value}</p>
                {item.title && (
                  <p className="text-xs text-gray-500">{item.title}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
