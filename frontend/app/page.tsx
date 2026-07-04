import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RepositoryForm from "@/components/RepositoryForm";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6">

        <section className="py-24">
          <Hero />
        </section>

        <section className="pb-20">
          <RepositoryForm />
        </section>

        <section className="pb-24">
          <FeatureGrid />
        </section>

      </div>

      <Footer />
    </main>
  );
}