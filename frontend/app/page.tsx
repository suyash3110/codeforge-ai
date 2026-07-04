import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RepoInput from "@/components/RepoInput";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6">

      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 mt-32">
        <Hero />
        <RepoInput />
        <FeatureGrid />
        <Footer />
      </div>

    </main>
  );
}