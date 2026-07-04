import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "AI Code Review",
    description: "Review your repository using AI.",
  },
  {
    title: "README Generator",
    description: "Generate professional documentation.",
  },
  {
    title: "Bug Detection",
    description: "Find issues automatically.",
  },
  {
    title: "Chat with Repository",
    description: "Ask questions about your code.",
  },
  {
    title: "Unit Test Generator",
    description: "Generate production-ready tests.",
  },
  {
    title: "Architecture Analysis",
    description: "Understand project architecture.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}