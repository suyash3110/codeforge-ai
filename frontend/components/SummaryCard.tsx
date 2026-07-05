interface SummaryCardProps {
  title: string;
  value: string | number;
}

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-sm text-gray-400">
        {title}
      </h3>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}