"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";

export default function CreateCustomerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    productRating: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Customer feedback saved successfully!");
        setFormData({
          name: "",
          email: "",
          product: "",
          productRating: "",
          feedback: "",
        });
        router.push("/view-customers");
      } else {
        alert("Failed to save feedback");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ Error submitting form");
    }

    setLoading(false);
  };

  const snackOptions = [
    "Potato Chips",
    "Nachos",
    "Popcorn",
    "Cookies",
    "Snack Mix",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-5 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Customer Feedback
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Snack Product
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            >
              <option value="">Select a snack</option>
              {snackOptions.map((snack, index) => (
                <option key={index} value={snack}>
                  {snack}
                </option>
              ))}
            </select>
          </div>

         
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Product Rating (1–5)
            </label>
            <input
              type="number"
              name="productRating"
              value={formData.productRating}
              onChange={handleChange}
              min="1"
              max="5"
              required
              placeholder="Rate product 1 to 5"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1 font-semibold text-gray-700">
              Feedback
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              placeholder="Share your feedback..."
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition resize-none"
              rows={3}
            ></textarea>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-semibold text-base transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-md"
            }`}
          >
            {loading ? "Saving..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
