import React, { useState, useEffect } from 'react';

const BuildEvaluator: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toolName, setToolName] = useState('');
  const [whatEvaluates, setWhatEvaluates] = useState('');
  const [whoUses, setWhoUses] = useState('');
  const [trigger, setTrigger] = useState('');
  const [theirProblem, setTheirProblem] = useState('');
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
      title: 'Step 1: Extract your standards',
      subtitle: 'Get what\'s in your head out of your head.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            The hardest part of building an evaluator is that your standards feel obvious to you but are invisible to everyone else. Pick the method that fits you best, or combine them.
          </p>

          <h4 className="text-base font-bold text-stone-800 mt-6 mb-2">Method A: Show examples</h4>
          <p className="text-stone-600 text-sm mb-2">If you have examples of good work, let AI find the patterns.</p>
          <Prompt
            id="s1a"
            text={`I'm building a tool that evaluates ${whatEvaluates || '[WHAT IT EVALUATES]'}.

Here are [NUMBER] examples of ${whatEvaluates || '[ARTIFACT TYPE]'} that I consider excellent. I'm going to paste them below.

[PASTE OR UPLOAD 3-5 EXAMPLES OF GOOD WORK]

Can you identify the patterns and criteria that make these effective? What do they have in common? What separates them from mediocre versions of the same thing?`}
          />

          <h4 className="text-base font-bold text-stone-800 mt-6 mb-2">Method B: Feed your influences</h4>
          <p className="text-stone-600 text-sm mb-2">If a blog post, book, or resource shaped how you think about this, let AI extract the criteria.</p>
          <Prompt
            id="s1b"
            text={`I'm building a tool that evaluates ${whatEvaluates || '[WHAT IT EVALUATES]'}.

Here's a [BLOG POST / BOOK CHAPTER / ARTICLE / RESOURCE] that shaped how I think about what "good" looks like for this type of work:

[PASTE OR UPLOAD THE RESOURCE]

Can you extract evaluation criteria from this? What are the principles that could be turned into a rubric?`}
          />

          <h4 className="text-base font-bold text-stone-800 mt-6 mb-2">Method C: Talk it out</h4>
          <p className="text-stone-600 text-sm mb-2">If you can articulate what good looks like but haven't written it down, just talk through it.</p>
          <Prompt
            id="s1c"
            text={`I'm building a tool that evaluates ${whatEvaluates || '[WHAT IT EVALUATES]'}.

I'm going to describe what I think makes this type of work good vs. mediocre. It might be messy - just help me turn it into clear criteria afterward. If you can think of important criteria I'm missing, please share and explain your rationale.

Here's what I care about when I review ${whatEvaluates || '[ARTIFACT TYPE]'}:

[BRAIN DUMP - WHAT MAKES IT GOOD, WHAT MAKES IT BAD, WHAT YOU ALWAYS END UP FIXING, PET PEEVES, NON-NEGOTIABLES]`}
          />

          <Coach>Most tools end up using a combination of these methods. Start with one, then layer in the others.</Coach>
        </>
      ),
    },
    {
      title: 'Step 2: Refine your criteria',
      subtitle: 'Sharpen the rough list into 3-6 clear criteria.',
      content: (
        <>
          <Prompt
            id="s2"
            text={`Let's refine your suggested criteria. I want to land on 3-6 total criteria for the evaluator to assess.

For each one:
- Is it specific enough that two reasonable people would agree on whether something meets it?
- Is anything overlapping or redundant?
- Am I missing anything important based on what I've told you?`}
          />
          <Coach>Fewer is usually better. If you have 10, some of them are probably the same thing said differently.</Coach>
        </>
      ),
    },
    {
      title: 'Step 3: Generate the prompt',
      subtitle: 'Turn your criteria into a system prompt.',
      content: (
        <>
          <Prompt
            id="s3"
            text={`I want to build a custom GPT that evaluates ${whatEvaluates || '[TYPE OF WORK]'} against my standards.

Here's the context:
- Tool name: ${toolName || '[NAME]'}
- Who will use it: ${whoUses || '[ROLE/TEAM]'}
- When they'll use it: ${trigger || '[TRIGGER]'}
- The problem it solves for them: ${theirProblem || '[THEIR VERSION OF THE PROBLEM]'}

Here are my evaluation criteria:

[PASTE YOUR REFINED CRITERIA FROM THE LAST STEP]

The tool should:
- Evaluate the work against each criterion specifically
- Be direct and honest - not sycophantic or vague
- Explain what's working and what's not, with specific references to the submitted work
- Give actionable suggestions, not just "this could be improved"
- [ANY OTHER BEHAVIOR YOU WANT, e.g. "Give an overall grade from A to D" or "Prioritize the top 3 issues" or "Don't rewrite their work - just point out the problems"]

Before you write the prompt, tell me what you think I'm asking you to build, so I can make sure we're on the same page.`}
          />
          <Coach>This "play it back" step is critical. Make sure the AI understands the assignment before it does the work. Once the summary matches what you want, tell it to go ahead and write the prompt.</Coach>
        </>
      ),
    },
    {
      title: 'Step 4: Set up your Custom GPT',
      subtitle: 'Turn the prompt into a tool your team can use.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-4">
            Now you have a prompt. Time to make it a real tool.
          </p>

          <h4 className="text-base font-bold text-stone-800 mt-4 mb-2">In ChatGPT</h4>
          <ol className="text-stone-700 text-base leading-relaxed list-decimal ml-5 space-y-1 mb-4">
            <li>Go to ChatGPT &rarr; Explore GPTs &rarr; Create</li>
            <li><strong>Name:</strong> Paste your tool name</li>
            <li><strong>Instructions:</strong> Paste the full prompt from Step 3</li>
            <li><strong>Conversation starters:</strong> Add 1-2 examples, e.g. "Paste your draft below" or "Upload your deck as a PDF" or simply "START"</li>
            <li><strong>Knowledge:</strong> Upload any reference docs (style guides, examples of good work). Keep it to 1-2 well-structured docs max.</li>
          </ol>

          <h4 className="text-base font-bold text-stone-800 mt-4 mb-2">In Claude (Project)</h4>
          <ol className="text-stone-700 text-base leading-relaxed list-decimal ml-5 space-y-1 mb-4">
            <li>Go to claude.ai &rarr; Projects &rarr; New Project</li>
            <li>Paste your prompt into the Project instructions</li>
            <li>Upload any reference documents to the Project knowledge base</li>
          </ol>

          <h4 className="text-base font-bold text-stone-800 mt-4 mb-2">In Gemini (Gem)</h4>
          <ol className="text-stone-700 text-base leading-relaxed list-decimal ml-5 space-y-1 mb-4">
            <li>Go to gemini.google.com &rarr; Gem manager &rarr; New Gem</li>
            <li>Paste your tool name and prompt</li>
          </ol>

          <Coach>Don't overthink the setup. You can always come back and tweak it. The important thing is getting it live so you can test it.</Coach>
        </>
      ),
    },
    {
      title: 'Step 5: Test with fake data',
      subtitle: 'Calibrate the tool before you use real work.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            Before you test with real work, go back to the conversation where you built the prompt (Steps 1-3) and generate test cases at different quality levels. This tells you whether your criteria actually differentiate good from bad.
          </p>
          <Prompt
            id="s5"
            text={`Before I test this tool for real, I want to calibrate it.

Generate two fake examples of ${whatEvaluates || '[ARTIFACT TYPE]'}:

1. A "C+" version - decent but clearly has room to improve
2. An "A" version - the kind of work that would make me say "this is great, ship it"

Make them realistic enough to be useful test cases.`}
          />
          <Coach>Now open your Custom GPT and paste each example in. If the C+ and A versions get similar feedback, or it doesn't match how you would give feedback, your prompt needs sharpening.</Coach>
        </>
      ),
    },
    {
      title: 'Step 6: Test and iterate',
      subtitle: 'Run real work through it and adjust.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-4">
            Once your tool passes the fake data test, open your Custom GPT and run real work through it. Paste in actual drafts, emails, decks - whatever your tool is designed to evaluate.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">Testing checklist</h4>
          <ul className="text-stone-700 text-base leading-relaxed list-disc ml-5 space-y-2 mb-4">
            <li>Does the feedback match what you would have said? If not, your criteria or prompt need adjusting.</li>
            <li>Is the tone right? If it sounds patronizing or too corporate, that needs to change.</li>
            <li>Does it know when to stop? If it keeps going, add explicit termination instructions.</li>
            <li>Is it catching the right things? Run work you've already given feedback on - does it flag the same issues?</li>
            <li>Have you tested 2-3 times? That's enough for solo iteration.</li>
          </ul>

          <Coach>Keep testing and editing in separate places. Edit the prompt in your original conversation (Steps 1-3), then copy it back into your Custom GPT. Test the tool by opening the Custom GPT itself. Switching between both in the same window gets confusing fast.</Coach>
        </>
      ),
    },
    {
      title: 'Step 7: Ship it',
      subtitle: 'Get it into someone else\'s hands.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            Don't over-polish on your own. Test 2-3 times until it's pretty good, then give it to one person. You get diminishing returns from solo tweaking - the sooner it's in somebody else's hands, the better.
          </p>
          <Prompt
            id="s7"
            text={`I'm about to share this tool with my team. Help me write a short intro message (2-3 sentences max) that:
- Frames it as solving their problem, not mine
- Tells them exactly when to use it: ${trigger || '[TRIGGER]'}
- Keeps it casual - not a mandate, a gift`}
          />
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
            Build an Evaluator Tool
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            An evaluator reviews a piece of work against your standards and gives feedback. It's like having a version of you available 24/7. This guide assumes you've already scoped your tool - if you haven't, start with the <a href="/deciding-what-to-build" className="font-medium underline underline-offset-2 hover:text-stone-500 transition-colors">Deciding what to build</a> guide first.
          </p>
        </div>

        {/* Context inputs */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-bold text-stone-800 mb-1">Your tool</h2>
          <p className="text-stone-500 text-sm mb-4">Fill this in once. Every prompt below updates automatically.</p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InlineField label="Tool name" value={toolName} onChange={setToolName} placeholder={'e.g. "Sir Meets-a-lot"'} />
              <InlineField label="What it evaluates" value={whatEvaluates} onChange={setWhatEvaluates} placeholder={'e.g. "meeting agendas"'} />
            </div>
            <InlineField label="Who uses it" value={whoUses} onChange={setWhoUses} placeholder={'e.g. "anyone scheduling a meeting with 3+ people"'} />
            <InlineField label="When they use it" value={trigger} onChange={setTrigger} placeholder={'e.g. "before sending a calendar invite for any meeting with 3+ attendees"'} />
            <InlineField label="Their problem it solves" value={theirProblem} onChange={setTheirProblem} placeholder={'e.g. "I want meetings that actually accomplish something"'} />
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
      </div>
    </section>
  );
};

export default BuildEvaluator;
