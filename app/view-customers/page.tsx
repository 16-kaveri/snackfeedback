"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
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

  const getReviewType = (rating: number) => {
    return rating >= 3 ? "positive" : "negative";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium text-gray-700">
        Loading customer feedback...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100">
      <Sidebar />

      <main className="flex-1 p-10 flex flex-col items-center">
        <div className="w-full max-w-7xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-yellow-200 p-10">
          <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Customer Snack Feedback 
            </h1>
            <span className="text-sm text-gray-500">
              Total Feedbacks:{" "}
              <strong className="text-indigo-600">{feedbacks.length}</strong>
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="bg-white shadow-md rounded-xl p-10 text-center text-gray-500 border border-gray-200">
              No feedback available yet.
            </div>
          ) : (
            <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 font-semibold">#</th>
                    <th className="p-4 font-semibold">Customer Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Snack Product</th>
                    <th className="p-4 font-semibold">Feedback</th>
                    <th className="p-4 font-semibold text-center">Rating</th>
                    <th className="p-4 font-semibold text-center">Review Type</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((fb, index) => (
                    <tr
                      key={fb._id}
                      className={`transition duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-indigo-50`}
                    >
                      <td className="p-4 text-gray-700">{index + 1}</td>
                      <td className="p-4 font-medium text-gray-900">{fb.name}</td>
                      <td className="p-4 text-gray-700">{fb.email}</td>
                      <td className="p-4 text-gray-700">{fb.product}</td>
                      <td className="p-4 text-gray-700">{fb.feedback}</td>
                      <td className="p-4 text-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`inline-block mx-0.5 ${
                              i < Number(fb.productRating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          getReviewType(fb.productRating) === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {getReviewType(fb.productRating) === "positive" ? (
                          <>
                            <span className="mr-1">👍</span> Positive
                          </>
                        ) : (
                          <>
                            <span className="mr-1">👎</span> Negative
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-8">
            © {new Date().getFullYear()} Snack Feedback Dashboard | Built with{" "}
            <span className="text-indigo-500 font-semibold">Next.js</span>
          </div>
        </div>
      </main>
    </div>
  );
}
