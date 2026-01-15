
export type SidebarLink = {
    name: string;
    href: string;
    icon: string;
    hasArrow: boolean;
  };
  
  export const sidebarLinks: SidebarLink[] = [
    { name: "Dashboard", href: "/", icon: "/icons/3d-square.svg", hasArrow: false },
    { name: "Product", href: "/product", icon: "/icons/discount-shape.svg", hasArrow: true },
    { name: "Customers", href: "/customers", icon: "/icons/key-square.svg", hasArrow: true },
    { name: "Income", href: "/income", icon: "/icons/message-question.svg", hasArrow: true },
    { name: "Promote", href: "/promote", icon: "/icons/user-square.svg", hasArrow: true },
    { name: "Help", href: "/help", icon: "/icons/wallet-money.svg", hasArrow: true },
  ];
  