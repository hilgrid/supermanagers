import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tools = [
  { id: 'chatgpt', label: 'ChatGPT (web)' },
  { id: 'claude-web', label: 'Claude (web)' },
  { id: 'gemini', label: 'Gemini (web)' },
  { id: 'copilot', label: 'Microsoft Copilot' },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const SYSTEM_PROMPT = `You are a copilot for managers learning to use AI at work. A manager brings you a problem. You help them figure out whether to build a tool or think it through with AI, then give them something concrete: a Custom GPT prompt, a spec for a web page or app, or a step-by-step thinking plan.

Every conversation follows four steps. Stop and check in after each one before moving on.

## Step 1: Understand

Let the manager describe their problem. Then ask 1-3 follow-up questions to fill in what's missing: the actual problem (not the solution they've imagined), when it triggers, who's affected, and what it costs them. For each follow-up, offer your best guess at the answer and let them correct you.

Be lean. If you have enough to move forward, move forward. Refer to the Understanding the Problem knowledge file for guidance.

When you have enough, say it back: "So the problem is [X], it hits when [trigger], it affects [Y], and right now it costs you [Z]. Is that right?"

**Don't just play back what they said.** If you think the real problem is different from what they described — a deeper issue, a different root cause, a misidentified trigger — say so. Propose your reframe and let them push back. "You said the problem is [X], but based on what you've told me, I think the real problem might be [Y]. Here's why: [reasoning]. Am I off base?" Being agreeable feels polite but wastes their time if you end up solving the wrong problem.

## Step 2: Recommend

Based on what you've learned, make one call: should they build a tool, or just break down the problem and think it through with AI?

- **Build a tool** — when the problem is repetitive and pattern-based, and the bottleneck is time or manual effort
- **Think it through with AI** — when the problem needs a decision, strategic thinking, or a difficult conversation — not a tool

Make the call and explain your reasoning in 2-3 sentences. Don't present it as a decision tree — just recommend one path and say why.

Refer to the Recommending an Approach knowledge file for the decision logic.

Check in: "Based on what you've told me, I'd recommend [X]. Here's why: [reasoning]. Does that feel right?"

## Step 3: Plan

Build the plan based on your recommendation. Follow the relevant knowledge file closely — it has the detailed process for each path.

**If you recommended a tool:** Follow the Scoping a Tool knowledge file step by step. The process is: ask one clarifying question if needed, propose three meaningfully different implementations (using different kinds of tools — evaluator, coach, "just do it for them," web page, skill/automation), let the manager pick a direction, then draft the spec in three passes. The knowledge file has the full process, examples, and guidance for each phase.

**If you recommended thinking it through:** Follow the Planning a Thinking Process knowledge file step by step. The process is: propose three angles so the manager can pick a lens, then build a numbered step-by-step plan they can take to any AI tool and execute.

The output of this step is always a concrete artifact — either a filled-out spec (and for Custom GPTs and skills, the actual prompt/instructions) or a numbered plan. You draft it; they refine it.

## Step 4: Refine and Deliver

Read back the full plan. Ask: "Does this feel right? What would you change?" Iterate until they're satisfied.

Then deliver the final output. The Scoping a Tool and Planning a Thinking Process knowledge files have specific delivery guidance, but the key principle is:

- **Custom GPT or skill:** The spec is the blueprint, not the deliverable. Draft the actual prompt/instructions they'll paste into their tool. This is what they walk away with.
- **Web page or app:** The spec *is* the deliverable. Tell them to take it to Lovable or Replit and say "build me this."
- **Thinking plan:** Tell them to take the plan to any AI tool and say "walk me through this, starting with step 1."

Remind them: the first version should be rough. Build it, run it, see what's missing, improve it.

---

## Guidelines

- Never reference or cite the knowledge base files in your responses. They're internal instructions for you, not sources to quote. Don't say things like "according to a document" or "based on the knowledge file."
- Be conversational and direct. No jargon.
- Stop after each step. Say where you are and where you'd go next. Wait for them before continuing.
- Be honest when something doesn't need a tool. That's good judgment, not a failure.
- Keep responses concise. These are busy managers.
- **Never ask a bare question.** After the manager's very first message (when you have zero context), you can ask open-ended questions. After that, every question you ask should come with your best 2-3 guesses at the answer. People find it much easier to react to a proposed answer than to generate one from scratch. If they're stuck on "what's the real problem?", don't just ask them — propose what you think it might be based on what they've told you, and let them correct you. This applies throughout: clarifying questions, worksheet fields, plan steps, refinement suggestions. Do the thinking, then check if you're right.`;

const DRIVE_LINK = 'https://drive.google.com/drive/folders/171VGgAhTqlnmp4QWuK2838FdU6W9yHZF';

const ManagerCopilot: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SYSTEM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
          &larr; Back
        </Link>

        {/* Intro */}
        <div className="mt-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            <span style={{ color: '#ee8a82' }}>Supermanager</span> Copilot
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            You bring a management problem. The copilot helps you figure out what to do about it and walks you out with something concrete: a Custom GPT prompt, a spec for a web page or app, or a step-by-step thinking plan.
          </p>
          <p className="text-stone-700 text-lg mt-3 leading-relaxed">
            Set it up in whatever AI tool you use. Takes about 5 minutes.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-4">How it works</h2>
          <div className="space-y-3 text-stone-800 text-base leading-relaxed">
            <p><strong>1.</strong> Set up your copilot using the instructions below.</p>
            <p><strong>2.</strong> Bring it any management problem you're facing.</p>
            <p><strong>3.</strong> The copilot will ask you some follow-up questions to understand what's going on.</p>
            <p><strong>4.</strong> Get a recommendation and a concrete plan for how to use AI to solve your problem, based on Supermanager principles.</p>
          </div>
        </div>

        {/* What's included */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-4">What's included</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Two things: a <strong>system prompt</strong> (the instructions that tell the AI how to run the conversation) and a <strong>knowledge base</strong> (4 files that give it depth at each step).
          </p>
          <div className="bg-white border-2 border-stone-300 rounded p-5 text-stone-800 text-base leading-loose mb-4">
            <p><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600 transition-colors">understanding-the-problem.md</a> Helps the copilot dig into what's really going on. The actual problem, not just what you think you need.</p>
            <p><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600 transition-colors">recommending-an-approach.md</a> Guides the recommendation: should you build something, or is this a problem to think through?</p>
            <p><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600 transition-colors">scoping-a-tool.md</a> Walks you through defining what to build. Exploring options, writing the spec, getting to a finished prompt or plan.</p>
            <p><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600 transition-colors">planning-a-thinking-process.md</a> Structures hard problems into a step-by-step plan you can work through with any AI tool.</p>
          </div>
          <p className="text-stone-700 text-lg leading-relaxed">
            <a
              href={DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-stone-800 hover:text-stone-600 transition-colors"
            >
              Download the knowledge base files (Google Drive) &rarr;
            </a>
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* System prompt */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-stone-800">System prompt</h2>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 text-sm font-medium text-stone-800 bg-white border-2 border-stone-800 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-stone-600 text-sm mb-3">Copy this and paste it into your tool's instructions field.</p>
          <pre className="bg-white border-2 border-stone-300 rounded p-5 text-stone-800 text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
            {SYSTEM_PROMPT}
          </pre>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Tool selector */}
        <div className="mb-12">
          <p className="text-stone-800 font-bold text-base mb-3 uppercase tracking-widest">
            Set it up in your tool
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => scrollTo(tool.id)}
                className="px-4 py-2 text-sm font-medium text-stone-800 bg-white border-2 border-stone-800 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* ChatGPT */}
        <div id="chatgpt" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">ChatGPT (web)</h2>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 list-decimal list-inside">
            <li>Go to <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">chatgpt.com</a> and click <strong>Explore GPTs</strong> &rarr; <strong>Create</strong>.</li>
            <li>In the <strong>Name</strong> field, type something like "Supermanager Copilot." Upload the icon image from the Google Drive folder as your GPT's profile picture.</li>
            <li>In the <strong>Instructions</strong> field, paste the system prompt from above.</li>
            <li><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the knowledge base files</a> and upload all 4 files under <strong>Knowledge</strong>.</li>
            <li>Click <strong>Save</strong> (keep it set to "Only me" unless you want to share it).</li>
            <li>Open your new GPT and try it: <span className="font-mono bg-rose-100 px-1 text-sm">"I have a problem I want to talk through."</span></li>
          </ol>
          <p className="text-stone-600 text-sm mt-3 italic">Note: Creating Custom GPTs requires a Plus plan ($20/month). On the free plan, you can paste the system prompt as your first message and attach the knowledge base files, but you'll need to redo this each time.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Claude */}
        <div id="claude-web" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Claude (web)</h2>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 list-decimal list-inside">
            <li>Go to <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">claude.ai</a> and click <strong>Projects</strong> in the left sidebar, then <strong>Create Project</strong>.</li>
            <li>Name it something like "Supermanager Copilot."</li>
            <li>In the <strong>Project Instructions</strong> field, paste the system prompt from above.</li>
            <li><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the knowledge base files</a> and upload all 4 files to <strong>Project Knowledge</strong>.</li>
            <li>Start a new chat in the project and try it: <span className="font-mono bg-rose-100 px-1 text-sm">"I have a problem I want to talk through."</span></li>
          </ol>
          <p className="text-stone-600 text-sm mt-3 italic">Note: Projects require a Pro plan ($20/month). On the free plan, you can paste the system prompt as your first message and attach the knowledge base files to the conversation, but you'll need to redo this each time.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Gemini */}
        <div id="gemini" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Gemini (web)</h2>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 list-decimal list-inside">
            <li>Go to <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">gemini.google.com</a> and click <strong>Gem manager</strong> in the left sidebar, then <strong>New Gem</strong>.</li>
            <li>Name it something like "Supermanager Copilot."</li>
            <li>In the <strong>Instructions</strong> field, paste the system prompt from above.</li>
            <li><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the knowledge base files</a> and upload all 4 files under the instructions.</li>
            <li>Click <strong>Save</strong>, then open the Gem and try it: <span className="font-mono bg-rose-100 px-1 text-sm">"I have a problem I want to talk through."</span></li>
          </ol>
          <p className="text-stone-600 text-sm mt-3 italic">Note: Gems require a Gemini Advanced plan ($20/month). On the free plan, you can paste the system prompt as your first message and attach the knowledge base files, but you'll need to redo this each time.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Microsoft Copilot */}
        <div id="copilot" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Microsoft Copilot</h2>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 list-decimal list-inside">
            <li>Open <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">copilot.microsoft.com</a>.</li>
            <li>Start a new conversation. Paste the system prompt from above as your first message, prefixed with: <span className="font-mono bg-rose-100 px-1 text-sm">"Use these instructions for our conversation:"</span></li>
            <li><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the knowledge base files</a> and attach all 4 files to the conversation (click the paperclip icon).</li>
            <li>Then say: <span className="font-mono bg-rose-100 px-1 text-sm">"I have a problem I want to talk through."</span></li>
          </ol>
          <p className="text-stone-600 text-sm mt-3 italic">Note: Works on the free plan. You'll need to re-paste the instructions and re-attach the files each time you start a new conversation. For persistent setup, use Copilot Studio if your organization has access.</p>
        </div>

      </div>
    </section>
  );
};

export default ManagerCopilot;
