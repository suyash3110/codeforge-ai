"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownViewer({
  content,
}: Props) {

  return (

    <div className="prose prose-invert max-w-none rounded-xl border border-zinc-800 bg-zinc-950 p-6">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >

        {content}

      </ReactMarkdown>

    </div>

  );

}