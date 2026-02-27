import React from 'react';
import { Link } from 'react-router-dom';

const Session1: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
          &larr; Back
        </Link>

        <div className="mt-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Build Your First Custom GPT
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Think of a piece of feedback you give over and over again. By the end of this session, you'll have a Custom GPT that can give that feedback for you.
          </p>
        </div>

        {/* Before This Class */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Before This Class</h2>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><strong>Watch the async video modules for Week 1</strong> in the Maven portal.</li>
            <li>
              <strong>Fill out the Tool Scoping Worksheet</strong> for one piece of feedback you keep repeating at work.
              <br />
              <a
                href="https://docs.google.com/document/d/1PLIJrhMTlSBw8TQ4AWYK5mw8898T9wizKQOB_-kymOY/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-stone-600 hover:underline transition-colors"
              >
                Get the Tool Scoping Worksheet (Google Drive) &rarr;
              </a>
            </li>
            <li><strong>Submit your worksheet on Maven</strong> so we can see what everyone's working on.</li>
          </ol>
        </div>

        {/* What to focus on */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">What to focus on</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Think about the feedback you find yourself giving over and over. The email you keep rewriting for someone. The presentation you keep sending back with the same notes. The report that never quite lands and you end up fixing at 11 PM.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Pick one, and use that as the basis for your worksheet. If you have more than one idea, pick the one where you feel the most frustrated repeating yourself.
          </p>
          <p className="text-stone-800 text-base leading-relaxed italic">
            If you didn't get to this before class, that's okay — you'll have time to work on it in the first breakout.
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
            Break into groups of 3-4. Each person shares what they picked. If you didn't do the pre-work, use this time to talk through your idea — speaking it out loud to another person is often faster than writing it alone.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-3 font-bold">Questions to ask each other:</p>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
            <li><strong>Can you describe the feedback in one sentence?</strong> If it takes a paragraph, the scope might be too broad for a first build.</li>
            <li><strong>Is the "what good looks like" specific enough?</strong> Could someone who doesn't know you read your criteria and give the same feedback you would? If not, it needs to be sharper.</li>
            <li><strong>Is this the real problem, or is there something upstream?</strong> If their team's emails are bad, is it the writing — or is it that they don't understand the audience? If presentations are weak, is it the slides — or the thinking behind them?</li>
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
            Hilary demos live. First, she goes straight to ChatGPT and asks it to build a Custom GPT from a vague description — no worksheet, no spec work. You'll see what comes out. Then she does it the right way: feeds in the worksheet, aligns on how the GPT should work before writing anything, and builds from that. The difference is the whole point.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 3 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 3: Generate Your System Prompt & Build the GPT</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Now it's your turn. You're doing it the good way.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 1: Explore other approaches</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Open ChatGPT (or Claude, Gemini, or Copilot) and paste your worksheet. Before committing to your idea, ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Here's a piece of feedback I give over and over at work, and my criteria for what good looks like. Before we build a Custom GPT for this, do you have any other ideas for how I could approach it?"
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Then ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Can you rank these ideas in terms of how effective they'd be and how feasible they are to build?"
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Pick the winner. It might be your original idea — or you might find a better angle you hadn't considered.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 2: Align on how the GPT works</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Now that you've picked your approach, ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Okay, let's go with that one. Before you write anything, tell me exactly how you think this Custom GPT is going to work — who uses it, when, and what they get out of it."
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Review its understanding. Correct anything that's off.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 3: Get the steps before the prompt</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Once you're aligned on what the GPT does, ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Now walk me through, step by step, what this GPT would actually do when someone uses it. What happens first? What does it ask for? What does it produce? Then we'll write the prompt."
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Review the steps. Do they match how you'd want this to work? Adjust before moving on.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 4: Write the prompt</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Now tell it to write the system prompt based on the steps you just agreed on.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Scan the prompt it generated. Look for:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li><strong>Does it know when to stop?</strong> If not, add explicit instructions: "When you have finished, stop. Do not continue unless the user asks."</li>
            <li><strong>Is it framed for the user, not just for you?</strong> "Evaluate whether this meets my standards" feels like a hoop to jump through. "Help make sure this lands the way your work deserves" feels like it's on their side.</li>
          </ul>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 5: Set up your Custom GPT</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            The steps are the same idea regardless of platform — give it a name, paste your system prompt, add conversation starters, and upload any reference docs. Each platform puts these in a different place.
          </p>

          {/* ChatGPT */}
          <h5 className="text-base font-bold text-stone-800 mb-2">ChatGPT (Custom GPT)</h5>
          <ol className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-decimal list-inside">
            <li>Go to ChatGPT &rarr; Explore GPTs &rarr; Create</li>
            <li>Use the <strong>Configure</strong> tab (not the Create chat tab)</li>
            <li><strong>Name:</strong> Give it a memorable name — projects with fun names get taken more seriously</li>
            <li><strong>Instructions:</strong> Paste your system prompt</li>
            <li><strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it (e.g., "Paste your draft to get feedback")</li>
            <li>Upload any reference docs to the <strong>Knowledge</strong> section if your tool needs them — but know that uploading docs ≠ the AI understanding them. If something is important, pull it out of the doc and put it directly in the prompt as explicit criteria.</li>
          </ol>

          {/* Claude */}
          <h5 className="text-base font-bold text-stone-800 mb-2">Claude (Project)</h5>
          <ol className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-decimal list-inside">
            <li>Go to Claude &rarr; Projects (left sidebar) &rarr; Create Project</li>
            <li><strong>Name:</strong> Give it a memorable name — projects with fun names get taken more seriously</li>
            <li><strong>Custom Instructions:</strong> Paste your system prompt into the project instructions field</li>
            <li><strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it</li>
            <li>Upload any reference docs using the <strong>Add Content</strong> button — but know that uploading docs ≠ the AI understanding them. If something is important, pull it out of the doc and put it directly in the instructions as explicit criteria.</li>
            <li>Start a new chat inside the project to test it.</li>
          </ol>

          {/* Gemini */}
          <h5 className="text-base font-bold text-stone-800 mb-2">Gemini (Gem)</h5>
          <ol className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-decimal list-inside">
            <li>Go to Gemini &rarr; Gem Manager (left sidebar) &rarr; Create Gem</li>
            <li><strong>Name:</strong> Give it a memorable name — projects with fun names get taken more seriously</li>
            <li><strong>Instructions:</strong> Paste your system prompt</li>
            <li>Upload any reference docs using the <strong>Upload</strong> button — but know that uploading docs ≠ the AI understanding them. If something is important, pull it out of the doc and put it directly in the instructions as explicit criteria.</li>
            <li>Click <strong>Save</strong> and then open the Gem to start testing.</li>
          </ol>

          {/* Copilot */}
          <h5 className="text-base font-bold text-stone-800 mb-2">Microsoft Copilot (Copilot GPT)</h5>
          <ol className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-decimal list-inside">
            <li>Go to Copilot &rarr; Create a Copilot GPT (or use Copilot Studio if your org has it)</li>
            <li><strong>Name:</strong> Give it a memorable name — projects with fun names get taken more seriously</li>
            <li><strong>Instructions:</strong> Paste your system prompt</li>
            <li><strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it</li>
            <li>Upload any reference docs if your tool needs them — but know that uploading docs ≠ the AI understanding them. If something is important, pull it out of the doc and put it directly in the instructions as explicit criteria.</li>
            <li>Save and open it to start testing.</li>
          </ol>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Part 4 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Part 4: Test It & Break It</h3>
          <p className="text-stone-500 text-sm font-medium mb-4">20-25 min</p>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Your GPT is live. Now find out what's wrong with it.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 1: Test with your real examples</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Remember the good and bad examples from your worksheet? Run them both through your GPT.
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li>Does the bad example get meaningfully different feedback than the good one? If they get similar feedback, your criteria aren't sharp enough.</li>
            <li>Does the feedback match what YOU would have said? If the AI is nicer than you'd be, that's a problem — it means your GPT will pass work that shouldn't pass.</li>
          </ul>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 2: Generate more test data</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Go back to the conversation where you built your prompt and ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Generate a C+ version and an A version of the kind of input someone would give this GPT."
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Run both through and compare.
          </p>

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

        {/* Before Next Session */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Before Next Session</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            <strong>Post your prompt on the Maven portal.</strong> It can be the system prompt for the GPT you built today, or — if you kept experimenting and built something else — a prompt for a different one. Either is great.
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
