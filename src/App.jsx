import Header from './components/Header';
import XPBar from './components/XPBar';
import QuestCard from './components/QuestCard';

function App() {
  const sampleQuest = {
    id: 1,
    title: "Learn useState Hook",
    subject: "React",
    difficulty: "hard",
    status: "todo"
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Header />
      <XPBar xp={150} level={3} title="Junior Dev" />
      <div className="p-8">
        <div className="w-64">
          <QuestCard quest={sampleQuest} />
        </div>
      </div>
    </div>
  );
}

export default App;