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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        alert("Customer feedback saved!");
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
      alert("Error submitting form");
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
    <div className="flex min-h-screen">
 
      <Sidebar />

    
      <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Create Customer Feedback
          </h2>

          <label className="block mb-2 font-semibold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          />

          <label className="block mb-2 font-semibold text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          />

          <label className="block mb-2 font-semibold text-gray-600">
            Snack Product
          </label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          >
            <option value="">Select a snack</option>
            {snackOptions.map((snack, index) => (
              <option key={index} value={snack}>
                {snack}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold text-gray-600">
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
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          />

          <label className="block mb-2 font-semibold text-gray-600">
            Feedback
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
