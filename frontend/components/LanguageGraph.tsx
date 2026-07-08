"use client";

import { useMemo, useState } from "react";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  Node,
  Edge,
  OnNodeClick,
} from "reactflow";

import "reactflow/dist/style.css";

import NodeInfo from "./NodeInfo";

interface Props {
  repository: string;
  languages: Record<string, number>;
}

export default function ArchitectureGraph({
  repository,
  languages,
}: Props) {

  const [selected, setSelected] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const { nodes, edges } = useMemo(() => {

    const nodes: Node[] = [
      {
        id: "repo",
        position: { x: 380, y: 20 },
        data: {
          label: `📦 ${repository}`,
        },
        style: {
          background: "#2563eb",
          color: "white",
          borderRadius: 12,
          padding: 12,
          fontWeight: "bold",
        },
      },
    ];

    const edges: Edge[] = [];

    Object.entries(languages).forEach(
      ([language, files], index) => {

        const id = `lang-${index}`;

        nodes.push({
          id,
          position: {
            x: 100 + index * 180,
            y: 180,
          },
          data: {
            label: `${language}\n${files} files`,
          },
          style: {
            background: "#18181b",
            color: "white",
            border: "1px solid #3f3f46",
            borderRadius: 12,
            padding: 10,
          },
        });

        edges.push({
          id: `e-${id}`,
          source: "repo",
          target: id,
          animated: true,
        });

      }
    );

    return {
      nodes,
      edges,
    };

  }, [repository, languages]);

  const handleNodeClick: OnNodeClick = (_, node) => {

    if (node.id === "repo") {

      setSelected({
        title: repository,
        description: `Repository contains ${Object.keys(languages).length} languages.`,
      });

      return;

    }

    const language = node.data.label
      .toString()
      .split("\n")[0];

    const files = languages[language];

    setSelected({
      title: language,
      description: `Contains ${files} source files.`,
    });

  };

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <h2 className="mb-5 text-2xl font-bold">
        🏗 Repository Architecture
      </h2>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8">

          <div className="h-[520px] rounded-xl overflow-hidden">

            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              onNodeClick={handleNodeClick}
            >

              <MiniMap />

              <Controls />

              <Background />

            </ReactFlow>

          </div>

        </div>

        <div className="col-span-4">

          {selected ? (

            <NodeInfo
              title={selected.title}
              description={selected.description}
            />

          ) : (

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-400">
              Click any node to inspect it.
            </div>

          )}

        </div>

      </div>

    </div>

  );

}