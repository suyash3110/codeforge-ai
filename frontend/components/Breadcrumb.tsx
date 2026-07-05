"use client";

interface Props {
  path: string;
}

export default function Breadcrumb({ path }: Props) {
  if (!path)
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-gray-500">
        No file selected
      </div>
    );

  const parts = path.split(/[/\\]/);

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">

      <div className="flex items-center gap-2 whitespace-nowrap">

        {parts.map((part, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <span className="text-gray-300">
              {part}
            </span>

            {index !== parts.length - 1 && (
              <span className="text-gray-600">
                /
              </span>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}