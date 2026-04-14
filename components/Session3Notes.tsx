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

const Session3Notes: React.FC = () => {
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
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-2">Session 3 notes</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Vibe Coding: Build Real Applications
          </h1>
        </div>

        <H2>Key Takeaways</H2>
        <UL>
          <li><strong>A spec is the whole game.</strong> The difference between a useful tool and AI slop is the upfront work you put into describing exactly what you want. Good inputs mean good outputs. If you're getting generic junk, it's almost always an input problem - not a tool problem.</li>
          <li><strong>Separate function from form.</strong> Build the wireframe first - get the layout and functionality right before layering in visual design so you're not fixing too many different things at the same time.</li>
          <li><strong>Screenshots are your design system.</strong> You don't need brand guidelines. Take screenshots (or just use the URL) of any website whose visual identity you want to capture, paste them in, and the AI will intuit the design system and apply it. This works for your own company's brand, a client's brand, or any aesthetic you want to channel.</li>
          <li><strong>Start scrappy, then get permission.</strong> If your IT team blocks tools or connections, build a "hacky" version first - one with copy-paste steps instead of direct integrations. Use that as your proof of concept when you go ask for the permissions you actually need. A working prototype wins more fights than a hypothetical request.</li>
          <li><strong>Troubleshooting is easier than you think.</strong> When something breaks, just say into the chat "I'm having this issue" and describe what you're seeing or paste a screenshot. Ask it to walk you through how to fix it, or just ask it to fix it. The AI is good at debugging its own work - you don't need to understand the error yourself.</li>
          <li><strong>Coding agents unlock everything.</strong> The real lesson isn't "make websites instead of Custom GPTs." It's that when AI can write code for you, you can make a computer do anything - send emails, create and organize files, log data, connect tools. You're only limited by what you can think to ask for.</li>
          <li><strong>The hard part is knowing what to build, not how to build it.</strong> The coding is solved. The real skill is looking at your team and asking: where does their work most need to level up? Is there a way to show them what good looks like? Is there a way to evaluate their work against that standard?</li>
          <li><strong>Think about all the documentation you've ever made for your team.</strong> Style guides, onboarding checklists, "what good looks like" references, templates, review criteria. All of that can now be interactive. Instead of a static doc someone reads once and forgets, you can build something where they see examples, submit their work, get feedback, and have that feedback tracked over time.</li>
          <li><strong>You can delegate this.</strong> If someone on your team is great at [X], give them the challenge: "Can you make a version of this that shows other people how to do [X]?" They already have the expertise. Now they have the tools to turn it into something interactive and scalable.</li>
        </UL>

        <H2>Resources</H2>
        <UL>
          <li><strong>Session guide and materials:</strong> <Link to="/session3" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">writerbuilder.com/session3</Link></li>
          <li><strong>Deck Chef (full version with AI):</strong> <a href="https://deck-chef.lovable.app" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">deck-chef.lovable.app</a></li>
          <li><strong>Deck Chef Lite (version built in session):</strong> <a href="https://deck-doctor-lite.lovable.app" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">deck-doctor-lite.lovable.app</a></li>
          <li><strong>Lovable (coding agent):</strong> <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">lovable.dev</a></li>
          <li><strong>Slide Evaluator Custom GPT:</strong> First Pass Deck Reviewer</li>
          <li><strong>Lovable promo code:</strong> K7P9V2MX (100 free credits, expires April 24, 2026)</li>
        </UL>

        <H2>The Management Lesson: What to Build</H2>
        <P>
          The technical side of this is increasingly solved. You saw how quickly Lovable can go from a spec to a working, deployed tool. The bottleneck is no longer "can I build this?" It's "what can I build that people will actually use?"
        </P>
        <P>This is the same question from Sessions 1 and 2, just at a higher level of capability. The principles carry over:</P>
        <P>
          <strong>Start with where your team's work most needs to level up.</strong> Not where it's most broken - where leveling up would have the biggest impact. That might be how they write PRDs, how they structure presentations, how they run experiments, how they communicate results to leadership. Different for every team, different for different people within the same team.
        </P>
        <P>
          I find it helpful to think about work as falling into one of two buckets. "Will doing this 10x better allow me to have 10x the impact?" If yes, double down on becoming world class at it. If not, automate it. The same holds true for your team. AI can make them better at the core skills that really matter for their work, and can automate everything else so they can spend that time on what really matters.
        </P>

        <figure className="my-8">
          <img
            src="/images/10x-rule.png"
            alt="A decision tree: If I got 10x better at this, would I have 10x the impact? Yes = that's the job, double down. No = automate it. Example shown for 'giving a talk': Double down on novel insights, compelling narrative, audience connection. Automate slide formatting, speaker notes, moving pixels."
            className="w-full rounded-lg border border-stone-200"
          />
        </figure>

        <P>
          <strong>Ask: is there a way to show them what good looks like?</strong> The Deck Chef reference section isn't just a checklist - it's concrete examples of bad vs. good, side by side, so people can see the difference and internalize the standard. That pattern applies to anything: good vs. bad customer emails, strong vs. weak product specs, effective vs. ineffective meeting agendas.
        </P>
        <P>
          <strong>Ask: is there a way to evaluate their work against that standard?</strong> Once you've defined what good looks like, you can build a tool that checks work against those criteria before it reaches you.
        </P>
        <P>
          <strong>Think about what compounds.</strong> Imagine a tool that collects every PRD your team writes, runs it through a feedback checker, and tracks whether they're improving over time. When it's time for performance reviews, you're not digging through emails and Slack messages. The important work artifacts are already in one place with feedback attached.
        </P>
        <P>
          You don't have to build all of this yourself. If someone on your team is great at writing customer emails, challenge them: "Can you build a version of this that shows other people what a great customer email looks like and helps them check their own?" They have the expertise. Now they have the tools. This is how you scale your standards without being the bottleneck.
        </P>

        <H2>Session Highlights</H2>
        <P>For the full step-by-step build process, follow the session guide. Here are the moments and ideas worth remembering:</P>
        <UL>
          <li>
            <strong>"Vibe coding" = no spec.</strong> The unspecified version looked polished ("The Art of Better Slides") but was useless. "Has 'typography is everything' ever been the number two feedback you've given on somebody's deck at work?" See for yourself: <a href="https://unspecified-deck-chef.lovable.app" target="_blank" rel="noopener noreferrer" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">unspecified-deck-chef.lovable.app</a>
          </li>
          <li>
            <strong>Default to simplicity.</strong> Custom GPTs are still a perfectly good choice much of the time because they are so simple to make and use. Build with code when the experience genuinely needs it (visual examples, guided workflows, actions, backend logging).
          </li>
          <li>
            <strong>Minimize variance across your team.</strong> "I'd be trying to get everyone to the same destination - same system, shared context, same tools. The question of people's different comfort levels is more about how many steps they need along the way."
          </li>
          <li>
            <strong>IT blocked you? Build the lite version.</strong> A website with a Custom GPT link and manual copy-paste doesn't send proprietary data anywhere. Use that as your proof of concept to make the case for the permissions you actually need.
          </li>
          <li>
            <strong>You don't need design skills.</strong> Screenshot any website you like, paste it into the Lovable chat, and the AI will intuit the design system. Real designers also start from references and mood boards. Try words like "thoughtful" and "discerning" when prompting for visuals.
          </li>
          <li>
            <strong>Try dictating your feedback.</strong> Instead of typing what's wrong, just talk while looking at the preview. It's faster and more natural.
          </li>
          <li>
            <strong>Be careful of multitasking too much while things build.</strong> "It becomes very tempting to just spin up more windows... I will say that scrambles my brains."
          </li>
        </UL>
      </div>
    </section>
  );
};

export default Session3Notes;
