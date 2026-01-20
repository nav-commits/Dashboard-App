// app/(public)/layout.tsx
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.variable} antialiased min-h-screen bg-white`}>
        <main>{children}</main>
      </div>
  );
}
