import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { weeks, ContentBlock } from './data';

const STORAGE_KEY = '30days-ai-habit-progress';
const RACE_KEY = '30days-ai-race';

interface RaceCommitment {
  venue: string;
  date: string;
}

function getRace(): RaceCommitment | null {
  try {
    const stored = localStorage.getItem(RACE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveRace(race: RaceCommitment) {
  localStorage.setItem(RACE_KEY, JSON.stringify(race));
}

function getProgress(): Record<number, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(p: Record<number, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

const weekThemes: Record<number, string> = {
  1: 'Show Up',
  2: 'Build the Routine',
  3: 'Push Your Limits',
  4: 'See What Changed',
};

const allDays = weeks.flatMap((w) =>
  w.days.map((d) => ({ ...d, week: w.number }))
);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all duration-300 ${
        copied
          ? 'opacity-100 bg-[#7a9e8e] text-white border-[#7a9e8e]'
          : 'opacity-0 group-hover:opacity-100 bg-stone-200 text-stone-500 border-stone-300 hover:bg-stone-300 hover:text-stone-700'
      }`}
    >
      {copied ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      )}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

function linkifyText(text: string) {
  // Handle markdown-style links [text](url), bare claude.ai, and `inline code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|claude\.ai|`([^`]+)`)/gi;
  const result: React.ReactNode[] = [];
  let i = 0;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    if (match[2] && match[3]) {
      // Markdown link
      result.push(
        <a key={i++} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-stone-800 underline decoration-stone-400/50 hover:decoration-stone-600 underline-offset-2 transition-all">
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      // Inline code
      result.push(
        <code key={i++} className="bg-stone-200/60 text-stone-800 px-1.5 py-0.5 rounded text-[13px] font-mono">
          {match[4]}
        </code>
      );
    } else {
      // claude.ai
      result.push(
        <a key={i++} href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline decoration-stone-400/50 hover:decoration-stone-600 underline-offset-2 transition-all">
          claude.ai
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  return result.length > 0 ? result : text;
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'text':
      return (
        <p key={index} className="text-stone-600 text-[14px] leading-[1.7] mb-4">
          {linkifyText(block.text || '')}
        </p>
      );
    case 'heading':
      return (
        <p key={index} className="text-stone-800 text-[14px] font-bold mb-2 mt-5">
          {block.text}
        </p>
      );
    case 'note':
      return (
        <p key={index} className="text-stone-500 text-[13px] italic leading-relaxed mb-3 pl-1">
          {linkifyText(block.text || '')}
        </p>
      );
    case 'steps':
      return (
        <div key={index} className="text-stone-600 text-[14px] leading-[1.7] mb-4">
          <ol className="list-decimal pl-5 space-y-1.5">
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      );
    case 'instruction':
      return (
        <div key={index} className="flex items-start gap-2.5 mb-4">
          <span className="text-[#7a9e8e] mt-[5px] flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
          <p className="text-stone-700 text-[14px] leading-[1.7] font-medium">
            {linkifyText(block.text || '')}
          </p>
        </div>
      );
    case 'prompt': {
      const styles = {
        fail: {
          bg: 'bg-[#c97b7b]/10 border border-[#c97b7b]/20',
          label: 'text-[#c97b7b]',
          text: 'text-stone-800',
          copyIdle: 'text-[#c97b7b]/50',
        },
        succeed: {
          bg: 'bg-[#7a9e8e]/10 border border-[#7a9e8e]/20',
          label: 'text-[#7a9e8e]',
          text: 'text-stone-800',
          copyIdle: 'text-[#7a9e8e]/50',
        },
        neutral: {
          bg: 'bg-white/40 border border-stone-200',
          label: 'text-stone-500',
          text: 'text-stone-700',
          copyIdle: 'text-stone-400',
        },
      };
      const s = styles[block.variant || 'neutral'];
      return (
        <div key={index} className="mb-4">
          <div className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 ${s.label}`}>
            {block.label}
          </div>
          <div className={`group relative rounded-xl p-4 ${s.bg}`}>
            <p className={`text-[13px] leading-[1.7] whitespace-pre-line pr-16 font-mono ${s.text}`}>
              {block.text}
            </p>
            <CopyButton text={block.text || ''} />
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

const ThirtyDays: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, boolean>>(getProgress);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [race, setRace] = useState<RaceCommitment | null>(getRace);
  const [raceVenue, setRaceVenue] = useState('');
  const [raceDate, setRaceDate] = useState('');

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const coreDays = allDays.filter((d) => d.day >= 1 && d.day <= 30);
  const completedCount = coreDays.filter((d) => progress[d.day]).length;
  const progressPct = Math.round((completedCount / 30) * 100);

  const nextDay = allDays.find((d) => !progress[d.day]) || null;

  const toggleDay = useCallback((day: number) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  }, []);

  const toggleComplete = useCallback((day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress((prev) => ({ ...prev, [day]: !prev[day] }));
  }, []);

  const goToNextDay = useCallback(() => {
    if (!nextDay) return;
    setActiveWeek(nextDay.week);
    setTimeout(() => {
      setExpandedDay(nextDay.day);
      setTimeout(() => {
        const el = contentRefs.current[nextDay.day];
        el?.closest('.day-card-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }, 50);
  }, [nextDay]);

  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([dayStr, el]) => {
      if (!el) return;
      const day = parseInt(dayStr);
      if (day === expandedDay) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '0px';
      }
    });
  }, [expandedDay, activeWeek]);

  const currentWeek = weeks.find((w) => w.number === activeWeek)!;

  return (
    <div
      className="min-h-screen w-full text-stone-800 overflow-x-hidden relative font-sans selection:bg-rose-200 selection:text-rose-900"
      style={{ backgroundColor: '#faf6f1' }}
    >
      {/* Dot texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 max-w-[760px] mx-auto px-6 py-12">
        <Link
          to="/"
          className="text-stone-500 text-sm hover:text-stone-800 transition-colors"
        >
          &larr; Back
        </Link>

        {/* Header */}
        <div className="mt-10 mb-8 text-center">
          <h1 className="text-3xl md:text-[40px] md:leading-[1.15] font-bold text-stone-800 tracking-tight mb-4">
            Your Couch to 5K for AI
          </h1>
          <p className="text-stone-500 text-base md:text-lg leading-relaxed">
            A free 30-day program designed to make AI stick. Two minutes a day.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-[#ee8a82]/10 border border-[#ee8a82]/20 rounded-xl px-6 py-5 mb-8">
          <p className="text-stone-700 text-[14px] leading-[1.7] mb-3">
            Day 1 is just a browser. You open Claude, follow a two-minute exercise, and close it. That&rsquo;s the whole thing. Each day builds on the last: new tools, harder problems, real workflows.
          </p>
          <p className="text-stone-700 text-[14px] leading-[1.7]">
            By Day 30, you&rsquo;re not just using AI occasionally. You&rsquo;re someone who builds with it. No coding required. No prior experience. Just show up.
          </p>
        </div>

        {/* Sign up for the race */}
        {!race ? (
          <div className="bg-white/60 border border-stone-300 rounded-xl px-6 py-6 mb-8">
            <h2 className="text-stone-800 text-[16px] font-bold mb-2">
              Before you start training, sign up for the race.
            </h2>
            <p className="text-stone-600 text-[14px] leading-[1.7] mb-5">
              It's way easier to stay accountable to a training plan if there's a forcing function. Commit to giving a demo of something you built with AI at a high-stakes venue: an all-hands, a leadership meeting, a team offsite. Put it on the calendar and tell people about it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Where will you demo? (e.g. team all-hands)"
                value={raceVenue}
                onChange={(e) => setRaceVenue(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-[14px] placeholder:text-stone-400 focus:outline-none focus:border-[#7a9e8e] focus:ring-1 focus:ring-[#7a9e8e]/30 transition-all"
              />
              <input
                type="date"
                value={raceDate}
                onChange={(e) => setRaceDate(e.target.value)}
                className="sm:w-[180px] px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-[14px] focus:outline-none focus:border-[#7a9e8e] focus:ring-1 focus:ring-[#7a9e8e]/30 transition-all"
              />
            </div>
            <button
              onClick={() => {
                if (raceVenue.trim() && raceDate) {
                  const commitment = { venue: raceVenue.trim(), date: raceDate };
                  saveRace(commitment);
                  setRace(commitment);
                }
              }}
              disabled={!raceVenue.trim() || !raceDate}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: raceVenue.trim() && raceDate ? '#7a9e8e' : undefined,
                color: raceVenue.trim() && raceDate ? 'white' : undefined,
              }}
            >
              I'm committed
            </button>
          </div>
        ) : (
          <div className="bg-[#7a9e8e]/10 border border-[#7a9e8e]/20 rounded-xl px-5 py-3.5 mb-8 flex items-center justify-between gap-4">
            <p className="text-stone-700 text-[14px]">
              <span className="font-medium">Your race:</span> Demo at{' '}
              <span className="font-medium">{race.venue}</span> on{' '}
              <span className="font-medium">
                {new Date(race.date + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </p>
            <button
              onClick={() => {
                localStorage.removeItem(RACE_KEY);
                setRace(null);
                setRaceVenue('');
                setRaceDate('');
              }}
              className="text-stone-400 hover:text-stone-600 text-[12px] flex-shrink-0 transition-colors"
            >
              Edit
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-8">
          <div className="bg-white/40 border border-stone-200 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, backgroundColor: '#7a9e8e' }}
            />
          </div>
          <div className="text-[13px] text-stone-400 text-right">
            {completedCount} / 30 days completed
          </div>
        </div>

        {/* Week tabs */}
        <div className="flex gap-1 mb-8 bg-white/40 border border-stone-200 rounded-xl p-1 backdrop-blur-sm">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => {
                setActiveWeek(n);
                setExpandedDay(null);
              }}
              className={`flex-1 py-2.5 text-center rounded-lg text-[14px] font-medium transition-all duration-200 ${
                activeWeek === n
                  ? 'bg-white text-stone-800 shadow-sm border border-stone-200'
                  : 'text-stone-500 hover:text-stone-700 hover:bg-white/50'
              }`}
            >
              Week {n}
              <span
                className={`block text-[11px] mt-0.5 ${
                  activeWeek === n ? 'text-stone-500' : 'text-stone-400'
                }`}
              >
                {weekThemes[n]}
              </span>
            </button>
          ))}
        </div>

        {/* Week intro */}
        <p className="text-stone-500 text-[15px] leading-[1.7] italic mb-6 px-1">
          {currentWeek.description}
        </p>



        {/* Day cards */}
        <div className="space-y-3">
          {currentWeek.days.map((day) => {
            const isExpanded = expandedDay === day.day;
            const isCompleted = progress[day.day];

            return (
              <div key={day.day} className="day-card-wrapper">
                <div
                  className={`rounded-xl overflow-hidden transition-all duration-300 border ${
                    isExpanded
                      ? 'bg-white/60 border-stone-300 shadow-sm'
                      : 'bg-white/40 border-stone-200 hover:bg-white/60 hover:border-stone-300 hover:shadow-sm'
                  }`}
                >
                  {/* Day header */}
                  <div
                    onClick={() => toggleDay(day.day)}
                    className="flex items-center px-5 py-4 cursor-pointer select-none gap-3.5"
                  >
                    {/* Checkbox */}
                    <div
                      onClick={(e) => toggleComplete(day.day, e)}
                      className={`w-[22px] h-[22px] flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isCompleted
                          ? 'border-[#7a9e8e]'
                          : 'bg-white border-stone-300 hover:border-stone-500'
                      }`}
                      style={isCompleted ? { backgroundColor: '#7a9e8e' } : {}}
                    >
                      {isCompleted && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6L5 8.5L9.5 4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Day number */}
                    <span className="text-[13px] font-bold text-stone-400 w-[52px] flex-shrink-0 whitespace-nowrap">
                      {day.day === 0 ? 'Day 0' : day.day <= 30 ? `Day ${day.day}` : 'Bonus'}
                    </span>

                    {/* Title */}
                    <span
                      className={`text-[15px] font-medium flex-1 transition-colors ${
                        isCompleted
                          ? 'text-stone-400 line-through decoration-stone-300'
                          : 'text-stone-800'
                      }`}
                    >
                      {day.title}
                    </span>

                    {/* Chevron */}
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-stone-400 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      />
                    </svg>
                  </div>

                  {/* Expandable content */}
                  <div
                    ref={(el) => {
                      contentRefs.current[day.day] = el;
                    }}
                    className="overflow-hidden transition-all duration-400"
                    style={{ maxHeight: 0 }}
                  >
                    <div className="px-5 pb-10 pl-[72px]">
                      {day.content.map((block, i) => renderBlock(block, i))}

                      {/* Key takeaway */}
                      <div className="mt-5">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-[#ee8a82] mb-1.5">
                          Key Takeaway
                        </div>
                        <p className="text-[14px] leading-relaxed">
                          <span className="bg-[#ee8a82]/15 text-stone-800 px-1 py-0.5 rounded-sm font-medium">
                            {day.keyTakeaway}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pt-12 pb-8 mt-12 border-t border-stone-200">
          <p className="text-stone-400 text-[13px]">
            Your Couch to 5K for AI &mdash;{' '}
            <a
              href="https://www.writerbuilder.com"
              className="text-stone-500 hover:text-stone-700 underline decoration-stone-400/50 hover:decoration-stone-600 underline-offset-4 transition-all"
            >
              writerbuilder.com
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ThirtyDays;
