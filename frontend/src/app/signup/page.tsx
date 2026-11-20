
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
} from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(";").shift()!);
  }

  return "";
};

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

   try {
  setLoading(true);
  setError("");

  const response = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const validationError = data.errors
      ? Object.values(data.errors).flat()[0]
      : null;

    throw new Error(
      String(validationError || data.message || "Signup failed.")
    );
  }

  // Registration successful
  router.push("/login");

} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Something went wrong."
  );
} finally {
  setLoading(false);
}
  };

  const handleGoogleSignup = () => {
    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    window.location.href = `${API_URL}/auth/google/redirect`;
  };

  return (
    <AuthLayout
      type="signup"
      title="Create your account"
      subtitle="Start organizing your notes and tasks with SmartNote."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full name
          </label>
          <div className="relative">
            <User
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm password
          </label>
          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          By creating an account, you agree to our Terms of Service and
          Privacy Policy.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-violet-200"
        >
          {loading ? (
            <>
              <Loader2 size={19} className="animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-400">
            OR SIGN UP WITH
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition"
      >
        <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.25 5.62c4.24-3.91 7.52-9.66 7.52-17.27Z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.14 15.91-5.83l-7.25-5.62c-2.01 1.35-4.59 2.15-8.66 2.15-6.26 0-11.57-4.22-13.46-9.91l-8.02 6.19C6.48 43.14 14.62 48 24 48Z" />
          <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.86.92 7.5 2.52 10.78l8.01-6.19Z" />
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-7">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-violet-600 font-semibold hover:text-violet-800"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
