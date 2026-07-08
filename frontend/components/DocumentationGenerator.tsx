"use client";

import { useState } from "react";
import { generateDocumentation } from "@/lib/api";
import MarkdownViewer from "./MarkdownViewer";

export default function DocumentationGenerator() {

  const [loading, setLoading] = useState(false);

  const [docs, setDocs] = useState("");

  async function generate() {

    try {

      setLoading(true);

      const response = await generateDocumentation();

      setDocs(response.answer);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          📄 AI Documentation
        </h2>

        <button
          onClick={generate}
          className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
        >
          Generate
        </button>

      </div>

      {loading && (

        <p className="mt-5 text-zinc-400">
          Generating documentation...
        </p>

      )}

      {!!docs && (

        <div className="mt-6">

          <MarkdownViewer
            content={docs}
          />

        </div>

      )}

    </div>

  );

}