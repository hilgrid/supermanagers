import React, { useState, useEffect } from 'react';

const BuildCoach: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toolName, setToolName] = useState('');
  const [whatProcess, setWhatProcess] = useState('');
  const [whoUses, setWhoUses] = useState('');
  const [trigger, setTrigger] = useState('');
  const [theirProblem, setTheirProblem] = useState('');
  const [role, setRole] = useState('');
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
      title: 'Step 1: Identify the stuck point',
      subtitle: 'Get precise about where the breakdown happens.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            Coaching tools work best when they target a specific moment where people get stuck - not a general skill gap.
          </p>
          <InlineField label="Your role" value={role} onChange={setRole} placeholder={'e.g. "VP of Product"'} />
          <Prompt
            id="s1"
            text={`I'm a ${role || '[YOUR ROLE]'}. I want to build a coaching tool that helps ${whoUses || '[WHO]'} with ${whatProcess || '[WHAT PROCESS]'}.

Here's where they typically get stuck:
[DESCRIBE THE STUCK POINT - e.g. "They come to me with product ideas but they haven't thought about what assumptions need to be true for the idea to work. They jump straight from 'I think this is cool' to 'can we build it?' without validating anything."]

What I wish they could do instead:
[DESCRIBE THE IDEAL - e.g. "I want them to identify the riskiest hypothesis, scope a small test, and come to me with evidence instead of enthusiasm."]

Before we design the tool, help me get specific: what exactly is the skill gap here? Is it that they don't know the steps, don't know how to execute the steps, or something else?`}
          />
        </>
      ),
    },
    {
      title: 'Step 2: Map the steps',
      subtitle: 'Turn your invisible expertise into concrete stages.',
      content: (
        <>
          <Prompt
            id="s2"
            text={`When I ${whatProcess ? `help someone with ${whatProcess}` : '[DO THIS PROCESS]'} myself, here's roughly how I think about it:

[DESCRIBE YOUR PROCESS IN WHATEVER LEVEL OF DETAIL YOU CAN - e.g. "First I try to understand the actual problem, not just the solution someone is proposing. Then I figure out what assumptions are baked in. Then I think about the cheapest way to test the biggest assumption. Then I figure out what evidence would actually convince me."]

Help me break this into 4-6 clear steps. Don't take what I said above wholesale; if you have better ideas I want to hear them.

For each step, describe:
- What the user does (their input or decision)
- What the AI does (how it helps at that stage)
- What the user should walk away understanding

Important: I don't want the AI to just ask open-ended questions at each step (like "What do you think the risks are?"). I want it to do real work - propose specific ideas based on what the user has shared, explain its reasoning, and then invite the user to correct or push back. The user should feel like they're collaborating with a smart colleague, not filling out a form.

The goal is a tool that teaches, not just a tool that does the work for them. If you would approach this with a different process, share your recommendations so I can consider them.`}
          />
          <Coach>Review what AI proposes. Ask yourself: does this match how I actually think about it? If not, push back - "Step 3 doesn't match how I'd do it. I'd actually do X before Y because..."</Coach>
        </>
      ),
    },
    {
      title: 'Step 3: Generate the prompt',
      subtitle: 'Get AI to play back the plan, then write the system prompt.',
      content: (
        <>
          <Prompt
            id="s3"
            text="Before you write the prompt, tell me what you think I'm asking you to build in clear detail, so I can make sure we're on the same page."
          />
          <Coach>Same as with the evaluator - get AI to play back what it thinks you want before it writes the prompt. This catches misalignments early. Once the summary matches what you want, tell it to go ahead.</Coach>
          <Prompt
            id="s3b"
            text="That's right. Go ahead and write the prompt."
          />
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
            <li><strong>Conversation starters:</strong> Add 1-2 examples, e.g. "Share your product idea to get started" or "Paste your rough notes and I'll help you structure them"</li>
          </ol>

          <h4 className="text-base font-bold text-stone-800 mt-4 mb-2">In Claude (Project)</h4>
          <ol className="text-stone-700 text-base leading-relaxed list-decimal ml-5 space-y-1 mb-4">
            <li>Go to claude.ai &rarr; Projects &rarr; New Project</li>
            <li>Paste your prompt into the Project instructions</li>
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
      title: 'Step 5: Test the experience',
      subtitle: 'Check if the tool actually teaches something.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            Testing a coaching tool is different from testing an evaluator. You're not checking if feedback is accurate - you're checking if the experience teaches something in a helpful way.
          </p>
          <p className="text-stone-700 text-base leading-relaxed mb-4">
            Open your Custom GPT and start a new conversation. Pretend you're someone on your team - give it the kind of messy, half-formed input they'd actually bring. Go through the full experience from start to finish.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">Run through it 2-3 times. Each time, ask yourself:</h4>
          <ul className="text-stone-700 text-base leading-relaxed list-disc ml-5 space-y-2 mb-4">
            <li><strong>Does it move at the right pace?</strong> Not dumping everything at once, not dragging things out.</li>
            <li><strong>Does it actually propose specific ideas?</strong> "What do you think the risks are?" is lazy. "I'm seeing three risks here: X, Y, and Z. Does that match your instinct?" is what you want.</li>
            <li><strong>Does it explain why at each step?</strong> If it's just giving instructions without reasoning, that needs to change.</li>
            <li><strong>Does the user have to think?</strong> If the tool is doing all the work, it's not teaching - it's just generating.</li>
            <li><strong>Is the tone right?</strong> It should feel like a smart colleague, not a robot or a patronizing coach.</li>
          </ul>

          <Coach>Keep testing and editing in separate places. Edit the prompt in your original conversation (Steps 1-3). Test the tool by opening the Custom GPT itself. Switching between "help me validate my product idea" and "actually the tool should push back harder at step 3" gets messy fast.</Coach>
        </>
      ),
    },
    {
      title: 'Step 6: Ship it',
      subtitle: 'Get it into someone else\'s hands.',
      content: (
        <>
          <p className="text-stone-700 text-base leading-relaxed mt-4 mb-3">
            Same as with evaluators - don't over-polish on your own. Run through it 2-3 times, then put it in someone else's hands.
          </p>
          <Prompt
            id="s6"
            text={`I'm about to share this tool with my team. Help me write a short intro message (2-3 sentences max) that:
- Frames it as solving their problem, not mine
- Tells them exactly when to use it: ${trigger || '[TRIGGER]'}
- Sets the right expectation - it's a thinking partner, not a magic answer machine
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
            Build a Coaching Tool
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            A coaching tool walks someone through a process step by step. It doesn't do the work for them - it gives them something to react to, and the learning happens in that moment of reaction. This guide assumes you've already scoped your tool - if you haven't, start with the <a href="/deciding-what-to-build" className="font-medium underline underline-offset-2 hover:text-stone-500 transition-colors">Deciding what to build</a> guide first.
          </p>
        </div>

        {/* Context inputs */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-bold text-stone-800 mb-1">Your tool</h2>
          <p className="text-stone-500 text-sm mb-4">Fill this in once. Every prompt below updates automatically.</p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InlineField label="Tool name" value={toolName} onChange={setToolName} placeholder={'e.g. "To Ship or Not to Ship"'} />
              <InlineField label="What process it guides" value={whatProcess} onChange={setWhatProcess} placeholder={'e.g. "validating a product idea before building it"'} />
            </div>
            <InlineField label="Who uses it" value={whoUses} onChange={setWhoUses} placeholder={'e.g. "anyone on my team who has a product idea they want to pitch"'} />
            <InlineField label="When they use it" value={trigger} onChange={setTrigger} placeholder={'e.g. "when they have an idea and want to figure out if it\'s worth building"'} />
            <InlineField label="Their problem it solves" value={theirProblem} onChange={setTheirProblem} placeholder={'e.g. "I have an idea I believe in but I don\'t know how to make the case for it"'} />
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

export default BuildCoach;
