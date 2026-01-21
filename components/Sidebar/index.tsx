"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { sidebarLinks } from "@/lib/constants/sidebarLinks";
import Card from "../Card";
import { projectManagers } from "@/lib/data/projectMangers";
import Dropdown from "../Dropdown";
import Button from "../Button";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "flex flex-col justify-between transition-all duration-300 min-h-screen",
        "w-20 sm:w-24 lg:w-[306px] p-4 sm:p-6"
      )}
      aria-label="Sidebar"
    >
      {/* Top section */}
      <div>
        {/* Logo */}
        <div className="flex justify-center lg:justify-start mb-6">
          <Image
            src="/Images/logo.png"
            alt="Company logo"
            width={195}
            height={39}
            className="hidden lg:block object-contain"
            priority
          />
          <Image
            src="/Images/logo-2.png"
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
                      <img
                        src={link.icon}
                        alt={link.name}
                        aria-hidden
                        className={clsx(
                          "w-[25px] h-[25px] object-contain",
                          isActive && "filter brightness-0 invert"
                        )}
                      />
                      <span className="hidden lg:inline">{link.name}</span>
                    </div>
                    {link.hasArrow && (
                      <img
                        src="/Icons/chevron-right.svg"
                        alt=""
                        aria-hidden
                        className={clsx(
                          "hidden lg:block w-4 h-4 object-contain",
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
      <div className="mt-auto">
        {/* Desktop only */}
        <div className="hidden lg:flex flex-col gap-4">
          <Card bgClass="bg-gradient-to-br from-[#EAABF0] to-[#4623E9] p-6">
            <p className="text-center text-sm text-white font-semibold p-2">
              Upgrade to PRO to get access to all features!
            </p>
            <Button
              text="Get Pro Now"
              textColor="#5932EA"
              bgColor="#FFFFFF"
              className="hover:bg-gray-100 transition"
            />
          </Card>

          <Dropdown
            items={projectManagers}
            initialSelectedId={projectManagers[0].id}
            onSelect={(item) => console.log("Selected PM:", item)}
          />
        </div>
        {/* Mobile avatar */}
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
