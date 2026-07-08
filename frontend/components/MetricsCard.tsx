interface Props {
  title: string;
  value: string | number;
  color: string;
}

export default function MetricsCard({
  title,
  value,
  color,
}: Props) {

  return (

    <div
      className={`rounded-xl border ${color} bg-zinc-900 p-6`}
    >

      <div className="text-gray-400">

        {title}

      </div>

      <div className="mt-3 text-4xl font-bold">

        {value}

      </div>

    </div>

  );

}