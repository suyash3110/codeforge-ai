"use client";

interface FileItem {
  name: string;
  path: string;
  extension: string;
  size: number;
}

interface Props {
  files: FileItem[];
  selectedFile: string;
  onSelect: (path: string) => void;
}

export default function FileExplorer({
  files,
  selectedFile,
  onSelect,
}: Props) {
  return (
    <div className="h-[650px] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

      <h2 className="mb-4 text-xl font-bold">
        📂 Repository Explorer
      </h2>

      <div className="space-y-2">

        {files.map((file) => (
          <button
            key={file.path}
            onClick={() => onSelect(file.path)}
            className={`w-full rounded-lg px-3 py-2 text-left transition ${
              selectedFile === file.path
                ? "bg-blue-600 text-white"
                : "hover:bg-zinc-800"
            }`}
          >
            {file.name}
          </button>
        ))}

      </div>

    </div>
  );
}