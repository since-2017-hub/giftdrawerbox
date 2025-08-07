import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 text-foreground px-2">
      <AuthForm type="login" />
    </div>
  );
}

