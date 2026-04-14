import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'supermanagers-auth';
const PASSWORD = 'oxfordcomma';

const PasswordGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setAuthenticated(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-sm w-full px-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-2 text-center">
          How to Be a Supermanager with AI
        </h1>
        <p className="text-stone-500 text-sm text-center mb-8">
          Enter the course password to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
          />
          <button
            type="submit"
            className="w-full mt-3 px-4 py-3 text-base font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Enter
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-3">
              Incorrect password. Try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
