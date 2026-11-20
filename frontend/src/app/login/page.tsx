
"use client";

import { useState } from "react";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import api from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    
     try {
  setLoading(true);
  setError("");

  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const validationError = data.errors
      ? Object.values(data.errors).flat()[0]
      : null;

    throw new Error(
      String(validationError || data.message || "Login failed.")
    );
  }

  // Login successful
  console.log("Logged in user:", data.user);
  localStorage.setItem("token", data.token);

localStorage.setItem("user", JSON.stringify(data.user));

  router.push("/dashboard");

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

  const handleGoogleLogin = () => {
    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    window.location.href = `${API_URL}/auth/google/redirect`;
  };

  return (
    <AuthLayout
      type="login"
      title="Welcome back!"
      subtitle="Enter your details to access your SmartNote account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
            {error}
          </div>
        )}

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
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-violet-600 hover:text-violet-800 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
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

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 accent-violet-600"
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-violet-200"
        >
          {loading ? (
            <>
              <Loader2 size={19} className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-400">
            OR CONTINUE WITH
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition"
      >
        <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.25 5.62c4.24-3.91 7.52-9.66 7.52-17.27Z" />
          <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.86.92 7.5 2.52 10.78l8.01-6.19Z" transform="translate(0 0)" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.14 15.91-5.83l-7.25-5.62c-2.01 1.35-4.59 2.15-8.66 2.15-6.26 0-11.57-4.22-13.46-9.91l-8.02 6.19C6.48 43.14 14.62 48 24 48Z" />
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-violet-600 font-semibold hover:text-violet-800"
        >
          Create account
        </Link>
      </p>

      <p className="text-center text-xs text-gray-400 mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </AuthLayout>
  );
}
