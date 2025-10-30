'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/login');
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-10 text-center">Snack Feedback</h2>

      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className="hover:text-blue-300">Dashboard</Link>
        <Link href="/create-customer" className="hover:text-blue-300">Create Customer</Link>
        <Link href="/view-customers" className="hover:text-blue-300">View Customers</Link>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded text-sm"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
