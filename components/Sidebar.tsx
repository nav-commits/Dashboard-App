"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { sidebarLinks } from "@/lib/sidebarLinks";
import Card from "./Card";
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[306px] h-screen p-6 flex flex-col justify-between">
      <div>
        <div>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={195}
            height={39}
            className="object-contain"
          />
        </div>
        <nav className="flex flex-col gap-3 mt-12">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center justify-between p-3 rounded text-[14px] font-medium",
                  isActive ? "bg-[#5932EA] text-white" : "text-gray-400"
                )}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={link.icon}
                    alt={`${link.name} icon`}
                    width={20}
                    height={20}
                    className={clsx(
                      "object-contain",
                      isActive ? "filter brightness-0 invert" : ""
                    )}
                  />
                  {link.name}
                </div>
                {link.hasArrow && (
                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Arrow"
                    width={16}
                    height={16}
                    className={clsx(
                      "object-contain",
                      isActive ? "filter brightness-0 invert" : ""
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <Card bgClass="bg-gradient-to-br from-[#EAABF0] to-[#4623E9]">
        <p className="text-center text-sm text-white font-semibold p-2">
          Upgrade to PRO to get access all Features!
        </p>
        <button className="bg-white text-[#5932EA] text-sm rounded-2xl px-10 py-2 font-semibold hover:bg-gray-100 transition cursor-pointer">
          Get Pro Now!
        </button>
      </Card>
    </aside>
  );
}
