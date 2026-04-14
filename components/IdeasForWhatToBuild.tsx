import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type FunctionKey = 'product' | 'design' | 'sales' | 'marketing' | 'operations' | 'hr';

const functionLabels: Record<FunctionKey, string> = {
  product: 'Product',
  design: 'Design',
  sales: 'Sales',
  marketing: 'Marketing',
  operations: 'Operations',
  hr: 'HR',
};

interface Idea {
  name: string;
  description: string;
  prompt: string;
}

interface FunctionContent {
  customGPTs: Idea[];
  applications: Idea[];
  skills: Idea[];
}

const content: Record<FunctionKey, FunctionContent> = {
  product: {
    customGPTs: [
      // Example scaffold - replace with real ideas
      {
        name: 'Example: PRD Reviewer',
        description: 'Evaluates product requirements docs against your team\'s standards for clarity, scope, and evidence.',
        prompt: 'You are a PRD reviewer for a product team. Evaluate the submitted PRD against these criteria:\n\n1. Problem statement is specific and tied to evidence\n2. Scope is clear (what is and isn\'t included)\n3. Success metrics are concrete and measurable\n4. Technical considerations are surfaced\n\nGive pass/fail on each criterion with specific feedback.\n\n[Replace with your own prompt]',
      },
    ],
    applications: [
      {
        name: 'Example: User Research Synthesizer',
        description: 'Upload user interview transcripts and get back synthesized themes, quotes, and recommended next steps.',
        prompt: 'Build an application where a user can paste in user interview transcripts. The app should:\n\n1. Extract the top 5-7 themes across all interviews\n2. Pull 2-3 representative quotes per theme\n3. Suggest which themes warrant deeper investigation vs. which are clear enough to act on\n4. Recommend next steps based on the patterns\n\n[Replace with your own starting prompt]',
      },
    ],
    skills: [
      {
        name: 'Example: Weekly product update writer',
        description: 'Drafts a structured weekly update for product work based on your daily notes and project context.',
        prompt: '# Weekly Product Update Writer\n\nPull context from:\n- Daily Notes/ (this week\'s notes)\n- Projects/ (active project statuses)\n- Team/ (what each direct report is working on)\n\nDraft an update with these sections:\n1. What shipped / what moved forward\n2. What\'s blocked or at risk (with specific asks)\n3. What\'s coming up next week\n\nKeep each section to 3-5 bullets. Flag any item that needs the manager\'s help with a clear, copy-paste-ready ask.\n\n[Replace with your own skill content]',
      },
    ],
  },
  design: {
    customGPTs: [],
    applications: [],
    skills: [],
  },
  sales: {
    customGPTs: [],
    applications: [],
    skills: [],
  },
  marketing: {
    customGPTs: [],
    applications: [],
    skills: [],
  },
  operations: {
    customGPTs: [],
    applications: [],
    skills: [],
  },
  hr: {
    customGPTs: [],
    applications: [],
    skills: [],
  },
};

const IdeasForWhatToBuild: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [fn, setFn] = useState<FunctionKey>('product');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const Row = ({ idea, id }: { idea: Idea; id: string }) => {
    const isOpen = expanded.has(id);
    return (
      <div className="border-b border-stone-200 last:border-b-0">
        <button
          onClick={() => toggle(id)}
          className="w-full text-left py-4 hover:bg-stone-50 transition-colors px-1"
        >
          <div className="flex items-start gap-3">
            <span className={`text-stone-400 text-base flex-shrink-0 mt-0.5 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
              &rsaquo;
            </span>
            <div className="flex-1">
              <p className="text-stone-800 text-base font-medium">{idea.name}</p>
              <p className="text-stone-600 text-sm mt-0.5">{idea.description}</p>
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="pb-4 px-1">
            <div className="bg-stone-100 border border-stone-300 rounded-lg p-4">
              <pre className="text-stone-800 text-sm leading-relaxed whitespace-pre-wrap font-mono">{idea.prompt}</pre>
              <button
                onClick={() => copyToClipboard(idea.prompt, id)}
                className="mt-3 px-3 py-1.5 text-sm font-medium text-stone-600 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
              >
                {copiedId === id ? 'Copied!' : 'Copy prompt'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Section = ({ title, description, items, prefix }: { title: string; description: string; items: Idea[]; prefix: string }) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-stone-800 mb-1">{title}</h2>
      <p className="text-stone-600 text-base mb-4">{description}</p>
      {items.length === 0 ? (
        <p className="text-stone-400 text-base italic py-4">Coming soon.</p>
      ) : (
        <div className="border-t border-stone-200">
          {items.map((idea, i) => (
            <Row key={`${prefix}-${i}`} idea={idea} id={`${prefix}-${fn}-${i}`} />
          ))}
        </div>
      )}
    </div>
  );

  const fnContent = content[fn];

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors"
        >
          &larr; Back
        </Link>

        <div className="mt-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Ideas for What to Build
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            A library of Custom GPTs, applications, and skills tailored to your function. Pick yours below.
          </p>
        </div>

        {/* Function Selector */}
        <div className="mb-12">
          <p className="text-stone-500 text-sm font-medium mb-3">My function:</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(functionLabels) as FunctionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setFn(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  fn === key
                    ? 'bg-stone-800 text-white'
                    : 'bg-white border-2 border-stone-300 text-stone-600 hover:border-stone-400'
                }`}
              >
                {functionLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <Section
          title="Custom GPTs"
          description="Reusable prompts to build as Custom GPTs, Claude Projects, or Gems. Click any idea to see the starting prompt."
          items={fnContent.customGPTs}
          prefix="gpt"
        />

        <Section
          title="Applications"
          description="Ideas for real apps you can build in Lovable, Replit, or Claude Code. Each one includes a starting prompt."
          items={fnContent.applications}
          prefix="app"
        />

        <Section
          title="Skills"
          description="Reusable skill files for Claude Code, Cursor, or CoWork. Save these in your Manager OS."
          items={fnContent.skills}
          prefix="skill"
        />

        {/* Download placeholder */}
        <div className="mt-12 p-5 bg-white border border-stone-300 rounded-lg">
          <p className="text-stone-800 text-base font-medium mb-1">Download all skills as files</p>
          <p className="text-stone-500 text-sm mb-4">
            Coming soon - a bundle of all the skills above, ready to drop into your Manager OS folder.
          </p>
          <button
            disabled
            className="px-4 py-2 bg-stone-200 text-stone-500 text-sm font-medium rounded-lg cursor-not-allowed"
          >
            Download .zip (coming soon)
          </button>
        </div>
      </div>
    </section>
  );
};

export default IdeasForWhatToBuild;
