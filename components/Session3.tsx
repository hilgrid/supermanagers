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
external GPT, add an upload area where users can upload a slide
image directly.

When they upload, send the image to the Claude API with these
evaluation criteria:
[PASTE YOUR CRITERIA FROM THE REFERENCE SECTION]

Display the feedback inline on the page - pass or fail on each
criterion, with specific notes on what to fix.

Then automatically log everything to the Google Sheet - don't
make the user paste anything.`;

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
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Today you're building a live website your team can use to get better at making slides. It has three parts: examples of what good looks like, a way to get feedback, and a tracker so you can see improvement over time.
          </p>
          <p className="text-stone-500 text-sm mt-3">
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
          </ol>
          <div className="border-t border-stone-200 pt-4">
            <p className="text-sm text-stone-500 leading-relaxed">
              <span className="font-bold text-stone-700">Going further:</span> <a href="#going-further" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Remove the copy-paste</a> (API connection instructions) &middot; <a href="#homework" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Homework</a>
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Before You Start */}
        <div id="before-you-start" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Before You Start</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-6">
            <p className="text-stone-800 text-sm font-bold mb-3">You'll need:</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside mb-4">
              <li>A free Lovable account (sign up at <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">lovable.dev</a>)</li>
              <li>Access to the Slide Evaluator Custom GPT (<a href="https://chatgpt.com/g/g-69c1437bc1c481919110c5ef3e8930a7-supermanager-first-pass-deck-reviewer" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">use it here</a>)</li>
              <li>A Google Sheet for logging (we'll set this up during the build)</li>
            </ul>

            <p className="text-stone-800 text-sm font-bold mb-3">Fill this in - you'll reference it when writing your spec:</p>
            <ul className="text-stone-600 text-sm leading-relaxed space-y-1.5 list-disc list-inside">
              <li><strong>What problem does this solve?</strong> <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">[e.g. "My team's slides are data dumps - leadership has to figure out what the point is"]</code></li>
              <li><strong>Who uses it?</strong> <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">[e.g. "Anyone on my insights team who presents to leadership"]</code></li>
              <li><strong>When do they use it?</strong> <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">[e.g. "Before any presentation to leadership or cross-functional stakeholders"]</code></li>
            </ul>
          </div>

          {/* Evaluator Prompt */}
          <details className="border border-stone-300 rounded-lg overflow-hidden">
            <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
              Deck Evaluator - Full Prompt (click to expand)
            </summary>
            <div className="px-4 py-4 relative">
              <div className="flex justify-between items-start mb-2">
                <p className="text-stone-500 text-xs leading-relaxed">
                  Here's the prompt behind the Slide Evaluator Custom GPT. You can <a href="https://chatgpt.com/g/g-69c1437bc1c481919110c5ef3e8930a7-supermanager-first-pass-deck-reviewer" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-600 transition-colors">use the GPT directly</a>, or copy the prompt below to build your own version.
                </p>
                <CopyButton getText={() => evaluatorPrompt} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono bg-stone-50 p-4 rounded-lg border border-stone-200">{evaluatorPrompt}</pre>
            </div>
          </details>
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
                This is where you're headed. By the end of today, you'll have all three pieces built and deployed as a live URL.
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

            <details className="border border-stone-300 rounded-lg overflow-hidden mb-4">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what that looks like in Lovable
              </summary>
              <div className="p-4">
                <ClickableImage src="/lovable-unspecified-prompt.png" alt="Typing a vague prompt in Lovable" className="rounded-lg border border-stone-200 w-full" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  Just a one-liner. No criteria, no structure, no specifics about your team's problems. Let's see what comes back.
                </p>
              </div>
            </details>

            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              It probably made a generic tips page - "use less text," "pick a good font," "tell a story with data." Looks fine. Totally useless. Nothing specific to your team's actual problems. No way to get feedback. No way to track progress.
            </p>

            <details className="border border-stone-300 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-stone-50 text-stone-700 text-sm font-medium cursor-pointer hover:bg-stone-100 transition-colors">
                Here's what the unspecified version looked like (click to expand)
              </summary>
              <div className="px-4 py-4">
                <img
                  src="/unspecified-version.png"
                  alt="Screenshot of the unspecified version - a generic slide tips page"
                  className="w-full rounded-lg border border-stone-200 mb-3"
                />
                <p className="text-stone-600 text-sm leading-relaxed">
                  Looks polished. "Nine Rules to Live By," typography advice, color palette tips. But would your team learn anything from this they couldn't Google in 30 seconds? There's nothing here about your standards, your criteria, or your team's specific problems. And there's no way to get feedback or track progress. It's a poster, not a tool.
                </p>
              </div>
            </details>

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
            <h3 className="text-lg font-bold text-stone-800 mb-3">For today's session: Use the example spec below</h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              During the session, we'll use a pre-written spec so everyone's building the same thing and we can move fast. Customize the details for your team, but the structure is ready to go.
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
                  <strong>Customize this for your team.</strong> The slide criteria above are examples. If your team's problem is sales emails, research briefs, or project updates, swap in your own criteria from Sessions 1 and 2.
                </p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                The spec already includes the shared evaluator GPT link. If you built your own evaluator in Sessions 1-2 and want to use that instead, swap the URL in Section 2 before pasting.
              </p>
            </div>
          </div>

          {/* For future projects */}
          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-stone-800 mb-3">For future projects: Write the spec from scratch</h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              When you want to build something for your own team after this course, you won't have an example spec to start from. Here's how to write one:
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Open a ChatGPT/Gemini/Claude conversation and tell it what you're trying to build. You don't need to have the spec figured out - that's what the conversation is for.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">Two ways to approach it:</p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside mb-4">
              <li><strong>Tell it what you want</strong> and let it draft a spec for you to react to: "I want to build a page that helps my team make better slides. It should show them what good looks like, give them a way to get feedback, and let me track whether they're improving. Write me a detailed spec I can paste into a code generation tool."</li>
              <li><strong>Have it interview you:</strong> "I want to build a tool for my team. Ask me questions about what it should do, who it's for, and how it should work, then write me a spec."</li>
            </ul>
            <p className="text-stone-600 text-sm leading-relaxed">
              Go back and forth until the spec captures what you're looking for. This is the same skill from Sessions 1 and 2 - the conversation IS the work. Once your spec feels right, come back to this guide and pick up at Step 4.
            </p>
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
              Look at the good vs. bad slide examples. Common problems:
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

          {/* Section 2: Feedback */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-bold text-stone-800 mb-3">Section 2: Feedback</h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-3">
              Check that the button works and the copy makes sense for your team.
            </p>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>"Change the button text to 'Get Feedback on Your Deck'"</li>
              <li>Make sure the language says "deck" or "presentation" everywhere, not "slide" - this tool evaluates entire presentations</li>
              <li>If the framing sounds too much like a test: "Make this sound less like a test and more like a tool - something they'd want to use, not something they're being made to use"</li>
            </ul>
          </div>

          {/* Section 3: Progress Tracker */}
          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-stone-800 mb-3">Section 3: Progress Tracker</h3>
            <ul className="text-stone-700 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>"Add a date field that auto-fills with today's date"</li>
              <li>"After someone submits, show their submission history below the form so they can see their own progress"</li>
              <li>"Make the feedback text area bigger - people will be pasting a lot of text"</li>
            </ul>
          </div>
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
            <p className="text-stone-700 text-sm leading-relaxed">
              Don't be afraid to be blunt. "This still looks bad" is more useful than "could you maybe adjust the examples slightly?" You're not hurting its feelings. Be specific about what's wrong and direct about what you want.
            </p>
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

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                <strong>Test it.</strong> Once it's connected, submit a dummy entry and check that it shows up in your Google Sheet.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Step 8: Deploy */}
        <div id="step8" className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Step 8: Deploy</h2>

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
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Going Further: Remove the Copy-Paste</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              The version you just built works. But you probably noticed the friction in Section 2 - you have to leave your page, go to the Custom GPT, get feedback, come back, and paste it in. Your team will do this once. Maybe twice. Then they'll stop.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              The fix: connect an AI API directly to your page so the feedback happens inline. No copy-paste, no switching tabs. Upload a slide, get feedback right on the page, and it all gets logged automatically.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              This requires a paid API key (Claude or OpenAI - a few dollars for light usage). Lovable walks you through the setup. Here's what to tell it:
            </p>

            <div className="relative bg-stone-50 border border-stone-200 rounded-lg p-4 mb-4">
              <div className="flex justify-end mb-2">
                <CopyButton getText={() => goingFurtherPrompt} />
              </div>
              <pre className="text-stone-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{goingFurtherPrompt}</pre>
            </div>

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                <strong>You don't need to do this today.</strong> Your deployed page is already useful without it. But this is the jump - from a tool that works to a tool people actually use consistently, because there's no friction.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Homework */}
        <div id="homework" className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Homework</h2>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <ol className="text-stone-700 text-sm leading-relaxed space-y-3 list-decimal list-inside">
              <li><strong>Finish your page.</strong> Make it good enough that you'd actually send it to your team. Improve the examples, tighten the checklist, make it look professional.</li>
              <li><strong>Send it to one person.</strong> Ask them: "Would you use this? What's confusing?" Their feedback is worth more than another hour of solo tweaking.</li>
              <li><strong>If you're feeling ambitious:</strong> Connect the API to remove the copy-paste step. Lovable will walk you through it.</li>
              <li><strong>Post in Maven:</strong> Your URL, a screenshot, and one sentence about who it's for and when they'd use it.</li>
            </ol>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Session3;
