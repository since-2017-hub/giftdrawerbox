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
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      {sent ? (
        <div className="text-green-600">Reset link sent (if account exists).</div>
      ) : (
        <>
          <input
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Reset Link
          </button>
        </>
      )}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
