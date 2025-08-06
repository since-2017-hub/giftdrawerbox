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
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          type === "register"
            ? { email, password, name }
            : { email, password, rememberMe }
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      if (type === "login") router.push("/dashboard");
      else router.push("/login?registered=1");
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">
        {type === "login" ? "Login" : "Register"}
      </h2>
      {type === "register" && (
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
      />
      <input
        className="w-full p-2 border rounded"
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
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Please wait..." : type === "login" ? "Login" : "Register"}
      </button>
      <GoogleButton />
      {type === "login" && (
        <div className="text-right">
          <a className="text-blue-500 hover:underline" href="/forgot-password">
            Forgot password?
          </a>
        </div>
      )}
    </form>
  );
}
