"use client";

import { useEffect, useRef, useState } from "react";

import { askRepository } from "@/lib/api";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

export default function ChatPanel() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function currentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function clearConversation() {
    setMessages([]);
    setQuestion("");
    inputRef.current?.focus();
  }

  async function sendMessage() {
    if (!question.trim() || loading) return;

    const currentQuestion = question.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: currentQuestion,
        timestamp: currentTime(),
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const response = await askRepository(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: response.answer,
          timestamp: currentTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message:
            "Sorry, something went wrong while contacting Gemini.",
          timestamp: currentTime(),
        },
      ]);
    } finally {
      setLoading(false);

      inputRef.current?.focus();
    }
  }

  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">

        <div>

          <h2 className="text-3xl font-bold">
            🤖 AI Repository Chat
          </h2>

          <p className="mt-1 text-gray-400">
            Ask anything about the analyzed repository.
          </p>

        </div>

        <button
          onClick={clearConversation}
          disabled={messages.length === 0}
          className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear Chat
        </button>

      </div>

      <div className="h-[500px] overflow-y-auto bg-black p-6">

        {messages.length === 0 && !loading && (
          <div className="mt-28 text-center text-gray-500">
            Start by asking a question about the repository.
          </div>
        )}

        <div className="space-y-6">

          {messages.map((msg, index) => (
            <div key={index}>

              <ChatMessage
                role={msg.role}
                message={msg.message}
              />

              <p className="mt-1 text-xs text-gray-500">
                {msg.timestamp}
              </p>

            </div>
          ))}

        </div>

        {loading && (
          <div className="mt-6 flex items-center gap-4">

            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>

            <span className="text-blue-400">
              Gemini is thinking...
            </span>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

      <div className="border-t border-zinc-800 p-6">

        <div className="flex gap-4">

          <input
            ref={inputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything about this repository..."
            className="flex-1 rounded-xl border border-zinc-700 bg-black px-6 py-4 outline-none transition focus:border-blue-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading || !question.trim()}
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}