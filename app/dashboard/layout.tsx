// app/(dashboard)/layout.tsx
import { Poppins } from "next/font/google";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased flex min-h-screen`}>
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1 flex flex-col bg-[#FAFBFF]">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
