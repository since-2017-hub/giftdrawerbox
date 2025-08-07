import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full py-4 bg-blue-700 text-white text-center text-2xl font-bold shadow">
        GiftDrawerBox
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white flex flex-col py-8 px-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            <a href="/dashboard" className="hover:bg-blue-900 rounded px-3 py-2">Dashboard</a>
            <a href="/profile" className="hover:bg-blue-900 rounded px-3 py-2">Profile</a>
            <a href="/settings" className="hover:bg-blue-900 rounded px-3 py-2">Settings</a>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
      {/* Footer */}
      <footer className="w-full py-4 text-center text-gray-500 bg-blue-50 mt-auto">
        &copy; {new Date().getFullYear()} GiftDrawerBox
      </footer>
    </div>
  );
}
