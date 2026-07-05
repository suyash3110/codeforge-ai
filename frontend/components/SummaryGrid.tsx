import SummaryCard from "./SummaryCard";

interface Props {
  summary: any;
  totalChunks: number;
}

export default function SummaryGrid({
  summary,
  totalChunks,
}: Props) {
  return (
    <div className="grid gap-6 mt-12 md:grid-cols-4">

      <SummaryCard
        icon="📂"
        title="Repository"
        value={summary.repository}
      />

      <SummaryCard
        icon="📄"
        title="Files"
        value={summary.total_files}
      />

      <SummaryCard
        icon="📦"
        title="Chunks"
        value={totalChunks}
      />

      <SummaryCard
        icon="💻"
        title="Language"
        value={Object.keys(summary.languages)[0]}
      />

      <SummaryCard
        icon="📖"
        title="README"
        value={summary.has_readme ? "Yes" : "No"}
      />

      <SummaryCard
        icon="📜"
        title="License"
        value={summary.has_license ? "Yes" : "No"}
      />

      <SummaryCard
        icon="🐳"
        title="Docker"
        value={summary.has_docker ? "Yes" : "No"}
      />

      <SummaryCard
        icon="💾"
        title="Repository Size"
        value={`${(summary.repository_size_bytes / 1024).toFixed(1)} KB`}
      />

    </div>
  );
}