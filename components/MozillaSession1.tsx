import React, { useState, useRef, useEffect, useCallback } from 'react';

type Platform = 'chatgpt' | 'claude' | 'gemini' | 'copilot';

const platformLabels: Record<Platform, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
  copilot: 'Copilot',
};

const platformSetup: Record<Platform, { name: string; toolName: string; steps: string[] }> = {
  chatgpt: {
    name: 'Custom GPT',
    toolName: 'Custom GPT',
    steps: [
      'Go to ChatGPT → Explore GPTs → Create',
      'Use the <strong>Configure</strong> tab (not the Create chat tab)',
      '<strong>Name:</strong> Give it a memorable name - a good name makes people want to use it',
      '<strong>Instructions:</strong> Paste your system prompt',
      '<strong>Conversation starters:</strong> This is how you guide people to start using the tool. Something as simple as "Start" works - the user clicks it, and the AI will guide the user from there.',
    ],
  },
  claude: {
    name: 'Project',
    toolName: 'Project',
    steps: [
      'Go to Claude → Projects (left sidebar) → Create Project',
      '<strong>Name:</strong> Give it a memorable name - a good name makes people want to use it',
      '<strong>Custom Instructions:</strong> Paste your system prompt into the project instructions field',
      '<strong>Conversation starters:</strong> This is how you guide people to start using the tool. Something as simple as "Start" works - the user clicks it, and the AI will guide the user from there.',
      'Start a new chat inside the project to test it.',
    ],
  },
  gemini: {
    name: 'Gem',
    toolName: 'Gem',
    steps: [
      'Go to Gemini → Gem Manager (left sidebar) → Create Gem',
      '<strong>Name:</strong> Give it a memorable name - a good name makes people want to use it',
      '<strong>Instructions:</strong> Paste your system prompt',
      'Click <strong>Save</strong> and then open the Gem to start testing.',
    ],
  },
  copilot: {
    name: 'Copilot GPT',
    toolName: 'Copilot GPT',
    steps: [
      'Go to Copilot → Create a Copilot GPT (or use Copilot Studio if your org has it)',
      '<strong>Name:</strong> Give it a memorable name - a good name makes people want to use it',
      '<strong>Instructions:</strong> Paste your system prompt',
      '<strong>Conversation starters:</strong> This is how you guide people to start using the tool. Something as simple as "Start" works - the user clicks it, and the AI will guide the user from there.',
      'Save and open it to start testing.',
    ],
  },
};

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = getText();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded transition-colors text-gray-500 hover:text-gray-300"
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

const STORAGE_KEY = 'mozilla-session1-worksheet';

function loadWorksheet(): Record<string, string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

const MozillaSession1: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('chatgpt');
  const setup = platformSetup[platform];

  const saved = useRef(loadWorksheet());
  const [feedbackIKeepGiving, setFeedbackIKeepGiving] = useState(saved.current.feedbackIKeepGiving || '');
  const [iGiveThisFeedbackOn, setIGiveThisFeedbackOn] = useState(saved.current.iGiveThisFeedbackOn || '');
  const [whoIGiveItTo, setWhoIGiveItTo] = useState(saved.current.whoIGiveItTo || '');
  const [theyReachForThisWhen, setTheyReachForThisWhen] = useState(saved.current.theyReachForThisWhen || '');
  const [stepsDescription, setStepsDescription] = useState(saved.current.stepsDescription || '');
  const [whatImLookingFor, setWhatImLookingFor] = useState(saved.current.whatImLookingFor || '');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        feedbackIKeepGiving,
        iGiveThisFeedbackOn,
        whoIGiveItTo,
        theyReachForThisWhen,
        stepsDescription,
        whatImLookingFor,
      }));
    } catch {}
  }, [feedbackIKeepGiving, iGiveThisFeedbackOn, whoIGiveItTo, theyReachForThisWhen, stepsDescription, whatImLookingFor]);

  const clearWorksheet = useCallback(() => {
    setFeedbackIKeepGiving('');
    setIGiveThisFeedbackOn('');
    setWhoIGiveItTo('');
    setTheyReachForThisWhen('');
    setStepsDescription('');
    setWhatImLookingFor('');
    setGeneratedPrompt('');
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const generatedPromptRef = useRef<HTMLDivElement>(null);

  const worksheetText = () => {
    return `The feedback I keep giving: ${feedbackIKeepGiving}

I give this feedback on: ${iGiveThisFeedbackOn}

Who I give it to: ${whoIGiveItTo}

They'd reach for this ${setup.toolName} when: ${theyReachForThisWhen}

The ${setup.toolName} walks the user through these steps: ${stepsDescription}

What I'm looking for when I evaluate this kind of work: ${whatImLookingFor}`;
  };

  const generatePromptText = () => {
    return `I'm building a ${setup.toolName} to give people feedback on ${iGiveThisFeedbackOn || '[what you give feedback on]'}. I'm going to ask for your help writing the prompt, but first I want to align on how it should work.\n\nThe feedback I keep giving is ${feedbackIKeepGiving || '[the feedback you keep giving]'}. I give this feedback on ${iGiveThisFeedbackOn || '[type of work]'}, and I give it to ${whoIGiveItTo || '[who you give it to]'}. They'd reach for this ${theyReachForThisWhen || '[when they would use it]'}.\n\nHere's roughly how I imagine it working: ${stepsDescription || '[the steps]'}\n\nHere's what I'm generally looking for when I evaluate this kind of work: ${whatImLookingFor || '[what you look for]'}\n\nBased on this, propose 3-5 success criteria you'd use to evaluate their work. Make them pass/fail, not scored. Then tell me: what are some examples of good output I could share with you that would help you refine these even more?`;
  };

  const generatePrompt = () => {
    setGeneratedPrompt(generatePromptText());
    setTimeout(() => {
      generatedPromptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const HighlightedSpan = ({ text }: { text: string }) => (
    <span className="px-1" style={{ backgroundColor: 'rgba(0, 255, 65, 0.2)' }}>{text}</span>
  );

  const textareaClasses = "w-full mt-1 p-3 border border-gray-600 rounded-md text-white text-base leading-relaxed bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-y placeholder-gray-500";

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Mozilla-style header bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-white text-lg font-bold tracking-tight" style={{ fontFamily: "'Inter', 'Instrument Sans', sans-serif" }}>
            Supermanagers
          </span>
          <span className="text-gray-500 text-sm">Session 1</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="mt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Build Your First {setup.toolName}
          </h1>
          <p className="text-gray-300 text-lg mt-4 leading-relaxed">
            Think of a piece of feedback you give over and over again. By the end of this session, you'll have a {setup.toolName} that can give that feedback for you.
          </p>
          <p className="text-gray-500 text-sm mt-3">
            <a href="#glossary-link" className="underline underline-offset-2 hover:text-gray-300 transition-colors">Confused about a term? Check the glossary.</a>
          </p>
        </div>

        {/* Platform Selector */}
        <div className="mb-12">
          <p className="text-gray-400 text-sm font-medium mb-3">I'm using:</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(platformLabels) as Platform[]).map((key) => (
              <button
                key={key}
                onClick={() => setPlatform(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  platform === key
                    ? 'text-black'
                    : 'border-2 border-gray-600 text-gray-400 hover:border-gray-400'
                }`}
                style={platform === key ? { backgroundColor: '#00ff41' } : {}}
              >
                {platformLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Why Start Here */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why start here?</h2>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            A {setup.toolName} is the simplest useful thing you can build with AI. You put the work into defining what good looks like, and your team gets the value without needing to develop prompting skills themselves. It's not just a time-saver - it's a way to encode your thinking so people build better judgment even when you're not in the room.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            But the real reason we start here is that you're learning the skill underneath: how to define quality criteria and have AI evaluate against them. This is the foundation for everything else in this training. Automated workflows, multi-step tools, team-wide systems - none of it works if you can't define what "good" looks like at each step and write that into a prompt.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            And it scales. The same prompt-writing skill translates directly into more sophisticated workflows. You can turn a {setup.toolName} into a shared team skill, stack multiple evaluations into a pipeline, or just keep using it as-is. I still use mine.
          </p>
          <p className="text-gray-300 text-base leading-relaxed">
            <a href="#bonus-challenges" className="underline underline-offset-2 hover:text-white transition-colors">Already comfortable making {setup.toolName}s? Try one of these bonus challenges.</a>
          </p>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Before the Session */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Before the Session</h2>

          <h3 className="text-lg font-bold text-white mb-2">Step 1: Watch the async video modules for Week 1</h3>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            These will be shared with you before the session.
          </p>

          <h3 className="text-lg font-bold text-white mb-2">Step 2: Fill out the worksheet</h3>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            Think about the feedback you find yourself giving over and over. The email you keep rewriting for someone. The presentation you keep sending back with the same notes. The report that never quite lands and you end up fixing at 11 PM.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            Pick one, and use that as the basis for your worksheet. If you have more than one idea, pick the one where you feel the most frustrated repeating yourself.
          </p>

          <div className="border border-gray-700 rounded-lg p-6 mb-4" style={{ backgroundColor: '#111111' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 text-sm">Your answers are saved in this browser. They'll be here when you come back.</p>
              <CopyButton getText={worksheetText} />
            </div>

            <label className="block mb-4">
              <span className="text-white text-base font-bold">The feedback I keep giving:</span>
              <span className="block text-gray-500 text-sm mt-0.5">What do you find yourself saying over and over? e.g., "Get to the point faster" or "This doesn't tell me what you want me to do"</span>
              <textarea
                className={textareaClasses}
                rows={2}
                value={feedbackIKeepGiving}
                onChange={(e) => setFeedbackIKeepGiving(e.target.value)}
                placeholder="Type here..."
              />
            </label>

            <label className="block mb-4">
              <span className="text-white text-base font-bold">I give this feedback on:</span>
              <span className="block text-gray-500 text-sm mt-0.5">What kind of work? e.g., emails, presentations, reports, memos</span>
              <textarea
                className={textareaClasses}
                rows={1}
                value={iGiveThisFeedbackOn}
                onChange={(e) => setIGiveThisFeedbackOn(e.target.value)}
                placeholder="Type here..."
              />
            </label>

            <label className="block mb-4">
              <span className="text-white text-base font-bold">Who I give it to:</span>
              <span className="block text-gray-500 text-sm mt-0.5">Direct reports? Cross-functional partners? External stakeholders?</span>
              <textarea
                className={textareaClasses}
                rows={1}
                value={whoIGiveItTo}
                onChange={(e) => setWhoIGiveItTo(e.target.value)}
                placeholder="Type here..."
              />
            </label>

            <label className="block mb-4">
              <span className="text-white text-base font-bold">They'd reach for this {setup.toolName} when:</span>
              <span className="block text-gray-500 text-sm mt-0.5">What's the specific trigger? e.g., "when they've finished a first draft" or "before sending an email to their skip level"</span>
              <textarea
                className={textareaClasses}
                rows={2}
                value={theyReachForThisWhen}
                onChange={(e) => setTheyReachForThisWhen(e.target.value)}
                placeholder="Type here..."
              />
            </label>

            <label className="block mb-4">
              <span className="text-white text-base font-bold">The {setup.toolName} walks the user through these steps:</span>
              <span className="block text-gray-500 text-sm mt-0.5">Example: 1. User pastes their draft email. 2. {setup.toolName} checks it against the criteria. 3. {setup.toolName} gives feedback on each criterion. 4. {setup.toolName} suggests a revised version.</span>
              <textarea
                className={textareaClasses}
                rows={3}
                value={stepsDescription}
                onChange={(e) => setStepsDescription(e.target.value)}
                placeholder="Type here..."
              />
            </label>

            <label className="block">
              <span className="text-white text-base font-bold">What I'm looking for when I evaluate this kind of work:</span>
              <span className="block text-gray-500 text-sm mt-0.5">Just get it out of your head. What makes this good vs. bad? What do you notice when it's off? Doesn't need to be perfect or structured.</span>
              <textarea
                className={textareaClasses}
                rows={4}
                value={whatImLookingFor}
                onChange={(e) => setWhatImLookingFor(e.target.value)}
                placeholder="Type here..."
              />
            </label>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={clearWorksheet}
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                Clear worksheet
              </button>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">Step 3: Submit your worksheet</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            So we can see what everyone's working on.
          </p>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* In the Session */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">In the Session</h2>
          <div className="border border-gray-700 rounded-lg p-4 mb-6" style={{ backgroundColor: '#111111' }}>
            <p className="text-white text-sm font-bold mb-2">What you'll need open:</p>
            <ol className="text-gray-300 text-sm leading-relaxed space-y-1 list-decimal list-inside">
              <li><strong>This session guide</strong> (for prompts and instructions)</li>
              <li><strong>A new {platformLabels[platform]} conversation</strong> (for building your prompt - you'll open this in Step 1)</li>
              <li><strong>Your {setup.toolName}</strong> (you'll create this partway through and open it in a separate tab to test)</li>
            </ol>
            <p className="text-gray-500 text-sm mt-2">You'll be switching between these tabs throughout the session. Keep all three open once you have them.</p>
          </div>
        </div>

        {/* Part 1 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-3">Part 1: Demo - Building a {setup.toolName}</h3>
          <p className="text-gray-500 text-sm font-medium mb-4">10 min</p>
          <p className="text-gray-300 text-base leading-relaxed italic mb-4">
            Hilary demos live. First, she goes straight to {platformLabels[platform]} and asks it to build a {setup.toolName} from a vague description - no worksheet, no spec work. You'll see what comes out. Then she does it the right way: provides context (in this case the worksheet), aligns on how the {setup.toolName} should work before writing anything, and builds from that.
          </p>
          <details className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 text-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
              See the under-specified prompt Hilary used
            </summary>
            <div className="px-4 py-4" style={{ backgroundColor: '#0a0a0a' }}>
              <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                <p>"Can you write a prompt for a {setup.toolName} that gives feedback on emails to execs?"</p>
              </div>
              <p className="text-gray-500 text-sm mt-3">That's it. No context about what kind of feedback, who it's for, what good looks like. Watch what happens.</p>
            </div>
          </details>

          <div className="p-4 border-l-4" style={{ backgroundColor: '#0a0a0a', borderColor: '#00ff41' }}>
            <p className="text-gray-300 text-base leading-relaxed">
              <strong className="text-white">Key takeaway:</strong> Aligning with the AI on what you want and how it should work <em>before</em> it starts writing gets you a dramatically better result.
            </p>
          </div>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Part 2 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-3">Part 2: Guided Build - Executive Communication Reviewer</h3>
          <p className="text-gray-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            Before you build your own, we're all going to build the same thing together so you can learn the mechanics without also having to figure out what to build.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            We're building an <strong className="text-white">executive communication reviewer</strong> - a {setup.toolName} that evaluates whether a message to leadership is clear, concise, and appropriate for the audience. Everyone writes emails to leadership. Everyone has opinions about what makes them good or bad. That makes this a good first build.
          </p>

          <h4 className="text-lg font-bold text-white mb-2">Step 1: Tell the AI what you're building</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Open {platformLabels[platform]} and tell it what you want to build. Be specific - give it the context from your worksheet. Here's an example:
          </p>
          <div className="p-4 mb-6 border-l-4" style={{ backgroundColor: 'rgba(0, 255, 65, 0.05)', borderColor: '#00ff41' }}>
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `I'm building a ${setup.toolName} to give people feedback on the emails they send to executives at my company. I'm going to ask for your help writing the prompt, but first I want to align on how it should work.\n\nThe feedback I keep giving is that people need to get to the point faster and lead with what they need, not the backstory. I give this feedback on emails to the CEO, and I give it to product managers on my team. They'd reach for this before sending an important message to someone senior.\n\nBased on this, propose 3-5 success criteria you'd use to evaluate their emails. Make them pass/fail, not scored. Then tell me: what are some examples of good emails I could share with you that would help you refine these even more?`} />
            </div>
            <p className="text-gray-300 text-base font-mono leading-relaxed">
              "I'm building a {setup.toolName} to give people feedback on <HighlightedSpan text="the emails they send to executives at my company" />. I'm going to ask for your help writing the prompt, but first I want to align on how it should work.
            </p>
            <p className="text-gray-300 text-base font-mono leading-relaxed mt-3">
              The feedback I keep giving is that <HighlightedSpan text="people need to get to the point faster and lead with what they need, not the backstory" />. I give this feedback on <HighlightedSpan text="emails to the CEO" />, and I give it to <HighlightedSpan text="product managers on my team" />. They'd reach for this <HighlightedSpan text="before sending an important message to someone senior" />.
            </p>
            <p className="text-gray-300 text-base font-mono leading-relaxed mt-3">
              Based on this, propose 3-5 success criteria you'd use to evaluate their emails. Make them pass/fail, not scored. Then tell me: what are some examples of good emails I could share with you that would help you refine these even more?"
            </p>
          </div>
          <details className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 text-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
              See the detailed version Hilary used
            </summary>
            <div className="px-4 py-4" style={{ backgroundColor: '#0a0a0a' }}>
              <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                <p>"I'm building a {setup.toolName} to give people feedback on the emails they send to executives at my company. I'm going to ask for your help writing the prompt, but first I want to align on how it should work.</p>
                <p className="mt-2">The feedback I keep giving is that people need to get to the point faster and lead with what they need, not the backstory. They bury the ask three paragraphs in, or they send an &quot;update&quot; email that doesn't actually say what they need from the reader. I also see people sending emails with two separate asks crammed into one message, where the second one gets lost.</p>
                <p className="mt-2">I give this feedback on emails to the CEO and other senior leaders, and I give it to product managers on my team. They'd reach for this before sending an important message to someone senior - basically a gut check before they hit send.</p>
                <p className="mt-2">One thing that's specific to my CEO: he never wants to evaluate just one option. He wants to see your recommendation, but he also wants to know what else you considered and why you didn't go with that. You can't go into too much detail though, or he'll get lost - so one alternative with a brief rationale is the sweet spot.</p>
                <p className="mt-2">Based on this, propose 3-5 success criteria you'd use to evaluate their emails. Make them pass/fail, not scored. Then tell me: what are some examples of good emails I could share with you that would help you refine these even more?"</p>
              </div>
              <p className="text-gray-500 text-sm mt-3">Notice how much more specific this is than the template above. The CEO preference for alternatives, the common failure modes, pass/fail instead of scored - these details are what turn generic feedback into feedback that sounds like you.</p>
            </div>
          </details>

          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Customize this for your own context - who are you, who are you giving this to, what's the feedback you keep giving? The more specific you are here, the better the {setup.toolName} will be.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Review what it comes back with. Do the criteria match what you actually care about? Are any missing? Tell it what to change before moving on.
          </p>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 2: Upload examples of what good looks like</h4>
          <div className="p-4 mb-4 border-l-4" style={{ backgroundColor: '#0a0a0a', borderColor: '#00ff41' }}>
            <p className="text-gray-300 text-base leading-relaxed">
              <strong className="text-white">Note:</strong> You're about to upload examples <em>into the conversation</em> you're having with the AI. This is different from uploading files into the {setup.toolName}'s knowledge base, and it's intentional. When you upload in conversation, you can ask the AI what it's taking away from the examples and verify you're on the same page. When you dump files into a knowledge base, you don't get that check - it becomes a black box. We'll talk more about when and how to use knowledge bases later.
            </p>
          </div>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            The AI just proposed criteria based on your description. Now show it what good actually looks like. Find 1-2 real examples - a well-written executive email, a message that landed the way you wanted it to - and paste or upload them. Then send something like:
          </p>
          <div className="p-4 mb-4 border-l-4" style={{ backgroundColor: 'rgba(0, 255, 65, 0.05)', borderColor: '#00ff41' }}>
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `Here are a couple examples of ${iGiveThisFeedbackOn || 'emails'} that I think are really good. Review them and revise the success criteria based on what you see. What changed from your original criteria? Was anything missing?`} />
            </div>
            <p className="text-gray-300 text-base font-mono leading-relaxed">
              "Here are a couple examples of emails that I think are really good. Review them and revise the success criteria based on what you see. What changed from your original criteria? Was anything missing?"
            </p>
          </div>
          <details className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 text-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
              Don't have any emails handy? Use these sample emails to practice with.
            </summary>
            <div className="px-4 py-4 space-y-4" style={{ backgroundColor: '#0a0a0a' }}>
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Example 1</p>
                <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                  <p>Subject: Need a decision on Q3 pricing by Friday</p>
                  <p className="mt-2">Hi Sarah,</p>
                  <p className="mt-2">We need to lock Q3 pricing by Friday to hit our June 1 launch date. I'm recommending we go with Option B (15% increase on Pro tier, no change to Starter).</p>
                  <p className="mt-2">Why Option B: Our Pro users have the lowest churn (2.1%) and highest expansion revenue. In customer interviews last month, price sensitivity ranked 6th out of 8 factors in their renewal decisions. Starter users are more price-sensitive and we're still trying to grow that base.</p>
                  <p className="mt-2">If you're not comfortable with 15%, the fallback is Option A (10% across both tiers). It's safer but leaves about $180K on the table annually. I don't prefer it because it doesn't reflect the difference in price sensitivity between the two segments, but it's a reasonable alternative.</p>
                  <p className="mt-2">The risk with either option is that a few large Pro accounts push back. I've flagged the 5 most likely and can have CSMs reach out ahead of the change if you approve.</p>
                  <p className="mt-2">Can you confirm Option B (or A) by EOD Thursday so we can update billing?</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Example 2</p>
                <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                  <p>Subject: Mobile onboarding - recommending we cut step 3</p>
                  <p className="mt-2">Hi James,</p>
                  <p className="mt-2">Quick update on mobile onboarding: I want to cut the "invite your team" step (step 3 of 5). 73% of users skip it, and the ones who do complete it have no measurable difference in 30-day retention vs. those who don't.</p>
                  <p className="mt-2">Removing it gets our onboarding completion rate from 61% to an estimated 78% (based on current drop-off data at that step). Engineering says it's a 2-day change.</p>
                  <p className="mt-2">I'm not asking us to kill team invites entirely - just moving it to a prompt after the user's first session, when they have context on what they'd be inviting people to.</p>
                  <p className="mt-2">Unless you see a reason to hold off, I'll get this into the next sprint.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <CopyButton getText={() => `Here are two examples of executive emails I think are really good. Please review them and revise the success criteria based on what you see. What changed from your original criteria? Was anything missing?\n\n---\n\nExample 1:\n\nSubject: Need a decision on Q3 pricing by Friday\n\nHi Sarah,\n\nWe need to lock Q3 pricing by Friday to hit our June 1 launch date. I'm recommending we go with Option B (15% increase on Pro tier, no change to Starter).\n\nWhy Option B: Our Pro users have the lowest churn (2.1%) and highest expansion revenue. In customer interviews last month, price sensitivity ranked 6th out of 8 factors in their renewal decisions. Starter users are more price-sensitive and we're still trying to grow that base.\n\nIf you're not comfortable with 15%, the fallback is Option A (10% across both tiers). It's safer but leaves about $180K on the table annually. I don't prefer it because it doesn't reflect the difference in price sensitivity between the two segments, but it's a reasonable alternative.\n\nThe risk with either option is that a few large Pro accounts push back. I've flagged the 5 most likely and can have CSMs reach out ahead of the change if you approve.\n\nCan you confirm Option B (or A) by EOD Thursday so we can update billing?\n\n---\n\nExample 2:\n\nSubject: Mobile onboarding - recommending we cut step 3\n\nHi James,\n\nQuick update on mobile onboarding: I want to cut the "invite your team" step (step 3 of 5). 73% of users skip it, and the ones who do complete it have no measurable difference in 30-day retention vs. those who don't.\n\nRemoving it gets our onboarding completion rate from 61% to an estimated 78% (based on current drop-off data at that step). Engineering says it's a 2-day change.\n\nI'm not asking us to kill team invites entirely - just moving it to a prompt after the user's first session, when they have context on what they'd be inviting people to.\n\nUnless you see a reason to hold off, I'll get this into the next sprint.`} />
              </div>
            </div>
          </details>

          <details className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 text-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
              See the examples Hilary uploaded
            </summary>
            <div className="px-4 py-4 space-y-4" style={{ backgroundColor: '#0a0a0a' }}>
              <p className="text-gray-500 text-sm">One strong email and one that's not as sharp. The AI should be able to tell the difference.</p>
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Example 1 (Good)</p>
                <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                  <p>Subject: Recommend we sunset the legacy API by June 1</p>
                  <p className="mt-2">Hi David,</p>
                  <p className="mt-2">I'm recommending we sunset the legacy API by June 1. 94% of active integrations have already migrated to v3, and the remaining 12 partners have been notified with a 90-day window.</p>
                  <p className="mt-2">Why June 1: Maintaining both APIs is costing us roughly 15 engineering hours per week in compatibility patches. That's a full headcount we could redeploy to the partner SDK work you flagged last month.</p>
                  <p className="mt-2">The alternative we considered was extending support through Q3 to give the remaining partners more runway. We don't recommend this because 8 of the 12 are on free-tier accounts with minimal volume, and the other 4 have confirmed migration timelines before May.</p>
                  <p className="mt-2">Risk: If any of the 4 paying partners slip their timeline, we could offer a 30-day individual extension without keeping the full API alive. I've already discussed this with the partnerships team and they're comfortable with it.</p>
                  <p className="mt-2">Can you confirm you're good with June 1 so we can send the final deprecation notice this week?</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Example 2 (Mediocre)</p>
                <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                  <p>Subject: Metrics review + a few things</p>
                  <p className="mt-2">Hi David,</p>
                  <p className="mt-2">Wanted to share some context on where we landed for Q1 and flag a couple of things.</p>
                  <p className="mt-2">Overall the quarter went well. Revenue came in at $4.2M against a $4.0M target, so we're slightly ahead. The enterprise segment drove most of the upside - we closed 3 deals that were originally forecasted for Q2. Mid-market was roughly flat, which I think is partly a pipeline issue and partly that the new pricing confused a few prospects during the transition.</p>
                  <p className="mt-2">On the product side, we shipped the dashboard redesign on time, which was a big lift for the team. Early usage data looks promising but it's too soon to draw conclusions. We're planning to do a deeper analysis in a few weeks once we have more data. The mobile app project is behind schedule - we lost two weeks when the lead engineer got pulled into the security audit. I'm working with the engineering manager to figure out a revised timeline and will share that when we have it.</p>
                  <p className="mt-2">One other thing - the marketing team asked if we could get budget approval for an additional contractor to help with the product launch campaign in Q2. It would be about $25K for three months. I think it's worth it given how much we have launching, but wanted to get your take.</p>
                  <p className="mt-2">Also, I've been thinking about whether we should restructure the weekly leadership sync. It's been feeling unproductive lately and I have some ideas. Can we find 20 minutes to discuss?</p>
                  <p className="mt-2">Let me know if you have questions on any of this.</p>
                  <p className="mt-2">Thanks,<br/>Sarah</p>
                </div>
              </div>
            </div>
          </details>

          <p className="text-gray-300 text-base leading-relaxed mb-4">
            Compare the before and after. Did the criteria get more specific? Did it pick up on something you didn't think to articulate?
          </p>

          <div className="p-4 mb-6 border-l-4" style={{ backgroundColor: '#0a0a0a', borderColor: '#00ff41' }}>
            <p className="text-gray-300 text-base leading-relaxed">
              <strong className="text-white">Key takeaway:</strong> When you want to give AI examples of what good looks like, don't just load them into the knowledge base and hope for the best. Include a step where you ask it what it's pulling out from those examples. That way, you can validate that you and the AI are taking the same things away about what makes them good.
            </p>
          </div>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 3: Generate the prompt</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Once you're aligned on the criteria, ask it to generate the system prompt. Something like:
          </p>
          <div className="p-4 mb-6 border-l-4" style={{ backgroundColor: 'rgba(0, 255, 65, 0.05)', borderColor: '#00ff41' }}>
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `OK, now write a system prompt for this ${setup.toolName} based on what we just agreed on.`} />
            </div>
            <p className="text-gray-300 text-base font-mono leading-relaxed">
              "OK, now write a system prompt for this {setup.toolName} based on what we just agreed on."
            </p>
          </div>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Scan the prompt it generated and assess: could a person with limited context read this prompt, follow the instructions, and get to a good output? If they'd be confused, the AI will be too. (This is a <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-200 transition-colors" style={{ color: '#00ff41' }}>well-documented prompting best practice</a>.)
          </p>

          <details className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 text-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
              See what Hilary told the AI to change
            </summary>
            <div className="px-4 py-4" style={{ backgroundColor: '#0a0a0a' }}>
              <p className="text-gray-500 text-sm mb-3">After reviewing the first draft of the prompt, Hilary pushed back on one thing: the feedback was rewriting emails for people instead of teaching them. Here's what she said:</p>
              <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                <p>"I don't want this to just rewrite people's emails. I want it to teach. When it gives feedback, it should explain what's wrong and why, then show what a rewrite would look like so they can see the difference. The goal is that over time, they start writing better emails on their own - not that they become dependent on the tool."</p>
              </div>
              <p className="text-gray-500 text-sm mt-3">This is a good instinct for any feedback tool. Think about whether yours should teach or just fix.</p>
            </div>
          </details>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 4: Set up your {setup.name}</h4>
          <ol className="text-gray-300 text-base leading-relaxed space-y-2 mb-4 list-decimal list-inside">
            {setup.steps.map((step, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 5: Test and refine</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Your {setup.toolName} is set up. Now you need to see if it actually works. You'll be working across three tabs:
          </p>
          <div className="border border-gray-700 rounded-lg p-4 mb-4" style={{ backgroundColor: '#111111' }}>
            <ol className="text-gray-300 text-sm leading-relaxed space-y-1 list-decimal list-inside">
              <li><strong className="text-white">Your {setup.toolName}</strong> - where you test it by pasting in real work</li>
              <li><strong className="text-white">The prompt-building conversation</strong> - where you tell the AI what to change and get an updated prompt</li>
              <li><strong className="text-white">The {setup.toolName} editor</strong> - where you paste the updated prompt into the instructions</li>
            </ol>
            <p className="text-gray-500 text-sm mt-2">The loop is: test in tab 1, refine in tab 2, paste the new prompt in tab 3, then test again in tab 1.</p>
          </div>
          <ol className="text-gray-300 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
            <li><strong className="text-white">Open your {setup.toolName} in a new window.</strong> Keep the prompt-building conversation open in a separate tab.</li>
            <li><strong className="text-white">Paste in a real email</strong> (or use the sample below) and send it.</li>
            <li><strong className="text-white">Read the feedback.</strong> Do you agree with it? Would you have said the same things? If it says "great job!" on something you'd send back, that's a problem.</li>
            <li><strong className="text-white">Go back to your prompt-building conversation.</strong> Tell it what you didn't like about the feedback - what it missed, what it got wrong, what felt off. Ask it what changes it would recommend making to the prompt.</li>
            <li><strong className="text-white">If you agree with the changes, tell it to make them.</strong> Copy the updated prompt.</li>
            <li><strong className="text-white">Paste the new prompt back into your {setup.toolName}'s instructions</strong> (replacing the old one) and test again.</li>
          </ol>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            This test-and-refine loop is how you get from a decent {setup.toolName} to a good one. Every round makes the prompt sharper.
          </p>

          <details className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 text-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
              Don't have an email handy? Use this sample to test with.
            </summary>
            <div className="px-4 py-4" style={{ backgroundColor: '#0a0a0a' }}>
              <div className="rounded p-4 text-gray-300 text-sm leading-relaxed font-mono" style={{ backgroundColor: '#111111' }}>
                <p>Subject: Update on the project</p>
                <p className="mt-2">Hi Michelle,</p>
                <p className="mt-2">I wanted to give you a quick update on the project. We've been making good progress over the last few weeks and the team has been working really hard. There have been some challenges along the way but overall things are moving in the right direction.</p>
                <p className="mt-2">One thing I wanted to flag is that we're running a bit behind on the timeline. The original plan was to launch by end of Q2 but realistically I think we're looking at mid-July. Part of this is because the engineering team got pulled into the infrastructure migration for a couple of weeks, and part of it is that the design reviews have been taking longer than expected because we keep finding edge cases.</p>
                <p className="mt-2">I think we have a good plan to get back on track though. We're going to do a sprint focused on the core flows next week and then reassess. I'll keep you posted.</p>
                <p className="mt-2">Also, separately, I wanted to ask about the budget for the contractor we discussed. Do you think we could get that approved? It would really help us move faster.</p>
                <p className="mt-2">Let me know if you have any questions!</p>
                <p className="mt-2">Thanks,<br/>Alex</p>
              </div>
              <div className="flex justify-end mt-3">
                <CopyButton getText={() => `Subject: Update on the project\n\nHi Michelle,\n\nI wanted to give you a quick update on the project. We've been making good progress over the last few weeks and the team has been working really hard. There have been some challenges along the way but overall things are moving in the right direction.\n\nOne thing I wanted to flag is that we're running a bit behind on the timeline. The original plan was to launch by end of Q2 but realistically I think we're looking at mid-July. Part of this is because the engineering team got pulled into the infrastructure migration for a couple of weeks, and part of it is that the design reviews have been taking longer than expected because we keep finding edge cases.\n\nI think we have a good plan to get back on track though. We're going to do a sprint focused on the core flows next week and then reassess. I'll keep you posted.\n\nAlso, separately, I wanted to ask about the budget for the contractor we discussed. Do you think we could get that approved? It would really help us move faster.\n\nLet me know if you have any questions!\n\nThanks,\nAlex`} />
              </div>
            </div>
          </details>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Part 3 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-3">Part 3: Share-Out</h3>
          <p className="text-gray-500 text-sm font-medium mb-4">10 min</p>
          <p className="text-gray-300 text-base leading-relaxed">
            Everyone built the same type of {setup.toolName}, but with different criteria and context. We'll hear from a few people: what criteria did you use? What did the feedback look like? Did anything surprise you?
          </p>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Part 4 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-3">Part 4: Build Your Own</h3>
          <p className="text-gray-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            Now do the same thing for the feedback from your worksheet - the one you actually care about.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            If you'd prefer to finish this on your own time, this guide is designed to work asynchronously. The main thing you'll miss is being able to ask questions in real time.
          </p>

          <h4 className="text-lg font-bold text-white mb-2">Step 1: Generate your prompt</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Open a new conversation in {platformLabels[platform]}. If you filled out the worksheet above, click the button below to turn it into your first message. If not, fill in the blanks in the template.
          </p>

          <div className="mb-6">
            <button
              onClick={generatePrompt}
              className="px-5 py-2.5 text-sm font-medium rounded-md transition-colors text-black hover:opacity-90"
              style={{ backgroundColor: '#00ff41' }}
            >
              Generate prompt from my worksheet
            </button>

            {generatedPrompt ? (
              <div ref={generatedPromptRef} className="mt-4 p-4 border-l-4" style={{ backgroundColor: 'rgba(0, 255, 65, 0.05)', borderColor: '#00ff41' }}>
                <div className="flex justify-end mb-2">
                  <CopyButton getText={() => generatedPrompt} />
                </div>
                <p className="text-gray-300 text-base font-mono leading-relaxed">
                  "I'm building a {setup.toolName} to give people feedback on <HighlightedSpan text={iGiveThisFeedbackOn || '[what you give feedback on]'} />. I'm going to ask for your help writing the prompt, but first I want to align on how it should work.
                </p>
                <p className="text-gray-300 text-base font-mono leading-relaxed mt-3">
                  The feedback I keep giving is <HighlightedSpan text={feedbackIKeepGiving || '[the feedback you keep giving]'} />. I give this feedback on <HighlightedSpan text={iGiveThisFeedbackOn || '[type of work]'} />, and I give it to <HighlightedSpan text={whoIGiveItTo || '[who you give it to]'} />. They'd reach for this <HighlightedSpan text={theyReachForThisWhen || '[when they would use it]'} />.
                </p>
                <p className="text-gray-300 text-base font-mono leading-relaxed mt-3">
                  Here's roughly how I imagine it working: <HighlightedSpan text={stepsDescription || '[the steps]'} />
                </p>
                <p className="text-gray-300 text-base font-mono leading-relaxed mt-3">
                  Here's what I'm generally looking for when I evaluate this kind of work: <HighlightedSpan text={whatImLookingFor || '[what you look for]'} />
                </p>
                <p className="text-gray-300 text-base font-mono leading-relaxed mt-3">
                  Based on this, propose 3-5 success criteria you'd use to evaluate their work. Make them pass/fail, not scored. Then tell me: what are some examples of good output I could share with you that would help you refine these even more?"
                </p>
              </div>
            ) : null}
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Review the criteria it suggests. Do they match what you actually care about? Tell it what to change before moving on.
          </p>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 2: Upload examples of what good looks like</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Same drill as before. Find 1-2 real examples of this kind of work that you think are genuinely good. Paste or upload them and ask the AI to sharpen its criteria. If you don't have examples handy, skip this step for now - you can always come back and do it later.
          </p>
          <div className="p-4 mb-4 border-l-4" style={{ backgroundColor: 'rgba(0, 255, 65, 0.05)', borderColor: '#00ff41' }}>
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `Here are some examples of what good looks like for this kind of work. Review them and revise the success criteria based on what you see. What changed from your original criteria? Was anything missing?`} />
            </div>
            <p className="text-gray-300 text-base font-mono leading-relaxed">
              "Here are some examples of what good looks like for this kind of work. Review them and revise the success criteria based on what you see. What changed from your original criteria? Was anything missing?"
            </p>
          </div>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 3: Generate the prompt</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Once you're aligned on the criteria, ask it to generate the system prompt:
          </p>
          <div className="p-4 mb-6 border-l-4" style={{ backgroundColor: 'rgba(0, 255, 65, 0.05)', borderColor: '#00ff41' }}>
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `OK, now write a system prompt for this ${setup.toolName} based on what we just agreed on.`} />
            </div>
            <p className="text-gray-300 text-base font-mono leading-relaxed">
              "OK, now write a system prompt for this {setup.toolName} based on what we just agreed on."
            </p>
          </div>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Scan the prompt it generated and assess: could a person with limited context read this prompt, follow the instructions, and get to a good output? If they'd be confused, the AI will be too. (This is a <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-200 transition-colors" style={{ color: '#00ff41' }}>well-documented prompting best practice</a>.)
          </p>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 4: Set up your {setup.name}</h4>
          <ol className="text-gray-300 text-base leading-relaxed space-y-2 mb-6 list-decimal list-inside">
            {setup.steps.map((step, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>

          <h4 className="text-lg font-bold text-white mt-8 mb-2">Step 5: Test and refine</h4>
          <ol className="text-gray-300 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
            <li><strong className="text-white">Open your {setup.toolName} in a new window.</strong> Keep the prompt-building conversation open in a separate tab.</li>
            <li><strong className="text-white">Paste in a real example</strong> of the kind of work your {setup.toolName} is supposed to evaluate.</li>
            <li><strong className="text-white">Read the feedback.</strong> Do you agree with it? What did it miss? What felt off?</li>
            <li><strong className="text-white">Go back to your prompt-building conversation.</strong> Tell it what you didn't like and ask it what changes it would recommend to the prompt.</li>
            <li><strong className="text-white">If you agree with the changes, tell it to make them.</strong> Copy the updated prompt.</li>
            <li><strong className="text-white">Paste the new prompt back into your {setup.toolName}'s instructions</strong> and test again.</li>
          </ol>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            We'll dig deeper into how to improve our tools next week.
          </p>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Part 5 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-3">Part 5: Q&A</h3>
          <p className="text-gray-500 text-sm font-medium mb-4">10 min</p>
          <p className="text-gray-300 text-base leading-relaxed">
            What's broken? What are you stuck on? What surprised you? Open floor.
          </p>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>

          <h4 className="text-base font-bold text-white mb-2">Should I upload documents to my {setup.toolName}?</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            There's an important distinction here. Uploading examples <em>in conversation</em> and asking the AI what it took away from them (what we do in Step 2) is great - you can verify that you and the AI are on the same page. That's different from dumping a 50-page doc into the {setup.toolName}'s knowledge base and hoping it figures out what matters.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Rule of thumb: if something is important enough that the {setup.toolName} needs to get it right every time, put it directly in the system prompt as an explicit instruction. Save uploads for supplementary reference material.
          </p>

          <h4 className="text-base font-bold text-white mb-2">What if my {setup.toolName} is too nice?</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            This is the most common problem. AI defaults to being encouraging, which means it will often pass work that you wouldn't. There are two things to try:
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            First, separate tone from standards. Your {setup.toolName} can be encouraging in how it delivers feedback while still being really clear about what the bar is and whether something meets it. The tone can be warm; the evaluation needs to be honest.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            Second, pressure-test the criteria. Ask the AI: "Be extremely specific - how would you define 'passing' on each of these criteria?" Read what it says. If it's too lenient, tell it: "I think the bar needs to be higher. What would a more discerning version of this look like?" Keep pushing until the definition of "good enough" matches yours, not the AI's default.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Showing the AI examples of work you'd actually push back on can also help it calibrate. We'll work on this more in Session 2.
          </p>

          <h4 className="text-base font-bold text-white mb-2">What if I don't have examples of what good looks like?</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            A few options, all with trade-offs:
          </p>
          <ul className="text-gray-300 text-base leading-relaxed space-y-2 mb-3 list-disc list-inside">
            <li><strong className="text-white">Just explain it.</strong> Write down what you'd say if you were giving the feedback live. That's often enough to get started.</li>
            <li><strong className="text-white">Search for examples online.</strong> If you're building something around keynote slides or executive memos, there are good examples out there.</li>
            <li><strong className="text-white">Ask the AI to generate examples.</strong> This is called synthetic data, and it can work, especially for text-based outputs. Just know that the AI will generate "generically good" examples based on broad best practices.</li>
          </ul>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            What makes the examples step really powerful is when you're encoding <em>your</em> specific judgment - the nuances of what works within your organization, for your audience, that might not match generic best practice. That's harder to get from synthetic data. If you can find real examples, they're worth the effort.
          </p>

          <h4 className="text-base font-bold text-white mb-2">My idea feels too big. How do I know if I'm overscoping?</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Start with the smallest possible scope. Get one thing working well, then expand. If you're trying to build something that handles multiple types of input, covers several different scenarios, or has a lot of conditional logic - narrow it down. Pick the single most common case and build for that. You can always add complexity later, but it's much harder to debug a tool that's trying to do five things at once.
          </p>

          <h4 className="text-base font-bold text-white mb-2">My {setup.toolName} keeps going after it's done.</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Add this to the end of your system prompt: "When you have finished, stop. Do not continue unless the user asks." Without this, the AI will keep offering to do more things - that's its default behavior, not a bug in your prompt.
          </p>

          <h4 className="text-base font-bold text-white mb-2">What's Markdown? Do I need to learn it?</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            You'll notice the system prompt uses <code className="px-1 rounded text-sm" style={{ backgroundColor: '#1a1a1a' }}>#</code> for headings and <code className="px-1 rounded text-sm" style={{ backgroundColor: '#1a1a1a' }}>**</code> for bold text. That's Markdown - a simple formatting style that helps AI understand structure, similar to how different header sizes in a Word doc help you scan a page.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            You don't need to learn it. When the AI generates a system prompt, it'll already be in Markdown. If you're curious, the basics are: <code className="px-1 rounded text-sm" style={{ backgroundColor: '#1a1a1a' }}>#</code> for a main heading, <code className="px-1 rounded text-sm" style={{ backgroundColor: '#1a1a1a' }}>##</code> for a subheading, <code className="px-1 rounded text-sm" style={{ backgroundColor: '#1a1a1a' }}>**bold**</code> for bold, and <code className="px-1 rounded text-sm" style={{ backgroundColor: '#1a1a1a' }}>-</code> for bullet points. If you ever want to convert a Google Doc to Markdown, you can download it as .md or just paste the content into the AI and ask it to convert it.
          </p>

          <h4 className="text-base font-bold text-white mb-2">Do I need a paid account?</h4>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            A paid account gives you access to the {setup.name} builder, which is what we use in this session. If you can't get one, you can still follow along - write your system prompt, save it in a doc, and paste it at the start of any new conversation. It's not as seamless, but it works.
          </p>

        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Before Next Session */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Before Next Session</h2>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            <strong className="text-white">Share your prompt with the group.</strong> It can be the system prompt for the {setup.toolName} you built today, or - if you kept experimenting and built something else - a prompt for a different one. Either is great.
          </p>
          <p className="text-gray-300 text-base leading-relaxed">
            Come to the next session ready to workshop it. We'll be diagnosing what's working, what's not, and how to make it better - so the more you've used it and noticed what breaks, the more you'll get out of it.
          </p>
        </div>

        <hr className="border-gray-800 mb-12" />

        {/* Advanced */}
        <details id="bonus-challenges" className="mb-16 border border-gray-700 rounded-lg overflow-hidden">
          <summary className="px-6 py-4 text-white font-bold cursor-pointer hover:bg-gray-800 transition-colors" style={{ backgroundColor: '#111111' }}>
            Already comfortable building {setup.toolName}s? Try one of these instead.
          </summary>
          <div className="px-6 py-6 space-y-6" style={{ backgroundColor: '#0a0a0a' }}>
            <div>
              <h4 className="text-base font-bold text-white mb-2">Challenge 1: Build a teaching tool, not a fixing tool</h4>
              <p className="text-gray-300 text-base leading-relaxed">
                Most feedback tools just tell people what to change. A better version explains <em>why</em> something isn't working and shows what a stronger version would look like - so the person learns to catch it themselves next time. Redesign your {setup.toolName}'s prompt so that if someone used it for six months and then lost access, they'd still be better at the task than when they started.
              </p>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-2">Challenge 2: Build a multi-step workflow</h4>
              <p className="text-gray-300 text-base leading-relaxed">
                Instead of evaluating a single input, design a {setup.toolName} that walks someone through a process - step by step, with the AI guiding them through each stage. Think about a task where people usually skip steps or do them out of order. What would it look like if the AI helped them get it right from the start?
              </p>
            </div>
          </div>
        </details>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-800">
          <p className="text-gray-600 text-sm">Supermanagers - AI Leadership Training</p>
        </div>
      </div>
    </section>
  );
};

export default MozillaSession1;
