"use client";

interface Issue {
  severity: string;
  type: string;
  line: number;
  message: string;
}

interface Props {
  report: Record<string, Issue[]>;
}

export default function SecurityReport({
  report,
}: Props) {

  const files = Object.keys(report);

  if (files.length === 0) {

    return (
      <div className="rounded-xl border border-green-600 bg-green-950 p-6">

        <h2 className="text-2xl font-bold text-green-400">
          ✅ No Security Issues Found
        </h2>

      </div>
    );

  }

  return (

    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-3xl font-bold mb-6">
        🔒 Security Report
      </h2>

      {files.map((file) => (

        <div
          key={file}
          className="mb-8"
        >

          <h3 className="text-xl font-semibold text-blue-400 mb-4">

            {file}

          </h3>

          {report[file].map((issue, index) => (

            <div
              key={index}
              className="mb-4 rounded-xl border border-red-700 bg-red-950 p-4"
            >

              <div className="font-bold text-red-400">

                {issue.severity}

              </div>

              <div className="mt-2">

                {issue.type}

              </div>

              <div>

                Line: {issue.line}

              </div>

              <div className="mt-2 text-gray-300">

                {issue.message}

              </div>

            </div>

          ))}

        </div>

      ))}

    </div>

  );

}