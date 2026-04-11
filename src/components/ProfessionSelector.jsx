import { useState } from 'react';

function ProfessionSelector({ onSelect }) {

  const [customProfession, setCustomProfession] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const professions = [
    { id: "webdev",   icon: "fa-solid fa-code",          label: "Web Developer" },
    { id: "designer", icon: "fa-solid fa-pen-ruler",      label: "UI/UX Designer" },
    { id: "data",     icon: "fa-solid fa-chart-line",     label: "Data Scientist" },
    { id: "security", icon: "fa-solid fa-shield-halved",  label: "Cybersecurity" },
    { id: "mobile",   icon: "fa-solid fa-mobile-screen",  label: "Mobile Developer" },
    { id: "gamedev",  icon: "fa-solid fa-gamepad",        label: "Game Developer" },
  ];

  const handleCustomSubmit = () => {
    if (!customProfession.trim()) return;
    onSelect("custom_" + customProfession.trim());
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
      <div className="max-w-lg w-full px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <img
            src="/nexus-logo.png"
            alt="NEXUS"
            className="w-20 h-20 mx-auto mb-6"
            style={{ filter: 'drop-shadow(0 0 20px #00ff88)' }}
          />
          <h1 className="text-3xl font-bold text-[#00ff88] mb-2 tracking-widest">
            WELCOME TO NEXUS
          </h1>
          <p className="text-[#00ff88]/40 text-sm tracking-widest">
            CHOOSE YOUR LEARNING PATH
          </p>
        </div>

        {/* Profession grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {professions.map(prof => (
            <button
              key={prof.id}
              onClick={() => onSelect(prof.id)}
              className="bg-[#111118] border border-[#00ff88]/20 rounded-lg p-4 text-left hover:border-[#00ff88] hover:bg-[#00ff88]/5 transition-all duration-300 group"
            >
              {/* Cyberpunk icon */}
              <div className="mb-3 w-10 h-10 rounded border border-[#00ff88]/30 flex items-center justify-center group-hover:border-[#00ff88] transition-all"
                style={{ boxShadow: '0 0 8px rgba(0,255,136,0.1)' }}>
                <i className={`${prof.icon} text-[#00ff88] text-lg`}></i>
              </div>
              <div className="text-white font-bold text-sm tracking-wider group-hover:text-[#00ff88] transition-colors">
                {prof.label}
              </div>
            </button>
          ))}
        </div>

        {/* Custom profession */}
        {!showCustom ? (
          <button
            onClick={() => setShowCustom(true)}
            className="w-full py-3 border border-[#00ff88]/20 text-[#00ff88]/60 text-sm tracking-widest rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300"
          >
            <i className="fa-solid fa-pen mr-2"></i>
            CREATE YOUR OWN PATH
          </button>
        ) : (
          <div className="flex gap-3">
            <input
              type="text"
              value={customProfession}
              onChange={(e) => setCustomProfession(e.target.value)}
              placeholder="e.g. Musician, Doctor, Chef..."
              className="flex-1 bg-[#111118] border border-[#00ff88]/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00ff88] transition-all"
            />
            <button
              onClick={handleCustomSubmit}
              className="px-6 py-3 bg-[#00ff88] text-black font-bold text-sm rounded-lg hover:bg-[#00ff88]/80 transition-all"
            >
              START
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProfessionSelector;