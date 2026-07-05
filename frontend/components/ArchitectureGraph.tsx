"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

interface Props {
  repository: string;
  languages: Record<string, number>;
}

export default function ArchitectureGraph({
  repository,
  languages,
}: Props) {

  const nodes: Node[] = [
    {
      id: "repo",
      position: { x: 350, y: 20 },
      data: {
        label: `📦 ${repository}`,
      },
      style: {
        background: "#2563eb",
        color: "white",
        borderRadius: 10,
        padding: 10,
      },
    },
  ];

  const edges: Edge[] = [];

  let y = 150;

  Object.entries(languages).forEach(([language, files], index) => {

    const id = `lang-${index}`;

    nodes.push({
      id,
      position: {
        x: 120 + index * 180,
        y,
      },
      data: {
        label: `${language}\n${files} files`,
      },
      style: {
        background: "#18181b",
        color: "white",
        border: "1px solid #3f3f46",
        borderRadius: 10,
        padding: 10,
      },
    });

    edges.push({
      id: `e-${id}`,
      source: "repo",
      target: id,
      animated: true,
    });

  });

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <h2 className="mb-4 text-2xl font-bold">
        🏗 Repository Architecture
      </h2>

      <div className="h-[500px] rounded-xl overflow-hidden">

        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >

          <MiniMap />

          <Controls />

          <Background />

        </ReactFlow>

      </div>

    </div>

  );

}