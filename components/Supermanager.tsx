import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const weeks = [
  {
    week: 1,
    title: 'Scope & Build Your First Tool',
    mavenLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#ad6b79',
    videos: ['AI Foundations for Managers', 'AI as your strategic thinking partner'],
    prework: 'Submit your first tool idea',
    session: { path: '/session1', label: 'Scope & build your first tool' },
    notesLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#7fb164',
    resources: [
      { path: '/thinking-partner', label: 'Interactive guide: AI as your strategic thinking partner', external: false },
      { path: '/deciding-what-to-build', label: 'Interactive guide: Deciding what to build', external: false },
    ],
  },
  {
    week: 2,
    title: 'Getting Your First Tool from "OK" to "Great"',
    mavenLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#6c9d2b',
    videos: ['Build tools that scale your coaching'],
    prework: 'Share your Custom GPT prompt',
    session: { path: '/session2', label: 'Getting your first tool from "OK" to "Great"' },
    notesLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#e10569',
    resources: [],
  },
  {
    week: 3,
    title: 'Vibe Coding: Build Real Applications',
    mavenLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#070230',
    videos: ['Vibe coding internal tools for managers', 'Managing up with AI'],
    prework: 'Share your idea for your app for your team',
    session: { path: '/session3', label: 'Vibe coding: Build real applications' },
    notesLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#5679f4',
    resources: [],
  },
  {
    week: 4,
    title: 'Agents & Your Manager OS',
    mavenLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#e6c157',
    videos: ['Agents: AI that does work for you'],
    prework: null,
    session: { path: '/session4', label: 'Agents & your Manager OS' },
    notesLink: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#e6c157',
    resources: [],
  },
];

const Supermanager: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            How to Be a Supermanager with AI
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Everything you need for the course, in one place.
          </p>
        </div>

        {/* Weeks */}
        <div className="mb-12 space-y-10">
          {weeks.map((week) => (
            <div key={week.week}>
              <h2 className="text-lg font-bold text-stone-800 mb-3">
                Week {week.week}: {week.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-1">Videos</p>
                  {week.videos.map((item, i) => (
                    <a key={i} href={week.mavenLink} target="_blank" rel="noopener noreferrer" className="block text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
                      {item} &rarr;
                    </a>
                  ))}
                </div>
                {week.prework && (
                  <div>
                    <p className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-1">Prework</p>
                    <a href={week.mavenLink} target="_blank" rel="noopener noreferrer" className="block text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
                      {week.prework} &rarr;
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-1">Live session</p>
                  <Link
                    to={week.session.path}
                    className="block text-stone-800 text-base font-medium hover:text-stone-600 hover:underline transition-colors"
                  >
                    Interactive guide: {week.session.label} &rarr;
                  </Link>
                  <a href={week.notesLink} target="_blank" rel="noopener noreferrer" className="block text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
                    Notes from live session {week.week} &rarr;
                  </a>
                </div>
                {week.resources && week.resources.length > 0 ? (
                  <div>
                    <p className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-1">Additional resources</p>
                    {week.resources.map((r, i) => (
                      r.external ? (
                        <a key={i} href={r.path} target="_blank" rel="noopener noreferrer" className="block text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
                          {r.label} &rarr;
                        </a>
                      ) : (
                        <Link key={i} to={r.path} className="block text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
                          {r.label} &rarr;
                        </Link>
                      )
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-1">Additional resources</p>
                    <p className="text-stone-400 text-base italic">Coming soon</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Manager Copilot */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Tools</h2>
          <Link
            to="/managercopilot"
            className="block bg-white border border-stone-300 rounded-lg p-5 hover:border-stone-500 transition-colors"
          >
            <p className="text-stone-800 text-base font-bold mb-1">
              Manager Copilot
            </p>
            <p className="text-stone-700 text-base leading-relaxed">
              Your AI-powered coaching tool for management conversations.
            </p>
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Resources</h2>
          <div className="space-y-3">
            <Link
              to="/prompt-library"
              className="block text-stone-800 text-base font-medium hover:text-stone-600 hover:underline transition-colors"
            >
              Prompt & Custom GPT library &rarr;
            </Link>
            <Link
              to="/resources"
              className="block text-stone-800 text-base font-medium hover:text-stone-600 hover:underline transition-colors"
            >
              Tools, glossary & cheat sheet &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supermanager;
