function QuestCard({ quest, onDelete, onStart, onComplete }) {

  const difficultyConfig = {
    easy:      { label: 'EASY',      xp: 10,  color: '#00ff88' },
    hard:      { label: 'HARD',      xp: 25,  color: '#06b6d4' },
    legendary: { label: 'LEGENDARY', xp: 50,  color: '#7c3aed' },
  };

  const config = difficultyConfig[quest.difficulty];

  return (
    <div className="bg-[#111118] border border-[#00ff88]/20 rounded-lg p-4 hover:border-[#00ff88]/60 transition-all duration-300">
      
      {/* Difficulty badge */}
      <div className="flex justify-between items-center mb-3">
        <span 
          className="text-xs font-bold px-2 py-1 rounded border"
          style={{ color: config.color, borderColor: config.color }}
        >
          {config.label}
        </span>
        <span className="text-xs font-mono" style={{ color: config.color }}>
          +{config.xp} XP
        </span>
      </div>

      {/* Quest title */}
      <h3 className="text-white font-bold mb-2 text-sm">
        {quest.title}
      </h3>

      {/* Subject */}
      <p className="text-[#00ff88]/40 text-xs font-mono mb-4">
        {quest.subject}
      </p>

      {/* Buttons — change based on status */}
      <div className="flex gap-2">
        
        {quest.status === "todo" && (
          <button
            onClick={() => onStart(quest.id)}
            className="flex-1 py-1.5 text-xs font-bold border border-[#00ff88]/40 text-[#00ff88] rounded hover:bg-[#00ff88] hover:text-black transition-all duration-300"
          >
            START
          </button>
        )}

        {quest.status === "inprogress" && (
          <button
            onClick={() => onComplete(quest.id)}
            className="flex-1 py-1.5 text-xs font-bold border border-[#7c3aed]/40 text-[#7c3aed] rounded hover:bg-[#7c3aed] hover:text-white transition-all duration-300"
          >
            COMPLETE ⚡
          </button>
        )}

        {quest.status === "done" && (
          <div className="flex-1 py-1.5 text-xs font-bold text-center text-[#00ff88]/40">
            ✅ COMPLETED
          </div>
        )}

        <button
          onClick={() => onDelete(quest.id)}
          className="py-1.5 px-3 text-xs font-bold border border-red-500/40 text-red-500 rounded hover:bg-red-500 hover:text-black transition-all duration-300"
        >
          ✕
        </button>

      </div>
    </div>
  );
}

export default QuestCard;