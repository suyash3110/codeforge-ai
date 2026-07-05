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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

      <SummaryCard
        title="Repository"
        value={summary.repository}
      />

      <SummaryCard
        title="Files"
        value={summary.total_files}
      />

      <SummaryCard
        title="Chunks"
        value={totalChunks}
      />

      <SummaryCard
        title="README"
        value={summary.has_readme ? "Yes" : "No"}
      />

      <SummaryCard
        title="License"
        value={summary.has_license ? "Yes" : "No"}
      />

      <SummaryCard
        title="Docker"
        value={summary.has_docker ? "Yes" : "No"}
      />

      <SummaryCard
        title="Largest File"
        value={summary.largest_file}
      />

      <SummaryCard
        title="Repository Size"
        value={`${(summary.repository_size_bytes / 1024).toFixed(1)} KB`}
      />

    </div>
  );
}