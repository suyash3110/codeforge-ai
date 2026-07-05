"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
  action: string;
  content: string;
  time: string;
}

interface Props {
  result: string;
  loading: boolean;
  error?: string;
  action?: string;
  onClear?: () => void;
}

export default function AIAssistant({
  result,
  loading,
  error,
  action,
  onClear,
}: Props) {
  const [history, setHistory] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result || !action) return;

    setHistory((prev) => {
      if (
        prev.length &&
        prev[prev.length - 1].content === result
      ) {
        return prev;
      }

      return [
        ...prev,
        {
          action,
          content: result,
          time: new Date().toLocaleTimeString(),
        },
      ];
    });
  }, [result, action]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history]);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  function download(text: string, file: string) {
    const blob = new Blob([text], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = file;

    a.click();

    URL.revokeObjectURL(url);
  }

  function clearHistory() {
    setHistory([]);
    onClear?.();
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

        <div>

          <h2 className="text-2xl font-bold">
            🤖 AI Assistant
          </h2>

          <p className="text-sm text-gray-400">
            AI Response History
          </p>

        </div>

        <button
          onClick={clearHistory}
          className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
        >
          Clear History
        </button>

      </div>

      <div className="h-[550px] overflow-y-auto p-6">

        {loading && (

          <div className="flex flex-col items-center gap-5 py-24">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

            <p className="text-blue-400">

              Gemini is thinking...

            </p>

          </div>

        )}

        {!loading &&
          !error &&
          history.length === 0 && (

            <div className="py-20 text-center text-gray-500">

              Run any AI action to start.

            </div>

          )}

        {error && (

          <div className="rounded-xl border border-red-500 bg-red-950 p-5">

            <h2 className="font-bold text-red-300">

              Error

            </h2>

            <p className="mt-3">

              {error}

            </p>

          </div>

        )}

        <div className="space-y-8">

          {history.map((item, index) => (

            <div
              key={index}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
            >

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold">

                    {item.action}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {item.time}

                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => copy(item.content)}
                    className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() =>
                      download(
                        item.content,
                        `${item.action}.md`
                      )
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                  >
                    ⬇ Download
                  </button>

                </div>

              </div>

              <div className="prose prose-invert max-w-none">

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({
                      inline,
                      className,
                      children,
                    }: any) {

                      const match =
                        /language-(\w+)/.exec(
                          className || ""
                        );

                      if (!inline && match) {

                        return (

                          <SyntaxHighlighter
                            language={match[1]}
                            style={atomDark}
                            showLineNumbers
                          >

                            {String(children).replace(/\n$/, "")}

                          </SyntaxHighlighter>

                        );

                      }

                      return (
                        <code className="rounded bg-zinc-800 px-1 py-0.5">
                          {children}
                        </code>
                      );

                    },
                  }}
                >

                  {item.content}

                </ReactMarkdown>

              </div>

            </div>

          ))}

          <div ref={bottomRef} />

        </div>

      </div>

    </div>
  );
}