import React, { useState, useEffect } from 'react';

const ThinkingPartner: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [role, setRole] = useState('');
  const [situation, setSituation] = useState('');
  const [whyHard, setWhyHard] = useState('');
  const [audience, setAudience] = useState('');
  const [convinceWho, setConvinceWho] = useState('');
  const [tone, setTone] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openPhase, setOpenPhase] = useState<number | null>(0);

  const fill = (template: string) => {
    return template
      .replace(/\[YOUR ROLE\]/g, role || '[YOUR ROLE]')
      .replace(/\[YOUR TITLE AND COMPANY TYPE.*?\]/g, role || '[YOUR TITLE AND COMPANY TYPE]')
      .replace(/\[DESCRIBE THE SITUATION IN 2-3 SENTENCES\]/g, situation || '[DESCRIBE THE SITUATION]')
      .replace(/\[THE SITUATION\]/g, situation || '[THE SITUATION]')
      .replace(/\[WHAT HAPPENED.*?\]/g, situation || '[WHAT HAPPENED]')
      .replace(/\[WHAT MAKES THIS COMPLICATED.*?\]/g, whyHard || '[WHAT MAKES THIS COMPLICATED]')
      .replace(/\[THE TYPE OF CHALLENGE YOU'RE FACING\]/g, whyHard || '[THE TYPE OF CHALLENGE]')
      .replace(/\[COMPANIES\/LEADERS\/ORGANIZATIONS\]/g, 'leaders')
      .replace(/\[THE PERSON YOU NEED TO CONVINCE.*?\]/g, convinceWho || '[THE PERSON YOU NEED TO CONVINCE]')
      .replace(/\[THE OTHER AUDIENCE.*?\]/g, audience || '[YOUR OTHER AUDIENCE]')
      .replace(/\[AUDIENCE.*?\]/g, audience || '[AUDIENCE]')
      .replace(/\[WHAT THEY'RE FEELING\]/g, 'what they\'re feeling')
      .replace(/\[TONE.*?\]/g, tone || '[TONE]')
      .replace(/\[ANY OTHER SPECIFIC THING.*?\]/g, '');
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

  const Prompt = ({ text, id }: { text: string; id: string }) => {
    const filled = fill(text);
    return (
      <div className="bg-white border border-stone-300 rounded-lg p-4 my-3">
        <p className="text-stone-800 text-base leading-relaxed whitespace-pre-line">{filled}</p>
        <CopyButton text={filled} id={id} />
      </div>
    );
  };

  const Coach = ({ children }: { children: React.ReactNode }) => (
    <div className="border-l-2 border-stone-300 pl-4 my-4">
      <p className="text-stone-500 text-sm leading-relaxed italic">{children}</p>
    </div>
  );

  const phases = [
    {
      title: 'Phase 1: Strategic Thinking',
      subtitle: 'Get informed before you decide. Address blind spots, surface risks, run pre-mortems.',
      steps: (
        <>
          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 1: Address your blind spots</h3>
          <Prompt
            id="s1"
            text={`I'm a [YOUR ROLE]. [DESCRIBE THE SITUATION IN 2-3 SENTENCES].

Before I decide how to respond, I want to learn from others who've navigated something similar.

What have other leaders learned from [THE TYPE OF CHALLENGE YOU'RE FACING]? What approaches worked? What backfired?`}
          />
          <Coach>Read through what AI gives you. Note anything that surprises you or changes how you're thinking about the problem.</Coach>

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 2: Surface risks</h3>
          <Prompt
            id="s2"
            text="As I think about my options, what are the risks I might not be considering?"
          />

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 3: Push for less obvious risks</h3>
          <Prompt
            id="s3"
            text="These risks are all obvious. Give me less obvious risks."
          />
          <Coach>This is the "steering wheel" - pushing AI past its first, safest answer.</Coach>

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 4: Pre-mortem</h3>
          <Prompt
            id="s4"
            text="It's 6 months from now. Things have gone badly. Write a short post-mortem: What happened? Why did it fail? What did I miss?"
          />
          <Coach>Our brains resist imagining failure. AI doesn't. Use this to stress-test your thinking before you commit.</Coach>
        </>
      ),
    },
    {
      title: 'Phase 2: Decision Making',
      subtitle: 'Get clear on what you care about, then generate and evaluate options against those criteria.',
      steps: (
        <>
          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 5: Surface your criteria</h3>
          <Prompt
            id="s5"
            text={`I need to decide how to respond to [THE SITUATION]. Before I generate options, I want to get clear on what I actually care about here.

Ask me 3-4 questions that will help me identify my real decision criteria. Force me to make trade-offs if it helps clarify what matters most.`}
          />
          <Coach>Answer AI's questions honestly - through your answers, your real criteria will emerge. Then confirm them:</Coach>
          <Prompt
            id="s5b"
            text={`Based on my answers, here's what I think my criteria are:

1. [CRITERION 1]
2. [CRITERION 2]
3. [CRITERION 3]
4. [CRITERION 4]

Does that track with what you heard? Is there anything I said that suggests a criterion I'm not naming?`}
          />

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 6: Generate options</h3>
          <Prompt
            id="s6"
            text={`Now that I know my criteria:

- [CRITERION 1]
- [CRITERION 2]
- [CRITERION 3]
- [CRITERION 4]

What are 5 ways I could respond to [THE SITUATION]? Go beyond the obvious options. What would a strategic leader do here?`}
          />

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 7: Score and choose</h3>
          <Prompt
            id="s7"
            text="Score each of these options against my decision criteria. For each option, rate it 1-10 on each criterion and explain your reasoning briefly.\n\nThen tell me: which trade-offs should I be paying attention to?"
          />
          <Coach>You don't have to follow the math exactly - but the framework clarifies your thinking. Ask yourself: if one criterion has to give, which one am I willing to take a hit on?</Coach>

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 8: Swiss cheese check</h3>
          <Prompt
            id="s8"
            text="I'm leaning toward [YOUR PREFERRED OPTION]. Under what circumstances would this path forward be wrong? Be specific. What would have to be true about my situation for this to backfire?"
          />
          <Coach>For each scenario AI raises, ask yourself: is this true in my situation? If yes, reconsider. If no, proceed with more confidence.</Coach>
        </>
      ),
    },
    {
      title: 'Phase 3: Influence',
      subtitle: 'Prepare for the hard conversations, then draft the communication.',
      steps: (
        <>
          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 9: Anticipate objections (upward)</h3>
          <Prompt
            id="s9"
            text={`I'm going to go with [YOUR CHOSEN APPROACH].

Play the role of [THE PERSON YOU NEED TO CONVINCE]. What objections will you raise? For each one, help me craft a response.`}
          />

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 10: Anticipate objections (downward/lateral)</h3>
          <Prompt
            id="s10"
            text="Now play the role of [THE OTHER AUDIENCE]. What objections will they raise? For each one, help me craft a response."
          />

          <h3 className="text-base font-bold text-stone-800 mt-6 mb-2">Step 11: Draft the communication</h3>
          <Prompt
            id="s11"
            text={`Now let's draft the actual communication.

Draft a message to [AUDIENCE] that:
- Acknowledges what they're feeling honestly
- Explains what I'm doing and why
- Is clear about what I know and what I don't know yet
- Sets realistic expectations

Keep it [TONE].`}
          />
          <Coach>Rewrite this in your own voice before sending. Your team will know if it's pasted from AI, and it will undermine the credibility you just built.</Coach>
        </>
      ),
    },
  ];

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => window.history.back()}
          className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors"
        >
          &larr; Back
        </button>

        <div className="mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            AI as Your Strategic Thinking Partner
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Work through a real decision using AI as a thinking partner. Fill in your context below, then copy each prompt in order into a single AI conversation.
          </p>
        </div>

        {/* Context inputs */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-bold text-stone-800 mb-1">Your context</h2>
          <p className="text-stone-500 text-sm mb-4">Pick a real decision you're facing - something where you feel uncertain, under-informed, or stuck. Fill this in once and every prompt below will update automatically.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-stone-700 text-sm font-medium mb-1">Your role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder='e.g. "VP of Product at a tech company"'
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 text-sm font-medium mb-1">The situation</label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder='e.g. "My CEO just announced a mandatory 5-day RTO policy starting next quarter"'
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 text-sm font-medium mb-1">Why it's hard</label>
              <textarea
                value={whyHard}
                onChange={(e) => setWhyHard(e.target.value)}
                placeholder='e.g. "My team is distributed and upset. Some high performers are threatening to quit."'
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 resize-none"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200">
            <p className="text-stone-500 text-sm mb-3">These are used in Phase 3. You can fill them in later.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-stone-700 text-sm font-medium mb-1">Who you need to convince</label>
                <input
                  type="text"
                  value={convinceWho}
                  onChange={(e) => setConvinceWho(e.target.value)}
                  placeholder='e.g. "my CEO, who is committed to this policy"'
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-stone-700 text-sm font-medium mb-1">Your other audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder='e.g. "my team, who is anxious and watching closely"'
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-stone-700 text-sm font-medium mb-1">Tone</label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  placeholder='e.g. "direct and honest, not corporate-speak"'
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-4 mb-12">
          {phases.map((phase, i) => (
            <div key={i} className="border border-stone-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenPhase(openPhase === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50 transition-colors text-left"
              >
                <div>
                  <p className="text-base font-bold text-stone-800">{phase.title}</p>
                  <p className="text-stone-500 text-sm mt-0.5">{phase.subtitle}</p>
                </div>
                <span className="text-stone-400 text-lg ml-4 flex-shrink-0">
                  {openPhase === i ? '\u2212' : '+'}
                </span>
              </button>
              {openPhase === i && (
                <div className="px-5 pb-6 bg-white border-t border-stone-200">
                  {phase.steps}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick reference */}
        <div className="bg-stone-100 rounded-lg p-6">
          <h2 className="text-base font-bold text-stone-800 mb-3">Quick reference</h2>
          <div className="space-y-2 text-stone-700 text-sm">
            <p><strong>Phase 1 - Strategic Thinking</strong> (Steps 1-4): Get informed before you decide. Address blind spots, surface risks, run pre-mortems.</p>
            <p><strong>Phase 2 - Decision Making</strong> (Steps 5-8): Get clear on what you care about, then generate and evaluate options against those criteria.</p>
            <p><strong>Phase 3 - Influence</strong> (Steps 9-11): Prepare for the hard conversations, then draft the communication.</p>
          </div>
          <p className="text-stone-500 text-sm mt-4">The whole sequence works best in a single AI conversation - each phase builds context for the next.</p>
        </div>
      </div>
    </section>
  );
};

export default ThinkingPartner;
