export default function RepoInput() {
  return (
    <div className="mt-12 w-full max-w-3xl flex flex-col md:flex-row gap-4">

      <input
        type="text"
        placeholder="Paste your GitHub repository URL..."
        className="flex-1 rounded-xl bg-zinc-900 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-blue-500"
      />

      <button className="rounded-xl bg-blue-600 hover:bg-blue-700 transition px-8 py-4 font-semibold">
        Analyze Repository
      </button>

    </div>
  );
}