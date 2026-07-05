"use client";

import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

interface Props {
  fileName: string;
  content: string;
}

export default function MonacoViewer({
  fileName,
  content,
}: Props) {
  const [fontSize, setFontSize] = useState(14);

  const [theme, setTheme] = useState<"vs-dark" | "vs-light">("vs-dark");

  const containerRef = useRef<HTMLDivElement>(null);

  function language() {
    const ext = fileName.split(".").pop();

    switch (ext) {
      case "py":
        return "python";
      case "js":
        return "javascript";
      case "jsx":
        return "javascript";
      case "ts":
        return "typescript";
      case "tsx":
        return "typescript";
      case "cpp":
        return "cpp";
      case "c":
        return "c";
      case "java":
        return "java";
      case "go":
        return "go";
      case "rs":
        return "rust";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      case "md":
        return "markdown";
      default:
        return "plaintext";
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(content);
  }

  function downloadFile() {
    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = fileName || "code.txt";

    a.click();

    URL.revokeObjectURL(url);
  }

  async function fullscreen() {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await containerRef.current.requestFullscreen();
    }
  }

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

        <h2 className="text-xl font-bold">
          📄 {fileName || "No file selected"}
        </h2>

        <div className="flex gap-3">

          <button
            onClick={() => setFontSize((f) => Math.max(10, f - 1))}
            className="rounded bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
          >
            A-
          </button>

          <button
            onClick={() => setFontSize((f) => Math.min(26, f + 1))}
            className="rounded bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
          >
            A+
          </button>

          <button
            onClick={() =>
              setTheme((t) =>
                t === "vs-dark" ? "vs-light" : "vs-dark"
              )
            }
            className="rounded bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
          >
            🌓 Theme
          </button>

          <button
            onClick={copyCode}
            className="rounded bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
          >
            📋 Copy
          </button>

          <button
            onClick={downloadFile}
            className="rounded bg-blue-600 px-3 py-2 hover:bg-blue-700"
          >
            ⬇ Download
          </button>

          <button
            onClick={fullscreen}
            className="rounded bg-green-600 px-3 py-2 hover:bg-green-700"
          >
            ⛶ Fullscreen
          </button>

        </div>

      </div>

      <Editor
        height="700px"
        language={language()}
        value={content}
        theme={theme}
        options={{
          readOnly: true,
          fontSize,
          minimap: {
            enabled: true,
          },
          folding: true,
          glyphMargin: true,
          automaticLayout: true,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          renderLineHighlight: "all",
          wordWrap: "on",
        }}
      />

    </div>
  );
}