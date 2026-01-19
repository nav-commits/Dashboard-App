"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { sidebarLinks } from "@/lib/sidebarLinks";
import Card from "./Card";
import { projectManagers } from "@/lib/projectMangers";
import Dropdown from "./Dropdown";
export default function Sidebar() {
  const pathname = usePathname();
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
          <Dropdown
            items={projectManagers}
            initialSelectedId={projectManagers[0].id}
            onSelect={(item) => console.log("Selected PM:", item)}
          />
        </div>
        {/* Mobile / Tablet → avatar only */}
        <div className="flex justify-center lg:hidden mt-4">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image
              src={"/Images/evano.png"}
              alt={`avatar`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
