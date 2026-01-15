"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { sidebarLinks } from "@/lib/sidebarLinks";
import Card from "./Card";
import { projectManagers } from "@/lib/projectMangers";

export default function Sidebar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState(projectManagers[0]);
  const [open, setOpen] = useState(false);
  return (
    <aside
      className="w-[306px] h-screen p-6 flex flex-col justify-between"
      aria-label="Sidebar"
    >
      {/* Top section */}
      <div>
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Company logo"
          width={195}
          height={39}
          className="object-contain"
          priority
        />
        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="mt-12"
        >
          <ul className="flex flex-col gap-3">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "flex items-center justify-between p-3 rounded text-[14px] font-medium transition",
                      isActive
                        ? "bg-[#5932EA] text-white"
                        : "text-gray-400 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={link.icon}
                        alt=""
                        aria-hidden="true"
                        width={24}
                        height={24}
                        className={clsx(
                          "object-contain",
                          isActive ? "filter brightness-0 invert" : ""
                        )}
                      />
                      <span>{link.name}</span>
                    </div>

                    {link.hasArrow && (
                      <Image
                        src="/icons/chevron-right.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className={clsx(
                          "object-contain",
                          isActive ? "filter brightness-0 invert" : ""
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
        {/* Upgrade card */}
        <Card bgClass="bg-gradient-to-br from-[#EAABF0] to-[#4623E9]">
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
        {/* Project Manager Selector */}
        <div className="w-64 mt-8 mb-6">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 transition"
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-8 h-8 relative rounded-full overflow-hidden">
                <Image
                  src={selected.avatar}
                  alt={`${selected.name} avatar`}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Name & title */}
              <div className="text-left">
                <p className="text-sm font-medium">{selected.name}</p>
                <p className="text-xs text-gray-500">{selected.title}</p>
              </div>
            </div>
            {/* Chevron */}
            <div
              className={clsx(
                "w-4 h-4 relative transition-transform",
                open && "rotate-180"
              )}
              aria-hidden="true"
            >
              <Image
                src="/icons/chevron-down.svg"
                alt="arrow-down"
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
