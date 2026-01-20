
import { SidebarLink } from "@/types/sidebarLinks";
 
  export const sidebarLinks: SidebarLink[] = [
    { name: "Dashboard", href: "/dashboard", icon: "/Icons/key-square.svg", hasArrow: false },
    { name: "Product", href: "/dashboard/product", icon: "/Icons/3d-square.svg", hasArrow: true },
    { name: "Customers", href: "/dashboard/customers", icon: "/Icons/user-square.svg", hasArrow: true },
    { name: "Income", href: "/dashboard/income", icon: "/Icons/wallet-money.svg", hasArrow: true },
    { name: "Promote", href: "/dashboard/promote", icon: "/Icons/discount-shape.svg", hasArrow: true },
    { name: "Help", href: "/dashboard/help", icon: "/Icons/message-question.svg", hasArrow: true },
  ];
  