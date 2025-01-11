"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();
      setSuccess(data.message || "Signup successful!");

      // Show popup for 2 seconds
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false); 
        router.push("/login");
        // Hide popup after 2 seconds
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-center bg-red-500 text-white rounded-lg p-2 font-medium"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            />
          </div>
          <div>
            <label
              className="block text-center bg-red-500 text-white rounded-lg p-2 font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            />
          </div>
          <div>
            <label
              className="block text-center bg-red-500 text-white rounded-lg p-2 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Sign Up
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="absolute top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          User registered successfully!
        </div>
      )}
    </div>
  );
}
