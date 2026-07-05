import Hero from "@/components/Hero";
import RepositoryForm from "@/components/RepositoryForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black px-8 py-16 text-white">

      <Hero />

      <div className="mt-20">
        <RepositoryForm />
      </div>

    </main>
  );
}