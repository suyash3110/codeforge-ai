interface Props {
  title: string;
  description: string;
}

export default function NodeInfo({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-xl border border-blue-600 bg-zinc-900 p-5">
      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-zinc-300">
        {description}
      </p>
    </div>
  );
}