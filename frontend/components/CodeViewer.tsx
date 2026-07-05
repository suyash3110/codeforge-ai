"use client";

interface Props {
  fileName: string;
  content: string;
}

export default function CodeViewer({
  fileName,
  content,
}: Props) {
  return (
    <div className="h-[650px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="border-b border-zinc-800 px-6 py-4 text-xl font-bold">
        📄 {fileName || "No file selected"}
      </div>

      <pre className="h-full overflow-auto bg-black p-6 text-sm leading-6 text-green-300">
        <code>
          {content}
        </code>
      </pre>

    </div>
  );
}