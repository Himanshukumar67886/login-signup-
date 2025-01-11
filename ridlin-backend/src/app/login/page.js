"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // Save the token (or handle sessions)
        router.push("/"); // Redirect after successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            />
          </div>
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Login
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="absolute top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Login successful!
        </div>
      )}
    </div>
  );
}
