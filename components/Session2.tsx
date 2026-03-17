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

const homeworkSlides = [
  {
    title: "Whose problem is this?",
    body: "You're building this tool because of your frustration. But the person using it has a different experience of the same problem.",
    before: "\"My team shows up to check-ins unprepared. The tool will require them to write a SMART problem statement before booking time with me.\"",
    after: "The team's problem isn't \"I need to write a SMART problem statement.\" It's \"I have a messy situation and I can't figure out how to ask for help.\" A tool that adds a framework on top of a task they already find stressful won't get used. One that helps them untangle the mess will.",
    howItLooks: "A tool that helps you get more out of your 1:1 time by coming in with a scoped ask.\n\n1. Word-vomit the challenge you're having.\n2. The tool pulls out three potential problems it's hearing and walks you through what a couple of solutions could be.\n3. It frames that up into a blurb you can drop into your 1:1 doc before your next meeting.",
    student: "Rachel",
  },
  {
    title: "Make sure you're building one tool, not three",
    body: "Sometimes what sounds like one problem is actually several different problems bundled together. Each one leads to a different tool.",
    before: "\"My tool helps my team evaluate whether something should be automated.\"",
    after: "But what does that mean? Is the tool helping people spot things that could be automated? Helping them figure out how to automate? Evaluating which automation ideas are worth pursuing? Or helping them build a case for automation?\n\nThose are all different tools. Each one has different inputs, different steps, and a different user experience.",
    howItLooks: "Pick the one that matches your actual pain.\n\n- If people aren't seeing automation opportunities, build a coaching tool that walks them through their workflows.\n- If they have too many ideas and can't prioritize, build an evaluator that pressure-tests proposals against your criteria.\n\nGet one working first - you can always build the next one later.",
    student: "Michael",
  },
  {
    title: "The 10x rule: coach or automate?",
    body: "For each thing your tool does: would getting 10x better at it make someone meaningfully better at their job? If yes, coach them. If no, just have the AI do it.",
    before: "\"My board report reviewer evaluates 9 dimensions at once: grammar, acronyms, formatting, business impact, clarity of outcome, data accuracy...\"",
    after: "Some of those dimensions are mechanical (grammar, acronyms, formatting) and some are strategic (business impact, clarity of outcome).\n\nGetting better at grammar won't change anyone's career - it needs to get done, but it's not where the growth is. Learning to frame your work in terms of business impact to a board? That skill compounds.",
    howItLooks: "One tool, two steps.\n\n1. Coaching: \"What outcome are you reporting on? What does the board need to decide based on this?\" Walk the person through the strategic thinking - ask questions, give examples of strong impact statements, help them get better at it.\n2. Automation: once the thinking is solid, the AI cleans up grammar, enforces the style guide, and fixes acronyms. No coaching needed for that part.",
    student: "Christopher",
  },
  {
    title: "Pass/fail, not scores",
    body: "If your tool evaluates work, make each criterion pass/fail. Not scored, not weighted. AI gives inconsistent scores on subjective criteria - run the same input three times, get three different numbers. You don't care if something is a 7 or an 8. You care if it meets the bar.",
    before: "\"Criteria: relevance to strategy (25%), data quality (20%), actionability (20%), audience clarity (20%), visual presentation (15%). Weighted score out of 100.\"",
    after: "Turn each of those into a pass/fail question with a clear bar. Then decide: does every criterion need to pass? Is there one overall question that matters most? Either is fine - just be explicit about what \"good enough\" means.\n\nA report that nails the strategy but has a typo is probably fine. A report with perfect formatting that misses the point is not.",
    howItLooks: "The tool checks each criterion and says pass or fail. If something fails, it tells you specifically why: \"The data is solid but there's no clear recommendation. The reader will finish this and think 'interesting' instead of 'here's what we should do.'\" No ambiguous scores to interpret - just a clear answer on what needs work.",
    student: "Hollis",
  },
  {
    title: "The tool should make their life easier, not harder",
    body: "If your tool adds work on top of a task someone already has to do, they won't use it. The net result of using the tool should be less effort, not more.",
    before: "\"Step 1: Describe the core problem you need help with. Step 2: Write out what you've tried so far. Step 3: Identify what kind of support you need.\"",
    after: "That's a form, not a tool. If people wanted to fill out forms they'd use a Google Doc. Lean on what AI does well: give people something to react to instead of a blank page.\n\nAnd if you're asking them to put more work into one part (like thinking through the strategy), save them time on another part (like generating the slides or cleaning up the writing). Net, it should be less work - but the work they do is in the places where you want them to grow.",
    howItLooks: "The user types a rough brain dump: \"I'm stuck on the migration project.\"\n\nThe tool responds: \"It sounds like this could be a few things - (1) you're blocked by a dependency, (2) the scope has grown and you need to renegotiate, or (3) you're not sure which path to take. Which is closest?\"\n\nIt coaches them through the hard part, then generates a clean summary they can drop into their 1:1 doc. More thinking, less formatting.",
    student: "Rachel",
  },
];

const deploySlides = [
  {
    title: "Frame it as an investment in them",
    body: "Not being good at AI is going to be a liability in the future. It's one of the most valuable skills people can build right now. You're not offloading work to a machine - you're investing in your team learning skills that will make them more valuable.",
    example: "\"I'm doing this because I'm investing in you. I think AI fluency is going to be one of the most important skills in the next few years, and I want to make sure you're building it now.\"",
  },
  {
    title: "Frame it as their problem, not yours",
    body: "Don't say \"your emails aren't good enough.\" Frame it around the frustration they already feel. The tool should solve a problem they recognize, not one you're pointing out.",
    example: "\"I know it's frustrating when you feel like you're getting blocked by leadership intervening in your plan. I think one thing that can help is sending really clear updates so they don't feel the need to step in. I don't want you spending all your time on that, so I made a tool to help.\"",
  },
  {
    title: "Normalize it by showing how you use it",
    body: "Show them your own tools in a 1:1. Be transparent about where AI helps you and where you still do the work yourself. Make it clear: anything you send, even if AI helped draft it, you've read, edited, and signed off on. That's the bar you expect from them too.",
    example: "\"Let me show you how I use mine. Anything I send you, even if I used AI to draft it, I've had eyes on it. I'm accountable for it. Same goes for you - use the tools, but put your name on the output.\"",
  },
  {
    title: "Don't let things go unsaid",
    body: "People will worry about what this means. Are you trying to replace them? Automate them away? Don't pretend those concerns don't exist. Be candid. The goal is that when you do spend time together, it's on the stuff that's more valuable - not rote feedback they could get from a tool.",
    example: "\"I can't promise that using these tools guarantees job security forever. But my hope is that when we do spend time together, it's on the stuff that matters more for your growth. You can get the routine feedback from the tool whenever you want. If you have a real problem, come talk to me. I have time.\"",
  },
];

const Session2: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('chatgpt');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDeploySlide, setCurrentDeploySlide] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [currentTakeaway, setCurrentTakeaway] = useState(0);
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

        {/* Agenda + Top Takeaway */}
        <div className="mb-8 bg-white border border-stone-200 rounded-lg p-5">
          <p className="text-sm font-bold text-stone-800 mb-3">Today's agenda</p>
          <ol className="text-sm text-stone-600 space-y-1.5 list-decimal list-inside mb-4">
            <li><a href="#part1" className="hover:text-stone-800 hover:underline">Scoping your tool</a> <span className="text-stone-400">- 15 min</span></li>
            <li><a href="#part2" className="hover:text-stone-800 hover:underline">Hilary demos</a> <span className="text-stone-400">- 25 min</span></li>
            <li><a href="#part3" className="hover:text-stone-800 hover:underline">Your turn - test and improve your tool</a> <span className="text-stone-400">- 35 min</span></li>
            <li><a href="#part4" className="hover:text-stone-800 hover:underline">Socializing AI tools with your team</a> <span className="text-stone-400">- 15 min</span></li>
            <li><a href="#takeaways" className="hover:text-stone-800 hover:underline">Session takeaways</a> <span className="text-stone-400">- 10 min</span></li>
          </ol>
          <div className="border-t border-stone-200 pt-4">
            <p className="text-sm text-stone-500 leading-relaxed">
              <span className="font-bold text-stone-700">Why we're doing all this:</span> Custom GPTs are just the training wheels. The real skill you're building today - figuring out how to get AI to do work that actually meets your bar - is the same skill behind agents, automations, and whatever comes next. The tools will keep shape-shifting. Knowing how to wrangle them won't go out of style.
            </p>
          </div>
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

        {/* Part 1: Scoping Your Tool */}
        <details id="part1" className="mb-12">
          <summary className="text-2xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">Part 1: Scoping Your Tool <span className="text-stone-400 text-sm font-normal ml-2">15 min</span></summary>

        {/* What Everyone's Building */}
        <details id="whats-building" className="mb-8 ml-1">
          <summary className="text-xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">What Everyone's Building</summary>
          {(() => {
            const tools = [
              { name: "Written communication reviewer", student: "Taylor", desc: "Evaluates product strategies, decks, and docs for clarity, conciseness, and strategic thinking before leadership review" },
              { name: "Board report coach", student: "Christopher", desc: "Reviews monthly board reports for clarity, conciseness, and board-appropriate framing before submission" },
              { name: "Assessment metadata validator", student: "Amanda", desc: "Checks content metadata tags for accuracy and completeness before migrating to the active database" },
              { name: "Research presentation evaluator", student: "Hollis", desc: "Reviews research presentations for clear takeaways, audience framing, and whether the deck answers 'so what?'" },
              { name: "Scalability assessor", student: "Hayden", desc: "Stress-tests proposed solutions for whether they'll hold up as the team and member volume grow" },
              { name: "Call notes extractor", student: "MacKenzie", desc: "Pulls social-relevant content from author kickoff call notes and builds a working content calendar" },
              { name: "Automation decision tool", student: "Michael", desc: "Walks team members through evaluating whether a manual process is worth automating and how to scope it" },
              { name: "Internal comms reviewer", student: "Lucy", desc: "Checks emails, Slack messages, and docs for clear purpose, strategic grounding, and actionable next steps" },
              { name: "Customer email reviewer", student: "Mark", desc: "Reviews sales emails for completeness, tone, and whether the customer's real question is being addressed" },
              { name: "BPO update brief generator", student: "Jen", desc: "Converts BPO team updates into operator-ready briefs with action registers and execution plans" },
              { name: "Decision escalation guide", student: "Felipe", desc: "Coaches PMs through deciding whether a decision is theirs to make or needs to be escalated" },
              { name: "Change management messaging", student: "Karen", desc: "Helps teams craft buy-in messaging that leads with the 'why' and addresses audience objections" },
              { name: "Deck and presentation reviewer", student: "Lisa", desc: "Reviews decks and presentations for right level of detail, storytelling with data, and clarity of the ask" },
              { name: "Direct feedback coach", student: "Alejandra", desc: "Coaches team members through giving direct feedback using Radical Candor instead of escalating complaints" },
              { name: "Design review coach", student: "Andrew", desc: "Evaluates designs for user logic, unnecessary UI elements, articulation of user and business needs, and competitor awareness" },
              { name: "MVP scope coach", student: "Emilie", desc: "Helps engineers find a smaller version of a spec they could ship more quickly, resisting the urge to keep adding scope" },
            ];
            const selected = tools.find(t => t.name === selectedTool);
            return (
              <>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
                      className={`px-3 py-1.5 border rounded-full text-sm cursor-pointer transition-colors ${
                        selectedTool === tool.name
                          ? 'bg-stone-800 border-stone-800 text-white'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
                {selected && (
                  <div className="mt-3 p-4 bg-white border border-stone-200 rounded-lg text-sm">
                    <p className="text-stone-500 text-xs mb-1">{selected.student}</p>
                    <p className="text-stone-700">{selected.desc}</p>
                  </div>
                )}
              </>
            );
          })()}
        </details>

        {/* Homework Observations Carousel */}
        <details id="patterns" className="mb-8 ml-1">
          <summary className="text-xl font-bold text-stone-800 mb-2 cursor-pointer hover:text-stone-600 transition-colors">Patterns from Your Homework</summary>
          <p className="text-stone-500 text-sm mb-6">Things I noticed across everyone's tool designs</p>

          <div className="relative">
            <div className="bg-white border-2 border-stone-300 rounded-lg p-6 min-h-[320px] flex flex-col">
              <p className="text-lg font-bold text-stone-800 mb-2">
                {homeworkSlides[currentSlide].title}
              </p>
              <p className="text-stone-800 text-base leading-relaxed mb-4">
                {homeworkSlides[currentSlide].body}
              </p>
              <div className="bg-rose-50 border-l-4 border-rose-300 p-4 mb-3">
                <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-1">From a student's worksheet</p>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  {homeworkSlides[currentSlide].before}
                </p>
              </div>
              <div className="bg-stone-50 border-l-4 border-stone-800 p-4 mb-3">
                <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-1">The reframe</p>
                <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                  {homeworkSlides[currentSlide].after}
                </p>
              </div>
              <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 mt-auto">
                <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-1">What this could look like</p>
                <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                  {homeworkSlides[currentSlide].howItLooks}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? homeworkSlides.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white border-2 border-stone-300 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:border-stone-400 transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === homeworkSlides.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white border-2 border-stone-300 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:border-stone-400 transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {homeworkSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-stone-800' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </details>

        {/* Check Your Scope */}
        <details className="mb-8 ml-1">
          <summary className="text-xl font-bold text-stone-800 mb-3 cursor-pointer hover:text-stone-600 transition-colors">Check Your Scope Before You Build</summary>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Based on the patterns above and your experience testing your tool, think about whether your scope needs to change. Run through these two checks:
          </p>

          {/* Check 1: Right problem */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">Check 1: Is this the right problem?</p>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Run through these quickly:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex gap-2 text-stone-800 text-sm leading-relaxed">
                <span className="text-stone-400 mt-0.5 flex-shrink-0">1.</span>
                <p><strong>Does it solve a problem for you?</strong> If you wouldn't use this or wouldn't care if it disappeared, it's not solving a real problem.</p>
              </div>
              <div className="flex gap-2 text-stone-800 text-sm leading-relaxed">
                <span className="text-stone-400 mt-0.5 flex-shrink-0">2.</span>
                <p><strong>Does it solve a problem for the person who needs to use it?</strong> Not your problem - <em>theirs</em>. "My team writes bad emails" is your problem. "I'm never sure if my email is going to land the way I want" is theirs. If the tool feels like a mandate from their manager, they won't use it. If it solves a problem they already feel, they will.</p>
              </div>
              <div className="flex gap-2 text-stone-800 text-sm leading-relaxed">
                <span className="text-stone-400 mt-0.5 flex-shrink-0">3.</span>
                <p><strong>When would they use it?</strong> Can you name a specific moment? "Before sending an email to their skip level" is good. "Whenever they need feedback" is too vague.</p>
              </div>
            </div>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Now the harder question: <strong>is there an upstream problem that would be better to solve?</strong> Sometimes the feedback you keep giving is a symptom, not the root cause.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              Example: "My team needs to write better emails to the CEO" seems like the problem. But maybe the real issue is that the CEO wants fewer emails, and your team needs better judgment about when to email vs. when to handle it themselves. That's a completely different tool.
            </p>
          </div>

          {/* Check 2: Right scope */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">Check 2: Is it scoped right?</p>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Scope problems come in two flavors:
            </p>
            <ul className="text-stone-800 text-sm leading-relaxed space-y-2 mb-4 list-disc list-inside">
              <li><strong>Too many types of things.</strong> Your tool reviews emails AND decks AND reports AND Slack messages. You wouldn't evaluate an email the same way you'd evaluate a deck - the criteria are different, the format is different, the failure modes are different. Pick one and dial it in.</li>
              <li><strong>Multiple things happening at once.</strong> Your tool might coach someone through a problem, evaluate their output, and generate a revised version. That's fine - but each of those needs to be a clear, sequential step in the prompt, not one big instruction. If your tool does three things, make sure the prompt says: Step 1 do this, Step 2 do this, Step 3 do this. When all the steps are blurred together, the AI tries to do everything at once and does all of it poorly.</li>
            </ul>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              You can absolutely build something that handles multiple formats or multiple steps. But you need to get really clear on your criteria for <em>one</em> thing first. Once that's dialed in, adapting it to a different format or audience is only marginally harder. Starting broad is hard because you're trying to solve for too many possible failure states and too many different criteria at the same time.
            </p>

            <div className="bg-stone-100 border-l-4 border-stone-400 p-4">
              <p className="text-stone-800 text-sm leading-relaxed">
                <strong>If you need to narrow:</strong> Pick the one format, one audience, and one use case where you feel the most pain. Build for that. You can expand later.
              </p>
            </div>
          </div>

          <div className="bg-stone-100 border border-stone-300 rounded-lg p-4">
            <p className="text-stone-800 text-sm leading-relaxed">
              <strong>Share-out:</strong> A few people share. Did anyone discover they were solving the wrong problem? Did anyone need to narrow their scope? Any questions?
            </p>
          </div>
        </details>
        </details>{/* close Part 1 */}

        <hr className="border-stone-300 mb-12" />

        {/* Part 2: Hilary Demos */}
        <details id="part2" className="mb-12">
          <summary className="text-2xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">Part 2: Hilary Demos <span className="text-stone-400 text-sm font-normal ml-2">25 min</span></summary>

          {/* Demo 1 */}
          <details className="mb-8 ml-1">
            <summary className="text-xl font-bold text-stone-800 mb-3 cursor-pointer hover:text-stone-600 transition-colors">Using Skills to Give Feedback</summary>
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-500 text-sm mb-4">Where this can go when you invest in tuning a tool over time</p>
            <ol className="text-stone-800 text-sm leading-relaxed space-y-2 list-decimal list-inside mb-4">
              <li>Hilary pastes a student's homework into Claude Code and runs <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/toolscopefeedback</code></li>
              <li>The AI drafts personalized feedback in seconds</li>
              <li>She edits the draft - adjusting tone, adding nuance, cutting what's off</li>
              <li>She sends the final version to the student</li>
              <li>She sends the final version back to Claude Code so it can learn from the delta between its draft and her edit</li>
            </ol>
            <div className="bg-stone-100 border-l-4 border-stone-400 p-4 mb-4">
              <p className="text-stone-800 text-sm leading-relaxed">
                <strong>How this was built:</strong> Hilary fed Claude all her course materials, then had it draft feedback for the first five students. For each one, she edited the draft and sent the corrected version back. After each round, Claude updated its approach based on what she changed. By student six, the drafts were close enough to just edit. Then she said: "Turn what you've learned into a reusable skill" - and that became the prompt below.
              </p>
            </div>
            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              <strong>The point:</strong> She still reads and edits every piece of feedback before it goes out. The goal isn't full automation - it's getting the AI close enough that the job is editing, not writing from scratch.
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                View the full skill prompt
              </summary>
              <div className="px-4 py-4 relative">
                <div className="flex justify-end mb-2">
                  <CopyButton getText={() => `# Tool Scoping Feedback Skill\n\nDraft feedback on a student's Tool Scoping Worksheet.\n\n## Context\n\nStudents completed a Tool Scoping Worksheet where they described a Custom GPT they want to build to give their team feedback. The worksheet asks:\n- The feedback they keep giving over and over\n- What kind of work they give it on\n- Who they give it to\n- When the person would reach for this Custom GPT\n- The steps the GPT would walk through\n- What "good" looks like (evaluation criteria)\n\nThe goal of the tool is to give feedback the way the manager would, so the manager isn't the bottleneck.\n\n## How to Draft Feedback\n\n### Step 1: Understand what they're building\nTranslate the tool into plain language. What does it actually do, who uses it, and why?\nIdentify what type of tool this is - or more often, what combination:\n- Evaluator: Takes finished work and checks it against criteria. Pass/fail.\n- Coach: Walks someone through the thinking process. Asks questions, helps them improve.\n- Automation: Just does the work. No evaluation, no coaching.\n\n### Step 2: Challenge the problem framing\nDon't take the stated problem at face value. The student describes their pain, but that's the symptom. What's the underlying cause? When the problem could be read multiple ways, name the 2-3 most likely interpretations.\n\n### Step 3: Separate whose problem this is\nFlip from the manager's frustration to the user's experience. What's their emotional state? If the task feels like a chore, a tool that adds more work won't get used.\n\n### Step 4: Apply the 10x rule\nWould getting 10x better at this make someone meaningfully better at their job? If yes, coach them. If no, just do it for them.\n\n### Step 5: Check the scope\nToo many formats? Too many dimensions? Too many audiences? Pick one, get it working, then expand.\n\n### Step 6: Check whether the criteria match the real bar\nFormal criteria often don't match what people actually evaluate in their head.\n\n### Step 7: Fix the evaluation approach\nUse pass/fail instead of numeric scores.\n\n### Step 8: Design for the user's experience\nDon't give people a blank page. Sequence steps rather than evaluating everything at once.\n\n### Step 9: Think about what the AI needs to succeed\nReference data goes in the prompt or knowledge base. If the domain is well-known, the AI already has strong intuitions.\n\n### Step 10: Tone and framing\nLead with what's strong. Frame suggestions as evolution, not correction. Be direct but not harsh. Be generous about what AI can do.`} />
                </div>
                <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{`Step 1: Understand what they're building
Translate the tool into plain language. What does it actually do, who uses it, and why? Identify what type of tool this is - or more often, what combination:
- Evaluator: Takes finished work and checks it against criteria. Pass/fail.
- Coach: Walks someone through the thinking process. Asks questions, helps them improve.
- Automation: Just does the work. No evaluation, no coaching.

Step 2: Challenge the problem framing
Don't take the stated problem at face value. The student describes their pain ("I keep giving this feedback"), but that's the symptom. What's the underlying cause? When the problem could be read multiple ways, name the 2-3 most likely interpretations.

Step 3: Separate whose problem this is
Flip from the manager's frustration to the user's experience. What's their emotional state when they reach for this tool? If the task feels like a chore, a tool that adds more work won't get used.

Step 4: Apply the 10x rule
Would getting 10x better at this make someone meaningfully better at their job? If yes, coach them. If no, just do it for them. The best tools do both: save time on the tedious stuff AND build skill on the important stuff.

Step 5: Check the scope
Too many formats? Too many dimensions? Too many audiences? Pick one, get it working, then expand.

Step 6: Check whether the criteria match the real bar
Formal criteria often don't match what people actually evaluate in their head. The instinctive answer is usually more useful.

Step 7: Fix the evaluation approach
Numeric scores create false precision. Use pass/fail instead.

Step 8: Design for the user's experience
Don't give people a blank page - give them something to react to. Sequence steps rather than evaluating everything at once. Lead with corrections, not evaluation.

Step 9: Think about what the AI needs to succeed
Reference data goes in the prompt or knowledge base. If the domain is well-known, the AI already has strong intuitions. If someone can't articulate criteria, feed it 3-6 examples and let it identify patterns.

Step 10: Tone and framing
Lead with what's strong. Frame suggestions as evolution, not correction. Be direct but not harsh. Be generous about what AI can do.`}</pre>
              </div>
            </details>
          </div>

          </details>{/* close Demo 1 sub-section */}

          {/* Demo 2 */}
          <details className="mb-8 ml-1">
            <summary className="text-xl font-bold text-stone-800 mb-3 cursor-pointer hover:text-stone-600 transition-colors">Iterating on Custom GPT Prompts</summary>
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-500 text-sm mb-4">The same skill, applied to what you're building today</p>
            <p className="text-stone-800 text-sm leading-relaxed mb-4">
              Hilary wants to improve the prompt for her Executive Editor GPT. She opens three windows:
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">A</span>
                <div>
                  <p className="text-stone-800 text-sm font-bold">GPT Editor</p>
                  <p className="text-stone-600 text-xs">The configuration screen where you paste the system prompt</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex-shrink-0">B</span>
                <div>
                  <p className="text-stone-800 text-sm font-bold">Your Custom GPT</p>
                  <p className="text-stone-600 text-xs">A conversation with the actual GPT you're testing - feed it real work and see what comes back</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex-shrink-0">C</span>
                <div>
                  <p className="text-stone-800 text-sm font-bold">Regular ChatGPT conversation</p>
                  <p className="text-stone-600 text-xs">A normal chat (not the GPT) where you work on improving the prompt</p>
                </div>
              </div>
            </div>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              The loop:
            </p>
            <ol className="text-stone-800 text-sm leading-relaxed space-y-3 list-decimal list-inside">
              <li>Go to <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">A</span> <span className="text-blue-700 font-semibold">GPT Editor</span> and copy the system prompt from your GPT</li>
              <li>Paste it into <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> <span className="text-emerald-700 font-semibold">Regular ChatGPT</span> and say: "This is the system prompt for a Custom GPT I'm working on. It's not quite doing what I want. I'm going to test it and give you feedback, and I want you to rewrite the prompt to address my feedback."</li>
              <li>Go to <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">B</span> <span className="text-amber-700 font-semibold">Your Custom GPT</span> and feed it a real piece of work - paste in an actual email, report, or whatever your GPT is designed to handle</li>
              <li>Read the output. What did it get right? What's off? Be specific - "it's too lenient on the opening" or "it missed that the tone is wrong for this audience"</li>
              <li>Go back to <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> <span className="text-emerald-700 font-semibold">Regular ChatGPT</span> and tell it what was off. Two ways to do this: voice-type your feedback ("it was too nice about the opening, I would have pushed back harder"), or rewrite the output the way you'd want it, paste both the GPT's version and yours, and say "here's what it gave me and here's what I would have said - update the prompt to close that gap"</li>
              <li><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> <span className="text-emerald-700 font-semibold">Regular ChatGPT</span> gives you a revised prompt. Copy it.</li>
              <li>Paste the revised prompt into <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">A</span> <span className="text-blue-700 font-semibold">GPT Editor</span> (replacing the old one)</li>
              <li>Test again in <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">B</span> <span className="text-amber-700 font-semibold">Your Custom GPT</span> with the same input or a new one. Keep going until happy.</li>
            </ol>
          </div>
          </details>{/* close Demo 2 sub-section */}
        </details>{/* close Part 2 */}

        <hr className="border-stone-300 mb-12" />

        {/* Part 3: Test and Improve */}
        <details id="part3" className="mb-12">
          <summary className="text-2xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">Part 3: Your Turn - Test and Improve Your Tool <span className="text-stone-400 text-sm font-normal ml-2">35 min</span></summary>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Now it's your turn. Open three windows just like the demo and run 2-3 rounds of the loop on your own tool. Aim to get through at least two full cycles of test → feedback → updated prompt.
          </p>

          {/* If scope changed */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">If your scope changed: Start fresh</p>
            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              If Part 1 made you rethink your tool, start by telling <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> about your revised scope. Use this prompt to get a new system prompt, then paste it into your {setup.toolName} editor <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">A</span> and start testing.
            </p>
            <div className="bg-rose-50 border-l-4 border-rose-300 p-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `I'm rebuilding a ${setup.toolName} I started last week. I want to start over with a clearer scope.\n\nThe problem this solves for the person using it: [describe the user's problem, not yours]\n\nWho will use it: [role/team]\n\nThey'd reach for it when: [specific trigger moment]\n\nWhat the tool needs to do:\n- [Does it evaluate something? What criteria?]\n- [Does it coach/teach? What skill or process?]\n- [Does it generate something? From what inputs?]\n\nWrite me a system prompt for this. Make any success criteria pass/fail, not scored.`} />
              </div>
              <p className="text-stone-800 text-sm font-mono leading-relaxed">
                "I'm rebuilding a {setup.toolName} I started last week. I want to start over with a clearer scope.
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                The problem this solves for the person using it: <span className="bg-rose-200 px-1">[describe the user's problem, not yours]</span>
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                Who will use it: <span className="bg-rose-200 px-1">[role/team]</span>
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                They'd reach for it when: <span className="bg-rose-200 px-1">[specific trigger moment]</span>
              </p>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                What the tool needs to do:
              </p>
              <ul className="text-stone-800 text-sm font-mono leading-relaxed mt-1 list-disc list-inside">
                <li><span className="bg-rose-200 px-1">[Does it evaluate something? What criteria?]</span></li>
                <li><span className="bg-rose-200 px-1">[Does it coach/teach? What skill or process?]</span></li>
                <li><span className="bg-rose-200 px-1">[Does it generate something? From what inputs?]</span></li>
              </ul>
              <p className="text-stone-800 text-sm font-mono leading-relaxed mt-2">
                Write me a system prompt for this. Make any success criteria pass/fail, not scored."
              </p>
            </div>
          </div>

          {/* The testing loop */}
          <div className="bg-white border-2 border-stone-300 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-lg font-bold mb-3">The testing loop</p>
            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Whether you're starting fresh or improving your existing prompt, the process is the same. Open three windows:
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex-shrink-0">A</span>
                <p className="text-stone-800 text-sm"><strong>{setup.toolName} Editor</strong> - where you paste the system prompt</p>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg bg-amber-50 border border-amber-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] font-bold flex-shrink-0">B</span>
                <p className="text-stone-800 text-sm"><strong>Your {setup.toolName}</strong> - where you test it with real work</p>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex-shrink-0">C</span>
                <p className="text-stone-800 text-sm"><strong>Regular {platformLabels[platform]} conversation</strong> - where you work on improving the prompt</p>
              </div>
            </div>

            <p className="text-stone-800 text-sm leading-relaxed mb-3">
              Then run this loop 2-3 times:
            </p>
            <ol className="text-stone-800 text-sm leading-relaxed space-y-3 list-decimal list-inside">
              <li>Go to <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">A</span> <span className="text-blue-700 font-semibold">{setup.toolName} Editor</span> and copy the system prompt</li>
              <li>Paste it into <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> <span className="text-emerald-700 font-semibold">Regular {platformLabels[platform]}</span> and say: "This is the system prompt for a {setup.toolName} I'm working on. It's not quite doing what I want. I'm going to test it and give you feedback, and I want you to rewrite the prompt to address my feedback."</li>
              <li>Feed a real piece of work into <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">B</span> <span className="text-amber-700 font-semibold">Your {setup.toolName}</span></li>
              <li>Read the output. What's right? What's off?</li>
              <li>Go to <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> <span className="text-emerald-700 font-semibold">Regular {platformLabels[platform]}</span> and tell it what to fix. Voice-type your feedback, or rewrite the output yourself and paste both versions so it can see the gap.</li>
              <li>Copy the revised prompt from <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">C</span> <span className="text-emerald-700 font-semibold">Regular {platformLabels[platform]}</span> into <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">A</span> <span className="text-blue-700 font-semibold">{setup.toolName} Editor</span></li>
              <li>Test again in <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold align-text-bottom mx-0.5">B</span> <span className="text-amber-700 font-semibold">Your {setup.toolName}</span>. Repeat.</li>
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
              <div>
                <p className="text-stone-800 text-sm font-bold mb-1">Your criteria use scores instead of pass/fail</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  AI gives inconsistent scores on subjective criteria - run the same input three times, get three different numbers. Convert to pass/fail. You don't care if something is a 7 or an 8. You care if it meets the bar.
                </p>
              </div>
            </div>
          </details>
        </details>

        <hr className="border-stone-300 mb-12" />

        {/* Part 4: Deploy It */}
        <details id="part4" className="mb-12">
          <summary className="text-2xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">Part 4: Socializing AI Tools with Your Team <span className="text-stone-400 text-sm font-normal ml-2">15 min</span></summary>
          <p className="text-stone-800 text-base leading-relaxed mb-2 italic text-stone-500">
            You've got a working tool. Now let's talk about getting other people to actually use it.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            Start with one beta tester - ideally someone you can watch use it (a 1:1 is a great opportunity). Here's how to frame it.
          </p>

          {/* Deploy slides */}
          <div className="relative">
            <div className="bg-white border-2 border-stone-300 rounded-lg p-6 min-h-[240px] flex flex-col">
              <p className="text-lg font-bold text-stone-800 mb-2">
                {deploySlides[currentDeploySlide].title}
              </p>
              <p className="text-stone-800 text-base leading-relaxed mb-4">
                {deploySlides[currentDeploySlide].body}
              </p>
              <div className="bg-stone-50 border-l-4 border-stone-300 p-4 mt-auto">
                <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-1">Example</p>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  {deploySlides[currentDeploySlide].example}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentDeploySlide((prev) => (prev === 0 ? deploySlides.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white border-2 border-stone-300 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:border-stone-400 transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentDeploySlide((prev) => (prev === deploySlides.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white border-2 border-stone-300 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:border-stone-400 transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {deploySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDeploySlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentDeploySlide === index ? 'bg-stone-800' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </details>

        <hr className="border-stone-300 mb-12" />

        {/* Part 5: Session Takeaways */}
        <details id="takeaways" className="mb-12">
          <summary className="text-2xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">Part 5: Session Takeaways <span className="text-stone-400 text-sm font-normal ml-2">10 min</span></summary>

        {(() => {
          const takeaways = [
            {
              title: "The hard part is teaching AI what good looks like",
              bullets: [
                "Building a Custom GPT takes five minutes. Getting it to produce work you'd actually send? That's the skill.",
                "It means looking at output, figuring out what's off, and telling the AI specifically enough that it fixes it.",
                "This is the same thing you do when you coach a new hire. The difference is the AI won't remember on its own. Your prompt has to.",
              ],
            },
            {
              title: "One tool, one problem, one moment",
              bullets: [
                "Most first drafts try to do too much. Three formats, five criteria, two audiences.",
                "A tool that tries to do three things does none of them well.",
                "Pick the one problem that costs you the most time. Get that working. Expand later.",
              ],
            },
            {
              title: "Use pass/fail, not scores",
              bullets: [
                "Numeric rubrics feel rigorous, but AI gives different scores every time you run them.",
                "You don't actually care if something is a 7 or an 8. You care if it passes.",
                "Pass/fail is clearer for you and more actionable for the person using the tool.",
              ],
            },
            {
              title: "These skills go way beyond Custom GPTs",
              bullets: [
                "Scoping a problem. Defining what 'good' looks like. Iterating until the output meets your bar.",
                "These are the exact same skills you'll use to build agents, automations, and workflows.",
                "The technology will keep changing. This part stays the same. It's a management skill now.",
              ],
            },
          ];
          return (
              <div className="mb-8">
              <div className="relative">
                <div className="bg-white border-2 border-stone-300 rounded-lg p-6 min-h-[200px] flex flex-col">
                  <p className="text-lg font-bold text-stone-800 mb-3">
                    {takeaways[currentTakeaway].title}
                  </p>
                  <ul className="space-y-2 text-stone-700 text-base leading-relaxed">
                    {takeaways[currentTakeaway].bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-stone-400 mt-1 flex-shrink-0">-</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentTakeaway((currentTakeaway - 1 + takeaways.length) % takeaways.length)}
                      className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <span className="text-stone-400 text-sm">{currentTakeaway + 1} / {takeaways.length}</span>
                    <button
                      onClick={() => setCurrentTakeaway((currentTakeaway + 1) % takeaways.length)}
                      className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
              </div>
          );
        })()}

          {/* Before Next Session */}
          <details className="mb-4 ml-1">
            <summary className="text-xl font-bold text-stone-800 mb-4 cursor-pointer hover:text-stone-600 transition-colors">Before Next Session</summary>
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
          </details>
        </details>

        <hr className="border-stone-300 mb-12" />

        {/* Feedback CTA */}
        <div className="mb-16 bg-white border-2 border-stone-300 rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="w-48 h-64 rounded-lg rotate-[-2deg] overflow-hidden">
                <img
                  src="/liberty-hilary.jpg"
                  alt="Little Hilary dressed as the Statue of Liberty"
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">This is Give-Me-Your-Feedback Hilary.</h2>
              <p className="text-stone-600 text-base leading-relaxed mb-3">
                She's lifting her lamp beside the golden door of continuous improvement, and also she wants to know how this week went.
              </p>
              <p className="text-stone-600 text-base leading-relaxed mb-4">
                Your feedback shapes next week's session + any bonus material I add. It takes 2 minutes.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc0R_h_MGtBnRPuWAfjGeP_gqp4fwgS-nkymbpABvqbcg9xVw/viewform?usp=sharing&ouid=100440248598657496855"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition-colors"
              >
                Give your tired, your poor feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Session2;
