"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

interface CustomerFeedback {
  _id: string;
  name: string;
  email: string;
  product: string;
  feedback: string;
  productRating: number;
}

export default function ViewCustomersPage() {
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium text-gray-700">
        Loading customer feedback...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Customer Snack Feedback
          </h1>

          {feedbacks.length === 0 ? (
            <div className="bg-white shadow-md rounded-xl p-8 text-center text-gray-500">
              No feedback available.
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">#</th>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Snack Product</th>
                    <th className="p-4 text-left font-semibold">Feedback</th>
                    <th className="p-4 text-left font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((fb, index) => (
                    <tr
                      key={fb._id}
                      className="hover:bg-indigo-50 transition-colors duration-200 border-b last:border-none"
                    >
                      <td className="p-4 text-gray-700">{index + 1}</td>
                      <td className="p-4 text-gray-800 font-medium">{fb.name}</td>
                      <td className="p-4 text-gray-600">{fb.email}</td>
                      <td className="p-4 text-gray-700">{fb.product}</td>
                      <td className="p-4 text-gray-700">{fb.feedback}</td>
                      <td className="p-4 text-yellow-500 font-semibold">
                        {fb.productRating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
