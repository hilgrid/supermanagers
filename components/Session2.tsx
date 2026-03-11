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
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 1: Demo</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">10-15 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Hilary demos what it looks like to take a tool from Session 1 and run it through the diagnostic checklist below. She tests her tool, discovers the scope is off, and re-scopes it in real time.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Watch for the moment where the real problem surfaces. In Session 1, the tool was "give feedback on emails to the CEO." But the actual issue wasn't email quality - it was that the team needed better judgment about <em>when to email the CEO at all</em>. That's an upstream problem that no amount of email polishing would fix.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 2 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 2: Run the Checklist</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">30 min (20 min think + 10 min share)</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Before you touch the prompt, run your tool through these checks in order. Each one either passes or tells you exactly what to fix. Work through them now - you'll share what you found in a few minutes.
          </p>

          {/* Check 1: Right problem */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">Check 1: Is this the right problem?</p>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Run through these quickly:
            </p>
            <ul className="text-stone-800 text-sm leading-relaxed space-y-2 mb-4 list-disc list-inside">
              <li><strong>Does it solve a problem for you?</strong> If you wouldn't use this or wouldn't care if it disappeared, it's not solving a real problem.</li>
              <li><strong>Does it solve a problem for the person who needs to use it?</strong> Not your problem - <em>theirs</em>. "My team writes bad emails" is your problem. "I'm never sure if my email is going to land the way I want" is theirs. If the tool feels like a mandate from their manager, they won't use it. If it solves a problem they already feel, they will.</li>
              <li><strong>When would they use it?</strong> Can you name a specific moment? "Before sending an email to their skip level" is good. "Whenever they need feedback" is too vague.</li>
            </ul>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Now the harder question: <strong>is there an upstream problem that would be better to solve?</strong> Sometimes the feedback you keep giving is a symptom, not the root cause.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed mb-3">
              Example: "My team needs to write better emails to the CEO" seems like the problem. But maybe the real issue is that the CEO wants fewer emails, and your team needs better judgment about when to email vs. when to handle it themselves. That's a completely different tool.
            </p>

            <div className="bg-rose-50 border-l-4 border-rose-300 p-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `I built a ${setup.toolName} to help with [describe your tool]. Before I improve the prompt, I want to make sure I'm solving the right problem.\n\nThe problem I'm trying to solve: [describe it]\nWho uses it: [role]\nWhen they'd use it: [specific moment]\n\nHelp me pressure-test this. Is there an upstream problem I might be missing? Is there a deeper issue that, if I solved it, would make the surface-level problem go away? Ask me questions if you need more context.`} />
              </div>
              <p className="text-stone-800 text-sm font-mono leading-relaxed">
                "I built a {setup.toolName} to help with <span className="bg-rose-200 px-1">[describe your tool]</span>. Before I improve the prompt, I want to make sure I'm solving the right problem.
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                The problem I'm trying to solve: <span className="bg-rose-200 px-1">[describe it]</span><br />
                Who uses it: <span className="bg-rose-200 px-1">[role]</span><br />
                When they'd use it: <span className="bg-rose-200 px-1">[specific moment]</span>
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                Help me pressure-test this. Is there an upstream problem I might be missing? Is there a deeper issue that, if I solved it, would make the surface-level problem go away? Ask me questions if you need more context."
              </p>
            </div>
          </div>

          {/* Check 2: Right scope */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">Check 2: Is it scoped right?</p>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Scope problems come in two flavors:
            </p>
            <ul className="text-stone-800 text-sm leading-relaxed space-y-2 mb-4 list-disc list-inside">
              <li><strong>Too many types of things.</strong> Your tool reviews emails AND decks AND reports AND Slack messages. You wouldn't evaluate an email the same way you'd evaluate a deck - the criteria are different, the format is different, the failure modes are different. Pick one and dial it in.</li>
              <li><strong>Too many steps.</strong> Your tool coaches someone through a problem, then evaluates their output, then generates a revised version, then creates a summary for their manager. That's four tools crammed into one prompt. If the AI suggests splitting your tool, listen to it.</li>
            </ul>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Here's the thing: you can absolutely build something that handles multiple formats or multiple steps eventually. But you need to get really clear on your criteria for <em>one</em> thing first. Once that's dialed in, adapting it to a different format or audience is only marginally harder. Starting broad is hard because you're trying to solve for too many possible failure states and too many different criteria at the same time.
            </p>

            <div className="bg-stone-100 border-l-4 border-stone-400 p-4">
              <p className="text-stone-800 text-sm leading-relaxed">
                <strong>If you need to narrow:</strong> Pick the one format, one audience, and one use case where you feel the most pain. Build for that. You can expand later.
              </p>
            </div>
          </div>

          {/* Check 3: Does it work */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">Check 3: Does the output match what you'd want?</p>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              If you passed checks 1 and 2, the problem and scope are right. Now test the actual output. Run your tool on a real piece of work and ask yourself: is this the feedback I would give?
            </p>
            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              If not, the most common fixes are:
            </p>
            <ul className="text-stone-800 text-sm leading-relaxed space-y-2 mb-4 list-disc list-inside">
              <li><strong>Missing criteria.</strong> The tool isn't checking for something you care about. Add it.</li>
              <li><strong>Too lenient on a criterion.</strong> The tool says "pass" on something you'd push back on. You need to define what success looks like more specifically for that criterion.</li>
              <li><strong>Wrong tone or format.</strong> The feedback is right but the delivery is off - too nice, too long, too robotic. This is usually the easiest to fix.</li>
            </ul>

            <div className="bg-rose-50 border-l-4 border-rose-300 p-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `Here's the system prompt for a ${setup.toolName} I built last week:\n\n[paste your system prompt]\n\nI've been testing it and here's what's not working:\n- [specific issue 1]\n- [specific issue 2]\n\nDon't rewrite the whole thing. Diagnose what's causing each issue and propose targeted changes. For each change, explain what it fixes and why.`} />
              </div>
              <p className="text-stone-800 text-sm font-mono leading-relaxed">
                "Here's the system prompt for a {setup.toolName} I built last week:
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                <span className="bg-rose-200 px-1">[paste your system prompt]</span>
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                I've been testing it and here's what's not working:
              </p>
              <ul className="text-stone-800 text-sm font-mono leading-relaxed mt-1 list-disc list-inside">
                <li><span className="bg-rose-200 px-1">[specific issue 1]</span></li>
                <li><span className="bg-rose-200 px-1">[specific issue 2]</span></li>
              </ul>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                Don't rewrite the whole thing. Diagnose what's causing each issue and propose targeted changes. For each change, explain what it fixes and why."
              </p>
            </div>

            <p className="text-stone-800 text-sm leading-relaxed mt-4">
              If it's being too lenient on a specific criterion, try:
            </p>
            <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mt-2">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `The tool is being too lenient on [criterion]. It's passing work that I would push back on. What would you recommend if you were to raise the bar here? Be specific about what "passing" should actually require.`} />
              </div>
              <p className="text-stone-800 text-sm font-mono leading-relaxed">
                "The tool is being too lenient on <span className="bg-rose-200 px-1">[criterion]</span>. It's passing work that I would push back on. What would you recommend if you were to raise the bar here? Be specific about what 'passing' should actually require."
              </p>
            </div>
          </div>

          <div className="bg-stone-100 border border-stone-300 rounded-lg p-4 mb-4">
            <p className="text-stone-800 text-sm leading-relaxed">
              <strong>Share-out:</strong> Hilary will call on a few people. Where did you get stuck in the checklist? Did anyone discover they were solving the wrong problem? Did anyone need to narrow their scope?
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 3 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 3: Rebuild and Improve</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">25-30 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Now you know what to fix. Open a {platformLabels[platform]} conversation and use the prompts below based on what you need.
          </p>

          {/* If scope changed */}
          <h4 className="text-lg font-bold text-stone-800 mb-2">If your scope changed: Start fresh</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Tell the AI about your revised scope. Be specific about who this is for, what problem it solves for them, and what the tool needs to do.
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

        {/* Part 4 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 4: Show and Tell</h3>
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
                <p className="text-stone-800 text-sm font-bold mb-1">Diagnose the real problem</p>
                <CopyButton getText={() => `I built a ${setup.toolName} to help with [describe your tool]. Before I improve the prompt, I want to make sure I'm solving the right problem.\n\nThe problem I'm trying to solve: [describe it]\nWho uses it: [role]\nWhen they'd use it: [specific moment]\n\nHelp me pressure-test this. Is there an upstream problem I might be missing? Is there a deeper issue that, if I solved it, would make the surface-level problem go away? Ask me questions if you need more context.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Check 1: make sure you're solving the right problem</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Fix what's not working</p>
                <CopyButton getText={() => `Here's the system prompt for a ${setup.toolName} I built last week:\n\n[paste your system prompt]\n\nI've been testing it and here's what's not working:\n- [specific issue 1]\n- [specific issue 2]\n\nDon't rewrite the whole thing. Diagnose what's causing each issue and propose targeted changes. For each change, explain what it fixes and why.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Check 3: targeted fixes for output issues</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Raise the bar on a criterion</p>
                <CopyButton getText={() => `The tool is being too lenient on [criterion]. It's passing work that I would push back on. What would you recommend if you were to raise the bar here? Be specific about what "passing" should actually require.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">When the tool is too easy on something specific</p>
            </div>

            <div className="bg-white border border-stone-300 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <p className="text-stone-800 text-sm font-bold mb-1">Rescope from scratch</p>
                <CopyButton getText={() => `I'm rebuilding a ${setup.toolName} I started last week. I want to start over with a clearer scope.\n\nThe problem this solves for the person using it: [describe the user's problem, not yours]\n\nWho will use it: [role/team]\n\nThey'd reach for it when: [specific trigger moment]\n\nWhat the tool needs to do:\n- [Does it evaluate something? What criteria?]\n- [Does it coach/teach? What skill or process?]\n- [Does it generate something? From what inputs?]\n\nBased on this, propose 3-5 success criteria for the tool's output. Make them pass/fail, not scored. Then tell me what examples I could share that would help you refine these further.`} />
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Start over with clearer scope and user framing</p>
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
