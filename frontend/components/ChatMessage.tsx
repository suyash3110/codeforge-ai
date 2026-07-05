"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  role: "user" | "assistant";
  message: string;
}

export default function ChatMessage({
  role,
  message,
}: Props) {
  const isUser = role === "user";

  function copyMessage() {
    navigator.clipboard.writeText(message);
  }

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl border px-5 py-4 shadow-sm ${
          isUser
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-zinc-700 bg-zinc-900 text-gray-100"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm font-semibold">
            {isUser ? "👤 You" : "🤖 Gemini"}
          </span>

          {!isUser && (
            <button
              onClick={copyMessage}
              className="rounded-md bg-zinc-800 px-2 py-1 text-xs hover:bg-zinc-700"
            >
              📋 Copy
            </button>
          )}

        </div>

        <div className="prose prose-invert max-w-none text-sm">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({
                inline,
                className,
                children,
                ...props
              }: any) {
                const match = /language-(\w+)/.exec(
                  className || ""
                );

                if (!inline && match) {
                  return (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      showLineNumbers
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }

                return (
                  <code
                    className="rounded bg-zinc-800 px-1 py-0.5"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message}
          </ReactMarkdown>

        </div>

      </div>
    </div>
  );
}