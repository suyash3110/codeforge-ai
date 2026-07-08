"use client";

import MetricsCard from "./MetricsCard";

interface Props {

  metrics: any;

}

export default function RepositoryDashboard({

  metrics,

}: Props) {

  if (!metrics) return null;

  return (

    <div className="grid grid-cols-4 gap-5">

      <MetricsCard
        title="Files"
        value={metrics.files}
        color="border-blue-700"
      />

      <MetricsCard
        title="Functions"
        value={metrics.functions}
        color="border-green-700"
      />

      <MetricsCard
        title="Classes"
        value={metrics.classes}
        color="border-yellow-700"
      />

      <MetricsCard
        title="Security"
        value={metrics.security_issues}
        color="border-red-700"
      />

      <MetricsCard
        title="Dependencies"
        value={metrics.dependencies}
        color="border-purple-700"
      />

      <MetricsCard
        title="Lines"
        value={metrics.lines_of_code}
        color="border-pink-700"
      />

      <MetricsCard
        title="Languages"
        value={Object.keys(metrics.languages).length}
        color="border-cyan-700"
      />

      <MetricsCard
        title="Extensions"
        value={Object.keys(metrics.languages).join(", ")}
        color="border-orange-700"
      />

    </div>

  );

}