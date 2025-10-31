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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-10">
   
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
         
        </div>

       
        {loading ? (
          <p className="text-gray-600 text-lg text-center mt-10">Loading data...</p>
        ) : (
          <>
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-600">Total Customers</h3>
                <p className="text-4xl font-extrabold mt-2 text-indigo-600">{totalCustomers}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-600">Positive Reviews</h3>
                <p className="text-4xl font-extrabold mt-2 text-green-600">{positiveReviews}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200 text-center hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-600">Negative Reviews</h3>
                <p className="text-4xl font-extrabold mt-2 text-red-500">{negativeReviews}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-5 text-gray-800">Popular Snack Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {snacks.map((snack, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200 hover:scale-[1.02] hover:shadow-lg transition-all"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{snack.name}</h3>
                    <p className="text-gray-600 mt-2">Flavor: {snack.flavor}</p>
                    <p className="text-gray-800 font-semibold mt-3">Price: {snack.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
