import { useState, useEffect } from 'react';
import Header from './components/Header';
import XPBar from './components/XPBar';
import QuestCard from './components/QuestCard';
import AddQuestForm from './components/AddQuestForm';
import ProfessionSelector from './components/ProfessionSelector';

function App() {

  // ── PROFESSION LEVELS ──
  const professionLevels = {
    webdev:   ["HTML Apprentice", "CSS Warrior", "JS Ninja", "React Master", "Tech Lead"],
    designer: ["Sketch Rookie", "Wireframe Artist", "Prototype Pro", "Design Lead", "Creative Director"],
    data:     ["Data Rookie", "Python Padawan", "ML Explorer", "AI Engineer", "Data Wizard"],
    security: ["Script Kiddie", "Firewall Guard", "Pen Tester", "Security Architect", "Chief Hacker"],
    mobile:   ["App Rookie", "UI Builder", "API Connector", "App Publisher", "Mobile Architect"],
    gamedev:  ["Pixel Rookie", "Unity Apprentice", "Game Designer", "Engine Builder", "Game Director"],
  };

  // ── PROFESSION STATE ──
  const [profession, setProfession] = useState(() => {
    return localStorage.getItem('nexus-profession') || null;
  });

  // ── QUEST STATE ──
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('nexus-quests');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Learn useState Hook", subject: "React", difficulty: "hard", status: "todo" },
      { id: 2, title: "Build Kanban UI", subject: "CSS", difficulty: "legendary", status: "todo" },
      { id: 3, title: "Setup GitHub", subject: "Git", difficulty: "easy", status: "inprogress" },
    ];
  });

  // ── XP STATE ──
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('nexus-xp');
    return saved ? JSON.parse(saved) : 0;
  });

  // ── SHOW FORM STATE ──
  const [showForm, setShowForm] = useState(false);

  // ── LEVEL UP NOTIFICATION STATE ──
  const [levelUpMsg, setLevelUpMsg] = useState(false);

  // ── ADD QUEST ──
  const addQuest = (newQuest) => {
    setQuests([...quests, newQuest]);
  };

  // ── SAVE TO LOCALSTORAGE ──
  useEffect(() => {
    if (profession) {
      localStorage.setItem('nexus-profession', profession);
    }
  }, [profession]);

  useEffect(() => {
    localStorage.setItem('nexus-quests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem('nexus-xp', JSON.stringify(xp));
  }, [xp]);

  // ── LEVEL SYSTEM ──
  const getLevel = (xp) => {
    let titles;

    if (profession && profession.startsWith("custom_")) {
      const name = profession.replace("custom_", "");
      titles = [
        `${name} Rookie`,
        `${name} Apprentice`,
        `${name} Pro`,
        `${name} Expert`,
        `${name} Master`,
      ];
    } else {
      titles = professionLevels[profession] || professionLevels.webdev;
    }

    if (xp < 100)  return { level: 1, title: titles[0] };
    if (xp < 300)  return { level: 2, title: titles[1] };
    if (xp < 600)  return { level: 3, title: titles[2] };
    if (xp < 1000) return { level: 4, title: titles[3] };
    return         { level: 5, title: titles[4] };
  };

  const { level, title } = getLevel(xp);

  // ── XP REWARDS ──
  const xpRewards = { easy: 10, hard: 25, legendary: 50 };

  // ── DELETE QUEST ──
  const deleteQuest = (id) => {
    setQuests(quests.filter(quest => quest.id !== id));
  };

  // ── START QUEST ──
  const startQuest = (id) => {
    setQuests(quests.map(quest =>
      quest.id === id ? { ...quest, status: "inprogress" } : quest
    ));
  };

  // ── COMPLETE QUEST ──
  const completeQuest = (id) => {
    const quest = quests.find(q => q.id === id);
    if (quest) {
      const newXp = xp + xpRewards[quest.difficulty];
      const oldLevel = getLevel(xp).level;
      const newLevel = getLevel(newXp).level;

      if (newLevel > oldLevel) {
        setLevelUpMsg(true);
        setTimeout(() => setLevelUpMsg(false), 3000);
      }

      setXp(newXp);
      setQuests(quests.map(q =>
        q.id === id ? { ...q, status: "done" } : q
      ));
    }
  };

  // ── FILTER QUESTS BY STATUS ──
  const todoQuests = quests.filter(q => q.status === "todo");
  const inProgressQuests = quests.filter(q => q.status === "inprogress");
  const doneQuests = quests.filter(q => q.status === "done");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {!profession && (
        <ProfessionSelector onSelect={(p) => setProfession(p)} />
      )}

      <Header onAddClick={() => setShowForm(true)} />
      <XPBar xp={xp} level={level} title={title} />

      {/* Level up notification */}
      {levelUpMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#00ff88] text-black px-8 py-4 rounded-lg font-bold tracking-widest animate-bounce"
          style={{ boxShadow: '0 0 30px #00ff88' }}>
          LEVEL UP! KEEP GOING!
        </div>
      )}

      {showForm && (
        <AddQuestForm
          onAdd={addQuest}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Three columns */}
      <div className="grid grid-cols-3 gap-6 p-8">

        {/* TODO column */}
        <div>
          <h2 className="text-[#00ff88] font-bold text-sm font-mono mb-4 tracking-widest">
            QUESTS ({todoQuests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {todoQuests.length === 0 ? (
              <div className="border border-dashed border-[#00ff88]/20 rounded-lg p-8 text-center">
                <i className="fa-solid fa-circle-plus text-[#00ff88]/20 text-3xl mb-3 block"></i>
                <p className="text-[#00ff88]/30 text-xs font-mono tracking-widest">NO QUESTS YET</p>
                <p className="text-[#00ff88]/20 text-xs font-mono mt-1">Click + ADD QUEST to begin</p>
              </div>
            ) : (
              todoQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onDelete={deleteQuest}
                  onStart={startQuest}
                  onComplete={completeQuest}
                />
              ))
            )}
          </div>
        </div>

        {/* IN PROGRESS column */}
        <div>
          <h2 className="text-[#06b6d4] font-bold text-sm font-mono mb-4 tracking-widest">
            IN PROGRESS ({inProgressQuests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {inProgressQuests.length === 0 ? (
              <div className="border border-dashed border-[#06b6d4]/20 rounded-lg p-8 text-center">
                <i className="fa-solid fa-bolt text-[#06b6d4]/20 text-3xl mb-3 block"></i>
                <p className="text-[#06b6d4]/30 text-xs font-mono tracking-widest">NO ACTIVE QUESTS</p>
                <p className="text-[#06b6d4]/20 text-xs font-mono mt-1">Start a quest to see it here</p>
              </div>
            ) : (
              inProgressQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onDelete={deleteQuest}
                  onStart={startQuest}
                  onComplete={completeQuest}
                />
              ))
            )}
          </div>
        </div>

        {/* DONE column */}
        <div>
          <h2 className="text-[#7c3aed] font-bold text-sm font-mono mb-4 tracking-widest">
            COMPLETED ({doneQuests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {doneQuests.length === 0 ? (
              <div className="border border-dashed border-[#7c3aed]/20 rounded-lg p-8 text-center">
                <i className="fa-solid fa-trophy text-[#7c3aed]/20 text-3xl mb-3 block"></i>
                <p className="text-[#7c3aed]/30 text-xs font-mono tracking-widest">NO COMPLETED QUESTS</p>
                <p className="text-[#7c3aed]/20 text-xs font-mono mt-1">Complete a quest to earn XP</p>
              </div>
            ) : (
              doneQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onDelete={deleteQuest}
                  onStart={startQuest}
                  onComplete={completeQuest}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;