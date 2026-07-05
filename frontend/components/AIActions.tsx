"use client";

interface Props {
  loading: boolean;
  onExplain: () => void;
  onReview: () => void;
  onTests: () => void;
  onOptimize: () => void;
  onRepositoryReview: () => void;
}

export default function AIActions({
  loading,
  onExplain,
  onReview,
  onTests,
  onOptimize,
  onRepositoryReview,
}: Props) {
  return (
    <div className="grid grid-cols-5 gap-4">

      <button
        disabled={loading}
        onClick={onExplain}
        className="rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        Explain
      </button>

      <button
        disabled={loading}
        onClick={onReview}
        className="rounded-xl bg-purple-600 py-3 font-semibold hover:bg-purple-700 disabled:opacity-50"
      >
        Review
      </button>

      <button
        disabled={loading}
        onClick={onTests}
        className="rounded-xl bg-green-600 py-3 font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        Tests
      </button>

      <button
        disabled={loading}
        onClick={onOptimize}
        className="rounded-xl bg-orange-600 py-3 font-semibold hover:bg-orange-700 disabled:opacity-50"
      >
        Optimize
      </button>

      <button
        disabled={loading}
        onClick={onRepositoryReview}
        className="rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700 disabled:opacity-50"
      >
        Review Repository
      </button>

    </div>
  );
}