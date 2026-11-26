"use client";

import { useState } from "react";
import { Bot, Sparkles, Send, FileText, ListTodo, Tags } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};
interface Props {
  userId: number;
}
export default function AIAssistant({ userId }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I'm your SmartNote AI Assistant. I can help you summarize notes, create tasks, and organize your ideas.",
    },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      text: `I received your request: "${text}". AI integration will be connected later. For now, this is a demo response.`,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ]);

    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <Sparkles size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            AI Assistant
          </h1>
          <p className="text-sm text-gray-500">
            Your personal productivity assistant
          </p>
        </div>

        <span className="ml-auto rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
          Demo mode
        </span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`flex gap-3 ${
              item.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {item.role === "assistant" && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <Bot size={19} />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                item.role === "user"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {item.text}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="ml-12 space-y-3 pt-2">
            <p className="text-sm font-semibold text-gray-700">
              What can I help you with?
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => sendMessage("Summarize my notes")}
                className="flex items-center gap-2 rounded-xl border border-gray-100 p-3 text-left text-sm text-gray-600 hover:border-violet-300 hover:bg-violet-50"
              >
                <FileText size={18} className="text-violet-600" />
                Summarize
              </button>

              <button
                onClick={() => sendMessage("Create tasks from my notes")}
                className="flex items-center gap-2 rounded-xl border border-gray-100 p-3 text-left text-sm text-gray-600 hover:border-violet-300 hover:bg-violet-50"
              >
                <ListTodo size={18} className="text-violet-600" />
                Create Tasks
              </button>

              <button
                onClick={() => sendMessage("Suggest tags for my notes")}
                className="flex items-center gap-2 rounded-xl border border-gray-100 p-3 text-left text-sm text-gray-600 hover:border-violet-300 hover:bg-violet-50"
              >
                <Tags size={18} className="text-violet-600" />
                Suggest Tags
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 p-4"
      >
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-violet-400">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}