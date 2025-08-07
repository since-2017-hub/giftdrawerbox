import React from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {children}
      </main>
    </div>
  );
}
