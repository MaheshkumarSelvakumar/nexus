import { useState } from 'react';
import { register, login } from '../services/api';

function AuthScreen({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('webdev');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [customText, setCustomText] = useState('');

  const professions = [
    { id: "webdev",   label: "Web Developer" },
    { id: "designer", label: "UI/UX Designer" },
    { id: "data",     label: "Data Scientist" },
    { id: "security", label: "Cybersecurity" },
    { id: "mobile",   label: "Mobile Developer" },
    { id: "gamedev",  label: "Game Developer" },
    { id: "custom",   label: "Create Your Own Path" },
  ];

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);

      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        const finalProfession = profession === 'custom' 
            ? `custom_${customText}` 
            : profession;
        data = await register(name, email, password, finalProfession);
      }

      // Save token and user to localStorage
      localStorage.setItem('nexus-token', data.token);
      localStorage.setItem('nexus-user', JSON.stringify(data.user));

      // Tell App component auth succeeded
      onAuth(data.token, data.user);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center">
      <div className="max-w-md w-full px-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/nexus-logo.png"
            alt="NEXUS"
            className="w-20 h-20 mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 0 20px #00ff88)' }}
          />
          <h1 className="text-3xl font-bold text-[#00ff88] tracking-widest">
            NEXUS
          </h1>
          <p className="text-[#00ff88]/40 text-sm font-mono mt-2">
            LEVEL UP YOUR LEARNING
          </p>
        </div>

        {/* Toggle Login/Register */}
        <div className="flex mb-6 border border-[#00ff88]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-bold tracking-widest transition-all ${
              isLogin
                ? 'bg-[#00ff88] text-black'
                : 'text-[#00ff88]/60 hover:text-[#00ff88]'
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-bold tracking-widest transition-all ${
              !isLogin
                ? 'bg-[#00ff88] text-black'
                : 'text-[#00ff88]/60 hover:text-[#00ff88]'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4">

          {/* Name — only on register */}
          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-[#111118] border border-[#00ff88]/20 rounded px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="bg-[#111118] border border-[#00ff88]/20 rounded px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Password"
            className="bg-[#111118] border border-[#00ff88]/20 rounded px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
          />

          {/* Profession — only on register */}
          {!isLogin && (
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="bg-[#111118] border border-[#00ff88]/20 rounded px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
            >
              {professions.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          )}

          {!isLogin && profession === 'custom' && (
            <input
                type="text"
                value={customText}
                placeholder="e.g. Musician, Doctor, Chef..."
                onChange={(e) => setCustomText(e.target.value)}
                className="bg-[#111118] border border-[#00ff88]/20 rounded px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#00ff88] transition-all"
            />
          )}

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-xs font-mono text-center">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="py-3 bg-[#00ff88] text-black font-bold tracking-widest rounded hover:bg-[#00ff88]/80 transition-all disabled:opacity-50"
          >
            {loading ? 'LOADING...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
          </button>

        </div>
      </div>
    </div>
  );
}

export default AuthScreen;