import { useState } from 'react';
import Header from './components/Header';
import XPBar from './components/XPBar';
import QuestCard from './components/QuestCard';
import AddQuestForm from './components/AddQuestForm';

function App() {

  // ── QUEST STATE ──
  const [quests, setQuests] = useState([
    { id: 1, title: "Learn useState Hook", subject: "React", difficulty: "hard", status: "todo" },
    { id: 2, title: "Build Kanban UI", subject: "CSS", difficulty: "legendary", status: "todo" },
    { id: 3, title: "Setup GitHub", subject: "Git", difficulty: "easy", status: "inprogress" },
  ]);

  // ── XP STATE ──
  const [xp, setXp] = useState(150);

  // ── SHOW FORM STATE ──
  const [showForm, setShowForm] = useState(false);

  // ── ADD QUEST ──
  const addQuest = (newQuest) => {
    setQuests([...quests, newQuest]);
  };

  // ── LEVEL SYSTEM ──
  const getLevel = (xp) => {
    if (xp < 100) return { level: 1, title: "Beginner Coder" };
    if (xp < 250) return { level: 2, title: "Junior Dev" };
    if (xp < 500) return { level: 3, title: "Mid Developer" };
    if (xp < 1000) return { level: 4, title: "Senior Engineer" };
    return { level: 5, title: "Tech Lead 🔥" };
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
      setXp(xp + xpRewards[quest.difficulty]);
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

      <Header onAddClick={() => setShowForm(true)} />
      <XPBar xp={xp} level={level} title={title} />

      {/* Add Quest Form — shows as overlay when showForm is true */}
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
            📋 QUESTS ({todoQuests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {todoQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onDelete={deleteQuest}
                onStart={startQuest}
                onComplete={completeQuest}
              />
            ))}
          </div>
        </div>

        {/* IN PROGRESS column */}
        <div>
          <h2 className="text-[#06b6d4] font-bold text-sm font-mono mb-4 tracking-widest">
            ⚡ IN PROGRESS ({inProgressQuests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {inProgressQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onDelete={deleteQuest}
                onStart={startQuest}
                onComplete={completeQuest}
              />
            ))}
          </div>
        </div>

        {/* DONE column */}
        <div>
          <h2 className="text-[#7c3aed] font-bold text-sm font-mono mb-4 tracking-widest">
            ✅ COMPLETED ({doneQuests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {doneQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onDelete={deleteQuest}
                onStart={startQuest}
                onComplete={completeQuest}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;