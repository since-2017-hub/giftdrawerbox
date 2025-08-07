import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AppLayout from "../components/AppLayout";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <AppLayout>
      <div className="flex flex-col bg-background text-foreground min-h-screen">
        <header className="bg-white dark:bg-gray-900 shadow px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-700">Dashboard</h2>
          {session && session.user && (
            <div className="text-blue-700 font-semibold">
              {session.user.name || session.user.email}
            </div>
          )}
        </header>
        <main className="flex-1 p-8">
          {session && session.user ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">Welcome!</h3>
              <p className="mb-4">
                Glad to see you, <span className="font-semibold">{session.user.name || session.user.email}</span>.
              </p>
              <p className="text-gray-600">This is your dashboard. Add your widgets, stats, or quick links here.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
              <p className="mb-4 text-gray-700">You are not logged in.</p>
              <div className="space-x-2">
                <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
                <Link href="/register" className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300">Signup</Link>
              </div>
            </div>
          )}
        </main>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>
    </AppLayout>
  );
}
