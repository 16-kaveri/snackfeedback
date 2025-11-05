"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import { User, Mail, Star, MessageSquare, Cookie } from "lucide-react";

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

 
  const snackImages: Record<string, string> = {
    "🍟 Potato Chips": "/snack1.png",
    "🌮 Nachos": "/snack2.png",
    "🍿 Popcorn": "/snack3.png",
    "🍪 Cookies": "/snack4.png",
    "🥨 Snack Mix": "/snack5.png",
  };

  const snackOptions = Object.keys(snackImages);

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
        alert(" Customer feedback saved successfully!");
        setFormData({
          name: "",
          email: "",
          product: "",
          productRating: "",
          feedback: "",
        });
        router.push("/view-customers");
      } else {
        alert(" Failed to save feedback");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(" Error submitting form");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 overflow-hidden">
      <Sidebar  />

      <div className="flex-1 flex justify-center items-center relative">
        <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-yellow-200 transition-transform hover:scale-[1.01] duration-300">
          <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Create Customer Feedback 
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
          
            <form onSubmit={handleSubmit} className="flex-1 space-y-5 w-full">
              <div>
                <label className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
                  <User size={16} /> Name
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

              <div>
                <label className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
                  <Mail size={16} /> Email
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

              <div>
                <label className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
                  <Cookie size={16} /> Snack Product
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

              <div>
                <label className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
                  <Star size={16} /> Product Rating (1–5)
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

              <div>
                <label className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
                  <MessageSquare size={16} /> Feedback
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
                className={`w-full py-2.5 rounded-lg text-white font-semibold text-base transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 hover:scale-[1.02] shadow-lg hover:shadow-purple-300"
                }`}
              >
                {loading ? "Saving..." : "Submit Feedback"}
              </button>
            </form>

      
            <div className="flex justify-center items-center md:w-1/3 h-56">
              {formData.product ? (
                <Image
                  src={snackImages[formData.product]}
                  alt="Selected Snack"
                  width={180}
                  height={180}
                  className="rounded-xl shadow-md transition-all duration-300 hover:scale-105"
                />
              ) : (
                <p className="text-gray-400 text-sm text-center animate-pulse">
                  🍪 Select a snack to preview it here!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
