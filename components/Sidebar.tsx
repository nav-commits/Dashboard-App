"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { sidebarLinks } from "@/lib/sidebarLinks";
import Card from "./Card";
import { projectManagers } from "@/lib/projectMangers";
export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(projectManagers[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    } 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      className={clsx(
        "h-screen p-6 flex flex-col justify-between transition-all duration-300",
        "w-25 lg:w-[306px]"
      )}
      aria-label="Sidebar"
    >
      {/* Top section */}
      <div>
        <div className="flex justify-center lg:justify-start mb-6">
          <Image
            src="/images/logo.png"
            alt="Company logo"
            width={195}
            height={39}
            className="hidden lg:block object-contain"
            priority
          />
          <Image
            src="/images/logo-2.png"
            alt="Company logo"
            width={32}
            height={32}
            className="block lg:hidden object-contain"
            priority
          />
        </div>
        {/* Navigation */}
        <nav aria-label="Main navigation" className="mt-6">
          <ul className="flex flex-col gap-3">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "flex items-center justify-between p-3 rounded text-sm font-medium transition",
                      isActive
                        ? "bg-[#5932EA] text-white"
                        : "text-gray-400 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={link.icon}
                        alt=""
                        aria-hidden
                        width={24}
                        height={24}
                        className={clsx(
                          "object-contain",
                          isActive && "filter brightness-0 invert"
                        )}
                      />
                      <span className="hidden lg:inline">{link.name}</span>
                    </div>
                    {link.hasArrow && (
                      <Image
                        src="/icons/chevron-right.svg"
                        alt=""
                        aria-hidden
                        width={16}
                        height={16}
                        className={clsx(
                          "hidden lg:block object-contain",
                          isActive && "filter brightness-0 invert"
                        )}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Bottom section */}
      <div>
        {/* Desktop only */}
        <div className="hidden lg:block">
          <Card bgClass="bg-gradient-to-br from-[#EAABF0] to-[#4623E9] p-6 mt-6 mb-6">
            <p className="text-center text-sm text-white font-semibold p-2">
              Upgrade to PRO to get access to all features!
            </p>
            <button
              type="button"
              className="bg-white text-[#5932EA] text-sm rounded-2xl px-10 py-2 font-semibold hover:bg-gray-100 transition"
            >
              Get Pro Now
            </button>
          </Card>
          <div className="relative w-64 mt-8" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 transition cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 relative rounded-full overflow-hidden">
            <Image
              src={selected.avatar}
              alt={`${selected.name} avatar`}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">{selected.name}</p>
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
          {projectManagers.map((manager) => (
            <button
              key={manager.id}
              type="button"
              onClick={() => {
                setSelected(manager);
                setOpen(false);
              }}
              className={clsx(
                "flex items-center w-full px-3 py-2 space-x-3 hover:bg-gray-100 transition text-left cursor-pointer",
                selected.id === manager.id && "bg-gray-50"
              )}
            >
              <div className="w-8 h-8 relative rounded-full overflow-hidden">
                <Image
                  src={manager.avatar}
                  alt={`${manager.name} avatar`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{manager.name}</p>
                <p className="text-xs text-gray-500">{manager.title}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
        </div>
        {/* Mobile / Tablet → avatar only */}
        <div className="flex justify-center lg:hidden mt-4">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image
              src={selected.avatar}
              alt={`${selected.name} avatar`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
