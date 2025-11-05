"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import { Menu } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-50">
   
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 z-30 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-40 p-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform md:hidden"
      >
        <Menu size={20} />
      </button>

   
      <main
        className={`flex-1 w-full transition-all duration-300 ${
          collapsed ? "ml-0" : "ml-64"
        }`}
      >
        <div className="min-h-screen p-6">{children}</div>
      </main>
    </div>
  );
}
