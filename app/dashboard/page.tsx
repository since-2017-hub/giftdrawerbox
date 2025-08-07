import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
    return null; // Prevent further rendering
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col py-8 px-4 shadow-lg">
        <div className="mb-8 text-2xl font-extrabold tracking-tight">
          GiftDrawerBox
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="hover:bg-blue-800 rounded px-3 py-2"
          >
            Dashboard
          </Link>
          <Link href="/profile" className="hover:bg-blue-800 rounded px-3 py-2">
            Profile
          </Link>
          <Link
            href="/settings"
            className="hover:bg-blue-800 rounded px-3 py-2"
          >
            Settings
          </Link>
        </nav>
        <div className="mt-auto">
          <form method="post" action="/api/auth/logout">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 mt-8"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-700">Dashboard</h2>
          {session && session.user && (
            <div className="text-blue-700 font-semibold">
              {session.user.name || session.user.email}
            </div>
          )}
        </header>
        {/* Content */}
        <main className="flex-1 p-8">
          {session && session.user ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">Welcome!</h3>
              <p className="mb-4">
                Glad to see you,{" "}
                <span className="font-semibold">
                  {session.user.name || session.user.email}
                </span>
                .
              </p>
              <p className="text-gray-600">
                This is your dashboard. Add your widgets, stats, or quick links
                here.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <p className="mb-4 text-gray-700">You are not logged in.</p>
              <div className="space-x-2">
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
