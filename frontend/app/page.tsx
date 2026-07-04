import Hero from "@/components/Hero";
import RepoInput from "@/components/RepoInput";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <Hero />

      <RepoInput />

    </main>
  );
}