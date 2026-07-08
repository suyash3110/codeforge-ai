"use client";

import { useState } from "react";

import { semanticSearch } from "@/lib/api";

interface Props {
  onOpenFile?: (path: string) => void;
}

export default function SemanticSearch({
  onOpenFile,
}: Props) {

  const [query, setQuery] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState("");

  async function search() {

    if (!query.trim()) return;

    try {

      setLoading(true);

      const response =
        await semanticSearch(query);

      setResults(response.results);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-2xl font-bold mb-5">

        🔍 Semantic Search

      </h2>

      <div className="flex gap-3">

        <input
          value={query}
          onChange={(e)=>
            setQuery(e.target.value)
          }
          placeholder="Search repository..."
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
        />

        <button
          onClick={search}
          className="rounded-lg bg-blue-600 px-6 hover:bg-blue-700"
        >

          Search

        </button>

      </div>

      {loading && (

        <p className="mt-5">

          Searching...

        </p>

      )}

      {!!results && (

        <pre className="mt-6 overflow-auto rounded-xl bg-zinc-950 p-5 whitespace-pre-wrap">

          {results}

        </pre>

      )}

    </div>

  );

}