import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      {session && session.user ? (
        <div>
          <p className="mb-4">Welcome, {session.user.name || session.user.email}!</p>
          <form method="post" action="/api/auth/logout">
            <button
              type="submit"
              className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2"
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
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
      )}
    </div>
  );
}
