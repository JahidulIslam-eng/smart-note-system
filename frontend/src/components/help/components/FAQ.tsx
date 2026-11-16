"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I create a new note?",
    answer:
      "Go to All Notes and click the New Note button. Enter your title and content, then save your note.",
  },
  {
    question: "Can I organize notes into folders?",
    answer:
      "Yes. Open the Folders page, create a folder and organize your notes inside it.",
  },
  {
    question: "How do reminders work?",
    answer:
      "Open Reminders, click New Reminder, then enter a title, date and time.",
  },
  {
    question: "How do I track task deadlines?",
    answer:
      "Create a task with a due date. You can manage its progress from Tasks and view its deadline in Calendar when the data is connected.",
  },
  {
    question: "Does AI Assistant work automatically?",
    answer:
      "The current frontend is a demo. Real AI responses will be available after connecting an AI API.",
  },
  {
    question: "Can I change the application theme?",
    answer:
      "Open Settings, select Appearance and choose Light, Dark or System. Global theme switching still needs to be connected.",
  },
];

type Props = {
  search: string;
};

export default function FAQ({ search }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {filteredFAQs.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No matching questions found.
        </p>
      ) : (
        filteredFAQs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="rounded-xl border border-gray-100 bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <span className="text-sm font-medium text-gray-800">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray-400 transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-4 py-3 text-sm leading-6 text-gray-500">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}