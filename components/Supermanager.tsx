import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ItemType = 'video' | 'prework' | 'guide' | 'notes' | 'prompting';

interface WeekItem {
  id: string;
  type: ItemType;
  label: string;
  href: string;
  external: boolean;
}

interface Week {
  week: number;
  title: string;
  items: WeekItem[];
}

const typeLabels: Record<ItemType, string> = {
  video: 'Video',
  prework: 'Prework',
  guide: 'Guide',
  notes: 'Notes',
  prompting: 'Prompting',
};

const mavenLinks = {
  w1: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#ad6b79',
  w2: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#6c9d2b',
  w3: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#070230',
  w4: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#e6c157',
};

const weeks: Week[] = [
  {
    week: 1,
    title: 'Scope & Build Your First Tool',
    items: [
      { id: 'w1-v1', type: 'video', label: 'AI Foundations for Managers', href: mavenLinks.w1, external: true },
      { id: 'w1-v2', type: 'video', label: 'AI as your strategic thinking partner', href: mavenLinks.w1, external: true },
      { id: 'w1-pre', type: 'prework', label: 'Submit your first tool idea', href: mavenLinks.w1, external: true },
      { id: 'w1-guide', type: 'guide', label: 'Interactive session guide: Scope & build your first tool', href: '/session1', external: false },
      { id: 'w1-notes', type: 'notes', label: 'Notes from live session 1', href: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#7fb164', external: true },
      { id: 'w1-p1', type: 'prompting', label: 'AI as your strategic thinking partner', href: '/thinking-partner', external: false },
      { id: 'w1-p2', type: 'prompting', label: 'Deciding what to build', href: '/deciding-what-to-build', external: false },
    ],
  },
  {
    week: 2,
    title: 'Getting Your First Tool from "OK" to "Great"',
    items: [
      { id: 'w2-v1', type: 'video', label: 'Build tools that scale your coaching', href: mavenLinks.w2, external: true },
      { id: 'w2-pre', type: 'prework', label: 'Share your Custom GPT prompt', href: mavenLinks.w2, external: true },
      { id: 'w2-guide', type: 'guide', label: 'Interactive session guide: Getting your first tool from "OK" to "Great"', href: '/session2', external: false },
      { id: 'w2-notes', type: 'notes', label: 'Notes from live session 2', href: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#e10569', external: true },
      { id: 'w2-p1', type: 'prompting', label: 'Build an evaluator tool', href: '/build-evaluator', external: false },
      { id: 'w2-p2', type: 'prompting', label: 'Build a coaching tool', href: '/build-coach', external: false },
    ],
  },
  {
    week: 3,
    title: 'Vibe Coding: Build Real Applications',
    items: [
      { id: 'w3-v1', type: 'video', label: 'Vibe coding internal tools for managers', href: mavenLinks.w3, external: true },
      { id: 'w3-v2', type: 'video', label: 'Managing up with AI', href: mavenLinks.w3, external: true },
      { id: 'w3-pre', type: 'prework', label: 'Share your idea for your app for your team', href: mavenLinks.w3, external: true },
      { id: 'w3-guide', type: 'guide', label: 'Interactive session guide: Vibe coding: Build real applications', href: '/session3', external: false },
      { id: 'w3-notes', type: 'notes', label: 'Notes from live session 3', href: 'https://maven.com/hilary-gridley/ai-powered-people-management/6/home#5679f4', external: true },
    ],
  },
  {
    week: 4,
    title: 'Agents & Your Manager OS',
    items: [
      { id: 'w4-v1', type: 'video', label: 'Agents: AI that does work for you', href: mavenLinks.w4, external: true },
      { id: 'w4-guide', type: 'guide', label: 'Interactive session guide: Agents & your Manager OS', href: '/session4', external: false },
      { id: 'w4-notes', type: 'notes', label: 'Notes from live session 4', href: mavenLinks.w4, external: true },
    ],
  },
];

const STORAGE_KEY = 'supermanagers-progress';

const loadProgress = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
};

const Supermanager: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [completed, setCompleted] = useState<Set<string>>(() => loadProgress());

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

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
          {weeks.map((week) => {
            const doneCount = week.items.filter((i) => completed.has(i.id)).length;
            return (
              <div key={week.week}>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-lg font-bold text-stone-800">
                    Week {week.week}: {week.title}
                  </h2>
                  <span className="text-stone-500 text-sm tabular-nums flex-shrink-0 ml-3">
                    {doneCount}/{week.items.length}
                  </span>
                </div>
                <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
                  {week.items.map((item) => {
                    const isDone = completed.has(item.id);
                    return (
                      <li key={item.id} className="flex items-center gap-3 py-3">
                        <button
                          onClick={() => toggle(item.id)}
                          aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
                          className={`flex-shrink-0 w-5 h-5 rounded border transition-colors flex items-center justify-center ${
                            isDone
                              ? 'bg-stone-800 border-stone-800'
                              : 'bg-white border-stone-400 hover:border-stone-600'
                          }`}
                        >
                          {isDone && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className="flex-shrink-0 w-20 text-stone-500 text-xs font-medium uppercase tracking-wider">
                          {typeLabels[item.type]}
                        </span>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-base transition-colors ${
                              isDone ? 'text-stone-400 line-through' : 'text-stone-800 hover:text-stone-600'
                            }`}
                          >
                            {item.label} &rarr;
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className={`flex-1 text-base transition-colors ${
                              isDone ? 'text-stone-400 line-through' : 'text-stone-800 hover:text-stone-600'
                            }`}
                          >
                            {item.label} &rarr;
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Anytime references */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-800">Use anytime</h2>
            <span className="text-stone-500 text-sm flex-shrink-0 ml-3">
              Tools & references
            </span>
          </div>
          <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
            {[
              { href: '/steeringwheel', title: 'Steering Wheel', desc: 'A visual decision-making tool for navigating tough calls.' },
              { href: '/managercopilot', title: 'Manager Copilot', desc: 'Your AI-powered coaching tool for management conversations.' },
              { href: '/prompt-library', title: 'Prompt & Custom GPT library', desc: 'Every prompt and Custom GPT from the course.' },
              { href: '/resources', title: 'Tools, glossary & cheat sheet', desc: 'Quick reference for tools, terms, and best practices.' },
            ].map((item) => (
              <li key={item.href} className="py-3">
                <Link
                  to={item.href}
                  className="block group"
                >
                  <p className="text-stone-800 text-base font-medium group-hover:text-stone-600 transition-colors">
                    {item.title} &rarr;
                  </p>
                  <p className="text-stone-500 text-sm mt-0.5">
                    {item.desc}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Supermanager;
