"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "./GoogleButton";

type Props = {
  type: "login" | "register";
};

export default function AuthForm({ type }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (type === "login") {
        // Use NextAuth signIn for session support
        const { signIn } = await import("next-auth/react");
        const result = await signIn("credentials", {
          email,
          password,
          rememberMe,
          redirect: false,
        });
        if (result?.error) throw new Error(result.error);
        router.push("/dashboard");
      } else {
        // Registration logic (keep your existing API)
        const res = await fetch(`/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        router.push("/login?registered=1");
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-2">
      <form
        className="space-y-5 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">
          {type === "login" ? "Sign In to Your Account" : "Create Your Account"}
        </h2>
        {type === "register" && (
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        {type === "login" && (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            Remember Me
          </label>
        )}
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {loading ? "Please wait..." : type === "login" ? "Login" : "Register"}
        </button>
        <GoogleButton />
        {type === "login" && (
          <div className="flex justify-between items-center">
            <a className="text-blue-500 hover:underline" href="/forgot-password">
              Forgot password?
            </a>
            <a className="text-blue-500 hover:underline" href="/register">
              Don't have an account? Register
            </a>
          </div>
        )}
        {type === "register" && (
          <div className="text-right">
            <a className="text-blue-500 hover:underline" href="/login">
              Already have an account? Login
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
