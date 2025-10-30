'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/sidebar';

interface Customer {
  _id: string;
  name: string;
  email: string;
  productRating: number;
  feedback: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionStr = localStorage.getItem('session');

    if (!sessionStr) {
      router.push('/login');
      return;
    }

    const session = JSON.parse(sessionStr);
    const now = new Date().getTime();
    const sessionAge = (now - session.timestamp) / (1000 * 60);

    if (sessionAge > 30) {
      localStorage.removeItem('session');
      alert('Session expired! Please login again.');
      router.push('/login');
      return;
    }

    fetch('http://localhost:3000/api/customers')
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching customers:', err);
        setLoading(false);
      });

    const refreshSession = () => {
      const updatedSession = { ...session, timestamp: new Date().getTime() };
      localStorage.setItem('session', JSON.stringify(updatedSession));
    };

    window.addEventListener('mousemove', refreshSession);
    window.addEventListener('keydown', refreshSession);

    return () => {
      window.removeEventListener('mousemove', refreshSession);
      window.removeEventListener('keydown', refreshSession);
    };
  }, [router]);


  const totalCustomers = customers.length;
  const positiveReviews = customers.filter(c => Number(c.productRating) >= 4).length;
  const negativeReviews = customers.filter(c => Number(c.productRating) <= 2).length;

  const snacks = [
    { name: 'Potato Chips', flavor: 'Salted', price: '₹50' },
    { name: 'Nachos', flavor: 'Cheese', price: '₹60' },
    { name: 'Popcorn', flavor: 'Butter', price: '₹40' },
    { name: 'Cookies', flavor: 'Chocolate Chip', price: '₹70' },
    { name: 'Snack Mix', flavor: 'Masala', price: '₹55' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
         
        </div>

        {loading ? (
          <p className="text-gray-600">Loading data...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">Total Customers</h3>
                <p className="text-3xl font-bold mt-2 text-blue-600">
                  {totalCustomers}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">Positive Reviews</h3>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  {positiveReviews}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">Negative Reviews</h3>
                <p className="text-3xl font-bold mt-2 text-red-500">
                  {negativeReviews}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Snack Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {snacks.map((snack, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {snack.name}
                  </h3>
                  <p className="text-gray-500 mt-2">Flavor: {snack.flavor}</p>
                  <p className="text-gray-700 font-semibold mt-3">
                    Price: {snack.price}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
