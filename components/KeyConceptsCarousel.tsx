import React, { useEffect, useState } from 'react';

interface Slide {
  title: string;
  caption: string;
  visual: React.ReactNode;
}

// --- Slide visuals ---------------------------------------------------------

const Slide1Visual: React.FC = () => (
  <div className="w-full">
    <div className="grid grid-cols-2 text-xs font-bold uppercase tracking-wider mb-3">
      <div className="text-stone-400">Faster you</div>
      <div className="text-sky-700">Better team</div>
    </div>
    <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
      {[
        ['finish one task', 'team handles it without you'],
        ['two more appear', 'the bar moves up'],
        ['you stay the bottleneck', 'you get your time back'],
      ].map(([left, right], i) => (
        <div key={i} className="grid grid-cols-2 gap-3 py-3 text-sm">
          <div className="text-stone-400">{left}</div>
          <div className="text-stone-800 font-medium">{right}</div>
        </div>
      ))}
    </div>
  </div>
);

const Slide2Visual: React.FC = () => (
  <div className="w-full flex flex-col items-stretch gap-2">
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 opacity-60">
      <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-1">Team sidelined</p>
      <p className="text-stone-500 text-sm">AI replaces judgment.</p>
    </div>
    <div className="flex items-center gap-2 self-center text-sky-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
        <polyline points="18 15 12 9 6 15" />
      </svg>
      <span className="text-xs font-semibold uppercase tracking-wider">your call</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
    <div className="rounded-lg border-2 border-sky-400 bg-sky-50 p-4">
      <p className="text-sky-700 text-xs font-bold uppercase tracking-wider mb-1">Team centered</p>
      <p className="text-stone-800 text-sm font-medium">AI extends judgment.</p>
    </div>
  </div>
);

const Slide3Visual: React.FC = () => {
  const items = ['Context', 'Desired outcome', 'Constraints', 'Examples of "good"', 'Feedback loop'];
  const Check = () => (
    <svg className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div>
        <p className="text-stone-500 text-[11px] font-bold uppercase tracking-wider mb-2">Delegating to a person</p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-stone-800 text-sm">
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sky-700 text-[11px] font-bold uppercase tracking-wider mb-2">Prompting AI</p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-stone-800 text-sm">
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Slide4Visual: React.FC = () => (
  <div className="w-full flex flex-col gap-3">
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 items-center">
      <span className="text-stone-400 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Your problem</span>
      <div className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-stone-500 text-sm italic">
        "My team is not strategic enough."
      </div>
      <span className="text-sky-700 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Their problem</span>
      <div className="rounded-lg border-2 border-sky-400 bg-sky-50 px-3 py-2 text-stone-800 text-sm italic">
        "I'm tired of my ideas getting shot down."
      </div>
    </div>
  </div>
);

const Slide5Visual: React.FC = () => {
  const steps = [
    { label: 'Set', sub: 'what good looks like', h: 'h-16' },
    { label: 'Teach', sub: 'how to get there', h: 'h-24' },
    { label: 'Raise', sub: 'then move the bar', h: 'h-32' },
  ];
  return (
    <div className="w-full flex items-end justify-center gap-3">
      {steps.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center w-24">
          <div
            className={`w-full ${s.h} rounded-t-lg flex items-center justify-center ${
              i === steps.length - 1
                ? 'bg-sky-500 text-white'
                : i === steps.length - 2
                ? 'bg-sky-300 text-sky-900'
                : 'bg-sky-100 text-sky-800'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider">{s.label}</span>
          </div>
          <span className="mt-2 text-[11px] text-stone-500 text-center leading-tight">{s.sub}</span>
        </div>
      ))}
    </div>
  );
};

// --- Slide data ------------------------------------------------------------

const slides: Slide[] = [
  {
    title: 'You get more leverage from upleveling your team than from speeding yourself up',
    visual: <Slide1Visual />,
    caption: 'Speed compounds for you. Upleveling compounds for the team.',
  },
  {
    title: "You're designing the future of work",
    visual: <Slide2Visual />,
    caption: "If you don't design it, someone else will design it for you.",
  },
  {
    title: 'Prompting is managing',
    visual: <Slide3Visual />,
    caption: 'Same skill. Different medium.',
  },
  {
    title: 'Your team uses tools that solve their problems, not yours',
    visual: <Slide4Visual />,
    caption: "Reframe the problem from their point of view — or they won't reach for what you build.",
  },
  {
    title: 'Build a machine that raises the bar',
    visual: <Slide5Visual />,
    caption: 'One tool is a trick. A machine is leverage.',
  },
];

// --- Carousel --------------------------------------------------------------

const KeyConceptsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goTo = (i: number) => setCurrent(((i % total) + total) % total);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = slides[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Five key concepts of the course"
      className="relative rounded-2xl bg-sky-50 border border-sky-200 p-5 md:p-8"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sky-700 text-xs font-bold uppercase tracking-wider">
          {current + 1} of {total}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-stone-800 leading-tight mb-5">
        {slide.title}
      </h2>

      <div
        aria-live="polite"
        className="bg-white rounded-xl p-5 md:p-6 border border-sky-100 min-h-[220px] flex items-center justify-center"
      >
        {slide.visual}
      </div>

      <p className="text-stone-500 text-sm italic mt-4 leading-relaxed">
        {slide.caption}
      </p>

      <div className="flex items-center justify-between mt-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full bg-white border border-sky-200 flex items-center justify-center text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Select slide">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={current === i}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                current === i
                  ? 'bg-sky-600 w-2.5 h-2.5'
                  : 'bg-sky-200 hover:bg-sky-300 w-2 h-2'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full bg-white border border-sky-200 flex items-center justify-center text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default KeyConceptsCarousel;
