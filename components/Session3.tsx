import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors z-10" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <img src={src} alt={alt} className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
    </div>
  );
}

function ClickableImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img src={src} alt={alt} className={`${className || ''} cursor-pointer hover:opacity-90 transition-opacity`} onClick={() => setOpen(true)} />
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

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

const evaluatorPrompt = `Deck Evaluator

You review presentation decks and flag basic quality issues before they reach a manager
or client. You're not evaluating whether the strategy is right or the recommendations
are smart - that's the manager's job. You're catching the stuff that shouldn't make it
to that conversation in the first place.

Criteria

1. Purpose and Structure
Evaluates whether the deck has a clear goal and whether every slide builds toward that
goal in a logical order.
Pass: A reader could look at the first two slides and write down what this deck is
trying to convince them of or inform them about, and they'd be right. Every subsequent
slide clearly follows from the one before it - there's no moment where you think "wait,
why are we talking about this now?"

2. The "So What"
Evaluates whether each individual slide makes a specific, identifiable point rather than
just presenting a topic or a collection of information.
Pass: You could cover up everything on the slide except the title and still know what
the slide is arguing. The title should make a claim, not name a category. Examples of
topics vs. points:

"Q3 Revenue" -> "Q3 revenue fell 18% as enterprise deals slipped due to a 45-day
increase in average sales cycle"
"Market Opportunity" -> "The mid-market segment is underserved by incumbents,
representing a $2.3B gap we can enter at current margins"
"Engineering Headcount" -> "Engineering is at 82% capacity against committed roadmap,
putting the Q1 launch at risk without 4 additional hires"
"Customer Feedback" -> "Three of our five largest accounts cited onboarding friction as
their top reason for delayed expansion"
"User Research Findings" -> "Users abandon the setup flow at step 3 because the
permissions screen offers no explanation of why access is needed"
"Competitive Landscape" -> "Competitors have closed our lead on core features; our
remaining differentiation is integration depth, which only 40% of users currently
activate"

Every slide title should read like the second version.

3. Evidence
Evaluates whether claims made on each slide are supported by specific evidence on that
same slide, and whether that evidence is presented honestly relative to its source and
scope.
Pass: For every claim on the slide, you can point to the specific data point, quote,
example, or comparison on that same slide that supports it. Evidence might be
quantitative (revenue data, NPS scores, conversion metrics, task completion rates,
budget figures) or qualitative (customer quotes, usability session observations, case
studies, team retrospectives, sales call excerpts) - both count, but the source and
scope should be clear. If a finding comes from four customer interviews, it shouldn't
read like it came from a market-wide survey. If a usability finding comes from five
moderated sessions with power users, don't present it as representative of all segments.
If a competitive claim is based on one analyst report, say so.

4. Signal to Noise
Evaluates whether every element on each slide is doing necessary work, or whether the
audience has to dig through excess content to find the point.
Pass: You could not remove a single bullet, chart, or text block from any slide without
losing something the audience needs. And no slide requires the audience to wade through
a paragraph to find the one sentence that matters. Note: necessary context - competitive
dynamics, regulatory constraints, cross-functional dependencies, methodological
limitations, board-level risk factors - is not noise. The test is whether each element
is earning its place, not whether the slide is short.
For each slide, ask: is there more text here than the audience can realistically absorb?
Could any sentence be cut or tightened without losing the point? If a slide reads more
like a document paragraph than a presentation slide, it fails - even if every word is
technically relevant.

5. No Obvious Errors
Evaluates whether the deck contains mistakes that undermine trust in the work - wrong
numbers, contradictory logic, or content that's clearly left over from a different
project.
Pass: Numbers that appear on more than one slide match. Nothing in the recommendations
contradicts the analysis that came before it. No slide contains content that looks like
it belongs to a different deck, a different client, or an earlier draft. Nothing that
would make a board member, investor, or client question whether the team was paying
attention.
When reviewing, actively cross-reference specific numbers, statistics, and names across
all slides. For example, if slide 3 says the company operates in 12 markets and slide 9
references 15 markets, flag it. If the executive summary claims 40% YoY growth but the
financials slide shows 34%, flag it. If the methodology slide says 12 interviews were
conducted but the findings slide references quotes from 15 participants, flag it. Don't
assume discrepancies are intentional.

Instructions
The user will upload a deck or a single slide. Review it against all five criteria, then
respond in this order:
1. Overall score: PASS or FAIL.
2. Criteria breakdown. List all five criteria with a pass or fail for each. To pass
   overall, the deck must pass all five.
3. For every failed criterion: Call out the specific failure points - which slides, which
   elements. For each failure point, provide a specific recommendation for how to fix it
   and explain why it matters. Be concrete.

If the deck passes all five, say so. Don't manufacture issues.

Tone: Direct and specific, not vague. Constructive - you're coaching, not grading. Don't
soften feedback so much that the point gets lost.`;

const exampleSpec = `I want to build a web page that helps my team make better
presentation slides. It's a resource page they'd bookmark and
come back to before any important presentation.

IMPORTANT: Keep the design minimal - think wireframe. No fancy
styling, no hero images, no color themes. Plain backgrounds,
simple fonts, basic layout. I want to get the functionality
right first and layer in the visual design later. If it looks
like a prototype, that's perfect.

The page has three sections:

SECTION 1: REFERENCE - WHAT GOOD LOOKS LIKE
Start with a pass/fail checklist at the top. This is what
someone runs through before presenting. Each item maps to a
specific evaluation criterion:

1. Purpose and Structure - Could someone look at your first
   two slides and write down what this deck is trying to
   convince them of? Does every slide follow logically from
   the one before it?
2. The "So What" - Does every slide title state a claim, not
   a topic? ("Q3 Revenue" fails. "Q3 revenue fell 18% as
   enterprise deals slipped" passes.)
3. Evidence - For every claim on each slide, can you point to
   specific data, a quote, or an example on that same slide
   that supports it? Is the source and scope honest?
4. Signal to Noise - Could you remove any bullet, chart, or
   text block without losing something the audience needs? Does
   any slide read more like a document paragraph than a
   presentation slide?
5. No Obvious Errors - Do numbers match across slides? Do the
   recommendations follow from the analysis? Is there anything
   left over from a different draft or project?

Below the checklist, show examples. Each example should look
like an actual slide - not bullet points about a slide, but a
visual representation of the slide itself. Show a bad version
and a good version side by side for each criterion you can
illustrate:

- Example 1 (The "So What"): A slide with a vague topic title
  vs. a slide with a clear takeaway title. The bad slide has
  "User Engagement Trends" as the title with an ambiguous chart.
  The good slide has "Monthly active users dropped 15% after
  the onboarding flow change" with the same data visualized to
  support that specific conclusion.
- Example 2 (Evidence): A slide that makes a claim with no
  supporting data vs. a slide where the evidence is right there.
- Example 3 (Signal to Noise): A cluttered slide with too much
  text vs. a clean slide where everything earns its place.

Use collapsible sections for the examples so the checklist
stays prominent at the top.

SECTION 2: GET FEEDBACK
This section is for evaluating entire presentation decks, not
individual slides.

The section should say: "Ready to test your deck? Open the
evaluator below, upload your full presentation, and get
specific feedback against each criterion above."

Include a prominent button that opens this URL in a new tab:
https://chatgpt.com/g/g-69c1437bc1c481919110c5ef3e8930a7-supermanager-first-pass-deck-reviewer

Below the button, add a note: "The evaluator will review your
entire deck against each criterion and tell you exactly what's
working and what needs to change. Come back here when you have
your feedback."

SECTION 3: TRACK YOUR PROGRESS
A form where someone can log their work after getting feedback.
Fields:
- Name (text input)
- Paste your feedback here (large text area - this is where
  they paste the feedback from the evaluator)
- Add your original deck from Google Drive (Google Drive file
  picker, not a local file upload)
- Add your revised deck from Google Drive (Google Drive file
  picker)
- Any notes (optional text area)
- Submit button

After submission, show a confirmation: "Logged! Your manager
can see your progress over time. Keep going."

OVERALL DESIGN
Keep it minimal and functional. No styling beyond basic layout.
We'll add branding and visual design as a separate step once
the functionality is working.`;

const goingFurtherPrompt = `Replace the "Get Feedback" section. Instead of linking to an
external GPT, add an upload area where users can upload their
deck as a PDF. Add a "Your name" field above the upload area
so submissions are attributed.

When they upload, send the PDF to the Claude API with the
evaluation prompt I've attached. The prompt evaluates decks
against five criteria: Purpose and Structure, The "So What",
Evidence, Signal to Noise, and No Obvious Errors.

Display the feedback inline on the page - pass or fail on each
criterion, with specific notes on what to fix. Match the visual
style of the rest of the page.

Then automatically log everything to the Google Sheet: who
submitted (their name from the form), the date, and the full
feedback the evaluator returned. The user shouldn't have to do
anything extra - submitting the deck triggers both the feedback
and the logging.

Replace Section 3 (Track Your Progress) - tracking is now
handled automatically when someone submits a deck, so the
manual form is no longer needed.`;

const Session3: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
          &larr; Back
        </Link>

        <div className="mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Build and Deploy a Team Resource Page
          </h1>

          <div className="mt-6 space-y-4">
            <p className="text-stone-700 text-sm leading-relaxed">
              In Sessions 1 and 2, you built Custom GPTs - tools where someone types something in and the AI talks back. That's powerful, but it's still a conversation. Today we're going beyond that.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed">
              A coding agent like <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Lovable</a> writes code for you. You describe what you want in plain English - the same skill you've been practicing - and it builds real apps, pages, and tools. What does that unlock?
            </p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-3 list-disc list-inside">
              <li><strong>Experiences, not just conversations.</strong> A page that walks someone through a checklist, shows them examples, and guides them step by step - instead of a blank chat window where they have to know what to type.</li>
              <li><strong>Tools that take action.</strong> Instead of AI just giving feedback in a conversation that disappears, it can save data to a Google Sheet, log who submitted what, and build a record you can actually use as a manager.</li>
              <li><strong>Workflows that plug into how your team works.</strong> Connect your tool to the apps your team already uses - Sheets, Notion, email - so the output goes somewhere useful, not just a chat window.</li>
            </ul>
            <p className="text-stone-700 text-sm leading-relaxed">
              There's a big spectrum of how technical you can make these. You can build something very usable even without connecting a bunch of apps - maybe there's a copy-paste step, and that's a perfectly good v1 to see if people actually use it. Then if they do, you invest in getting the connections in place. If you need permissions, get them. If you need technical help, get it. Start simple, prove it works, then make it smoother.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed font-medium">
              Today we're all building the same thing together so you can see the full process end to end. After the session, you can use what you learn here to build whatever your team needs.
            </p>
          </div>

          <p className="text-stone-500 text-sm mt-4">
            <strong>Tool:</strong> <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Lovable</a> (free tier works for everything in this guide) &middot; <strong>Time:</strong> ~2 hours. You'll leave today with a live URL.
          </p>
        </div>

        {/* Agenda */}
        <div className="mb-8 bg-white border border-stone-200 rounded-lg p-5">
          <p className="text-sm font-bold text-stone-800 mb-3">Today's agenda</p>
          <ol className="text-sm text-stone-600 space-y-1.5 list-decimal list-inside mb-4">
            <li><a href="#step1" className="hover:text-stone-800 hover:underline">See the Finished Version</a> <span className="text-stone-400">- Hilary demos</span></li>
            <li><a href="#step2" className="hover:text-stone-800 hover:underline">Try the Unspecified Version</a></li>
            <li><a href="#step3" className="hover:text-stone-800 hover:underline">Write the Spec</a></li>
            <li><a href="#step4" className="hover:text-stone-800 hover:underline">Build It</a></li>
            <li><a href="#step5" className="hover:text-stone-800 hover:underline">Refine Layout and Functionality</a></li>
            <li><a href="#step6" className="hover:text-stone-800 hover:underline">Set the Visual Style</a></li>
            <li><a href="#step7" className="hover:text-stone-800 hover:underline">Set Up the Backend Tracking</a></li>
            <li><a href="#step8" className="hover:text-stone-800 hover:underline">Deploy</a></li>
            <li><a href="#going-further" className="hover:text-stone-800 hover:underline">Bring the AI Into the Tool</a></li>
            <li><a href="#step10" className="hover:text-stone-800 hover:underline">Redeploy</a></li>
          </ol>
          <div className="border-t border-stone-200 pt-4">
            <p className="text-sm text-stone-500 leading-relaxed">
              <a href="#next-steps" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Next Steps</a> &middot; <a href="#building-your-own" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Building Your Own Version</a>
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* See the Finished Versions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">What We're Building</h2>
          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              A tool where your team can upload a presentation deck, get it evaluated against specific criteria you've defined, and receive pass/fail feedback with concrete suggestions for what to fix. Every submission and its feedback get automatically logged to a <a href="https://docs.google.com/spreadsheets/d/1NBwcOnmNkt2o5QBRPABIu6jWELZRCgYzfMA7Q_dD0l8/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Google Sheet</a> - so as a manager, you have a running record of every deck your team has run through the tool and what they were told to improve.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">Here are the two versions we'll build today:</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li><strong><a href="https://deck-doctor-lite.lovable.app" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Deck Doctor Lite</a></strong> - The version everyone builds during the session. Links to a Custom GPT for feedback, with a manual progress tracker.</li>
              <li><strong><a href="https://deck-chef.lovable.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Deck Chef</a></strong> - The upgraded version with AI built in. Feedback happens right on the page and gets logged to the <a href="https://docs.google.com/spreadsheets/d/1NBwcOnmNkt2o5QBRPABIu6jWELZRCgYzfMA7Q_dD0l8/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Google Sheet</a> automatically. Try uploading a deck and check the sheet to see it appear.</li>
            </ul>

            <details className="border border-stone-300 rounded-lg overflow-hidden mt-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what Deck Chef looks like after a deck has been submitted
              </summary>
              <div className="p-4">
                <ClickableImage src="/deck-chef-submitted.png" alt="Deck Chef with submitted deck feedback" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  The tool evaluated the deck against all five criteria, showed pass/fail for each one with specific feedback, and logged everything to the <a href="https://docs.google.com/spreadsheets/d/1NBwcOnmNkt2o5QBRPABIu6jWELZRCgYzfMA7Q_dD0l8/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Google Sheet</a>. Try it yourself at <a href="https://deck-chef.lovable.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">deck-chef.lovable.app</a>.
                </p>
              </div>
            </details>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Before You Start */}
        <div id="before-you-start" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Before You Start</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-800 text-sm font-bold mb-3">You'll need:</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>A free Lovable account (sign up at <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">lovable.dev</a>)</li>
              <li>Access to the Slide Evaluator Custom GPT (<a href="https://chatgpt.com/g/g-69c1437bc1c481919110c5ef3e8930a7-supermanager-first-pass-deck-reviewer" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">use it here</a>)</li>
            </ul>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 1: See the Finished Version */}
        <div id="step1" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 1: See the Finished Version</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Hilary demos a fully working version of what you're building today. This is the end state - watch what it does:
            </p>
            <ol className="text-stone-700 text-sm leading-relaxed space-y-3 list-decimal list-inside">
              <li><strong>Reference section</strong> - Good vs. bad slide examples, side by side, with breakdowns and a checklist</li>
              <li><strong>Feedback section</strong> - Upload a slide, get pass/fail feedback against the criteria right on the page (this version uses an API connection - yours will link to a Custom GPT instead, which we'll talk about)</li>
              <li><strong>Progress tracker</strong> - Every evaluation gets logged to a Google Sheet. As a manager, you can see who's using the tool, what feedback they're getting, and whether slides are improving over time</li>
            </ol>
            <div className="bg-stone-50 border-l-4 border-stone-400 p-4 mt-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                This is where you're headed. By the end of today, you'll have a working version built and deployed as a live URL.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 2: Try the Unspecified Version */}
        <div id="step2" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 2: Try the Unspecified Version</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Before we build it the right way, let's see what happens when you don't spec it.
            </p>
            <ol className="text-stone-700 text-sm leading-relaxed space-y-2 list-decimal list-inside mb-4">
              <li>Open <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">lovable.dev</a> and start a new project</li>
              <li>Type something vague: "Build me a page that teaches my team how to make better slides"</li>
              <li>Let it generate. Look at what you got.</li>
            </ol>

            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Here's what that produces: <strong><a href="https://unspecified-deck-chef.lovable.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Unspecified Deck Chef</a></strong> - click through and look at it.
            </p>

            <p className="text-stone-700 text-sm leading-relaxed">
              It probably made a generic tips page - "use less text," "pick a good font," "tell a story with data." Looks polished. Totally useless. Nothing specific to your team's actual problems. No way to get feedback. No way to track progress. It's a poster, not a tool.
            </p>

            <p className="text-stone-700 text-sm leading-relaxed mt-4">
              This is the same lesson from Sessions 1 and 2: the quality of the output is determined by the quality of the input. A vague prompt gives you something that looks like a tool but doesn't work like one.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mt-2 font-bold">
              Now let's do it for real.
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 3: Write the Spec */}
        <div id="step3" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 3: Write the Spec</h2>

          <p className="text-stone-700 text-sm leading-relaxed mb-6">
            Describe the whole thing upfront so the AI knows what it's building. All three sections, fully specified, in one prompt.
          </p>

          {/* For today's session */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-bold text-stone-800 mb-3">The spec</h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              During the session, we'll all use the same spec so everyone's building the same thing and we can move fast. Follow along with the same spec.
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                View the full spec (click to expand)
              </summary>
              <div className="relative bg-stone-50 p-4">
                <div className="flex justify-end mb-2">
                  <CopyButton getText={() => exampleSpec} />
                </div>
                <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{exampleSpec}</pre>
              </div>
            </details>

            <div className="mt-4 space-y-3">
              <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
                <p className="text-stone-700 text-sm leading-relaxed">
                  <strong>Why wireframe first?</strong> You'll notice the spec says to keep it minimal. That's on purpose. If you ask for functionality and visual design at the same time, you end up debugging both at once - is the form broken, or is the CSS just hiding the button? Get everything working first, then make it look good. One thing at a time.
                </p>
              </div>
              <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
                <p className="text-stone-700 text-sm leading-relaxed">
                  <strong>After the session,</strong> you can use this same process to build a page for whatever your team actually needs - sales emails, research briefs, project updates. Just swap in your own criteria and examples. For today, follow along with the slide example so we can focus on learning the tool.
                </p>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 4: Build It */}
        <div id="step4" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 4: Build It</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <ol className="text-stone-700 text-sm leading-relaxed space-y-2 list-decimal list-inside mb-4">
              <li>Open <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">lovable.dev</a> and start a <strong>new</strong> project (don't use the bad version from Step 2)</li>
              <li>Paste your full spec</li>
              <li>Let it generate</li>
              <li>Look at what you got - all three sections should be there</li>
            </ol>

            <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what pasting the spec into Lovable looks like
              </summary>
              <div className="p-4">
                <ClickableImage src="/lovable-spec-paste.png" alt="Pasting the full spec into Lovable" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  The full spec goes right into the Lovable prompt. All three sections, the wireframe instruction, everything in one paste.
                </p>
              </div>
            </details>

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4 mb-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                Compare it to the unspecified version from Step 2. Same tool, same effort, wildly different output - because the spec was clear.
              </p>
            </div>

            <details className="border border-stone-300 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what the specified version looked like
              </summary>
              <div className="p-4">
                <ClickableImage src="/specified-version.png" alt="Specified version - all three sections built from spec" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  All three sections are there: the checklist with all five criteria, collapsible examples, the feedback button linking to the evaluator, and the progress tracker form with Google Drive links. It's not pretty yet - that's on purpose. Everything works, and now we can refine it piece by piece.
                </p>
              </div>
            </details>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 5: Refine Layout and Functionality */}
        <div id="step5" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 5: Refine the Layout and Functionality</h2>

          <p className="text-stone-700 text-sm leading-relaxed mb-4">
            Now look at what Lovable built and give it specific feedback. Type your feedback in the chat panel on the left side of Lovable - that's where you talk to it, and the preview on the right updates in real time.
          </p>

          <div className="mb-6">
            <img
              src="/lovable-chat-example.png"
              alt="Screenshot showing where to give Lovable feedback in the chat panel"
              className="w-full rounded-lg border border-stone-200"
            />
            <p className="text-stone-500 text-xs mt-2">Where to give Lovable feedback</p>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed mb-6">
            This is the same skill as iterating on a Custom GPT - tell it exactly what's wrong and what you want instead. Here are the kinds of things you'll catch on a first pass:
          </p>

          {/* The checklist */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-bold text-stone-800 mb-3">The checklist</h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              The AI might build something fancier than what you need. For example, it might give you a pass/fail toggle with a check and an X for each criterion. That's overthinking it. Nobody is going to actively select "fail" on their own checklist. Tell it:
            </p>
            <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
              <p className="text-stone-700 text-sm font-mono leading-relaxed">
                "Replace the pass/fail toggles with simple checkboxes. This is a checklist someone runs through before presenting - they just check each item when they've confirmed it. No need for a fail button."
              </p>
            </div>
          </div>

          {/* The examples */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-bold text-stone-800 mb-3">The examples</h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              Look at the good vs. bad slide examples. Here's what to look for and how to fix common issues:
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-stone-800 text-sm font-bold mb-2">The examples aren't full slides.</p>
                <p className="text-stone-700 text-sm leading-relaxed mb-2">
                  If the "good" example is just a better headline with some bullet points underneath, it looks like you're teaching people to write better titles - not better slides. Each example should look like an actual slide. Tell it:
                </p>
                <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
                  <p className="text-stone-700 text-sm font-mono leading-relaxed">
                    "Each example should look like a real presentation slide, not just a headline with bullet points. Show the title, the supporting data or content, and the layout as it would actually appear in a deck."
                  </p>
                </div>
              </div>

              <div>
                <p className="text-stone-800 text-sm font-bold mb-2">The "good" version only fixes one thing.</p>
                <p className="text-stone-700 text-sm leading-relaxed mb-2">
                  If you're showing a good slide for the Evidence criterion, but the title on that slide is just a data point instead of a takeaway, it contradicts what you taught in the So What criterion. Every "good" slide should pass ALL the criteria. Tell it:
                </p>
                <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
                  <p className="text-stone-700 text-sm font-mono leading-relaxed">
                    "The good version of each example slide needs to pass all five criteria, not just the one it's highlighting. For example, the Evidence slide's title should state the takeaway ('Users like our product more as a result of this feature'), and the NPS data should appear below as the supporting evidence. A good slide that fails the So What test is confusing."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional feedback examples */}
          <details className="border border-stone-300 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
              Additional examples of feedback you could give
            </summary>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-stone-800 text-sm font-bold mb-2">On the feedback section:</p>
                <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
                  <li>"Change the button text to 'Get Feedback on Your Deck'"</li>
                  <li>Make sure the language says "deck" or "presentation" everywhere, not "slide"</li>
                  <li>"Make this sound less like a test and more like a tool - something they'd want to use, not something they're being made to use"</li>
                </ul>
              </div>
              <div>
                <p className="text-stone-800 text-sm font-bold mb-2">On the progress tracker:</p>
                <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
                  <li>"Add a date field that auto-fills with today's date"</li>
                  <li>"After someone submits, show their submission history below the form so they can see their own progress"</li>
                  <li>"Make the feedback text area bigger - people will be pasting a lot of text"</li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 6: Set the Visual Style */}
        <div id="step6" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 6: Set the Visual Style</h2>

          <p className="text-stone-700 text-sm leading-relaxed mb-6">
            Step back and look at the full page. Everything works - now make it feel like a real tool, not a prototype.
          </p>

          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-sm font-bold mb-3">Add your company's visual identity</p>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              You probably want this to look like it belongs at your company. If you have formal brand guidelines, upload those. But if you don't, here's the trick: just take a couple screenshots of your company's website and use those as the reference.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Go to your company's homepage (or any page that represents the brand well), take 1-2 screenshots, and paste them into Lovable along with this prompt:
            </p>

            <div className="relative bg-stone-50 rounded-lg border border-stone-200 p-4 mb-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `Now that the overall wireframe looks good, I want to add visual styling. Use the attached reference (the [YOUR COMPANY] homepage) as your guide to understand the visual brand identity I want this website to have. Intuit the web brand guidelines [YOUR COMPANY] uses based on these screenshots, and then apply them to this website. Be thoughtful and discerning in your approach in order to create a website that aligns with [YOUR COMPANY]'s brand. This webpage will be used by [YOUR COMPANY] employees.`} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{`Now that the overall wireframe looks good, I want to add visual styling. Use the attached reference (the [YOUR COMPANY] homepage) as your guide to understand the visual brand identity I want this website to have. Intuit the web brand guidelines [YOUR COMPANY] uses based on these screenshots, and then apply them to this website. Be thoughtful and discerning in your approach in order to create a website that aligns with [YOUR COMPANY]'s brand. This webpage will be used by [YOUR COMPANY] employees.`}</pre>
            </div>

            <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what that looks like in Lovable
              </summary>
              <div className="p-4">
                <ClickableImage src="/lovable-brand-paste.png" alt="Pasting brand reference screenshots into Lovable" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  The Dropbox homepage screenshots are attached as images in the chat, and the prompt tells Lovable to intuit the brand guidelines from them. You can see the two reference screenshots as thumbnails above the prompt.
                </p>
              </div>
            </details>

            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Lovable will pick up on the colors, typography, spacing, and overall feel from your screenshots and apply them to your page. It won't be pixel-perfect, but it'll get you 80% of the way there - and you can fine-tune from there.
            </p>

            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              The first pass might be too subtle. If the result looks like it applied the colors but still feels plain, push it:
            </p>

            <div className="relative bg-stone-50 rounded-lg border border-stone-200 p-4 mb-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `This looks too plain still. I want the website to be visually stunning and look like an expensive professional web designer made it.`} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{`This looks too plain still. I want the website to be visually stunning and look like an expensive professional web designer made it.`}</pre>
            </div>

            <details className="border border-stone-300 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what the branded version looked like after that follow-up
              </summary>
              <div className="p-4">
                <ClickableImage src="/lovable-branded-result.png" alt="Branded result after visual identity prompt" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  The Dropbox blue is in the headline, the typography is cleaner, and it feels like a real internal tool - not a prototype. One prompt for the brand reference, one follow-up to push the quality. Two messages total.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-4">
            <p className="text-stone-800 text-sm font-bold mb-3">Keep iterating</p>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              You'll probably go back and forth a few times. That's normal - this is the same iterative process as refining a Custom GPT prompt. Here's an example of a follow-up after the brand was applied but the slide examples still didn't look right:
            </p>
            <div className="relative bg-stone-50 rounded-lg border border-stone-200 p-4 mb-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `This still looks bad. These should both look like real slides, not weird mockups with placeholder. Also the colors don't fit the overall brand aesthetic. Make this look professional and actually useful for people trying to improve their slides.`} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{`This still looks bad. These should both look like real slides, not weird mockups with placeholder. Also the colors don't fit the overall brand aesthetic. Make this look professional and actually useful for people trying to improve their slides.`}</pre>
            </div>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Don't be afraid to be blunt. "This still looks bad" is more useful than "could you maybe adjust the examples slightly?" You're not hurting its feelings. Be specific about what's wrong and direct about what you want.
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Before and after: what the slide examples looked like
              </summary>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-stone-600 text-xs font-bold mb-2">BEFORE - generic mockups that don't look like real slides:</p>
                  <ClickableImage src="/slides-before.png" alt="Slide examples before iteration - generic mockups" className="rounded-lg border border-stone-200 w-full" />
                </div>
                <div>
                  <p className="text-stone-600 text-xs font-bold mb-2">AFTER - actual slides with real data and clear takeaways:</p>
                  <ClickableImage src="/slides-after.png" alt="Slide examples after iteration - real slides with data" className="rounded-lg border border-stone-200 w-full" />
                </div>
              </div>
            </details>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-800 text-sm font-bold mb-3">Other polish</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-4">
              <li>
                <strong>Tone:</strong> "Make the language less formal - this should sound like advice from a colleague, not a textbook"
              </li>
              <li>
                <strong>Layout:</strong> "The page feels too long. Can you make the reference section collapsed by default so people see the feedback section right away?"
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 7: Set Up the Backend Tracking */}
        <div id="step7" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 7: Set Up the Backend Tracking</h2>

          <p className="text-stone-700 text-sm leading-relaxed mb-6">
            Your page looks good and works - but the progress tracker form doesn't actually save anywhere yet. This step connects it to a Google Sheet so submissions get logged and you can track your team's progress over time.
          </p>
          <p className="text-stone-700 text-sm leading-relaxed mb-6">
            This gets tracking working for now. In Step 9, we'll upgrade this so the feedback and logging happen automatically.
          </p>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Instead of trying to figure out the technical setup yourself, ask Lovable to walk you through it:
            </p>

            <div className="relative bg-stone-50 rounded-lg border border-stone-200 p-4 mb-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => `When someone hits "submit" at the bottom, I want the info they filled out to get tracked in a Google Sheet. Can you walk me through how to set that up?`} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{`When someone hits "submit" at the bottom, I want the info they filled out to get tracked in a Google Sheet. Can you walk me through how to set that up?`}</pre>
            </div>

            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Lovable will give you step-by-step instructions - creating the sheet, connecting it, setting up permissions. Follow its steps. If something doesn't work, just tell it what happened and it'll troubleshoot with you.
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                If your team doesn't use Google Sheets
              </summary>
              <div className="p-4 space-y-3">
                <p className="text-stone-700 text-sm leading-relaxed">Just swap the prompt. The same approach works with other tools:</p>
                <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
                  <li><strong>Notion:</strong> "When someone hits submit, I want the info logged as a new row in a Notion database. Can you walk me through how to set that up?"</li>
                  <li><strong>Airtable:</strong> "When someone hits submit, I want the info tracked in an Airtable base. Can you walk me through how to set that up?"</li>
                  <li><strong>Email:</strong> "When someone hits submit, I want an email sent to me with their name, feedback, and links to their slides. Can you walk me through how to set that up?"</li>
                </ul>
              </div>
            </details>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-stone-800 text-sm font-bold mb-3">When things don't work (they won't on the first try)</p>
              <p className="text-stone-700 text-sm leading-relaxed mb-3">
                You will hit errors during this step. That's normal. The trick is: just tell Lovable what you're seeing and ask for help. Screenshot the error, paste it in, and say what happened. You don't need to understand the error - just show it.
              </p>
              <p className="text-stone-700 text-sm leading-relaxed mb-4">
                Here's what real troubleshooting looks like:
              </p>

              <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
                <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                  Troubleshooting examples (click to expand)
                </summary>
                <div className="p-4 space-y-4">
                  <div>
                    <p className="text-stone-600 text-xs mb-2">Screenshotting a permissions warning and asking what to do:</p>
                    <ClickableImage src="/troubleshoot-1.png" alt="Troubleshooting - screenshot of permissions warning" className="rounded-lg border border-stone-200 w-full" />
                  </div>
                  <div>
                    <p className="text-stone-600 text-xs mb-2">Telling Lovable what happened and asking if you missed a step:</p>
                    <ClickableImage src="/troubleshoot-2.png" alt="Troubleshooting - nothing landed in spreadsheet" className="rounded-lg border border-stone-200 w-full" />
                  </div>
                  <div>
                    <p className="text-stone-600 text-xs mb-2">Asking for clarification when the instructions aren't clear:</p>
                    <ClickableImage src="/troubleshoot-3.png" alt="Troubleshooting - asking where to click" className="rounded-lg border border-stone-200 w-full" />
                  </div>
                </div>
              </details>

              <p className="text-stone-700 text-sm leading-relaxed">
                You're having a conversation, not writing code. "Where exactly are you asking me to click?" is a perfectly good prompt.
              </p>
            </div>

            <div className="bg-stone-50 border-l-4 border-amber-400 p-4 mt-4 mb-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                <strong>Tip:</strong> If you don't like wrangling with the integrations directly, <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Zapier</a> makes this easier. You can set up a Zap that watches for form submissions and sends the data to Google Sheets, Notion, Airtable, or wherever you want - no troubleshooting permissions or scripts.
              </p>
            </div>

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                <strong>Test it.</strong> Once it's connected, submit a dummy entry and check that it shows up where it should.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 8: Deploy */}
        <div id="step8" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 8: Deploy</h2>

          <p className="text-stone-700 text-sm leading-relaxed mb-4">
            This is your first deploy - you'll redeploy in Step 10 after making more changes.
          </p>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <ol className="text-stone-700 text-sm leading-relaxed space-y-2 list-decimal list-inside">
              <li>In Lovable, click <strong>Share</strong> (or <strong>Publish</strong> depending on your version)</li>
              <li>Follow the prompts to deploy</li>
              <li>You'll get a URL - this is your live page</li>
              <li>Open it on your phone to make sure it works</li>
              <li><strong>Paste your URL in the Maven chat right now.</strong> It's real. Someone can open it on their phone.</li>
            </ol>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Going Further */}
        <div id="going-further" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 9: Bring the AI Into the Tool</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              The version you just built works. But you probably noticed the friction - you have to leave your page, go to the Custom GPT, get feedback, come back, and paste it in. Your team will do this once. Maybe twice. Then they'll stop.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              The fix: bring the AI directly into your page so the feedback happens inline. Upload a deck, get feedback right on the page, and it all gets logged automatically. No external tools, no copy-paste, no switching tabs.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              When you paste this prompt, Lovable will ask you to "Enable Cloud" - just click Allow. Lovable handles the AI connection for you, so you don't need to set up your own API key. Here's what to tell it:
            </p>

            <div className="relative bg-stone-50 border border-stone-200 rounded-lg p-4 mb-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => goingFurtherPrompt} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{goingFurtherPrompt}</pre>
            </div>

            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Along with this prompt, attach the evaluator system prompt as a file so Lovable knows exactly what criteria to use:
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Deck Evaluator - System Prompt (click to expand and copy)
              </summary>
              <div className="px-4 py-4 relative">
                <div className="flex justify-end mb-2">
                  <CopyButton getText={() => evaluatorPrompt} />
                </div>
                <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono bg-stone-50 p-4 rounded-lg border border-stone-200">{evaluatorPrompt}</pre>
              </div>
            </details>

            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              When you paste the prompt and attach the evaluator file, Lovable will ask you to "Enable Cloud" - this is what lets it connect to AI models and a backend. Click <strong>Allow</strong>. It's free to start.
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what that looks like
              </summary>
              <div className="p-4">
                <ClickableImage src="/lovable-enable-cloud.png" alt="Lovable Enable Cloud prompt" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  You'll see the prompt you pasted, the .md file you attached, and then this "Enable Cloud" dialog. Just click Allow and let it set everything up.
                </p>
              </div>
            </details>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-stone-800 text-sm font-bold mb-3">Expect to troubleshoot</p>
              <p className="text-stone-700 text-sm leading-relaxed mb-4">
                This is more technical than the rest of the session, and things will break. The same approach works here as it did in Step 7: just describe what's happening and ask for help. You don't need to understand the error message - just paste it in.
              </p>

              <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
                <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                  Example: debugging an API error
                </summary>
                <div className="p-4">
                  <ClickableImage src="/troubleshoot-api.png" alt="Troubleshooting an API error in Lovable" className="rounded-lg border border-stone-200 w-full" />
                  <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                    "I'm getting a 'Maximum call stack size exceeded' error" - that's all you need to say. Lovable identified the problem, fixed it, and told you to try again. You never had to read or understand the code.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4 mt-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                <strong>You don't need to do this today.</strong> Your deployed page is already useful without it. But this is the jump - from a tool that works to a tool people actually use consistently, because there's no friction.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 10: Redeploy */}
        <div id="step10" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 10: Redeploy</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              You've made changes since you last published. Your live URL is still showing the old version. Hit <strong>Publish</strong> again in Lovable to push your updates live.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed">
              Every time you make changes you want people to see, you need to redeploy. It takes a few seconds.
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Next Steps */}
        <div id="next-steps" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Next Steps</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">None of this is required - just ideas if you want to keep going.</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-3 list-disc list-inside">
              <li><strong>Finish what you started.</strong> If you didn't get through all the steps during the session, pick up where you left off. The guide above has everything you need.</li>
              <li><strong>Send it to one person.</strong> Ask them: "Would you use this? What's confusing?" Their feedback is worth more than another hour of solo tweaking.</li>
              <li><strong>Try building one for your team.</strong> Think about the Custom GPTs you've been making. Is there one that would work better as an interactive page - something with a checklist, examples, a guided workflow? Try building it in Lovable using the same process from today. You already know how.</li>
            </ul>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Building Your Own Version */}
        <div id="building-your-own" className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Building Your Own Version</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Today you followed a pre-written spec. When you want to build something for your own team, here's how to start from scratch.
            </p>

            <p className="text-stone-800 text-sm font-bold mb-3">Write the spec with AI.</p>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              Open a ChatGPT, Gemini, or Claude conversation and tell it what you're trying to build. Two approaches work well:
            </p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside mb-4">
              <li><strong>Tell it what you want</strong> and let it draft a spec: "I want to build a page that helps my team write better research briefs. It should show them what good looks like and give them a way to get feedback. Write me a detailed spec I can paste into a code generation tool."</li>
              <li><strong>Have it interview you:</strong> "I want to build a tool for my team. Ask me questions about what it should do, who it's for, and how it should work, then write me a spec."</li>
            </ul>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Go back and forth until the spec captures what you're looking for. The conversation IS the work - same skill as Sessions 1 and 2.
            </p>

            <p className="text-stone-800 text-sm font-bold mb-3">A few tips for building on your own:</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside mb-4">
              <li>Start with the wireframe approach: get the functionality right first, layer in visual design later. Debugging both at once is a mess.</li>
              <li>Use the same refine-then-polish flow from today: build it, fix what's wrong, then make it look good.</li>
              <li>When you need to connect to other tools (Sheets, Notion, email), ask the AI to walk you through the integration step by step. You don't need to know how it works - just follow along.</li>
            </ul>

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                Everything you practiced today transfers: writing a clear spec, iterating on what the AI builds, troubleshooting when things break, and using screenshots to set visual identity. The tool you build will be different, but the process is the same.
              </p>
            </div>
          </div>
        </div>

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
                href="https://docs.google.com/forms/d/e/1FAIpQLSfoRRqB5jn_8Jqo4o_UVhFgQojNjV0hK3U1ybMjn-qfTjEodA/viewform?usp=publish-editor"
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

export default Session3;
