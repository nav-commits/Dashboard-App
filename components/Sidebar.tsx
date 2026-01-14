import Link from "next/link";
import Image from "next/image";

// Array of sidebar links
const sidebarLinks = [
  { name: "Dashboard", href: "/" },
  { name: "Product", href: "/product" },
  { name: "Customers", href: "/customers" },
  { name: "Income", href: "/income" },
  { name: "Promote", href: "/promote" },
  { name: "Help", href: "/help" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen p-6">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={150}
          height={50}
          className="object-contain"
        />
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-3 rounded text-gray-400 text-[14px] font-medium"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
