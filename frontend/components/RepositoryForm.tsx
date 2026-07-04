"use client";

import { useState } from "react";
import { analyzeRepository } from "@/lib/api";

export default function RepositoryForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter a GitHub repository URL");
      return;
    }

    try {
      setLoading(true);

      const data = await analyzeRepository(repoUrl);

      console.log(data);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-xl">

        <h2 className="text-3xl font-bold text-center">
          Analyze a GitHub Repository
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-8">
          Paste any public GitHub repository URL below.
        </p>

        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/pallets/flask"
          className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-blue-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold transition hover:bg-blue-700 disabled:bg-gray-700"
        >
          {loading ? "Analyzing..." : "Analyze Repository"}
        </button>

      </div>

      {result && (

        <div className="mt-10 bg-zinc-900 rounded-2xl p-8 border border-zinc-800">

          <h2 className="text-2xl font-bold mb-6">
            Repository Summary
          </h2>

          <pre className="text-sm overflow-auto whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>

        </div>

      )}

    </div>
  );
}