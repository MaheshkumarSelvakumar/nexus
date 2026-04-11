import Header from './components/Header';
import XPBar from './components/XPBar';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Header />
      <XPBar 
        xp={150} 
        level={3} 
        title="Junior Dev" 
      />
    </div>
  );
}

export default App;