'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Users, PlusCircle, LogOut } from 'lucide-react'; 

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/login');
  };

  return (
    <div className="h-screen w-60 bg-gray-900 text-gray-100 flex flex-col shadow-lg">
    
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white tracking-wide">
          Snack<span className="text-blue-400">Hub</span>
        </h2>
      </div>

    
      <nav className="flex-1 p-4 space-y-3 mt-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all"
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/create-customer"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all"
        >
          <PlusCircle size={18} />
          <span>Create Customer</span>
        </Link>

        <Link
          href="/view-customers"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all"
        >
          <Users size={18} />
          <span>View Customers</span>
        </Link>
      </nav>

  
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded-md font-semibold text-sm transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
