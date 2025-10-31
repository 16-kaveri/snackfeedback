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
    fetch("http://localhost:3000/api/customers")
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
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading customer feedback...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar Section */}
      <Sidebar />

      {/* ✅ Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Customer Snack Feedback
        </h1>

        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedback available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left border-b">#</th>
                  <th className="p-3 text-left border-b">Name</th>
                  <th className="p-3 text-left border-b">Email</th>
                  <th className="p-3 text-left border-b">Snack Product</th>
                  <th className="p-3 text-left border-b">Feedback</th>
                  <th className="p-3 text-left border-b">Rating</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, index) => (
                  <tr key={fb._id} className="hover:bg-gray-100">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{fb.name}</td>
                    <td className="p-3 border-b">{fb.email}</td>
                    <td className="p-3 border-b">{fb.product}</td>
                    <td className="p-3 border-b">{fb.feedback}</td>
                    <td className="p-3 border-b">{fb.productRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
