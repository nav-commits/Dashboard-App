"use client";

import { Poppins } from "next/font/google";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { ProtectedRoute } from "../../components/ProtecedRoute";
import ".././globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className={`${poppins.variable} antialiased flex min-h-screen`}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-[#FAFBFF] min-h-screen">
          <Header />

          {/* Content area */}
          <main className="flex-1 w-full max-w-full p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
