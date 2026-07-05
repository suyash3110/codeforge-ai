"use client";

import { useMemo, useRef, useState } from "react";
import { Tree, NodeApi, TreeApi } from "react-arborist";
import {
  FaFolder,
  FaFolderOpen,
  FaSearch,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { FileIcon, defaultStyles } from "react-file-icon";

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  path?: string;
}

interface Props {
  data: TreeNode[];
  selectedFile: string;
  onFileSelect: (path: string) => void;
}

function extension(name: string) {
  return name.split(".").pop() || "";
}

function countFiles(nodes: TreeNode[]): number {
  let total = 0;

  for (const node of nodes) {
    if (node.children) total += countFiles(node.children);
    else total++;
  }

  return total;
}

export default function FileTree({
  data,
  selectedFile,
  onFileSelect,
}: Props) {
  const treeRef = useRef<TreeApi<TreeNode> | null>(null);

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return data;

    function filter(nodes: TreeNode[]): TreeNode[] {
      return nodes
        .map((node) => {
          if (node.children) {
            const children = filter(node.children);

            if (
              children.length ||
              node.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return {
                ...node,
                children,
              };
            }

            return null;
          }

          if (
            node.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return node;
          }

          return null;
        })
        .filter(Boolean) as TreeNode[];
    }

    return filter(data);
  }, [data, search]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="border-b border-zinc-800 p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">
            📂 Explorer
          </h2>

          <span className="rounded bg-zinc-800 px-3 py-1 text-sm">
            {countFiles(data)} Files
          </span>

        </div>

        <div className="mt-4 flex gap-2">

          <button
            onClick={() => treeRef.current?.openAll()}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
          >
            <FaExpand />
            Expand
          </button>

          <button
            onClick={() => treeRef.current?.closeAll()}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
          >
            <FaCompress />
            Collapse
          </button>

        </div>

        <div className="relative mt-5">

          <FaSearch className="absolute left-3 top-3 text-gray-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search file..."
            className="w-full rounded-lg border border-zinc-700 bg-black py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />

        </div>

      </div>

      <div className="h-[650px]">

        <Tree<TreeNode>
          ref={treeRef}
          data={filtered}
          width={"100%"}
          height={650}
          rowHeight={34}
          indent={22}
        >
          {({
            node,
            style,
          }: {
            node: NodeApi<TreeNode>;
            style: React.CSSProperties;
          }) => {
            const folder = node.isInternal;

            const active =
              node.data.path === selectedFile;

            return (
              <div
                style={style}
                onClick={() => {
                  if (folder) {
                    node.toggle();
                  } else if (node.data.path) {
                    onFileSelect(node.data.path);
                  }
                }}
                className={`mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-zinc-800"
                }`}
              >
                {folder ? (
                  node.isOpen ? (
                    <FaFolderOpen
                      className="text-yellow-400"
                    />
                  ) : (
                    <FaFolder
                      className="text-yellow-400"
                    />
                  )
                ) : (
                  <div className="h-5 w-5">
                    <FileIcon
                      extension={extension(node.data.name)}
                      {...defaultStyles[
                        extension(node.data.name)
                      ]}
                    />
                  </div>
                )}

                <span className="truncate">
                  {node.data.name}
                </span>
              </div>
            );
          }}
        </Tree>

      </div>

    </div>
  );
}