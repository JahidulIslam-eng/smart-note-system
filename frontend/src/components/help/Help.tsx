"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";

import HelpHeader from "./components/HelpHeader";
import HelpSearch from "./components/HelpSearch";
import HelpCategories from "./components/HelpCategories";
import FAQ from "./components/FAQ";

export default function Help() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 px-5 py-10">
        <HelpHeader />

        <div className="mt-6">
          <HelpSearch
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          Browse Help Topics
        </h2>

        <HelpCategories />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Find quick answers to common questions.
          </p>
        </div>

        <FAQ search={search} />
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="font-bold text-gray-900">
          Still need help?
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Contact our support team if you cannot find your answer.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="mailto:support@smartnote.example"
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Mail size={17} />
            Email Support
          </a>

          <button
            type="button"
            onClick={() =>
              window.location.href =
                "mailto:support@smartnote.example?subject=SmartNote%20Support"
            }
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <MessageCircle size={17} />
            Contact Us
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Replace the demo support email with your actual support email before publishing.
        </p>
      </section>
    </div>
  );
}