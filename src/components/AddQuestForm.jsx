import { useState } from 'react';

function AddQuestForm({ onAdd, onClose }) {

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = () => {
    if (!title || !subject) return; // don't add empty quests
    
    onAdd({
      id: Date.now(), // unique id using timestamp
      title,
      subject,
      difficulty,
      status: 'todo'
    });

    onClose(); // close the form after adding
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#111118] border border-[#00ff88]/30 rounded-lg p-6 w-full max-w-md">
        
        <h2 className="text-[#00ff88] font-bold text-lg mb-6 font-mono tracking-widest">
          ⚡ NEW QUEST
        </h2>

        {/* Title input */}
        <div className="mb-4">
          <label className="text-[#00ff88]/60 text-xs font-mono mb-2 block tracking-widest">
            QUEST TITLE
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What will you learn?"
            className="w-full bg-[#0a0a0f] border border-[#00ff88]/20 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
          />
        </div>

        {/* Subject input */}
        <div className="mb-4">
          <label className="text-[#00ff88]/60 text-xs font-mono mb-2 block tracking-widest">
            SUBJECT
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="React, CSS, JavaScript..."
            className="w-full bg-[#0a0a0f] border border-[#00ff88]/20 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
          />
        </div>

        {/* Difficulty select */}
        <div className="mb-6">
          <label className="text-[#00ff88]/60 text-xs font-mono mb-2 block tracking-widest">
            DIFFICULTY
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-[#0a0a0f] border border-[#00ff88]/20 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
          >
            <option value="easy">EASY — +10 XP</option>
            <option value="hard">HARD — +25 XP</option>
            <option value="legendary">LEGENDARY — +50 XP</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-[#00ff88] text-black font-bold text-sm rounded hover:bg-[#00ff88]/80 transition-all"
          >
            + ADD QUEST
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 border border-red-500/40 text-red-500 text-sm font-bold rounded hover:bg-red-500 hover:text-black transition-all"
          >
            CANCEL
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddQuestForm;