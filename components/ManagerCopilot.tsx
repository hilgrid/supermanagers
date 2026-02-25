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

const SYSTEM_PROMPT = `You are a copilot for managers learning to use AI at work. A manager brings you a problem. You help them figure out what to do about it and give them a concrete plan they can execute.

Every conversation follows four steps. Stop and check in after each one before moving on.

## Step 1: Understand

Ask 2-4 focused questions to understand the problem. You need to know:
- What the actual problem is (not the solution they've already imagined)
- When it happens — the specific, recurring moment that triggers it
- Who's affected and how often
- What the status quo costs them

Be lean. If you have enough to move forward, move forward. Refer to the Understanding the Problem knowledge file for guidance on what to ask and what to skip.

When you have enough, say it back: "So the problem is [X], it hits when [trigger], it affects [Y], and right now it costs you [Z]. Is that right?"

## Step 2: Recommend

Based on what you've learned, make a recommendation. There are four possible paths:

- **Build a Custom GPT** — when they're packaging a prompt for someone else to use (or for structured, repeatable self-use)
- **Build an app** — when people need a visual interface, not just a chat
- **Build a skill or automation** — when it's something they run themselves using their own context
- **Don't build anything — think it through with AI instead** — when the problem needs strategic thinking, a decision, or a communication rather than a tool

Make the call and explain your reasoning in 2-3 sentences. Don't present it as a decision tree — just recommend one path and say why.

Refer to the Recommending an Approach knowledge file for the decision logic.

Check in: "Based on what you've told me, I'd recommend [X]. Here's why: [reasoning]. Does that feel right?"

## Step 3: Plan

Build the plan based on your recommendation.

**If you recommended a tool:** Walk them through the scoping worksheet — problem, solution, user, trigger, steps, success criteria. If it's a skill that needs context, help them figure out what context it needs. Refer to the Scoping a Tool knowledge file.

**If you recommended thinking it through:** Build a numbered step-by-step plan they can take to any AI tool and execute. Refer to the Planning a Thinking Process knowledge file.

The output of this step is always a concrete artifact — either a filled-out spec or a numbered plan.

## Step 4: Refine

Read back the full plan. Ask: "Does this feel right? What would you change?"

Iterate until they're satisfied. Then tell them: "You're ready to go build this" or "Take this plan to ChatGPT/Claude/whatever you use and say 'walk me through this.'"

---

## Guidelines

- Be conversational and direct. No jargon.
- Stop after each step. Say where you are and where you'd go next. Wait for them before continuing.
- Push back when something is vague. "Help my team be more productive" is not a problem. Ask: productive at what?
- Be honest when something doesn't need a tool. That's good judgment, not a failure.
- Keep responses concise. These are busy managers.
- If the manager hasn't done the task manually with AI yet, tell them to try it first before building anything.`;

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
            Supermanager Copilot
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            You bring a management problem. The copilot helps you figure out what to do about it — build a tool, think it through with AI, or something else entirely — and gives you a concrete plan you can execute.
          </p>
          <p className="text-stone-700 text-lg mt-3 leading-relaxed">
            Set it up in whatever AI tool you use. Takes about 5 minutes.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-4">How it works</h2>
          <div className="space-y-3 text-stone-800 text-base leading-relaxed">
            <p><strong>1. Understand</strong> — You describe your problem. The copilot asks a few focused questions to understand what's really going on.</p>
            <p><strong>2. Recommend</strong> — Based on what it learns, it recommends an approach: build a Custom GPT, build an app, build a skill, or don't build anything and think it through with AI instead.</p>
            <p><strong>3. Plan</strong> — It walks you through scoping the solution — either a tool spec or a step-by-step thinking plan you can take to any AI tool.</p>
            <p><strong>4. Refine</strong> — You review the plan together and iterate until it feels right.</p>
          </div>
        </div>

        {/* What's included */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-4">What's included</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Two things: a <strong>system prompt</strong> (the instructions that tell the AI how to behave) and a <strong>knowledge base</strong> (4 files that give the copilot depth at each step).
          </p>
          <div className="bg-white border-2 border-stone-300 rounded p-5 text-stone-800 text-base leading-loose mb-4">
            <p><strong>understanding-the-problem.md</strong> — What to ask, what to skip, and how to identify the real problem behind the request.</p>
            <p><strong>recommending-an-approach.md</strong> — Decision logic for when to build a Custom GPT, an app, a skill, or when to skip building and think the problem through.</p>
            <p><strong>scoping-a-tool.md</strong> — A worksheet for defining exactly what the tool does, who it's for, and how you'll know it works. Includes context design principles.</p>
            <p><strong>planning-a-thinking-process.md</strong> — How to break a non-tool problem into a step-by-step plan using strategic thinking, decision-making, and influence frameworks.</p>
          </div>
          <p className="text-stone-700 text-lg leading-relaxed">
            <a
              href={DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-stone-600 hover:underline transition-colors"
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
            <li>In the <strong>Name</strong> field, type something like "Supermanager Copilot."</li>
            <li>In the <strong>Instructions</strong> field, paste the system prompt from above.</li>
            <li><a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the knowledge base files</a> and upload all 4 files under <strong>Knowledge</strong>.</li>
            <li>Click <strong>Save</strong> (keep it set to "Only me" unless you want to share it).</li>
            <li>Open your new GPT and try it: <span className="font-mono bg-rose-100 px-1 text-sm">"I have a problem I want to talk through."</span></li>
          </ol>
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
          <p className="text-stone-600 text-sm mt-3 italic">Note: Claude Projects require a Pro plan ($20/month).</p>
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
          <p className="text-stone-600 text-sm mt-3 italic">Note: Gems require a Gemini Advanced plan.</p>
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
          <p className="text-stone-600 text-sm mt-3 italic">Note: You'll need to re-paste the instructions and re-attach the files each time you start a new conversation. For persistent setup, use Copilot Studio if your organization has access.</p>
        </div>

      </div>
    </section>
  );
};

export default ManagerCopilot;
