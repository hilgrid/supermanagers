import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      '<strong>Name:</strong> Give it a memorable name — a good name makes people want to use it',
      '<strong>Instructions:</strong> Paste your system prompt',
      '<strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it (e.g., "Paste your draft to get feedback")',
    ],
  },
  claude: {
    name: 'Project',
    toolName: 'Project',
    steps: [
      'Go to Claude → Projects (left sidebar) → Create Project',
      '<strong>Name:</strong> Give it a memorable name — a good name makes people want to use it',
      '<strong>Custom Instructions:</strong> Paste your system prompt into the project instructions field',
      '<strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it',
      'Start a new chat inside the project to test it.',
    ],
  },
  gemini: {
    name: 'Gem',
    toolName: 'Gem',
    steps: [
      'Go to Gemini → Gem Manager (left sidebar) → Create Gem',
      '<strong>Name:</strong> Give it a memorable name — a good name makes people want to use it',
      '<strong>Instructions:</strong> Paste your system prompt',
      'Click <strong>Save</strong> and then open the Gem to start testing.',
    ],
  },
  copilot: {
    name: 'Copilot GPT',
    toolName: 'Copilot GPT',
    steps: [
      'Go to Copilot → Create a Copilot GPT (or use Copilot Studio if your org has it)',
      '<strong>Name:</strong> Give it a memorable name — a good name makes people want to use it',
      '<strong>Instructions:</strong> Paste your system prompt',
      '<strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it',
      'Save and open it to start testing.',
    ],
  },
};

const Session1: React.FC = () => {
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
            Build Your First {setup.toolName}
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Think of a piece of feedback you give over and over again. By the end of this session, you'll have a {setup.toolName} that can give that feedback for you.
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

        {/* Before This Class */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Before This Class</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Step 1: Watch the async video modules for Week 1</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-8">
            These are in the Maven portal.
          </p>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Step 2: Fill out the worksheet</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Think about the feedback you find yourself giving over and over. The email you keep rewriting for someone. The presentation you keep sending back with the same notes. The report that never quite lands and you end up fixing at 11 PM.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Pick one, and use that as the basis for your worksheet. If you have more than one idea, pick the one where you feel the most frustrated repeating yourself.
          </p>

          <div className="bg-white border border-stone-300 rounded-lg p-6 mb-4">
            <p className="text-stone-800 text-base leading-relaxed mb-4">
              <strong>The feedback I keep giving:</strong>
              <br />
              <span className="text-stone-500 text-sm">(What do you find yourself saying over and over? e.g., &quot;Get to the point faster&quot; or &quot;This doesn&apos;t tell me what you want me to do&quot;)</span>
            </p>
            <p className="text-stone-800 text-base leading-relaxed mb-4">
              <strong>I give this feedback on:</strong>
              <br />
              <span className="text-stone-500 text-sm">(What kind of work? e.g., emails, presentations, reports, memos)</span>
            </p>
            <p className="text-stone-800 text-base leading-relaxed mb-4">
              <strong>Who I give it to:</strong>
              <br />
              <span className="text-stone-500 text-sm">(Direct reports? Cross-functional partners? External stakeholders?)</span>
            </p>
            <p className="text-stone-800 text-base leading-relaxed mb-4">
              <strong>They&apos;d reach for this {setup.toolName} when:</strong>
              <br />
              <span className="text-stone-500 text-sm">(What&apos;s the specific trigger? e.g., &quot;when they&apos;ve finished a first draft&quot; or &quot;before sending an email to their skip level&quot;)</span>
            </p>
            <p className="text-stone-800 text-base leading-relaxed mb-4">
              <strong>The {setup.toolName} walks the user through these steps:</strong>
              <br />
              <span className="text-stone-500 text-sm">Example: 1. User pastes their draft email. 2. {setup.toolName} checks it against the 4 criteria below. 3. {setup.toolName} gives a pass/fail on each criterion with specific feedback. 4. {setup.toolName} suggests a revised version.</span>
            </p>
            <p className="text-stone-800 text-base leading-relaxed mb-4">
              <strong>I&apos;ll know it&apos;s working when the output meets this specific criteria:</strong>
            </p>
            <table className="w-full text-sm text-stone-800 border border-stone-300">
              <thead>
                <tr className="bg-stone-100">
                  <th className="text-left p-3 border-b border-stone-300 font-bold">Criterion</th>
                  <th className="text-left p-3 border-b border-stone-300 font-bold">What passing looks like</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b border-stone-200 text-stone-500 italic">Ex: Clarity</td>
                  <td className="p-3 border-b border-stone-200 text-stone-500 italic">Ex: A non-expert could read this and understand the recommendation without asking follow-up questions.</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-stone-200">&nbsp;</td>
                  <td className="p-3 border-b border-stone-200">&nbsp;</td>
                </tr>
                <tr>
                  <td className="p-3">&nbsp;</td>
                  <td className="p-3">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-stone-800 text-sm mb-8">
            <a
              href="https://docs.google.com/document/d/1PLIJrhMTlSBw8TQ4AWYK5mw8898T9wizKQOB_-kymOY/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-stone-600 hover:underline transition-colors"
            >
              Get this as a Google Doc &rarr;
            </a>
          </p>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Step 3: Submit your worksheet on Maven</h3>
          <p className="text-stone-800 text-base leading-relaxed">
            So we can see what everyone&apos;s working on.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* In Class */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">In Class</h2>
        </div>

        {/* Part 1 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 1: Breakout — Share & Pressure-Test Your Worksheet</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">15-20 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Break into groups of 3-4. Each person shares what they picked.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-3 font-bold">Questions to ask each other:</p>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
            <li><strong>Is this one thing or multiple things?</strong> If your {setup.toolName} is trying to give feedback on emails AND presentations AND reports, that's three {setup.toolName}s. Pick one for now.</li>
            <li><strong>Are the criteria specific enough?</strong> Could someone who doesn't know you read your criteria and give the same feedback you would? If a criterion is vague, add an example of what passing looks like. "Clarity" is vague. "A non-expert could read this and understand the recommendation without asking follow-up questions" is specific.</li>
          </ol>
          <p className="text-stone-800 text-base leading-relaxed">
            Come back with a tighter scope. It's fine if it changed from what you submitted.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 2 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 2: Demo — The Bad Way vs. The Good Way</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">10-15 min</p>
          <p className="text-stone-800 text-base leading-relaxed italic">
            Hilary demos live. First, she goes straight to {platformLabels[platform]} and asks it to build a {setup.toolName} from a vague description — no worksheet, no spec work. You'll see what comes out. Then she does it the right way: feeds in the worksheet, aligns on how the {setup.toolName} should work before writing anything, and builds from that. The difference is the whole point.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 3 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 3: Generate Your System Prompt & Build the {setup.toolName}</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Now it's your turn. You're doing it the good way.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 1: Align on how the {setup.toolName} works</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Open {platformLabels[platform]} and paste your worksheet. Then ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Here's a piece of feedback I give over and over at work, and my criteria for what good looks like. I want to build a {setup.toolName} for this. Before you write anything, tell me exactly how you think it should work — what does the user give it, what does it do, and what does it give back? Walk me through the steps."
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Review its understanding. Does the workflow match how you'd want this to work? Correct anything that's off before moving on.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 2: Write the prompt</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Once you're aligned, tell it to write the system prompt based on the steps you just agreed on.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Scan the prompt it generated. Look for:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li><strong>Does it actually use your criteria?</strong> The prompt should include the specific standards from your worksheet, not generic advice. If it says "check for clarity and professionalism" instead of your actual criteria, tell it to use the exact criteria you provided.</li>
            <li><strong>Does it know when to stop?</strong> If not, add explicit instructions: "When you have finished, stop. Do not continue unless the user asks."</li>
          </ul>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 3: Set up your {setup.name}</h4>
          <ol className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-decimal list-inside">
            {setup.steps.map((step, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 4 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 4: Test It & Break It</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Your {setup.toolName} is live. Now find out what's wrong with it.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 1: Generate test data</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Go back to the conversation where you built your prompt and ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Generate two sample inputs for this {setup.toolName} — one that's mediocre (a C+) and one that's strong (an A). Make them realistic."
            </p>
          </div>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 2: Run both through your {setup.toolName}</h4>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li>Does the mediocre version get meaningfully different feedback than the strong one? If they get similar feedback, your criteria aren't sharp enough.</li>
            <li>Does the feedback match what YOU would have said? If the AI is nicer than you'd be, that's a problem — it means your {setup.toolName} will pass work that shouldn't pass.</li>
          </ul>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 3: Note what's broken</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">Write down:</p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li>What worked well</li>
            <li>What felt off</li>
            <li>What you think the problem is (even if you're not sure how to fix it)</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed font-bold">
            We're going to fix all of this next session.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">FAQ</h2>

          <h4 className="text-base font-bold text-stone-800 mb-2">Should I upload documents to my {setup.toolName}?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            You can, but uploading a document is not the same as the AI understanding it. The bigger problem is that there's no way for you to verify what the AI took away from that document. When your instructions are written out explicitly in the prompt, anyone can read them and follow the same steps. You can check whether the AI is doing what you intended. When the instructions are buried in a 50-page uploaded doc, you have no way to confirm that the AI is interpreting it the same way you would.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Rule of thumb: if something is important enough that the {setup.toolName} needs to get it right every time, put it directly in the system prompt as an explicit instruction. Save uploads for supplementary reference material.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">What if my {setup.toolName} is too nice?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            This is the most common problem. AI defaults to being encouraging, which means it will often pass work that you wouldn't. If your {setup.toolName} isn't catching things you'd catch, your criteria aren't specific enough. Don't say "check for clarity" — say what clarity actually means in this context. We'll work on this more in Session 2.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">My idea feels too big. How do I know if I'm overscoping?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Start with the smallest possible scope. Get one thing working well, then expand. If you're trying to build something that handles multiple types of input, covers several different scenarios, or has a lot of conditional logic — narrow it down. Pick the single most common case and build for that. You can always add complexity later, but it's much harder to debug a tool that's trying to do five things at once.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">My {setup.toolName} keeps going after it's done.</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Add this to the end of your system prompt: "When you have finished, stop. Do not continue unless the user asks." Without this, the AI will keep offering to do more things — that's its default behavior, not a bug in your prompt.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">Do I need a paid account?</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            A paid account gives you access to the {setup.name} builder, which is what we use in this session. If you can't get one, you can still follow along — write your system prompt, save it in a doc, and paste it at the start of any new conversation. It's not as seamless, but it works.
          </p>

          <h4 className="text-base font-bold text-stone-800 mb-2">I'm confused about which chat window to use for what.</h4>
          <p className="text-stone-800 text-base leading-relaxed">
            You'll have three things open: (1) the conversation where you built and iterated on your prompt, (2) the {setup.toolName} itself, where you test it, and (3) the {setup.toolName} settings, where you paste updated instructions. When something doesn't work in testing, copy the output back into conversation #1, explain what went wrong, and ask it to fix the prompt. Then paste the updated prompt into #3 and test again.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Before Next Session */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Before Next Session</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            <strong>Post your prompt on the Maven portal.</strong> It can be the system prompt for the {setup.toolName} you built today, or — if you kept experimenting and built something else — a prompt for a different one. Either is great.
          </p>
          <p className="text-stone-800 text-base leading-relaxed">
            Come to the next session ready to workshop it. We'll be diagnosing what's working, what's not, and how to make it better — so the more you've used it and noticed what breaks, the more you'll get out of it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Session1;
