
import { SidebarLink } from "@/types/sidebarLinks";
 
  export const sidebarLinks: SidebarLink[] = [
    { name: "Dashboard", href: "/dashboard", icon: "/icons/key-square.svg", hasArrow: false },
    { name: "Product", href: "/dashboard/product", icon: "/icons/3d-square.svg", hasArrow: true },
    { name: "Customers", href: "/dashboard/customers", icon: "/icons/user-square.svg", hasArrow: true },
    { name: "Income", href: "/dashboard/income", icon: "/icons/wallet-money.svg", hasArrow: true },
    { name: "Promote", href: "/dashboard/promote", icon: "/icons/discount-shape.svg", hasArrow: true },
    { name: "Help", href: "/dashboard/help", icon: "/icons/message-question.svg", hasArrow: true },
  ];
  