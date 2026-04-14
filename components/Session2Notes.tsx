import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4">{children}</h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-bold text-stone-800 mt-8 mb-3">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-stone-800 text-base leading-relaxed my-3">{children}</p>
);

const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="text-stone-800 text-base leading-relaxed list-disc pl-6 space-y-2 my-3">{children}</ul>
);

const OL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ol className="text-stone-800 text-base leading-relaxed list-decimal pl-6 space-y-2 my-3">{children}</ol>
);

const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="italic text-stone-600 border-l-2 border-stone-300 pl-4 my-4 leading-relaxed">{children}</p>
);

const Session2Notes: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors"
        >
          &larr; Back
        </Link>

        <div className="mt-8 mb-10">
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-2">Session 2 notes</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Getting Your First Tool from "OK" to "Great"
          </h1>
        </div>

        <H2>Key Takeaways</H2>
        <UL>
          <li><strong>The hard part is teaching AI what good looks like.</strong> Building a Custom GPT takes five minutes. Getting it to produce work you'd actually send? That's the skill. It means looking at output, figuring out what's off, and telling the AI specifically enough that it fixes it. This is the same thing you do when coaching a new hire - the difference is the AI won't remember on its own. Your prompt has to.</li>
          <li><strong>One tool, one problem, one moment.</strong> Most first drafts try to do too much - three formats, five criteria, two audiences. A tool that tries to do three things does none of them well. Pick the one problem that costs you the most time. Get that working. Expand later.</li>
          <li><strong>Use pass/fail, not scores.</strong> Numeric rubrics feel rigorous, but AI gives different scores every time you run them. You don't actually care if something is a 7 or an 8. You care if it passes. Pass/fail is clearer for you and more actionable for the person using the tool.</li>
          <li><strong>These skills go way beyond Custom GPTs.</strong> Scoping a problem. Defining what "good" looks like. Iterating until the output meets your bar. These are the exact same skills you'll use to build agents, automations, and workflows. The technology will keep changing. This part stays the same. It's a management skill now.</li>
          <li><strong>Front-load the quality work.</strong> Put a seemingly disproportionate amount of effort into the first 10% - getting the core really good. AI can extrapolate from a strong foundation. But if the foundation is weak, everything built on top of it decays.</li>
          <li><strong>It's cheap to start over - use that.</strong> Unlike traditional software, scrapping a prompt and rebuilding costs almost nothing. Don't be precious about your first tool. If you realize you scoped it wrong, that's the process working, not a failure.</li>
          <li><strong>Never start from a blank page.</strong> The goal isn't full automation - it's getting the AI close enough that your job is editing, not writing from scratch. That philosophy shift alone is a massive time saver.</li>
        </UL>

        <H2>Resources</H2>
        <UL>
          <li><strong>Session guide:</strong> <Link to="/session2" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">writerbuilder.com/session2</Link> - homework patterns, demos, build-time prompts, deployment tips</li>
          <li><strong>Claude Code for PMs (free course):</strong> <a href="https://ccforpms.com" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">ccforpms.com</a> - Carl Vellotti's beginner-friendly Claude Code course (shared by Pia in chat)</li>
          <li><strong>Claude CoWork intro:</strong> <a href="https://ruben.substack.com/p/claude-cowork" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">ruben.substack.com/p/claude-cowork</a> - getting started with CoWork as a step between chat and Claude Code (shared by Amanda George)</li>
          <li><strong>Hannah Stulberg's newsletter:</strong> <a href="https://hannahstulberg.substack.com" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">hannahstulberg.substack.com</a> - beginner-friendly AI newsletter (shared by Pia)</li>
          <li><strong>Dictation tools:</strong> WisprFlow, SuperWhisper, or native dictation in ChatGPT/Claude/Gemini</li>
          <li><strong>Feedback form:</strong> Linked at the bottom of the session guide</li>
        </UL>

        <H2>Part 1: Scoping Your Tool</H2>

        <H3>Patterns from Homework</H3>
        <P>Hilary walked through five patterns she noticed across everyone's tool designs from Session 1.</P>

        <H3>Pattern 1: Whose problem is this?</H3>
        <P>The biggest reason tools fail is that managers build them to solve their own frustration without thinking about whether the tool solves a problem the user actually feels.</P>
        <Quote>"My team shows up to check-ins unprepared. The tool will require them to write a SMART problem statement before booking time with me."</Quote>
        <P>
          <strong>The reframe:</strong> The team's problem isn't "I need to write a SMART problem statement." It's "I have a messy situation and I can't figure out how to ask for help." A tool that adds a framework on top of a task they already find stressful won't get used. One that helps them untangle the mess will.
        </P>
        <P>
          Hilary shared how she framed her own email evaluator to her team: "Hey, I know it's really frustrating for you when you've put a ton of work into something, and you feel like it just gets derailed at the last minute by the CEO coming in and micromanaging. Here's a tool that I made that I think can help you frame up your ask in a way that's going to get to a green light faster." That lands differently than "your emails aren't good enough."
        </P>

        <H3>Pattern 2: Make sure you're building one tool, not three</H3>
        <P>Sometimes what sounds like one problem is actually several different problems bundled together. Each one leads to a different tool with different inputs, steps, and user experience.</P>
        <P>
          Example (Michael): "My tool helps my team evaluate whether something should be automated." But that could mean: helping people spot automation opportunities, helping them figure out how to automate, evaluating which ideas are worth pursuing, or building a case for automation. Those are all different tools.
        </P>
        <P>Pick the one that matches your actual pain. Get one working first - you can always build the next one later.</P>

        <H3>Pattern 3: The 10x rule - coach or automate?</H3>
        <P>For each thing your tool does: would getting 10x better at it make someone meaningfully better at their job? If yes, coach them. If no, just have the AI do it.</P>
        <P>
          Example (Christopher's board report reviewer): Getting better at grammar won't change anyone's career - that's something AI should just do. But learning to frame your work in terms of business impact to a board? That skill compounds. Coach on the strategic thinking, automate the copy editing.
        </P>
        <P>Hilary demoed a graphic breaking down "giving a talk" into its component tasks:</P>
        <UL>
          <li><strong>Coach on:</strong> Coming up with novel insights, forming a compelling narrative, connecting with the audience</li>
          <li><strong>Automate:</strong> Formatting slides, generating speaker notes, moving pixels around</li>
        </UL>
        <P>The best tools do both: save time on the tedious stuff AND build skill on the important stuff.</P>

        <H3>Pattern 4: Pass/fail, not scores</H3>
        <P>Hilary shared that she's changed her own approach on this. She used to use scored rubrics but has moved entirely to pass/fail.</P>
        <P>
          AI gives inconsistent scores on subjective criteria - run the same input three times, get three different numbers. The user doesn't care if something is a 7 or an 8. They care if it meets the bar.
        </P>
        <Quote>"Ultimately, what matters is: does it meet the bar, or does it not meet the bar? So framing any kind of criteria as a pass-fail, and then often, like, an overarching, what is the number one top thing here? Do you have to get 5 out of 5 of these to pass? Make that clear in the prompt."</Quote>

        <H3>Pattern 5: The tool should make their life easier, not harder</H3>
        <P>
          If you're putting more work on people's plates, expect them not to use the tool. A form is not a tool. "Step 1: Describe the core problem. Step 2: Write out what you've tried. Step 3: Identify what kind of support you need" - that's a Google Doc, not AI.
        </P>
        <P>
          Lean on what AI does well: give people something to react to instead of a blank page. If you're asking them to do more work on the load-bearing tasks (strategic thinking), earn that right by saving them time elsewhere (generating the deck, cleaning up the writing).
        </P>

        <H2>Scope Checks</H2>
        <P>Two checks before building:</P>

        <H3>Check 1: Is this the right problem?</H3>
        <UL>
          <li>Does it solve a problem for you?</li>
          <li>Does it solve a problem for the person who needs to use it? (Not your problem - theirs.)</li>
          <li>When would they use it? Can you name a specific moment?</li>
          <li>Is there an upstream problem that would be better to solve?</li>
        </UL>

        <H3>Check 2: Is it scoped right?</H3>
        <UL>
          <li><strong>Too many types of things:</strong> Your tool reviews emails AND decks AND reports AND Slack messages. Pick one and dial it in.</li>
          <li><strong>Multiple things happening at once:</strong> Coach, evaluate, and generate can all happen - but each needs to be a clear, sequential step in the prompt, not one big instruction.</li>
        </UL>
        <Quote>"You can absolutely build something that handles multiple formats or multiple steps. But you need to get really clear on your criteria for one thing first. Once that's dialed in, adapting it to a different format or audience is only marginally harder."</Quote>

        <H2>Discussion: Scope Creep and Starting Over</H2>
        <P>Alejandra asked about abandoning tools that have gotten unwieldy from scope creep. Hilary's response:</P>
        <UL>
          <li>She abandons tools all the time. The cost of starting over is low because spinning up a new tool takes minutes or hours.</li>
          <li>Scope creep is often a sign that the tool is veering closer to what people actually need - but it's dragging baggage from what you thought was the problem the first time.</li>
          <li>Unlike traditional software development, there's no expensive cost to throwing out a prompt and starting over.</li>
          <li><strong>Key distinction:</strong> iterate freely on your own tools, but be more careful about changing things your team relies on. "You are the training ground for whatever tool you want to make. Then when you feel like it's good enough, hand it to your team."</li>
        </UL>
        <Quote>"I know product managers who have 20-year-long careers who have never made a particularly helpful tool. Do not assume that the first one you pick is this magic great idea you have to go all in on."</Quote>

        <H2>Part 2: Hilary Demos</H2>

        <H3>Demo 1: Using Skills to Give Feedback</H3>
        <P>
          Hilary showed her workflow for giving feedback on student homework using Claude Code and a custom skill (/toolscopefeedback).
        </P>
        <P><strong>The workflow:</strong></P>
        <OL>
          <li>Paste a student's homework into Claude Code and run the skill</li>
          <li>The AI drafts personalized feedback in seconds</li>
          <li>Read the student's work and the draft</li>
          <li>Voice-dictate feedback on what to change ("I think there's two pretty different things going on here...")</li>
          <li>Claude rewrites the draft incorporating her notes</li>
          <li>Read the final version, make any last edits</li>
          <li>Post the feedback to the student</li>
          <li>Send the final version back to Claude so it can compare its draft vs. her edit</li>
        </OL>
        <P>
          <strong>The self-improving loop:</strong> After every ~5 students, Hilary asks Claude: "What are your observations from the past 5 versions? What are the diffs between what you proposed and what I ended up doing? How can you improve the skill to capture what you weren't capturing before?" Claude then updates its own skill file.
        </P>
        <Quote>"I've taken something that, as a manager, is a huge time suck - giving good and thoughtful feedback - and I've managed to do that in about 5 minutes total, not counting the setup time of creating the skill. And importantly, I don't want the student to think I'm just spitting out a robot response. I am massively reducing the cognitive load and time, because I'm starting with something that's basically already 90% of the way there."</Quote>
        <P>Claude's self-reported improvements from the session:</P>
        <UL>
          <li>"I described what the tool should evaluate; you described what it feels like to use"</li>
          <li>"I default to one interpretation of the problem; you name multiple possibilities"</li>
        </UL>
        <P>She then had Claude update the skill file and push the updated prompt to her live website - all through natural language dictation.</P>

        <H3>Live Demo: Building a New Skill in Real-Time</H3>
        <P>Hilary demonstrated building the Week 2 prompt feedback skill from scratch, live on the call. She dictated to Claude Code:</P>
        <Quote>"I want to set up a new skill to give feedback to my students' homework for the second week of my course. This week they're submitting prompts for the tools that they're working on. It's really important to me that the feedback is high quality and thoughtful and insightful, and really feels like a value add..."</Quote>
        <P>She told it to:</P>
        <UL>
          <li>Read the existing Session 1 feedback skill and internalize lessons</li>
          <li>Search her Obsidian folder for relevant course materials</li>
          <li>Write the new skill</li>
          <li>Store student submissions and drafts in a trackable document</li>
          <li>Set up the same iterative improvement loop</li>
        </UL>

        <H3>Demo 2: Iterating on Custom GPT Prompts (the 3-Window Method)</H3>
        <P>For students using Custom GPTs (not Claude Code), Hilary showed the same skill applied through a three-window workflow:</P>
        <UL>
          <li><strong>Window A: GPT Editor</strong> - The configuration screen where you paste the system prompt</li>
          <li><strong>Window B: Your Custom GPT</strong> - A conversation with the actual GPT you're testing - feed it real work</li>
          <li><strong>Window C: Regular ChatGPT conversation</strong> - A normal chat (not the GPT) where you work on improving the prompt</li>
        </UL>
        <P><strong>The loop:</strong></P>
        <OL>
          <li>Copy the system prompt from A</li>
          <li>Paste it into C and say: "This is the system prompt for a Custom GPT I'm working on. It's not quite doing what I want. I'm going to test it and give you feedback, and I want you to rewrite the prompt to address my feedback."</li>
          <li>Feed real work into B</li>
          <li>Read the output. What's right? What's off?</li>
          <li>Go to C and tell it what was off. Two methods: voice-type your feedback, or rewrite the output yourself and paste both versions so it can see the gap</li>
          <li>Copy the revised prompt from C back into A</li>
          <li>Test again in B. Repeat.</li>
        </OL>
        <Quote>"Keep your testing and your editing in separate places. Don't try to do both in the same window."</Quote>

        <H2>Part 3: Build Time</H2>
        <P>Students had 15 minutes to test and improve their tools using the 3-window method (or Claude Code if applicable).</P>

        <H3>Alejandra's Question: Tool Going on Tangents</H3>
        <P>
          Alejandra's "Value Detector" tool (helps PMs articulate problems and desired impact) was breaking problems down granularly - good in theory, but in practice it sent users down tangents that were "more disorienting than useful."
        </P>
        <P>
          <strong>Hilary's advice:</strong> This is common with coaching tools. The tool needs guardrails to stay focused. Claude itself suggested a "name, park, return" three-step script - when the tool identifies a tangent, it names it, parks it for later, and returns to the main thread.
        </P>

        <H2>Part 4: Socializing AI Tools with Your Team</H2>
        <P>
          Start with one beta tester - ideally someone you can watch use it (a 1:1 is a great opportunity). Four framing strategies:
        </P>

        <H3>1. Frame it as an investment in them</H3>
        <P>
          Not being good at AI is going to be a liability in the future. You're not offloading work to a machine - you're investing in your team learning skills that will make them more valuable.
        </P>
        <Quote>"I'm doing this because I'm investing in you. I think AI fluency is going to be one of the most important skills in the next few years, and I want to make sure you're building it now."</Quote>

        <H3>2. Frame it as their problem, not yours</H3>
        <P>Don't say "your emails aren't good enough." Frame it around the frustration they already feel.</P>
        <Quote>"I know it's frustrating when you feel like you're getting blocked by leadership intervening in your plan. I think one thing that can help is sending really clear updates so they don't feel the need to step in. I don't want you spending all your time on that, so I made a tool to help."</Quote>

        <H3>3. Normalize it by showing how you use it</H3>
        <P>
          Show them your own tools in a 1:1. Be transparent about where AI helps you and where you still do the work yourself. The bar: anything you send, even if AI helped draft it, you've read, edited, and signed off on. That's the bar you expect from them too.
        </P>

        <H3>4. Don't let things go unsaid</H3>
        <P>People will worry about what this means. Are you trying to replace them? Be candid.</P>
        <Quote>"I can't promise that using these tools guarantees job security forever. But my hope is that when we do spend time together, it's on the stuff that matters more for your growth. You can get the routine feedback from the tool whenever you want. If you have a real problem, come talk to me. I have time."</Quote>

        <H2>Q&A Highlights</H2>

        <H3>Speaking vs. Writing to AI (Gladie's question)</H3>
        <P>Hilary used to prefer writing because she structured her thoughts better. That's changed:</P>
        <Quote>"The models got good enough where they can take my more unstructured talking and do good work with it. Previously, I'd get meaningfully better results by writing up my feedback carefully. Now I don't find that. I can get there a lot faster by just talking and iterating. It feels a lot more like what it feels like being a manager - I'm usually looking at somebody's work and talking to them as I'm looking at it."</Quote>
        <P>
          She now asks Claude to repeat back its understanding rather than front-loading the clarity herself: "The onus is now more on Claude to constantly be checking with me. It's like a perfect employee."
        </P>

        <H3>WisprFlow vs. Claude Voice (Amber's question)</H3>
        <P>
          Hilary sticks with WisprFlow because she uses it across her entire workflow, not just Claude Code. "If I strike gold on one mountain, I don't go dig on another." She uses the same keyboard shortcut for dictation everywhere.
        </P>

        <H3>Getting Started with Claude Code (Hollis's question)</H3>
        <P>Hilary's recommended progression for people new to code:</P>
        <OL>
          <li><strong>Start with Lovable, Google AI Studio, or Replit</strong> - If you've never touched code, these are the training wheels</li>
          <li><strong>Move to Cursor</strong> - Gets you comfortable with the chat-on-one-side, work-on-the-other pattern</li>
          <li><strong>Then Claude Code</strong> - Once you have intuition for what's happening</li>
        </OL>
        <Quote>"4 months ago, I was like, I'm never working in the terminal. That is crazy."</Quote>

        <H3>Collaborative Context / Version Control (Kristina's question)</H3>
        <P>
          Hilary keeps everything organized locally on her computer in Obsidian (Markdown files). Claude Code does the organization work. She can say things like "A week ago, I downloaded a list of course alumni. Do you remember this? Can you go find those lists?" and Claude finds them.
        </P>
        <P>
          For teams: Claude CoWork and new tools are trying to solve shared context with a source of truth. No great answer yet, but expected within ~6 months. Current workarounds: synced Dropbox folders, GitHub repos.
        </P>

        <H3>Claude CoWork as an Intermediary (Kristina, chat)</H3>
        <P>
          For those not comfortable in the terminal, Claude CoWork (available with paid Claude subscription) is a good step between Claude Chat and Claude Code - it has access to folders you grant it access to.
        </P>
      </div>
    </section>
  );
};

export default Session2Notes;
