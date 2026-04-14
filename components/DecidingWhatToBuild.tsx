import React, { useState, useEffect } from 'react';

const DecidingWhatToBuild: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [role, setRole] = useState('');
  const [whoManage, setWhoManage] = useState('');
  const [feedback1, setFeedback1] = useState('');
  const [feedback2, setFeedback2] = useState('');
  const [feedback3, setFeedback3] = useState('');
  const [myProblem, setMyProblem] = useState('');
  const [theirProblem, setTheirProblem] = useState('');
  const [theWork, setTheWork] = useState('');
  const [toolType, setToolType] = useState('');
  const [who, setWho] = useState('');
  const [what, setWhat] = useState('');
  const [trigger, setTrigger] = useState('');
  const [toolName, setToolName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openStep, setOpenStep] = useState<number | null>(0);

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

  const Prompt = ({ text, id }: { text: string; id: string }) => (
    <div className="bg-white border border-stone-300 rounded-lg p-4 my-3">
      <p className="text-stone-800 text-base leading-relaxed whitespace-pre-line">{text}</p>
      <CopyButton text={text} id={id} />
    </div>
  );

  const Coach = ({ children }: { children: React.ReactNode }) => (
    <div className="border-l-2 border-stone-300 pl-4 my-4">
      <p className="text-stone-500 text-sm leading-relaxed italic">{children}</p>
    </div>
  );

  const InlineField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
    <div className="my-3">
      <label className="block text-stone-700 text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
      />
    </div>
  );

  const steps = [
    {
      title: 'Step 1: Find your repeating frustration',
      subtitle: 'The best tools come from a pattern you\'re already living.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            Start by identifying what you keep saying, fixing, or redoing.
          </p>
          <Prompt
            id="s1"
            text={`I'm a ${role || '[YOUR ROLE]'}. I manage ${whoManage || '[WHO YOU MANAGE]'}.

I want to build a Custom GPT that helps my team with something I find myself repeating over and over. Here are 3 pieces of feedback I constantly give:

1. ${feedback1 || '[FEEDBACK YOU KEEP GIVING]'}
2. ${feedback2 || '[ANOTHER ONE]'}
3. ${feedback3 || '[ANOTHER ONE]'}

Based on these patterns, what are some Custom GPTs I could build that would help my team improve in these areas without needing me to repeat myself? For each idea, tell me:
- What the Custom GPT would do (be very specific)
- What a team member would paste or upload into it (if applicable)
- When in their workflow they'd reach for it`}
          />
          <Coach>Look at what comes back. Does one of these jump out as the thing you'd most want to exist? That's your starting point.</Coach>
        </>
      ),
    },
    {
      title: 'Step 2: Flip the problem',
      subtitle: 'You\'re building this because of your frustration, but your team has to actually want to use it.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-1">
            This is the step most people skip, and it's the reason most tools don't get used. Flip the problem from your perspective to theirs.
          </p>
          <InlineField label="Your version of the problem" value={myProblem} onChange={setMyProblem} placeholder={"e.g. \"My team's emails to execs are too long and bury the ask\""} />
          <Prompt
            id="s2"
            text={`I'm thinking about building a tool that addresses this problem:
${myProblem || '[YOUR VERSION OF THE PROBLEM]'}

But my team has to actually want to use this. Help me reframe this from their perspective. What's the version of this problem that my team member actually feels? Not "they need to communicate better" - more like what keeps them up at night or frustrates them about their own work.

Give me 3 possible reframes.`}
          />
          <Coach>Pick the reframe that feels most honest. This becomes how you'll pitch the tool to your team - as something that solves their problem, not yours.</Coach>
        </>
      ),
    },
    {
      title: 'Step 3: Figure out your tool type',
      subtitle: 'The right type depends on where your team gets stuck.',
      content: (
        <>
          <InlineField label="Their version of the problem" value={theirProblem} onChange={setTheirProblem} placeholder={"e.g. \"They're tired of 5 rounds of edits before getting approval\""} />
          <InlineField label="The work involved" value={theWork} onChange={setTheWork} placeholder={"e.g. \"Writing emails to senior leadership\""} />
          <Prompt
            id="s3"
            text={`I'm going to build a Custom GPT for my team. I need help figuring out which of two approaches fits better.

Here's my situation:
- My problem (as manager): ${myProblem || '[YOUR PROBLEM]'}
- Their problem (as user): ${theirProblem || '[THEIR PROBLEM]'}
- The work involved: ${theWork || '[WHAT THEY\'RE DOING]'}

There are two types of Custom GPTs I could build:

Type 1 - Evaluator: The user pastes or uploads a finished piece of work (a draft email, a deck, a spec, a report). The GPT reviews it against a set of specific criteria I define - basically my standards for what "good" looks like - and gives feedback. Think of it like an always-available reviewer that knows exactly what I'd say. This works best when the person does the work but it doesn't meet the bar.

Type 2 - Coach: The GPT walks the user through a process step by step, collaborating with them along the way. Instead of reviewing finished work, it helps them build something from scratch - asking questions, proposing ideas, and teaching them the "why" as they go. This works best when the person doesn't know where to start or gets stuck midway through.

Based on my situation, which type fits better and why? Is there a case for the other type?`}
          />
          <Coach>Still not sure? Quick gut check: Does the person finish the work but it's not good enough? Evaluator. Does the person not know where to start? Coach. Both? Start with the evaluator - it's simpler to build and you'll learn a lot from testing it.</Coach>
          <div className="my-3">
            <label className="block text-stone-700 text-sm font-medium mb-1">Tool type</label>
            <select
              value={toolType}
              onChange={(e) => setToolType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
            >
              <option value="">Select...</option>
              <option value="evaluator">Evaluator</option>
              <option value="coaching tool">Coach</option>
            </select>
          </div>
        </>
      ),
    },
    {
      title: 'Step 4: Define the trigger',
      subtitle: 'A tool without a clear trigger is a tool nobody uses.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-1">
            You need a specific moment - not "when you need help" but a concrete situation where the tool is the obvious thing to reach for.
          </p>
          <InlineField label="Who uses it" value={who} onChange={setWho} placeholder={"e.g. \"PMs on my team\""} />
          <InlineField label="What it helps with" value={what} onChange={setWhat} placeholder={"e.g. \"writing emails to executives\""} />
          <Prompt
            id="s4"
            text={`My Custom GPT is going to help ${who || '[WHO]'} with ${what || '[WHAT]'}.

Help me define the trigger - the specific moment when someone should reach for this Custom GPT. A good trigger has two parts:
1. A specific moment in their workflow
2. A problem they want solved right then

Give me 3-4 options, ranging from narrow to broad.`}
          />
          <Coach>Pick the most specific trigger that still covers the cases you care about. "When you're about to send an email to your skip level" is better than "when you need help with communication."</Coach>
          <InlineField label="Trigger you picked" value={trigger} onChange={setTrigger} placeholder={"e.g. \"about to send an email to your skip level\""} />
        </>
      ),
    },
    {
      title: 'Step 5: Name it and frame it',
      subtitle: 'A tool with a memorable name gets used. "Communication Standards Evaluator v2" does not.',
      content: (
        <>
          <Prompt
            id="s5"
            text={`I'm building a Custom GPT - a ${toolType || '[TOOL TYPE: evaluator / coaching tool]'} - that helps ${who || '[WHO]'} with ${what || '[WHAT]'} at the moment when ${trigger || '[TRIGGER]'}.

Help me:

1. Come up with 5 fun, memorable names for this Custom GPT. Think personality, not corporate. Examples: "Sir Meets-a-lot" (meeting agenda evaluator), "Wally the Writing Partner" (writing coach), "nobot" (helps you say no).

2. Write a one-sentence description that frames this as solving the USER's problem (not mine as the manager). It should make someone think "oh, I want that" - not "oh, my boss is making me use this."`}
          />
          <InlineField label="Name you picked" value={toolName} onChange={setToolName} placeholder="Enter the name you liked best" />
        </>
      ),
    },
    {
      title: 'Step 6: Write your tool brief',
      subtitle: 'Pull it all together. This is what you\'ll take into the session guide.',
      content: (
        <>
          <Prompt
            id="s6"
            text={`Here's my Custom GPT tool brief. Can you review it and flag anything that seems vague, contradictory, or likely to cause problems when I start building?

- Tool name: ${toolName || '[NAME]'}
- Tool type: ${toolType || '[Evaluator / Coach]'}
- Who uses it: ${who || '[ROLE/TEAM]'}
- Their problem: ${theirProblem || '[THE USER\'S VERSION OF THE PROBLEM]'}
- When they use it: ${trigger || '[SPECIFIC TRIGGER]'}
- What it does: [ONE SENTENCE]
- How I'll frame it to my team: [THE PITCH - why they'd want this]`}
          />
          <Coach>You've done the hardest part. Figuring out what to build is harder than building it. Take your tool brief and go to the Session 1 guide to start building.</Coach>
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
            Deciding What to Build
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Start here if you watched the demos and thought: "I'm not totally clear on what to even build." By the end, you'll have a clear tool brief to take into the session guide.
          </p>
        </div>

        {/* Context inputs */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-bold text-stone-800 mb-1">Your context</h2>
          <p className="text-stone-500 text-sm mb-4">Fill in what you can. Every prompt below updates automatically. You don't need perfect answers - rough is fine.</p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label className="block text-stone-700 text-sm font-medium mb-1">Who you manage</label>
                <input
                  type="text"
                  value={whoManage}
                  onChange={(e) => setWhoManage(e.target.value)}
                  placeholder='e.g. "a team of 8 PMs"'
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-700 text-sm font-medium mb-1">Feedback you keep giving (1)</label>
              <input
                type="text"
                value={feedback1}
                onChange={(e) => setFeedback1(e.target.value)}
                placeholder={"e.g. \"You're showing me data but not telling me what to do with it\""}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 text-sm font-medium mb-1">Feedback you keep giving (2)</label>
              <input
                type="text"
                value={feedback2}
                onChange={(e) => setFeedback2(e.target.value)}
                placeholder='e.g. "The most important thing is buried in paragraph three"'
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 text-sm font-medium mb-1">Feedback you keep giving (3)</label>
              <input
                type="text"
                value={feedback3}
                onChange={(e) => setFeedback3(e.target.value)}
                placeholder={"e.g. \"You haven't addressed the objection the stakeholder will raise\""}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
              />
            </div>

          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="border border-stone-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenStep(openStep === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50 transition-colors text-left"
              >
                <div>
                  <p className="text-base font-bold text-stone-800">{step.title}</p>
                  <p className="text-stone-500 text-sm mt-0.5">{step.subtitle}</p>
                </div>
                <span className="text-stone-400 text-lg ml-4 flex-shrink-0">
                  {openStep === i ? '\u2212' : '+'}
                </span>
              </button>
              {openStep === i && (
                <div className="px-5 pb-6 bg-white border-t border-stone-200">
                  {step.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* What's next */}
        <div className="bg-stone-100 rounded-lg p-6">
          <h2 className="text-base font-bold text-stone-800 mb-3">What's next</h2>
          <p className="text-stone-700 text-sm leading-relaxed">
            Take your tool brief and go to the <a href="/session1" className="font-medium underline underline-offset-2 hover:text-stone-500 transition-colors">Session 1 guide</a> to start building. You've done the hardest part - figuring out what to build is harder than building it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DecidingWhatToBuild;
