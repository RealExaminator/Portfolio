export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#14110f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ikenna Ihetu</p>
        <p>Technical Solutions Specialist · Helsinki</p>
      </div>
    </footer>
  );
}
