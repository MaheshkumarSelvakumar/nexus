function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#00ff88]/20">
      
      {/* Left side — logo + name */}
      <div className="flex items-center gap-4">
        <img 
          src="/nexus-logo.png" 
          alt="NEXUS"
          className="w-10 h-10"
          style={{ filter: 'drop-shadow(0 0 8px #00ff88)' }}
        />
        <h1 className="text-2xl font-bold text-[#00ff88]">
          NEXUS
        </h1>
      </div>

      {/* Right side — add quest button */}
      <button className="px-4 py-2 border border-[#00ff88] text-[#00ff88] font-bold rounded hover:bg-[#00ff88] hover:text-black transition-all duration-300">
        + ADD QUEST
      </button>

    </header>
  );
}

export default Header;