interface Props {
  bug: {
    severity: string;
    title: string;
    line: number;
    description: string;
    fix: string;
  };
}

export default function BugCard({ bug }: Props) {
  const color =
    bug.severity === "HIGH"
      ? "border-red-500"
      : bug.severity === "MEDIUM"
      ? "border-yellow-500"
      : "border-green-500";

  return (
    <div className={`rounded-xl border-2 ${color} bg-zinc-900 p-5`}>

      <div className="flex justify-between">

        <h2 className="font-bold">
          {bug.title}
        </h2>

        <span>
          {bug.severity}
        </span>

      </div>

      <p className="mt-3">
        Line {bug.line}
      </p>

      <p className="mt-4">
        {bug.description}
      </p>

      <div className="mt-4 rounded-lg bg-zinc-800 p-3">

        <strong>Suggested Fix</strong>

        <p className="mt-2">
          {bug.fix}
        </p>

      </div>

    </div>
  );
}