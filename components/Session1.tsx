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
            Build Your First Tool
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Pick a real problem from your work, turn it into a Custom GPT, and test it. By the end of this session you'll have a working tool and a clear sense of what needs to be better.
          </p>
        </div>

        {/* Before This Class */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Before This Class</h2>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><strong>Watch the async modules for Week 1</strong> — Foundations, AI vocabulary, prompting, problem decomposition, delegation.</li>
            <li>
              <strong>Fill out the Tool Scoping Worksheet</strong> for one real problem you want to solve at work.
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

        {/* What makes a good Custom GPT problem? */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">What makes a good Custom GPT problem?</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            A Custom GPT is great for problems where <strong>you keep doing the same thinking work over and over.</strong> It's not great for problems where you want something to happen automatically, or where the scope is "know everything about my company."
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-2">Two types that work well:</p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-disc list-inside">
            <li><strong>Evaluator:</strong> You keep giving the same feedback on the same kind of work — emails, presentations, reports, research. The GPT applies your standards so you're not the bottleneck.</li>
            <li><strong>Coach:</strong> Your team keeps getting stuck at the same point in a process. The GPT walks them through it step by step so they get better, not just get an output.</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed">
            If your idea sounds more like "I want this to run in the background and handle things for me" — that's an automation, and we'll get there in Session 4. For now, pick something where a person sits down, gives input, and gets something useful back.
          </p>
        </div>

        {/* How to use the worksheet */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-stone-800 mb-3">How to use the worksheet</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            The worksheet helps you get specific before you build anything. Work through it in order:
          </p>
          <div className="bg-white border-2 border-stone-300 rounded p-5 text-stone-800 text-base leading-loose space-y-3">
            <p><strong>What is YOUR problem as a manager?</strong> What feedback do you keep repeating? What did you redo yourself at 11 PM? What keeps not landing?</p>
            <p><strong>What is THEIR problem as the user?</strong> Flip your perspective — what's the version they actually feel? Not "they need to communicate better" but "they're tired of five rounds of edits before approval."</p>
            <p><strong>When, specifically, should they reach for this tool?</strong> You need a concrete trigger: "when you're about to send an email to your skip level" or "when you've finished a first draft." If you can't name the moment, the tool won't get used.</p>
            <p><strong>What does "good" look like?</strong> 3-6 criteria you actually care about. For each one, briefly explain what you mean — because "clear" means different things to different people.</p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mt-4 italic">
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
            Break into groups of 3-4. Each person shares what they scoped. If you didn't do the pre-work, use this time to talk through your idea — speaking it out loud to another person is often faster than writing it alone.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-3 font-bold">Questions to ask each other:</p>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
            <li><strong>Who's the user, and when exactly would they reach for this?</strong> If there's no clear trigger, the tool won't get used.</li>
            <li><strong>Is the scope clear enough to explain?</strong> Try describing how the tool would work — what someone gives it, what it does, what they get back. If you can't walk someone through it in a few sentences, the scope is probably too big or too vague for a first build.</li>
            <li><strong>Is this the real problem, or is there something upstream?</strong> If their team's emails are bad, is it the writing — or is it that they don't understand the audience? If presentations are weak, is it the slides — or the thinking behind them? Build for the root cause, not the symptom.</li>
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
            Hilary demos live. First, she goes straight to ChatGPT and asks it to build a Custom GPT from a vague description — no worksheet, no spec work. You'll see what comes out. Then she does it the right way: feeds in the worksheet, aligns on how the tool should work before writing anything, and builds from that. The difference is the whole point.
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
            Open ChatGPT or Claude and paste your worksheet. Before committing to your idea, ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Here's the problem I want to solve and my idea for a Custom GPT. Before we build it, do you have any other ideas for how I could solve this problem with a Custom GPT?"
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Then ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Can you rank these ideas in terms of how effective they'd be and how feasible they are to build as a Custom GPT?"
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Pick the winner. It might be your original idea — or you might find a better angle you hadn't considered.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 2: Align on how the tool works</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Now that you've picked your approach, ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Okay, let's go with that one. Before you write anything, tell me exactly how you think this is going to work — who uses it, when, and what they get out of it."
            </p>
          </div>
          <p className="text-stone-800 text-base leading-relaxed mb-6">
            Review its understanding. Correct anything that's off.
          </p>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 3: Get the steps before the prompt</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Once you're aligned on what the tool does, ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Now walk me through, step by step, what this tool would actually do when someone uses it. What happens first? What does it ask for? What does it produce? Then we'll write the prompt."
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
            <li><strong>Does it have a clear trigger?</strong> The prompt should know when someone is using this tool and why.</li>
            <li><strong>Does it know when to stop?</strong> If not, add explicit instructions: "When you have finished, stop. Do not continue unless the user asks."</li>
            <li><strong>Is it framed for the user, not just for you?</strong> "Evaluate whether this meets my standards" feels like a hoop to jump through. "Help make sure this lands the way your work deserves" feels like it's on their side.</li>
          </ul>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 5: Set it up in ChatGPT</h4>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
            <li>Go to ChatGPT &rarr; Explore GPTs &rarr; Create</li>
            <li>Use the <strong>Configure</strong> tab (not the Create chat tab)</li>
            <li><strong>Name:</strong> Give it a memorable name — projects with fun names get taken more seriously</li>
            <li><strong>Instructions:</strong> Paste your system prompt</li>
            <li><strong>Conversation starters:</strong> Add 1-2 examples of how someone would start using it (e.g., "Paste your draft to get feedback")</li>
            <li>Upload any reference docs to the Knowledge section if your tool needs them — but know that uploading docs ≠ the AI understanding them. If something is important, pull it out of the doc and put it directly in the prompt as explicit criteria.</li>
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

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 1: Generate test data</h4>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Go back to the conversation where you built your prompt and ask:
          </p>
          <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-6">
            <p className="text-stone-800 text-base font-mono leading-relaxed">
              "Generate a C+ version and an A version of the kind of input someone would give this tool."
            </p>
          </div>

          <h4 className="text-lg font-bold text-stone-800 mb-2">Step 2: Run both through your GPT</h4>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li>Does the C+ version get meaningfully different feedback than the A version? If they get similar scores or feedback, your criteria aren't sharp enough.</li>
            <li>Does the feedback match what YOU would have said? If the AI is nicer than you'd be, that's a problem — it means your tool will pass work that shouldn't pass.</li>
            <li>Is the tone right? If it sounds patronizing or robotic, go back to your prompt conversation and give specific feedback: "This sounds patronizing — think about the best way to adjust the tone." (Don't just add "don't be patronizing" as a line — that rarely works.)</li>
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

        {/* Before Next Session */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Before Next Session</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            <strong>Post a prompt on the Maven portal.</strong> It can be the system prompt for the tool you built today, or — if you kept experimenting and built something else — a prompt for a different tool. Either is great.
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
