"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/request-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setSent(true);
    else setError("Could not send reset email.");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-2">
      <form
        className="space-y-5 w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        {sent ? (
          <div className="text-green-600 text-center">Reset link sent (if account exists).</div>
        ) : (
          <>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Send Reset Link
            </button>
          </>
        )}
        {error && <div className="text-red-600 text-center">{error}</div>}
        <div className="text-right">
          <a className="text-blue-500 hover:underline" href="/login">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}
