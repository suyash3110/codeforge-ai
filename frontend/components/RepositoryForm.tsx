"use client";

import { useState } from "react";

import { analyzeRepository } from "@/lib/api";

import SummaryGrid from "./SummaryGrid";
import RepositoryWorkspace from "./RepositoryWorkspace";
import ArchitectureGraph from "./ArchitectureGraph";

export default function RepositoryForm() {
  const [repoUrl, setRepoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [repository, setRepository] = useState<any>(null);

  async function handleAnalyze() {
    if (!repoUrl.trim()) {
      alert("Please enter a GitHub repository URL.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeRepository(repoUrl);

      setRepository(response);
    } catch (err) {
      console.error(err);
      alert("Repository analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="text-center text-4xl font-bold">
          Analyze GitHub Repository
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Paste any public GitHub repository below.
        </p>

        <input
          className="mt-8 w-full rounded-xl border border-zinc-700 bg-black px-6 py-5 text-lg outline-none focus:border-blue-500"
          placeholder="https://github.com/pallets/flask"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 py-5 text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-700"
        >
          {loading ? "Analyzing Repository..." : "Analyze Repository"}
        </button>

      </div>

      {repository && (
        <div className="space-y-10 mt-10">

          <SummaryGrid
            summary={repository.summary}
            totalChunks={repository.total_chunks}
          />

          <ArchitectureGraph
            repository={repository.summary.repository}
            languages={repository.summary.languages}
          />

          <RepositoryWorkspace />

        </div>
      )}

    </div>
  );
}