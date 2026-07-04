type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-blue-500 transition">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="mt-3 text-gray-400">
        {description}
      </p>
    </div>
  );
}