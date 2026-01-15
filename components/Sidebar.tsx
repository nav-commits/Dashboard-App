import Link from "next/link";
import Image from "next/image";

const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: "/icons/3d-square.svg", hasArrow: false },
  { name: "Product", href: "/product", icon: "/icons/discount-shape.svg", hasArrow: true },
  { name: "Customers", href: "/customers", icon: "/icons/key-square.svg", hasArrow: true },
  { name: "Income", href: "/income", icon: "/icons/message-question.svg", hasArrow: true },
  { name: "Promote", href: "/promote", icon: "/icons/user-square.svg", hasArrow: true },
  { name: "Help", href: "/help", icon: "/icons/wallet-money.svg", hasArrow: true },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen p-6">
      {/* Logo */}
      <div className="mb-6 mt-2">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={195}
          height={39}
          className="object-contain"
        />
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between p-3 rounded text-gray-400 text-[14px] font-medium hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <Image
                src={link.icon}
                alt={`${link.name} icon`}
                width={20}
                height={20}
                className="object-contain"
              />
              {link.name}
            </div>
            {link.hasArrow && (
              <Image
                src="/icons/chevron-right.svg"
                alt="Arrow"
                width={16}
                height={16}
                className="object-contain"
              />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
