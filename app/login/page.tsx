"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  if (email === storedUser.email && password === storedUser.password) {
    const sessionData = {
      active: true,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem("session", JSON.stringify(sessionData));

    localStorage.setItem("lastLogin", JSON.stringify({ email, password }));

    router.push("/dashboard");
  } else {
    setError("Invalid credentials! Please check your email or password.");
  }
};



  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    setSuccess("Account created successfully! You can now log in.");
    setTimeout(() => setIsLogin(true), 1200);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-tr from-yellow-100 via-white to-orange-100">
    
      <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-yellow-50/70 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md border border-yellow-200"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Snack Feedback 🍩
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          {isLogin
            ? "Share your feedback, one bite at a time!"
            : "Join Snack Feedback and start sharing your tasty thoughts!"}
        </p>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
             
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
                    required
                  />
                </div>
              </div>

           
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

            
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center font-medium"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Login
              </motion.button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-yellow-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              onSubmit={handleSignup}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
            
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
                    required
                  />
                </div>
              </div>

         
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
                    required
                  />
                </div>
              </div>

              
              <div>
                <label className="block mb-2 text-gray-600 font-semibold">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-sm text-center font-medium"
                >
                  {success}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Sign Up
              </motion.button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-yellow-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
