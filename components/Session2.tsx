import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Platform = 'chatgpt' | 'claude' | 'gemini' | 'copilot';

const platformLabels: Record<Platform, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
  copilot: 'Copilot',
};

const platformSetup: Record<Platform, { name: string; toolName: string }> = {
  chatgpt: { name: 'Custom GPT', toolName: 'Custom GPT' },
  claude: { name: 'Project', toolName: 'Project' },
  gemini: { name: 'Gem', toolName: 'Gem' },
  copilot: { name: 'Copilot GPT', toolName: 'Copilot GPT' },
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
      className="p-1.5 rounded transition-colors text-stone-400 hover:text-stone-600"
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

const Session2: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('chatgpt');
  const setup = platformSetup[platform];

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
          &larr; Back
        </Link>

        <div className="mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Get Your Tool from OK to Great
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            You built a {setup.toolName} last week. This week, we figure out what's actually wrong with it and make it better.
          </p>
          <p className="text-stone-500 text-sm mt-3">
            <Link to="/resources" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Confused about a term? Check the glossary.</Link>
          </p>
        </div>

        {/* Platform Selector */}
        <div className="mb-12">
          <p className="text-stone-500 text-sm font-medium mb-3">I'm using:</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(platformLabels) as Platform[]).map((key) => (
              <button
                key={key}
                onClick={() => setPlatform(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  platform === key
                    ? 'bg-stone-800 text-white'
                    : 'bg-white border-2 border-stone-300 text-stone-600 hover:border-stone-400'
                }`}
              >
                {platformLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Before This Class */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Before This Class</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">1. Use your tool 2-3 times</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Open the {setup.toolName} you built in Session 1 and actually use it on real work. Pay attention to what's off. Does the feedback sound like you? Does it catch the things you'd catch? Does it miss anything obvious?
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-8">
            Come ready to describe one specific thing that isn't working right. Not "it's not great" but something concrete: "it's too easy on people," "it keeps focusing on tone when the real problem is structure," "it doesn't know when to push back."
          </p>

          <h3 className="text-lg font-bold text-stone-800 mb-2">2. Watch the async video modules for Week 2</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            These are in the Maven portal. Pay special attention to the modules on codifying your standards (2.1) and coaching tools (2.2) - they'll be directly relevant to what we do in class.
          </p>

          <h3 className="text-lg font-bold text-stone-800 mb-2">3. Post your prompt on the Maven portal</h3>
          <p className="text-stone-800 text-base leading-relaxed">
            If you haven't already, share the system prompt from your Session 1 build. This helps the group learn from each other's approaches.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* In Class */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">In Class</h2>
          <div className="bg-stone-100 border border-stone-300 rounded-lg p-4 mb-6">
            <p className="text-stone-800 text-sm font-bold mb-2">What you'll need open:</p>
            <ol className="text-stone-800 text-sm leading-relaxed space-y-1 list-decimal list-inside">
              <li><strong>This session guide</strong> (for prompts and instructions)</li>
              <li><strong>Your {setup.toolName} from Session 1</strong> (the one you've been testing)</li>
              <li><strong>A {platformLabels[platform]} conversation</strong> (for reworking your prompt)</li>
              <li><strong>The {setup.toolName} editor</strong> (for pasting updated prompts)</li>
            </ol>
          </div>
        </div>

        {/* Part 1 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 1: What Went Wrong?</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">15 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            We start by sharing what broke. Not in a "my tool is bad" way - in a diagnostic way. The point is to figure out <em>what kind</em> of problem you have, because the fix is different depending on the type.
          </p>

          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Most issues with {setup.toolName}s fall into one of these categories:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <p className="text-stone-800 text-base font-bold mb-1">Wrong problem</p>
              <p className="text-stone-800 text-sm leading-relaxed">
                The tool is solving a symptom, not the root cause. You built "gives feedback on presentations" but the real issue is that your team doesn't know how to structure an argument. Or you built the tool around your frustration ("stop escalating to me") instead of the user's problem ("I'm not sure if this is my call to make"). Those lead to very different tools.
              </p>
            </div>
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <p className="text-stone-800 text-base font-bold mb-1">Too broad</p>
              <p className="text-stone-800 text-sm leading-relaxed">
                The tool is trying to cover too many formats or audiences at once. An email reviewer and a deck reviewer are different tools, even if the underlying feedback is similar. If your tool handles emails, presentations, Slack messages, and docs, it will be mediocre at all of them. Pick the one where you feel the most pain and nail that first.
              </p>
            </div>
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <p className="text-stone-800 text-base font-bold mb-1">Criteria problem</p>
              <p className="text-stone-800 text-sm leading-relaxed">
                The tool is scoped to the right thing but evaluating it poorly. The criteria are too vague, too generic, or missing something you care about. The AI gives feedback that's technically correct but doesn't sound like you.
              </p>
            </div>
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <p className="text-stone-800 text-base font-bold mb-1">Prompt problem</p>
              <p className="text-stone-800 text-sm leading-relaxed">
                The scope and criteria are fine, but the prompt itself isn't clear enough. Maybe the AI is too nice, goes on too long, or doesn't follow the steps in the right order. This is often the easiest to fix.
              </p>
            </div>
          </div>

          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Hilary will call on a few people to share what they noticed. As you listen, try to categorize your own issue: is it a scoping problem, a criteria problem, or a prompt problem? More than one is fine.
          </p>

          <div className="bg-stone-100 border-l-4 border-stone-400 p-4">
            <p className="text-stone-800 text-base leading-relaxed">
              <strong>Key takeaway:</strong> Diagnosing the type of problem is the first step. If you have a scoping problem, no amount of prompt tweaking will fix it. If you have a criteria problem, rebuilding from scratch won't help either. Start with the right diagnosis.
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 2 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 2: Demo - Zooming Out</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">10-15 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Hilary demos what it looks like to re-evaluate a tool from Session 1. She starts by testing it, realizes the scope is off, and walks through re-scoping it in real time.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Two things to watch for:
          </p>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <p className="text-stone-800 text-base font-bold mb-1">Flip the problem</p>
              <p className="text-stone-800 text-sm leading-relaxed mb-3">
                When you first scoped your tool, you probably started from your own frustration: "I keep telling people to get to the point." That's natural. But the tool isn't for you - it's for the person on your team. Ask yourself: what problem does this solve <em>from their perspective</em>? What would make them actually want to open this before sending that email? If the tool feels like a mandate from their manager, they won't use it. If it solves a problem they already feel, they will.
              </p>
              <p className="text-stone-500 text-xs leading-relaxed">
                Example: "My team keeps escalating decisions they should make themselves" is the manager's problem. "I'm facing a decision and I'm not sure if I have the authority to make this call" is the user's problem. The first framing produces a tool that scolds. The second produces a tool people actually reach for.
              </p>
            </div>
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <p className="text-stone-800 text-base font-bold mb-1">What are the parts?</p>
              <p className="text-stone-800 text-sm leading-relaxed">
                Most tools aren't purely one thing. A good {setup.toolName} might evaluate finished work <em>and</em> teach someone how to do it better next time. It might walk someone through a process step by step <em>and</em> check the output at the end. Don't think of it as "evaluator or coach" - think about what parts your tool needs and how they fit together.
              </p>
            </div>
          </div>

          <div className="bg-stone-100 border-l-4 border-stone-400 p-4">
            <p className="text-stone-800 text-base leading-relaxed">
              <strong>Key takeaway:</strong> The best tools solve the user's problem, not the manager's frustration. It's the same problem from two angles, but the framing changes everything about how the tool is designed and whether anyone actually uses it.
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 3 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 3: Re-Scope Your Tool</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">25 min (15 min think + 10 min share)</p>

          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Before you touch the prompt, step back and answer two questions. Write your answers down - you'll share them in a few minutes.
          </p>

          <div className="bg-rose-50 border border-rose-200 rounded-lg p-5 mb-6">
            <p className="text-stone-800 text-base font-bold mb-3">Question 1: What problem does this solve for the person using it?</p>
            <p className="text-stone-800 text-sm leading-relaxed mb-4">
              Not what problem it solves for you. For <em>them</em>. What are they struggling with? What would make them reach for this voluntarily?
            </p>
            <p className="text-stone-800 text-sm leading-relaxed mb-4">
              This is harder than it sounds. "My team writes bad emails" is your problem. "I'm never sure if my email is going to land the way I want it to" is theirs. The tool you'd build for each of those is different.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              If you're stuck, try this: imagine handing the tool to someone on your team and saying "I made this for you." What would make them say "oh, that's actually useful" instead of "oh, so you think my work is bad?"
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-lg p-5 mb-6">
            <p className="text-stone-800 text-base font-bold mb-3">Question 2: What are the parts of this tool?</p>
            <p className="text-stone-800 text-sm leading-relaxed mb-4">
              Think about what your tool actually needs to do. It might have one part or several:
            </p>
            <ul className="text-stone-800 text-sm leading-relaxed space-y-2 mb-4 list-disc list-inside">
              <li><strong>Evaluate</strong> - Review finished work against specific criteria. "Is this good enough?" Pass/fail on each criterion, with specific feedback on what to fix.</li>
              <li><strong>Coach/teach</strong> - Walk someone through a process or teach them a skill. Guide them step by step, explain the reasoning, help them build judgment over time.</li>
              <li><strong>Generate</strong> - Produce something from inputs. Draft a first version, create a template, convert one format to another.</li>
              <li><strong>Extract/transform</strong> - Take messy or unstructured input and produce a clean, structured output. Pull the relevant details from meeting notes, convert a brain dump into a formatted brief, distill a long thread into action items.</li>
            </ul>
            <p className="text-stone-800 text-sm leading-relaxed">
              Many good tools combine these. An email reviewer might evaluate the draft, then coach the person on the biggest issue, then show what a revised version would look like. A 1:1 prep tool might generate an agenda from your notes, then walk you through what to prioritize. An extraction tool might pull key info from call notes and then evaluate whether the output is complete. What combination does yours need?
            </p>
          </div>

          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Take 15 minutes to think through these two questions. Write down your answers. If your tool's scope has shifted from what you built in Session 1, that's a sign the process is working - you're getting clearer on the real problem.
          </p>

          <div className="bg-stone-100 border border-stone-300 rounded-lg p-4 mb-4">
            <p className="text-stone-800 text-sm leading-relaxed">
              <strong>Share-out:</strong> Hilary will call on 3-4 people to share. The most useful thing you can share is if your scope shifted from Session 1 - what changed and why?
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 4 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 4: Rebuild and Improve</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">25-30 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Now you have a clearer picture of what your tool should do. Time to rebuild the prompt - either from scratch if the scope changed significantly, or by improving the existing one.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Open a {platformLabels[platform]} conversation (not your {setup.toolName} - a regular conversation for prompt-building). Use the prompts below based on what your tool needs.
          </p>

          {/* Scoping / Starting Prompt */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">If your scope changed: Start fresh</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Tell the AI about your revised scope. Be specific about who this is for, what problem it solves for them, and what the parts of the tool are.
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `I'm rebuilding a ${setup.toolName} I started last week. I want to start over with a clearer scope.\n\nThe problem this solves for the person using it: [describe the user's problem, not yours]\n\nWho will use it: [role/team]\n\nThey'd reach for it when: [specific trigger moment]\n\nWhat the tool needs to do:\n- [Does it evaluate something? What criteria?]\n- [Does it coach/teach? What skill or process?]\n- [Does it generate something? From what inputs?]\n\nBased on this, propose 3-5 success criteria for the tool's output. Make them pass/fail, not scored. Then tell me what examples I could share that would help you refine these further.`} />
            </div>
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "I'm rebuilding a {setup.toolName} I started last week. I want to start over with a clearer scope.
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              The problem this solves for the person using it: <span className="bg-rose-200 px-1">[describe the user's problem, not yours]</span>
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              Who will use it: <span className="bg-rose-200 px-1">[role/team]</span>
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              They'd reach for it when: <span className="bg-rose-200 px-1">[specific trigger moment]</span>
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              What the tool needs to do:
            </p>
            <ul className="text-stone-800 text-base font-mono leading-relaxed mt-1 list-disc list-inside">
              <li><span className="bg-rose-200 px-1">[Does it evaluate something? What criteria?]</span></li>
              <li><span className="bg-rose-200 px-1">[Does it coach/teach? What skill or process?]</span></li>
              <li><span className="bg-rose-200 px-1">[Does it generate something? From what inputs?]</span></li>
            </ul>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              Based on this, propose 3-5 success criteria for the tool's output. Make them pass/fail, not scored. Then tell me what examples I could share that would help you refine these further."
            </p>
          </div>

          {/* Improving existing prompt */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">If your scope is right but the quality is off: Improve it</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Paste your existing system prompt and tell the AI what's not working.
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `Here's the system prompt for a ${setup.toolName} I built last week:\n\n[paste your system prompt]\n\nI've been testing it and here's what's not working:\n- [specific issue 1]\n- [specific issue 2]\n\nDon't rewrite the whole thing. Diagnose what's causing each issue and propose targeted changes. For each change, explain what it fixes and why.`} />
            </div>
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Here's the system prompt for a {setup.toolName} I built last week:
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              <span className="bg-rose-200 px-1">[paste your system prompt]</span>
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              I've been testing it and here's what's not working:
            </p>
            <ul className="text-stone-800 text-base font-mono leading-relaxed mt-1 list-disc list-inside">
              <li><span className="bg-rose-200 px-1">[specific issue 1]</span></li>
              <li><span className="bg-rose-200 px-1">[specific issue 2]</span></li>
            </ul>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              Don't rewrite the whole thing. Diagnose what's causing each issue and propose targeted changes. For each change, explain what it fixes and why."
            </p>
          </div>

          <div className="bg-stone-100 border-l-4 border-stone-400 p-4 mb-6">
            <p className="text-stone-800 text-base leading-relaxed">
              <strong>Sometimes the best improvement is removing features, not adding them.</strong> If your tool is trying to evaluate 8 different dimensions, or cover 4 different formats, the most impactful change might be cutting it down to the 2-3 things that matter most. A focused tool that nails two criteria will outperform a sprawling tool that kind-of-checks ten.
            </p>
          </div>

          {/* Building the evaluator part */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">Building the evaluator part</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            If your tool evaluates finished work, the quality of your criteria is everything. Here's how to sharpen them:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-4">
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `Let's pressure-test the success criteria. For each criterion, I want you to:\n1. Give me a specific example of work that would PASS\n2. Give me a specific example of work that would FAIL\n3. Identify any gray areas where it's ambiguous whether something passes\n\nThen tell me: are these criteria specific enough that two different people would agree on pass/fail for the same piece of work?`} />
            </div>
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Let's pressure-test the success criteria. For each criterion, I want you to:
            </p>
            <ol className="text-stone-800 text-base font-mono leading-relaxed mt-2 list-decimal list-inside">
              <li>Give me a specific example of work that would PASS</li>
              <li>Give me a specific example of work that would FAIL</li>
              <li>Identify any gray areas where it's ambiguous whether something passes</li>
            </ol>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              Then tell me: are these criteria specific enough that two different people would agree on pass/fail for the same piece of work?"
            </p>
          </div>
          <p className="text-stone-800 text-sm leading-relaxed mb-6">
            This prompt forces you to confront the edges of your criteria. If you can't clearly say whether something passes or fails, the AI can't either.
          </p>

          {/* Building the coaching part */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">Building the coaching part</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            If your tool teaches or guides, the key is getting the steps right. Think about how you'd walk someone through this if they were sitting next to you.
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-4">
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `I want this tool to walk the user through a process, not just evaluate the output. Here's how I'd coach someone through this in person:\n\n[describe the steps you'd walk them through]\n\nDesign the interaction so the AI:\n- Takes it one step at a time (doesn't dump everything at once)\n- Asks the user to share their thinking before giving guidance\n- Explains the reasoning behind each step (so they learn, not just follow)\n- Checks in: "Does this make sense? Anything you'd push back on?"\n\nWrite this as part of the system prompt. The coaching should feel like a conversation, not a lecture.`} />
            </div>
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "I want this tool to walk the user through a process, not just evaluate the output. Here's how I'd coach someone through this in person:
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              <span className="bg-rose-200 px-1">[describe the steps you'd walk them through]</span>
            </p>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              Design the interaction so the AI:
            </p>
            <ul className="text-stone-800 text-base font-mono leading-relaxed mt-1 list-disc list-inside">
              <li>Takes it one step at a time (doesn't dump everything at once)</li>
              <li>Asks the user to share their thinking before giving guidance</li>
              <li>Explains the reasoning behind each step (so they learn, not just follow)</li>
              <li>Checks in: "Does this make sense? Anything you'd push back on?"</li>
            </ul>
            <p className="text-stone-800 text-base font-mono leading-relaxed mt-3">
              Write this as part of the system prompt. The coaching should feel like a conversation, not a lecture."
            </p>
          </div>
          <p className="text-stone-800 text-sm leading-relaxed mb-6">
            The test of a good coaching tool: if someone used it for six months and then lost access, would they still be better at the task than when they started?
          </p>

          {/* Generate the prompt */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">Generate the updated system prompt</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Once you've aligned on the scope, criteria, and any coaching elements, ask the AI to write the system prompt:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-4">
            <div className="flex justify-end mb-2">
              <CopyButton getText={() => `OK, now write the complete system prompt for this ${setup.toolName} based on everything we've discussed. Include all the criteria, the process steps, and any coaching elements we agreed on.`} />
            </div>
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "OK, now write the complete system prompt for this {setup.toolName} based on everything we've discussed. Include all the criteria, the process steps, and any coaching elements we agreed on."
            </p>
          </div>

          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Read it carefully. The golden rule still applies: could a person with limited context read this prompt, follow the instructions, and get a good output?
          </p>

          {/* Test it */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">Test it</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Same loop as Session 1: paste the new prompt into your {setup.toolName}'s instructions, test it on real work, and refine.
          </p>
          <div className="bg-stone-100 border border-stone-300 rounded-lg p-4 mb-4">
            <ol className="text-stone-800 text-sm leading-relaxed space-y-1 list-decimal list-inside">
              <li><strong>Paste</strong> the new system prompt into your {setup.toolName}'s instructions</li>
              <li><strong>Test</strong> it with real work (or the same test input you used before, so you can compare)</li>
              <li><strong>Calibrate:</strong> Is the feedback the same as what you'd give? If not, go back to your prompt-building conversation and tell it what's off</li>
              <li><strong>Iterate</strong> until it feels right</li>
            </ol>
          </div>

          <details className="mb-4 border border-stone-300 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
              Common issues at this stage
            </summary>
            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-stone-800 text-sm font-bold mb-1">The tool is still too nice</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Show the AI an example of work you'd push back on and tell it: "This should fail. If your criteria would pass this, they need to be tighter." You can also add to the prompt: "When in doubt, be more critical. It's better to flag a potential issue than to miss one."
                </p>
              </div>
              <div>
                <p className="text-stone-800 text-sm font-bold mb-1">It's ignoring part of the prompt</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Long prompts can cause the AI to skip sections. Try restructuring: put the most important instructions at the beginning and end (AI pays most attention to these positions). Use clear section headers. Remove anything redundant.
                </p>
              </div>
              <div>
                <p className="text-stone-800 text-sm font-bold mb-1">The coaching feels robotic</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Add a line to the prompt like: "Your tone should be like a smart colleague reviewing someone's work over coffee - direct, specific, and genuinely trying to help. Not formal, not corporate." Then give it an example of the tone you want.
                </p>
              </div>
              <div>
                <p className="text-stone-800 text-sm font-bold mb-1">It keeps going after it should stop</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Add to the end of the prompt: "When you have finished, stop. Do not continue unless the user asks."
                </p>
              </div>
            </div>
          </details>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 5 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 5: Show and Tell</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            We'll hear from several people. For each one, we want to know:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li><strong>What does your tool do?</strong> One sentence.</li>
            <li><strong>What changed from Session 1?</strong> Did the scope shift? Did the criteria get sharper? Did you add coaching?</li>
            <li><strong>Show us.</strong> Run a real example through it and let us see the output.</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed">
            This is the most valuable part of the session. You'll see how other people approached the same challenges and pick up ideas you can apply to your own tool.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Quick Reference */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Quick Reference: Key Prompts</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            All the key prompts from this session in one place, ready to copy.
          </p>

          <div className="space-y-4">
            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Rescope from scratch</p>
                <CopyButton getText={() => `I'm rebuilding a ${setup.toolName} I started last week. I want to start over with a clearer scope.\n\nThe problem this solves for the person using it: [describe the user's problem, not yours]\n\nWho will use it: [role/team]\n\nThey'd reach for it when: [specific trigger moment]\n\nWhat the tool needs to do:\n- [Does it evaluate something? What criteria?]\n- [Does it coach/teach? What skill or process?]\n- [Does it generate something? From what inputs?]\n\nBased on this, propose 3-5 success criteria for the tool's output. Make them pass/fail, not scored. Then tell me what examples I could share that would help you refine these further.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Start over with the "flip the problem" framing and clearer tool parts</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Improve existing prompt</p>
                <CopyButton getText={() => `Here's the system prompt for a ${setup.toolName} I built last week:\n\n[paste your system prompt]\n\nI've been testing it and here's what's not working:\n- [specific issue 1]\n- [specific issue 2]\n\nDon't rewrite the whole thing. Diagnose what's causing each issue and propose targeted changes. For each change, explain what it fixes and why.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Targeted fixes without starting over</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Pressure-test criteria</p>
                <CopyButton getText={() => `Let's pressure-test the success criteria. For each criterion, I want you to:\n1. Give me a specific example of work that would PASS\n2. Give me a specific example of work that would FAIL\n3. Identify any gray areas where it's ambiguous whether something passes\n\nThen tell me: are these criteria specific enough that two different people would agree on pass/fail for the same piece of work?`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Force the AI to show you the edges of your criteria</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Add coaching</p>
                <CopyButton getText={() => `I want this tool to walk the user through a process, not just evaluate the output. Here's how I'd coach someone through this in person:\n\n[describe the steps you'd walk them through]\n\nDesign the interaction so the AI:\n- Takes it one step at a time (doesn't dump everything at once)\n- Asks the user to share their thinking before giving guidance\n- Explains the reasoning behind each step (so they learn, not just follow)\n- Checks in: "Does this make sense? Anything you'd push back on?"\n\nWrite this as part of the system prompt. The coaching should feel like a conversation, not a lecture.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Design a step-by-step coaching interaction</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Generate system prompt</p>
                <CopyButton getText={() => `OK, now write the complete system prompt for this ${setup.toolName} based on everything we've discussed. Include all the criteria, the process steps, and any coaching elements we agreed on.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Once you're aligned, get the final prompt</p>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">FAQ</h2>

          <h4 className="text-base font-bold text-stone-800 mb-2">My tool from Session 1 works fine. Do I need to change it?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            If it genuinely works - meaning you've tested it on real work and the feedback matches what you'd give - then don't fix what isn't broken. Use the time to add a coaching element, pressure-test the criteria, or start a second tool. The skills in this session (diagnosing problems, flipping the perspective, thinking about tool parts) are useful regardless.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">Should I start over or try to fix my existing prompt?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            If the scope is wrong (you're solving the wrong problem), start over. If the scope is right but the execution is off (criteria too vague, tone wrong, missing steps), fix it. The "improve existing" prompt above is designed for the second case - it tells the AI to make targeted changes instead of rewriting everything.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">How do I know if I have a coaching tool or an evaluator tool?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            You probably have both. Most good tools do. The question isn't "which type is it?" but "what parts does it need?" An email reviewer might evaluate against criteria and then teach the person how to fix the biggest issue. A meeting prep tool might walk you through an agenda-building process and then evaluate whether the agenda is solid. Think in terms of parts, not categories.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">The tool gives different feedback every time I run it on the same input.</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            That's normal - AI is non-deterministic. This is why we use pass/fail instead of scores. The pass/fail judgment should be consistent even if the exact wording changes. If it's passing something one time and failing it the next, the criteria aren't specific enough. Use the "pressure-test criteria" prompt to tighten them up.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">Can I share my {setup.toolName} with my team now?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Share it with one person first - your beta tester. Watch them use it if you can (in a 1:1 is a great opportunity). Look for: are they confused by it? Is the feedback helpful? Do they actually use it again? Once one person validates it, expand from there. We'll talk more about rolling tools out to teams in Week 3.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Before Next Session */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Before Next Session</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            <strong>Keep using your tool.</strong> The more you use it on real work, the more you'll discover what to improve. Each round of testing makes it sharper.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            <strong>Share it with one person.</strong> Find a beta tester on your team. Pay attention to whether they find it useful and whether they use it a second time.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            <strong>Watch the async video modules for Week 3</strong> in the Maven portal.
          </p>
          <p className="text-stone-800 text-base leading-relaxed">
            <strong>Post your updated prompt on the Maven portal</strong> so the group can see how it evolved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Session2;
