export default function Hero() {
  return (
    <div className="text-center">

      <h1 className="text-6xl md:text-7xl font-extrabold">
        CodeForge <span className="text-blue-500">AI</span>
      </h1>

      <p className="mt-6 text-xl text-gray-400">
        Analyze, understand and interact with any GitHub repository using AI.
      </p>

      <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
        Analyze GitHub repositories, generate documentation, review code,
        detect bugs, explain architecture, and chat with your entire codebase
        using Retrieval-Augmented Generation (RAG) powered by Gemini AI.
      </p>

    </div>
  );
}