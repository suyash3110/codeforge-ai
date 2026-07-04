export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-10 absolute top-0">
      <h1 className="text-2xl font-bold">CodeForge AI</h1>

      <button className="border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900 transition">
        GitHub
      </button>
    </nav>
  );
}