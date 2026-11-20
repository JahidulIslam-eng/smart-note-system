
import Link from "next/link";
import { FileText, Sparkles, ShieldCheck, Zap } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup";
};

export default function AuthLayout({
  children,
  title,
  subtitle,
  type,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F8F7FF] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl shadow-violet-100 overflow-hidden">
        {/* Left side */}
        <section className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 p-12 text-white relative overflow-hidden">
          <div className="absolute w-80 h-80 rounded-full bg-white/10 -top-28 -right-28" />
          <div className="absolute w-72 h-72 rounded-full bg-white/10 -bottom-32 -left-24" />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white/15 p-2.5 rounded-xl">
                <FileText size={27} />
              </div>
              <span className="text-2xl font-bold">SmartNote</span>
            </Link>

            <div className="mt-24">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm mb-6">
                <Sparkles size={16} />
                Your smarter workspace
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                Organize your thoughts.
                <br />
                <span className="text-violet-200">Simplify your life.</span>
              </h1>

              <p className="text-violet-100 mt-6 text-lg leading-8 max-w-md">
                Keep your notes, tasks, reminders and ideas together in one
                beautiful workspace.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <ShieldCheck size={22} className="mb-3" />
              <p className="font-semibold">Private & Secure</p>
              <p className="text-sm text-violet-100 mt-1">
                Your personal workspace
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <Zap size={22} className="mb-3" />
              <p className="font-semibold">Work Smarter</p>
              <p className="text-sm text-violet-100 mt-1">
                Everything in one place
              </p>
            </div>
          </div>
        </section>

        {/* Right side */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <Link href="/" className="flex lg:hidden items-center gap-2 mb-10">
              <div className="bg-violet-100 text-violet-700 p-2 rounded-xl">
                <FileText size={23} />
              </div>
              <span className="text-xl font-bold text-gray-900">
                SmartNote
              </span>
            </Link>

            <div className="mb-8">
              <p className="text-sm font-semibold text-violet-600 mb-3">
                {type === "login" ? "WELCOME BACK" : "GET STARTED"}
              </p>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-500 mt-2">{subtitle}</p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
