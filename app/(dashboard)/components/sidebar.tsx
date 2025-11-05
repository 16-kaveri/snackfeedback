'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Users, PlusCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/login');
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col justify-between shadow-2xl border-r border-gray-700/50">
 
      <div>
        <div className="p-6 border-b border-gray-700/60 flex items-center justify-center">
          <h2 className="text-2xl font-extrabold tracking-wide">
            Snack<span className="text-yellow-400">Hub</span>
          </h2>
        </div>


        <nav className="p-5 mt-4 space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-white transition-all duration-300"
          >
            <Home size={18} />
            <span className="font-medium text-sm tracking-wide">Dashboard</span>
          </Link>

          <Link
            href="/create-customer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-white transition-all duration-300"
          >
            <PlusCircle size={18} />
            <span className="font-medium text-sm tracking-wide">
              Create Customer
            </span>
          </Link>

          <Link
            href="/view-customers"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-white transition-all duration-300"
          >
            <Users size={18} />
            <span className="font-medium text-sm tracking-wide">
              View Customers
            </span>
          </Link>
        </nav>
      </div>

 
      <div className="p-5 border-t border-gray-700/60">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
