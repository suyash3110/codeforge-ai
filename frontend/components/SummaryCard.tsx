interface SummaryCardProps {
  icon: string;
  title: string;
  value: string | number;
}

export default function SummaryCard({
  icon,
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition duration-300 hover:border-blue-500 hover:scale-105">

      <div className="text-3xl">
        {icon}
      </div>

      <p className="mt-4 text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}