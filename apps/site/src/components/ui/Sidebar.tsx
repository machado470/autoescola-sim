export default function Sidebar() {
  return (
    <aside className="w-56 bg-black h-screen p-4 text-white">
      <nav className="flex flex-col gap-3">
        <a href="/dashboard">Dashboard</a>
        <a href="/auth">Login</a>
      </nav>
    </aside>
  );
}
