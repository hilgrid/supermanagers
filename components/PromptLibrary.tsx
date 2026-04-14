import React, { useState, useEffect } from 'react';
import { swissCheeseChecks, evaluatorTools, coachTools, topNote, PromptEntry } from './promptLibraryData';

const PromptLibrary: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [swissCheeseOpen, setSwissCheeseOpen] = useState(false);

  const togglePrompt = (id: string) => {
    setExpandedPrompts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copyToClipboard(text, id)}
      className="mt-2 px-3 py-1.5 text-sm font-medium text-stone-600 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors"
    >
      {copiedId === id ? 'Copied!' : 'Copy prompt'}
    </button>
  );

  const PromptBlock = ({ text, id }: { text: string; id: string }) => (
    <div className="bg-white border border-stone-300 rounded-lg p-4 my-3">
      <pre className="text-stone-800 text-sm leading-relaxed whitespace-pre-wrap font-mono">{text}</pre>
      <CopyButton text={text} id={id} />
    </div>
  );

  const renderEntry = (entry: PromptEntry, prefix: string, index: number) => {
    const entryId = `${prefix}-${index}`;

    if (entry.gptLink && entry.prompt) {
      const isExpanded = expandedPrompts.has(entryId);
      return (
        <div key={entryId} className="mb-6">
          <a
            href={entry.gptLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-800 font-medium text-base hover:text-stone-600 transition-colors inline-flex items-center gap-1.5"
          >
            {entry.name}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <div className="mt-2">
            <button
              onClick={() => togglePrompt(entryId)}
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1"
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View prompt
            </button>
            {isExpanded && <PromptBlock text={entry.prompt} id={entryId} />}
          </div>
        </div>
      );
    }

    if (entry.prompt && !entry.gptLink) {
      return (
        <div key={entryId} className="mb-6">
          <h4 className="text-stone-800 font-medium text-base mb-2">{entry.name}</h4>
          <PromptBlock text={entry.prompt} id={entryId} />
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ backgroundColor: '#faf8f5' }} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => window.history.back()}
          className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors"
        >
          &larr; Back
        </button>

        <div className="mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Prompt & Custom GPT Library
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Every prompt and Custom GPT from the course. Use the prompts to recreate tools on any platform.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10">
          <p className="text-amber-900 text-sm leading-relaxed">{topNote}</p>
        </div>

        {/* Swiss Cheese Checks */}
        <div className="border border-stone-300 rounded-lg overflow-hidden mb-10">
          <button
            onClick={() => setSwissCheeseOpen(!swissCheeseOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50 transition-colors text-left"
          >
            <div>
              <p className="text-base font-bold text-stone-800">Swiss Cheese Checks</p>
              <p className="text-stone-500 text-sm mt-0.5">Four prompts to pressure-test any AI output</p>
            </div>
            <span className="text-stone-400 text-lg ml-4 flex-shrink-0">
              {swissCheeseOpen ? '\u2212' : '+'}
            </span>
          </button>
          {swissCheeseOpen && (
            <div className="px-5 pb-6 bg-white border-t border-stone-200">
              {swissCheeseChecks.map((check, i) => (
                <div key={`scc-${i}`} className="mt-4">
                  <p className="text-stone-700 text-sm font-medium mb-1">{check.name}</p>
                  <PromptBlock text={check.prompt} id={`scc-${i}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Evaluator Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Evaluator tools</h2>
          <p className="text-stone-600 text-base mb-6">
            Paste finished work and get it reviewed against specific criteria. Like an always-available reviewer that knows your standards.
          </p>
          {evaluatorTools.map((entry, i) => renderEntry(entry, 'eval', i))}
        </div>

        {/* Coaches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Coaches that teach skills</h2>
          <p className="text-stone-600 text-base mb-6">
            Walk through a process step by step. These tools help you build something from scratch or think through a problem.
          </p>
          {coachTools.map((entry, i) => renderEntry(entry, 'coach', i))}
        </div>
      </div>
    </div>
  );
};

export default PromptLibrary;
