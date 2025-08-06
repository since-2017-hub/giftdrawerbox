"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const params = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const token = params.get("token");
    if (!token) {
      setError("Missing reset token");
      return;
    }
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    if (res.ok) setDone(true);
    else setError("Could not reset password.");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Reset Password</h2>
      {done ? (
        <div className="text-green-600">
          Password reset! You can now log in.
        </div>
      ) : (
        <>
          <input
            className="w-full p-2 border rounded"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            type="password"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Reset Password
          </button>
        </>
      )}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
