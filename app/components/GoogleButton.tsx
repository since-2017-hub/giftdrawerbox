"use client";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="w-full bg-red-500 text-white py-2 mt-2 rounded hover:bg-red-600"
    >
      Continue with Google
    </button>
  );
}
