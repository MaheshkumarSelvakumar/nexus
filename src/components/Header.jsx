function Header({ onAddClick, onLogout, userName }) {
  return (
    <header className="flex items-center justify-between px-6 py-2 border-b border-[#00ff88]/20">

      <img
        src="/nexus-logo.png"
        alt="NEXUS"
        className="w-12 h-12"
        style={{
          filter: 'drop-shadow(0 0 12px #00ff88) drop-shadow(0 0 24px #00ff88)'
        }}
      />

      {/* User name in the middle */}
      {userName && (
        <span className="text-[#00ff88]/60 text-xs font-mono tracking-widest">
          {userName.toUpperCase()}
        </span>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onLogout}
          className="px-3 py-1.5 border border-[#00ff88]/20 text-[#00ff88]/40 text-xs font-bold rounded hover:border-red-500 hover:text-red-500 transition-all duration-300"
        >
          LOGOUT
        </button>
        <button
          onClick={onAddClick}
          className="px-3 py-1.5 border border-[#00ff88] text-[#00ff88] text-sm font-bold rounded hover:bg-[#00ff88] hover:text-black transition-all duration-300"
        >
          + ADD QUEST
        </button>
      </div>

    </header>
  );
}

export default Header;