import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-stone-100 border border-stone-300 rounded-lg p-4 my-4 overflow-x-auto">
    <code className="text-stone-800 text-sm font-mono whitespace-pre-wrap">{children}</code>
  </pre>
);

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

const Session4Notes: React.FC = () => {
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
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-2">Session 4 notes</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Set Up Your Manager OS
          </h1>
          <p className="text-stone-600 text-lg mt-4 leading-relaxed italic">
            You built tools for your team. Now build the system that helps you do better work as a manager - and gives your team a structured way to build AI fluency on their own.
          </p>
        </div>

        <H2>Key Takeaways</H2>
        <OL>
          <li><strong>An "Operating System" is just a folder.</strong> Don't let the fancy name trip you up. It's a folder on your computer (or in the cloud) that holds two things: context about your work - your team, your manager, your projects, your company - and skills, which are reusable prompts saved as files. Everything else is decoration.</li>
          <li><strong>Context makes things better, but only if it's the right context.</strong> Throwing your entire Google Drive at every problem is not the goal. The goal is pulling in exactly what's needed for the task - your manager's communication preferences for a weekly update, your team's project context for a 1:1 prep. As you use each skill and notice what's missing, you learn what to add. The system gets smarter because you get specific.</li>
          <li><strong>Don't architect this up front. Build it as you use it.</strong> Minimize setup cost. You don't know what's useful until you start using it. Set up the interview, run a skill, notice what's missing, add context, run it again. That's how the system grows - one use case at a time, pulling the next one along with it.</li>
          <li><strong>Fix the system, not just the output.</strong> This is the big shift. When your manager gives you feedback on a weekly update, most people rewrite the update. The move is to ask: "What's the note behind the note? What does my manager actually want every time?" Then update the skill so future updates bake that in automatically. You're not just getting tasks done - you're engineering the machine that does the work.</li>
          <li><strong>Start with copy-paste. Automate later.</strong> The instinct is to wire everything up at once - connect Slack, Gmail, CRM, the works. Don't. Copy-paste is the solution to almost any blocker. It's a little annoying if you do it every day, but it's the fastest way to figure out what the system actually needs before you invest in plumbing.</li>
          <li><strong>Memory is just context you don't control.</strong> The built-in memory in ChatGPT/Claude is lossy - it fixates on random things you mentioned once. A folder-based system lets you curate what gets referenced, when. You can say "only look at the last two weeks" or "go find that project from three months ago." Way more targeted than hoping the AI remembered the right things.</li>
          <li><strong>File-based tools are worth the learning curve.</strong> I was anti-terminal. Now I do everything in Claude Code. The difference between a file-based tool (Claude Code, Cursor, CoWork) and a web tool (ChatGPT, Claude web, Gemini, Copilot) is that file-based tools can actually create and edit files on your system - which means the AI can set up the whole interview, write all your context files, and keep a daily log running in the background. Web tools still work, but you do more copy-pasting.</li>
          <li><strong>Think in systems, not artifacts.</strong> The shift isn't "I used AI to do a thing." It's "instead of just doing this thing once, how do I do it in a way where it gets easier every time?" That's working on the machine, not just running it. Once you start thinking that way, it radically changes the shape of what you can accomplish in your job.</li>
        </OL>

        <H2>Resources</H2>
        <UL>
          <li><strong>Session guide:</strong> <Link to="/session4" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">writerbuilder.com/session4</Link> - step-by-step build-along for setting up your Manager OS</li>
          <li><strong>Manager OS folder</strong> (Google Drive): the starter folder structure with Setup Interview, skills, and context templates</li>
          <li><strong>Demo: How I use my system day-to-day</strong> - slide deck walkthrough of my actual daily workflow</li>
          <li><strong>How I AI podcast with Claire Vo</strong> - interview on managing your day with an "anti-system system"</li>
          <li><strong>Don't Start by Sidelining Your Own People</strong> - my newsletter on what actually works for AI adoption</li>
          <li><strong>Driving AI Adoption on Your Team</strong> - bonus Maven module for managers thinking about team rollout</li>
          <li><strong>30 Days of AI template</strong> - included in the Manager OS folder, in Projects</li>
          <li><strong>Granola</strong> - meeting transcriber mentioned as an emerging source of team-wide meeting notes</li>
        </UL>

        <H2>The Arc of the Course</H2>
        <P>Four weeks, four layers. Each one builds on the last.</P>
        <UL>
          <li><strong>Week 1: Write the instructions.</strong> Take the feedback you keep giving, the "here's what good looks like," and write it down clearly enough that an AI can follow it. Same skill that makes you good at delegating to people.</li>
          <li><strong>Week 2: Build the tool.</strong> Turn those instructions into something other people can use. Product thinking - whose problem, when would they reach for it, does it actually make their life easier.</li>
          <li><strong>Week 3: Build the software.</strong> Go from a conversation that gives answers to a thing that takes action. Once AI can write code, it can do anything - even if your role isn't technical.</li>
          <li><strong>Week 4: Build the system.</strong> The layer that makes everything else work. Shared context about your team, portable skills anyone can run, and a feedback loop where every use makes the system smarter.</li>
        </UL>
        <Quote>"We started with the humble Custom GPT, and today we are going to set up our manager operating system. So we have come very far."</Quote>

        <H2>What's in the Manager OS Folder</H2>
        <P>The starter folder has this structure:</P>
        <UL>
          <li><strong>Me/</strong> - Your profile as a manager: role, priorities, management style, strengths, growth areas. This is how the AI understands who you are.</li>
          <li><strong>Team/</strong> - A folder for each direct report. About file (role, strengths, what they're working on) and a place for 1:1 notes.</li>
          <li><strong>My Manager/</strong> - Who your manager is, what they care about, how they like to receive updates, communication style.</li>
          <li><strong>Projects/</strong> - Your active projects with status, owners, and key risks. Includes the 30 Days of AI template.</li>
          <li><strong>Company Context/</strong> - Strategy docs, org goals, anything that helps the AI understand the bigger picture.</li>
          <li><strong>Daily Notes/</strong> - A running log as your day goes on. The more you capture, the better your weekly updates and meeting prep get.</li>
          <li><strong>Skills/</strong> - Reusable prompts saved as files. Like Custom GPT instructions, but they live in a folder instead of inside one specific tool.
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>For Me/</strong> - Weekly update writer, meeting prep, 1:1 prep, delegation helper, performance review prep</li>
              <li><strong>For My Team/</strong> - Feedback and coaching skills you can run against your team's work (e.g., "tie your work to impact")</li>
            </ul>
          </li>
          <li><strong>Setup Interview.md</strong> - A prompt that interviews you and generates all of the above. This is where you start.</li>
        </UL>
        <Quote>"When I talk about an operating system, it's a pretty fancy term, but it's usually just a folder."</Quote>

        <H2>OS vs. Project: What's the Difference?</H2>
        <P>A Claude Project is a real product feature - a specific container with files Claude draws from when you chat in that project. An "OS" isn't a real term - I use it loosely to mean "the folder structure I use to operate."</P>
        <P>The mechanical difference:</P>
        <UL>
          <li><strong>Project:</strong> discrete. Each project is its own silo. Weekly updates in one project, performance reviews in another. Overlap between them is annoying because you can't easily share context.</li>
          <li><strong>OS (folder):</strong> integrated. You pull in whatever files you need for whatever task. The 1:1 notes you use for feedback can also feed into the weekly update. One unified source.</li>
        </UL>
        <Quote>"I don't like using projects because it's too discrete. A system just brings all those things together."</Quote>
        <P>The tradeoff: a large system means you don't want it referencing everything every time - it eats the context window and makes output worse. So you direct it: "for this skill, go look at these folders."</P>

        <H2>Step 1: Pick Your Tool</H2>
        <P><strong>File-based tools</strong> (read and write files directly):</P>
        <UL>
          <li><strong>Claude Code</strong> - terminal-based, most powerful for this work</li>
          <li><strong>Cursor</strong> - same capabilities as Claude Code but with a visual folder tree always up (good for people who want to see structure)</li>
          <li><strong>Claude CoWork</strong> - middle ground; friendlier interface than the terminal, same underlying capabilities</li>
        </UL>
        <P><strong>Web tools</strong> (attach files, copy-paste outputs back):</P>
        <UL>
          <li><strong>ChatGPT</strong></li>
          <li><strong>Claude (web)</strong></li>
          <li><strong>Gemini</strong> - advantage: can read your Gmail, Calendar, and Google Docs natively</li>
          <li><strong>Microsoft 365 Copilot</strong> - works more like a web tool but can reach Outlook, Teams, and Calendar</li>
        </UL>
        <P>My honest take: I hope you'll see why Claude Code or CoWork is so powerful, even if your job isn't technical. But web tools still work - you just do more copy-pasting.</P>
        <Quote>"I was very anti-terminal. I was like, 0% chance I ever work in the terminal. And then I just started doing it, and now I'm like, actually, this is great."</Quote>

        <H2>Step 2: Get the Manager OS Folder</H2>
        <P>Download the folder. Click around. Look at the structure. That's the starting scaffold - your AI tool will populate it for you.</P>
        <P>If you want to start from scratch instead of using the provided structure (e.g., in CoWork), just say:</P>
        <CodeBlock>{`I'm trying to set up a context directory with skills and information that you need to help me do my job better. How do you think we should organize that? And then can you go ahead and set that up for me?`}</CodeBlock>
        <P>You don't need this folder. It's just convenient.</P>

        <H2>Step 3: Run the Setup Interview</H2>
        <P>The Setup Interview is a prompt that asks you questions about yourself, your team, your manager, your projects, and your company. It uses your answers to generate all the context files.</P>

        <H3>In Claude Code / Cursor / CoWork</H3>
        <CodeBlock>{`I just downloaded a folder called Manager OS. It's in my Downloads. There should be a file in there called Setup Interview. Can you open that and run it, and walk me through those interview questions?`}</CodeBlock>
        <P>The AI will go find the file, read it, and start the interview. When you're done, it creates all your files automatically.</P>

        <H3>In ChatGPT / Claude web / Copilot</H3>
        <P>Attach the Setup Interview.md file. Say "Read the attached file and walk me through the setup interview." Answer the questions. When done, ask it to generate each file as a markdown artifact you can download and drop into your folder.</P>

        <H3>In Gemini</H3>
        <P>Put your Manager OS folder in Drive. Point Gemini at it. It can write files directly there.</P>

        <H3>The "use your judgment" trick</H3>
        <P>The AI will sometimes keep asking clarifying questions past the point of usefulness. My shortcut:</P>
        <CodeBlock>{`Use your judgment and tell me whatever assumptions you're making.`}</CodeBlock>
        <Quote>"I do this with people too on my team. I'm like, I will tolerate three follow-up questions, and then beyond that, you have to use your judgment and tell me what assumptions you're making."</Quote>

        <H3>What you end up with</H3>
        <P>It creates a customized Me/About file, populated Projects folder, and (if applicable) Team and My Manager folders - all based on your interview answers. Skipping team/manager if they don't apply is fine.</P>
        <Quote>"I hate systems that require a lot of maintenance, because they always decay. What I love about using AI for this is you can set it up such that it does all this work for you going forward, from the first time you set it up."</Quote>

        <H2>Step 4: Create a 30 Days of AI Plan for Your Team</H2>
        <P>The folder includes a 30 Days of AI template - a daily-exercise program to build AI fluency for new hires or people with bad habits to unlearn. It's generic. Make it specific to your team.</P>
        <CodeBlock>{`Read the 30 Days of AI file in my Manager OS folder. Create a customized version for my team based on everything you know about us - our roles, our projects, and the kinds of work we do. Replace the generic examples with ones that are specific to my team.`}</CodeBlock>
        <P>Then review. Does the Day 17 exercise actually make sense for your team? If not, tell it what to change. Iterate until it's useful, then save it.</P>

        <H3>Feedback loop: iterate on generated content</H3>
        <P>Real example from the session: ChatGPT's first attempt at customizing Day 17 ("generate ideas that are meaningfully different") lost the original's specificity - the original had concrete steps meant to teach something about how AI works. I gave it that feedback:</P>
        <Quote>"I pasted an example from the original, I told it I don't think this is doing it right now."</Quote>
        <P>A good behavior to notice: the AI now regenerates just one day first, asks if you like it better, and then applies the pattern to all 30 days. That's better than regenerating everything blindly.</P>

        <H3>General principle: pull from existing resources</H3>
        <P>You can do this with anything. YouTube transcripts, conference talks, articles:</P>
        <CodeBlock>{`How would you adjust what this person is talking about for [our context]? We use Canva instead of Figma - what do I do about that?`}</CodeBlock>
        <P>Then: "Now can you create a workflow - write out specific instructions - based on what this person is demoing?" You can use that as a skill or a Custom GPT.</P>

        <H2>Step 5: Start a Daily Note</H2>
        <P>The weekly update writer needs raw material. Daily notes are where that comes from - a running log of what you worked on, decisions made, and things worth remembering.</P>
        <P>The trick: you don't write these yourself.</P>
        <CodeBlock>{`Create a daily note for today in my Daily Notes folder. As we work together, keep a running log of what we did, any decisions made, and anything worth flagging for my weekly update.`}</CodeBlock>
        <P>Then you just keep using your AI tool normally - drafting emails, prepping meetings, thinking through problems. It updates the note automatically in the background.</P>

        <H3>If your tool can't create files</H3>
        <P>If you're in a web tool that can't write files directly (and isn't connected to Drive/OneDrive), use the hacky version. At the end of a work session:</P>
        <CodeBlock>{`Summarize what we worked on today - key decisions, things that got done, anything worth flagging. Format it as a daily note I can save.`}</CodeBlock>
        <P>Then paste into a running Google Doc or wherever you keep notes.</P>

        <H3>Meeting transcripts count too</H3>
        <P>If you use Granola, Teams transcription, or anything that records meetings, those transcripts are context. Dump them in a folder. The AI can pull from them.</P>

        <H3>Do you actually read the daily notes?</H3>
        <P>No. I never review them.</P>
        <P>What I do instead: every couple of weeks, I ask Claude to look at what I planned to do vs. what I actually did, and suggest improvements to how I use my time. Then I ask it to incorporate those suggestions into the preferences it uses for planning my day.</P>
        <Quote>"I have a very trust-but-verify approach. If it's working, I trust it's working. If things start going wrong, then I go in and say okay, let me see what's going on here."</Quote>

        <H2>Step 6: Run the Weekly Update Writer</H2>
        <P>The OS ships with a skill file: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Skills/For Me/Weekly update writer.md</code>. It's basic by design. It specifies what it is, where to pull context from, and a format (what moved forward, what's blocked or at risk, what's coming up next week).</P>

        <H3>Claude Code / Cursor / CoWork</H3>
        <CodeBlock>{`Read my weekly update writer skill and run it`}</CodeBlock>
        <P>It pulls from your daily notes, projects folder, team folder - everything the interview generated.</P>

        <H3>Web tools</H3>
        <P>Attach the skill file and your context files, then ask it to run.</P>

        <H3>What you're looking at</H3>
        <P>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</P>
        <P>The first output is probably too generic. That's the point. It shows you what context is missing. That's how you learn what to add.</P>
        <Quote>"This is functionally the same as how a project would work, or how a Custom GPT would work. It's just a prompt that I'm feeding in as an attachment."</Quote>

        <H2>Step 7: Make It Better</H2>
        <P>First output too generic? That's expected. Now add the context it was missing.</P>
        <UL>
          <li>Running notes doc from this week? Point it at that path (or attach it in web tools).</li>
          <li>1:1 notes from this week? Same.</li>
          <li>Calendar screenshot? It's a rough record of what you actually spent time on.</li>
          <li>A Slack or email thread where a big decision happened? Screenshot it and attach it.</li>
        </UL>

        <H3>Gemini and Copilot have a real edge here</H3>
        <P>Gemini can natively read Gmail, Calendar, and Google Docs:</P>
        <CodeBlock>{`Also check my email from this week for anything relevant to my update
Look at my calendar this week to see what I spent time on`}</CodeBlock>
        <P>Copilot can read Outlook, Teams, and calendar similarly. If you're on the Microsoft stack, that integration is a genuine advantage over Claude/ChatGPT.</P>

        <H3>Then update the skill file</H3>
        <P>Don't just pass the extra context in this one time. Edit <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Skills/For Me/Weekly update writer.md</code> and update the "Where to pull context from" section so it checks those sources every time.</P>
        <Quote>"Run it again. See the difference."</Quote>

        <H2>Step 8: Improve the System, Not Just the Output</H2>
        <P>This is the whole point of the session. Before this kind of system existed, fixing work based on feedback usually just meant fixing the artifact. You'd improve the doc, and maybe in your head you'd improve how you do docs in the future - but not in any systematic way.</P>
        <P>With a system, you can do both.</P>

        <H3>The scenario</H3>
        <P>Your manager replies to your weekly update:</P>
        <Quote>"Thanks for this. Can you be more specific about what you need from me on the blocked item? Who exactly do you need me to reach out to, and what do you need me to say? And for the thing that's at risk - is that a resource issue or a scope issue? I want to help but I need to know what 'help' looks like."</Quote>

        <H3>Fix this update</H3>
        <CodeBlock>{`My manager replied to my weekly update with these questions: "[paste feedback]". Rewrite the update to address them.`}</CodeBlock>

        <H3>Fix the system</H3>
        <CodeBlock>{`Look at my manager's follow-up questions: "[paste feedback]". What's the note behind the note here - what themes can you pull out about what my manager actually wants from these updates? Then show me how to update the weekly update writer skill so future updates address these patterns automatically.`}</CodeBlock>
        <Quote>"The first one fixes the output. The second one fixes the machine. Your manager isn't just asking about this one update - they're telling you what they always want."</Quote>

        <H3>What the AI pulls out</H3>
        <P>When I ran this live in ChatGPT, the pattern distillation was genuinely insightful:</P>
        <UL>
          <li>"A blocked item without a clear ask, owner, and next step is incomplete."</li>
          <li>"They don't want to diagnose the problem, they want to execute on your behalf."</li>
          <li>"They're not asking for more detail everywhere - only where it unlocks action."</li>
          <li>"Your manager wants this section to answer: If I only read the blocked/at-risk section, can I immediately help without asking a single follow-up question?"</li>
        </UL>

        <H3>The resulting skill update</H3>
        <P>The AI rewrote the "what's blocked or at risk" section of the skill to:</P>
        <UL>
          <li>Classify each issue as resource, scope, alignment, or external dependency</li>
          <li>Require a specific actionable ask for each item</li>
          <li>If asking manager for help, make it copy-paste ready - they should be able to act on it immediately without follow-up questions</li>
        </UL>
        <P>This is the compound learning loop. Feedback improves the artifact AND the machine that makes the artifact. If you're on a marketing team getting feedback from data or sales, piping that back into your system means it gets smarter and smarter over time.</P>

        <H2>Step 9: Add a Skill from Your Course Tool</H2>
        <P>The Custom GPT, Gem, or Project you built earlier in the course is powered by a prompt. That prompt is a skill - bring it into your OS so your team can run it from the same folder, alongside everything else.</P>
        <OL>
          <li>Open your Custom GPT / Gem / Project. Copy the system prompt.</li>
          <li>Tell your AI: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Save this as a new skill file in my Manager OS under Skills/For My Team/. Name it something descriptive like "Deck reviewer" or "Email clarity coach."</code></li>
          <li>Or: create a Google Doc / Word file in that folder yourself and paste the prompt. Format doesn't matter - AI can read any of them.</li>
        </OL>
        <P>Now anyone on your team can run that skill from the same folder. No separate GPT link to share. And because the OS has team context, the skill gets better automatically.</P>

        <H2>Step 10: Make It Yours</H2>
        <P>Take time to explore. A few ideas:</P>

        <H3>Connect a tool you already use</H3>
        <CodeBlock>{`I want to connect [calendar / Notion / Google Sheet / Slack] to my Manager OS so you can pull context from it. Walk me through how to set that up.`}</CodeBlock>
        <P>And when something breaks:</P>
        <CodeBlock>{`I'm having this issue. I took a screenshot - can you walk me through how to fix it?`}</CodeBlock>

        <H3>Build another skill</H3>
        <P>What's something you do every week that follows a pattern? 1:1 prep? Meeting agendas? Sprint summaries? Performance review prep? Write a skill for it. Once AI can write code, those skills can take actions too - like actually generating a branded deck or marketing asset.</P>

        <H3>Add more context</H3>
        <P>What's missing that would make the AI more useful? Team norms? Communication preferences? OKRs? Add it. If you're blocked from connecting Snowflake or your CRM, a one-time CSV export is a perfectly good starting point - not as good as live data, but it unblocks you today.</P>

        <H2>Q&A Highlights</H2>

        <H3>On paying for connectors</H3>
        <P>
          I pay for Claude Max ($100/month). I don't pay separately for the Google/Calendar connections - they come with the subscription. I do pay for Nano Banana Pro (Google's image model) but use that through Google AI Studio directly, not via Claude.
        </P>
        <Quote>"It feels like paying for parking - you shouldn't have to. But then you realize this is the most useful thing that has ever happened to me in my entire life, like I can cough up an extra $20 a month."</Quote>

        <H3>On Gmail write/delete access</H3>
        <P>Kristina was trying to set up an AI-managed Gmail account to auto-delete newsletter junk after reading. She was only getting read access, not write or delete.</P>
        <Quote>"My number one nightmare in life is that my AI starts emailing people on my behalf. I see that as a feature, not a bug."</Quote>
        <P>I've intentionally only connected read access everywhere. Some Google connectors are read-only by default; there may be a separate plugin for write access.</P>

        <H3>Edit or start from scratch?</H3>
        <P>This is the fundamental question for everything. Even in product development, everyone is always fighting about this.</P>
        <P>My rule of thumb:</P>
        <UL>
          <li>If you've put no investment in yet and immediately see it's the wrong structure - start from zero. Cost is low.</li>
          <li>If you've invested and it's pretty good but starting to feel clunky - adapt first. Start over only when iteration reaches a failure point.</li>
          <li>Pattern: iterate, iterate, iterate, iterate, cut and start over. Iterate, iterate, iterate, iterate, cut and start over.</li>
        </UL>
        <Quote>"You know you've hit the wall when the prompt starts feeling Frankenstein-y - like, 'do not let the user use aggressive language' - and you're like, why would the user even do that? Then I cut."</Quote>

        <H3>On the context window</H3>
        <P>Better to give the least amount of information it needs. Even as context windows get bigger, the more context you give, the more likely there's contradictory or unhelpful information that distracts from what matters.</P>
        <P>No single threshold. But I notice it most in long conversations - everything above is context too. When that happens, I clear the conversation and start over.</P>
        <P>Example from my newsletter: I built a real-estate game to figure out what town I should live in. One version had a knowledge base with 100 profiles of people representing different towns. Another version was literally just a prompt that said "create two people, ask me which one I'd want to talk to at a party." The simpler one worked just as well, if not better.</P>
        <Quote>"I usually find that the simpler versions are better."</Quote>

        <H3>On organizing chats and projects</H3>
        <P>Totally idiosyncratic.</P>
        <UL>
          <li><strong>Folder structure:</strong> easiest way to stay organized. Cursor's always-visible folder tree is why a lot of people like it.</li>
          <li><strong>Projects:</strong> I don't use them much - too discrete. There's overlap between weekly updates, performance reviews, and 1:1 prep, and projects silo them.</li>
          <li><strong>Chats:</strong> I keep one daily chat in Claude Code, try to do one or two things at a time. When I open 5 chats in parallel, I lose the plot. I clear the context with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/clear</code> when done with something and start fresh.</li>
        </UL>
        <Quote>"If your brain is like, 'I hate this, I want everything super structured,' you can set it up that way. I'm more like, 'I want it all abstracted away unless something goes wrong.' Don't feel like you have to do it my way."</Quote>

        <H3>On memory vs. daily notes</H3>
        <P>The built-in memory feature in ChatGPT/Claude is lossy. My example:</P>
        <Quote>"I told it one time about my Swiss cheese framework, and now it brings up my Swiss cheese framework constantly. I'm like, where should I go on vacation? And it's like, 'As the writer of the Swiss cheese framework, you should go to Switzerland.' I'm like, what are you talking about?"</Quote>
        <P>The OS folder works as a better alternative. You can say "only look at the last two weeks" or "two months ago we were working on a project - go find it." Memory becomes something you direct, not something the AI decides for you.</P>

        <H2>How to Manage This Across a Team</H2>
        <P>This is an open problem and a million startups are working on it. Current best options:</P>
        <UL>
          <li><strong>Shared cloud folder</strong> - Put your team's Manager OS in a shared Google Drive or Dropbox folder. Everyone points their tool at the same context files. Simple and works today.</li>
          <li><strong>GitHub repository</strong> - If your team is comfortable with it, a shared repo lets you version-control your skills and context files. You can see what changed and when.</li>
          <li><strong>Vibe-coded skills repository</strong> - Some teams are building simple internal tools (Lovable, Replit) that serve as a shared library of skills anyone on the team can browse and use.</li>
        </UL>
        <Quote>"Start with whatever's easiest for your team. The important thing is that everyone has access to the same context and the same skills - the infrastructure will catch up."</Quote>

        <H2>Parting Thoughts</H2>
        <P>There's a lot of uncertainty right now about what happens to entry-level roles and whether there's still value in human skill and craft. But if you're working on the bleeding edge of this - and you are - you're designing what the future of work looks like. First at your company, then everywhere else.</P>
        <Quote>"I don't like to predict the future, because that implies we can't impact it. I believe there is a future where we use this technology to make jobs better, to make people better, to help people learn to do things well - and not a future where we just stop hiring entry-level talent, lay everybody off, and automate everything."</Quote>
        <Quote>"The people who have the most potential to bring that future into existence are managers of today - the ones who are finding ways to empower their team and help them learn how to collaborate with these tools to do better work, in ways that don't sideline them or de-skill them on the things they actually need."</Quote>
        <Quote>"That's a real responsibility. If we care about people, we have an obligation to find ways to use these tools that make them better at their jobs, not replaceable. No one else is going to figure that out for us. It's on managers like you."</Quote>

        <H3>The exercise metaphor</H3>
        <Quote>"You can't get in shape by reading about exercise. You can't get in shape by taking an afternoon to go lift a bunch of weights. You can only get in shape by doing a little bit of exercise every day. Same with this."</Quote>
      </div>
    </section>
  );
};

export default Session4Notes;
