"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, ThumbsUp, ThumbsDown } from "lucide-react";

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
    const sessionStr = localStorage.getItem("session");

    if (!sessionStr) {
      router.push("/login");
      return;
    }

    const session = JSON.parse(sessionStr);
    const now = new Date().getTime();
    const sessionAge = (now - session.timestamp) / (1000 * 60);

    if (sessionAge > 30) {
      localStorage.removeItem("session");
      alert("Session expired! Please login again.");
      router.push("/login");
      return;
    }

    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });

    const refreshSession = () => {
      const updatedSession = { ...session, timestamp: new Date().getTime() };
      localStorage.setItem("session", JSON.stringify(updatedSession));
    };

    window.addEventListener("mousemove", refreshSession);
    window.addEventListener("keydown", refreshSession);

    return () => {
      window.removeEventListener("mousemove", refreshSession);
      window.removeEventListener("keydown", refreshSession);
    };
  }, [router]);

  const totalCustomers = customers.length;
  const positiveReviews = customers.filter((c) => Number(c.productRating) >= 3).length;
  const negativeReviews = customers.filter((c) => Number(c.productRating) <= 2).length;

  const snacks = [
    { name: "Potato Chips", flavor: "Salted", price: "₹50", image: "/snack1.png" },
    { name: "Nachos", flavor: "Cheese", price: "₹60", image: "/snack2.png" },
    { name: "Popcorn", flavor: "Butter", price: "₹40", image: "/snack3.png" },
    { name: "Cookies", flavor: "Chocolate Chip", price: "₹70", image: "/snack4.png" },
    { name: "Snack Mix", flavor: "Masala", price: "₹55", image: "/snack5.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-50 via-white to-yellow-100 flex flex-col p-6 md:p-10">

      <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 shadow-md mb-10 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent text-center md:text-left">
          Snack Feedback Dashboard 
        </h1>
       
      </div>

      {loading ? (
        <p className="text-gray-600 text-lg text-center mt-10 animate-pulse">
          Loading feedback data...
        </p>
      ) : (
        <>
          {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">

              {/* Total Customers */}
              <div className="bg-white/90 p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl hover:scale-[1.03] transition-transform duration-300">
                <Users className="mx-auto mb-3 text-indigo-600" size={30} />
                <h3 className="text-lg font-semibold text-gray-600">Total Customers</h3>
                <p className="text-4xl font-extrabold mt-2 text-indigo-600">{totalCustomers}</p>
              </div>

              {/* Positive Reviews */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl hover:scale-[1.03] transition-transform duration-300">
                <ThumbsUp className="mx-auto mb-3 text-green-600" size={30} />
                <h3 className="text-lg font-semibold text-gray-600">Positive Reviews</h3>
                <p className="text-4xl font-extrabold mt-2 text-green-600">{positiveReviews}</p>
              </div>

              {/* Negative Reviews */}
              <div className="bg-gradient-to-br from-red-50 to-pink-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl hover:scale-[1.03] transition-transform duration-300">
                <ThumbsDown className="mx-auto mb-3 text-red-600" size={30} />
                <h3 className="text-lg font-semibold text-gray-600">Negative Reviews</h3>
                <p className="text-4xl font-extrabold mt-2 text-red-600">{negativeReviews}</p>
              </div>

            </div>
        
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              🍪 Popular Snack Products
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
              {snacks.map((snack, index) => (
                <div
                  key={index}
                  className="bg-white/95 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <img
                    src={snack.image}
                    alt={snack.name}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{snack.name}</h3>
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">Flavor:</span> {snack.flavor}
                    </p>
                    <p className="text-gray-800 font-semibold mt-3">
                      Price: {snack.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        
          <footer className="text-center text-sm text-gray-500 mt-16">
            © {new Date().getFullYear()} Snack Feedback Dashboard 
          </footer>
        </>
      )}
    </div>
  );
}
