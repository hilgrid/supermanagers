import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type FilePlatform = 'claude-code' | 'cursor' | 'cowork';
type WebPlatform = 'chatgpt' | 'claude-web' | 'gemini' | 'copilot';

const filePlatformLabels: Record<FilePlatform, string> = {
  'claude-code': 'Claude Code',
  cursor: 'Cursor',
  cowork: 'Claude Cowork',
};

const webPlatformLabels: Record<WebPlatform, string> = {
  chatgpt: 'ChatGPT',
  'claude-web': 'Claude (web)',
  gemini: 'Gemini',
  copilot: 'Microsoft 365 Copilot',
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

function InlinePrompt({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="font-mono bg-rose-100 px-1 text-sm">{text}</span>
      <CopyButton getText={() => text} />
    </span>
  );
}

const fileSetupSteps: Record<FilePlatform, React.ReactNode[]> = {
  'claude-code': [
    <>Open your terminal and start Claude Code by typing: <InlinePrompt text="claude" /></>,
    <>Tell it: <InlinePrompt text="Navigate to my Manager OS folder and read the Setup Interview file. Walk me through it." /></>,
    <>Answer the questions one section at a time. It will ask about you, your team, your manager, your projects, and your company.</>,
    <>When you're done, it will create all your files automatically - About docs, team folders, project summaries, everything.</>,
  ],
  cursor: [
    <>Open Cursor. Go to File &rarr; Open Folder and select your Manager OS folder.</>,
    <>Open the chat panel (Cmd+L on Mac, Ctrl+L on Windows).</>,
    <>Type: <InlinePrompt text="Read the Setup Interview file and walk me through it" /></>,
    <>Answer the questions one section at a time. It will ask about you, your team, your manager, your projects, and your company.</>,
    <>When you're done, it will create all your files automatically.</>,
  ],
  cowork: [
    <>Upload your Manager OS folder to Cowork.</>,
    <>Type: <InlinePrompt text="Read the Setup Interview file and walk me through it" /></>,
    <>Answer the questions. It will generate the content for your files.</>,
  ],
};

const file30DaysSteps: Record<FilePlatform, React.ReactNode[]> = {
  'claude-code': [
    <>In the same conversation (while it still has all your context), say: <InlinePrompt text="Read the 30 Days of AI file in my Manager OS folder. Create a customized version for my team based on everything you know about us - our roles, our projects, and the kinds of work we do. Replace the generic examples with ones that are specific to my team." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
    <>When you're happy with it, ask it to save the customized version in your Manager OS folder.</>,
  ],
  cursor: [
    <>In the same chat, type: <InlinePrompt text="Read the 30 Days of AI file. Create a customized version for my team based on everything you know about us - our roles, our projects, and the kinds of work we do. Replace the generic examples with ones that are specific to my team." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
    <>When you're happy with it, ask it to save the customized version in your Manager OS folder.</>,
  ],
  cowork: [
    <>Type: <InlinePrompt text="Read the 30 Days of AI file. Create a customized version for my team based on everything you know about us - our roles, our projects, and the kinds of work we do. Replace the generic examples with ones that are specific to my team." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
  ],
};

const web30DaysSteps: Record<WebPlatform, React.ReactNode[]> = {
  chatgpt: [
    <>Start a new chat. Attach the <span className="font-mono bg-rose-100 px-1 text-sm">30 Days of AI.md</span> file along with the context files the interview generated (your About file, team files, project summaries).</>,
    <>Type: <InlinePrompt text="Use the attached 30 Days of AI template and my context files to create a customized version for my team. Replace the generic examples with ones that are specific to our roles, projects, and the kinds of work we do." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
    <>Copy the final version into a doc you can share with your team.</>,
  ],
  'claude-web': [
    <>Start a new chat (or use your Project). Attach the <span className="font-mono bg-rose-100 px-1 text-sm">30 Days of AI.md</span> file along with your context files.</>,
    <>Type: <InlinePrompt text="Use the attached 30 Days of AI template and my context files to create a customized version for my team. Replace the generic examples with ones that are specific to our roles, projects, and the kinds of work we do." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
    <>Copy the final version into a doc you can share with your team.</>,
  ],
  gemini: [
    <>In a new chat, attach or reference the <span className="font-mono bg-rose-100 px-1 text-sm">30 Days of AI.md</span> file from your Drive.</>,
    <>Type: <InlinePrompt text="Use the 30 Days of AI template and my Manager OS context in Google Drive to create a customized version for my team. Replace the generic examples with ones that are specific to our roles, projects, and the kinds of work we do." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
  ],
  copilot: [
    <>Start a new chat. Attach the <span className="font-mono bg-rose-100 px-1 text-sm">30 Days of AI.md</span> file along with your context files.</>,
    <>Type: <InlinePrompt text="Use the attached 30 Days of AI template and my context files to create a customized version for my team. Replace the generic examples with ones that are specific to our roles, projects, and the kinds of work we do." /></>,
    <>Review the output. Are the exercises relevant to what your team actually does? If not, tell it what to change.</>,
    <>Copy the final version into a doc you can share with your team.</>,
  ],
};

const fileWeeklySteps: Record<FilePlatform, React.ReactNode[]> = {
  'claude-code': [
    <>In the same conversation, say: <InlinePrompt text="Read my weekly update writer skill and run it" /></>,
    <>It pulls from your manager's preferences, your projects, your team - everything the interview just generated.</>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
  cursor: [
    <>In the same chat, type: <InlinePrompt text="Read the weekly update writer skill and run it using the context in my Manager OS folder" /></>,
    <>It has access to all your files, same as Claude Code.</>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
  cowork: [
    <>Type: <InlinePrompt text="Read the weekly update writer skill and run it using my Manager OS context" /></>,
    <>Cowork runs in the background - it will come back to you with a draft.</>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
};

const fileMakeBetter: Record<FilePlatform, React.ReactNode> = {
  'claude-code': (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        The first output will probably be too generic. That's the point - it shows you what's missing. Now make the context richer:
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li>If you keep a running notes doc, tell it: <InlinePrompt text="Also pull from my running notes at [path]" /></li>
        <li>If you had 1:1s this week, tell it where those notes live</li>
        <li>If a big decision happened over email or Slack, tell it to check there</li>
      </ul>
      <p className="text-stone-800 text-base leading-relaxed mb-2">
        Then open <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span> and edit the "Where to pull context from" section so it knows where to look every time.
      </p>
    </>
  ),
  cursor: (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        The first output will probably be too generic. Now make the context richer:
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li>If you keep a running notes doc, tell it: <InlinePrompt text="Also pull from my running notes at [path]" /></li>
        <li>Your 1:1 notes from this week</li>
        <li>Any project docs or status updates you keep</li>
      </ul>
      <p className="text-stone-800 text-base leading-relaxed mb-2">
        Edit <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span> to reference these sources permanently.
      </p>
    </>
  ),
  cowork: (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        Review the draft. What's missing?
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li>Edit the skill file to point to more specific context - your running notes, 1:1 notes, project docs.</li>
        <li>Upload any additional context you have from this week.</li>
      </ul>
    </>
  ),
};

const webSetupSteps: Record<WebPlatform, React.ReactNode[]> = {
  chatgpt: [
    <>Open a new chat in ChatGPT.</>,
    <>Attach the file <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> from your Manager OS folder (click the paperclip icon or drag it in).</>,
    <>Type: <InlinePrompt text="Read the attached file and walk me through the setup interview" /></>,
    <>Answer the questions one section at a time.</>,
    <>When the interview is done, say: <InlinePrompt text="Now generate all the files as markdown (.md) files I can download. Create one file for each: Me/About.md, My Manager/About.md, one per team member, one per project, and Company Context/About.md. Zip them up so I can download them all at once." /></>,
    <>Download the zip, unzip it, and move the files into the matching folders in your Manager OS folder.</>,
  ],
  'claude-web': [
    <>Open a new chat in Claude.</>,
    <>Attach the file <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> from your Manager OS folder (click the paperclip icon or drag it in).</>,
    <>Type: <InlinePrompt text="Read the attached file and walk me through the setup interview" /></>,
    <>Answer the questions one section at a time.</>,
    <>When the interview is done, say: <InlinePrompt text="Now create an artifact for each file: Me/About.md, My Manager/About.md, one per team member, one per project, and Company Context/About.md." /> Download each artifact and move it into the matching folder in your Manager OS.</>,
  ],
  gemini: [
    <>Copy the Manager OS folder into your Google Drive. You can keep the .md files as-is or convert them to Google Docs - either works.</>,
    <>Open Gemini (gemini.google.com).</>,
    <>Attach the <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> file from your Drive, or copy-paste the prompt.</>,
    <>Type: <InlinePrompt text="Read the attached file and walk me through the setup interview" /></>,
    <>Answer the questions one section at a time.</>,
    <>When the interview is done, say: <InlinePrompt text="Now create each file directly in my Google Drive, in the matching folders inside my Manager OS folder: Me/About.md, My Manager/About.md, one per team member, one per project, and Company Context/About.md." /></>,
  ],
  copilot: [
    <>Copy the Manager OS folder into OneDrive or SharePoint. You can keep the .md files as-is - Copilot can read them.</>,
    <>Open Microsoft Copilot.</>,
    <>Attach the <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> file (click the paperclip icon or drag it in). You can also copy-paste the prompt if attaching doesn't work.</>,
    <>Type: <InlinePrompt text="Read the attached file and walk me through the setup interview" /></>,
    <>Answer the questions one section at a time.</>,
    <>When the interview is done, say: <InlinePrompt text="Now generate all the files as markdown. Create one file for each: Me/About.md, My Manager/About.md, one per team member, one per project, and Company Context/About.md." /> Copy each one into the matching file in your Manager OS folder on OneDrive.</>,
  ],
};

const webWeeklySteps: Record<WebPlatform, React.ReactNode[]> = {
  chatgpt: [
    <>Start a new chat. Attach the weekly update writer skill file: <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span></>,
    <>Also attach the context files the interview generated - your manager's About file, your project summaries.</>,
    <>Type: <InlinePrompt text="Use the attached instructions to write my weekly update from this context" /></>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
  'claude-web': [
    <>Start a new chat (or use your Project). Attach the weekly update writer skill file: <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span></>,
    <>Also attach your context files - manager's About doc, project summaries, anything relevant.</>,
    <>Type: <InlinePrompt text="Use the attached instructions to write my weekly update from this context" /></>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
  gemini: [
    <>In a new chat, reference the skill file by name or attach it.</>,
    <>Type: <InlinePrompt text="Pull from my Manager OS folder in Google Drive to write my weekly update using the weekly update writer skill" /></>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
  copilot: [
    <>Start a new chat. Attach the weekly update writer skill file: <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span></>,
    <>Also attach your context files - manager's About file, project summaries.</>,
    <>Type: <InlinePrompt text="Use the attached instructions to write my weekly update from this context" /></>,
    <>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</>,
  ],
};

const webMakeBetter: Record<WebPlatform, React.ReactNode> = {
  chatgpt: (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        The first output will probably be too generic. Think about what other context you have lying around:
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li>A running notes doc from this week? Attach it.</li>
        <li>1:1 notes? Attach those too.</li>
        <li>Screenshot your calendar - it's a rough record of what you actually spent time on.</li>
        <li>A Slack or email thread with a key decision? Screenshot it and attach it.</li>
      </ul>
      <p className="text-stone-800 text-base leading-relaxed mb-2">
        Edit the skill file to mention these sources in the "Where to pull context from" section, then run it again with the extra context attached.
      </p>
    </>
  ),
  'claude-web': (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        The first output will probably be too generic. Add more context:
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li>Running notes doc from this week? Attach it.</li>
        <li>1:1 notes? Attach those.</li>
        <li>Screenshot your calendar for a record of your week.</li>
        <li>Screenshot a Slack or email thread with a key decision.</li>
      </ul>
      <p className="text-stone-800 text-base leading-relaxed mb-2">
        Edit the skill file, re-upload it (or update it in your Project), and run again.
      </p>
    </>
  ),
  gemini: (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        Gemini can read your Gmail, your Google Calendar, and your Google Docs. That's a lot of context most other tools can't reach.
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li><strong>Gmail:</strong> <InlinePrompt text="Also check my email from this week for anything relevant to my update" /></li>
        <li><strong>Google Calendar:</strong> <InlinePrompt text="Look at my calendar this week to see what I spent time on" /></li>
        <li><strong>Google Docs:</strong> Point it at your running notes if you keep one in Drive.</li>
      </ul>
      <p className="text-stone-800 text-base leading-relaxed mb-2">
        Edit the skill file in Drive to reference these sources permanently so it checks them every time.
      </p>
    </>
  ),
  copilot: (
    <>
      <p className="text-stone-800 text-base leading-relaxed mb-3">
        Copilot can read your Outlook, Teams, and calendar. That's context most other tools can't reach.
      </p>
      <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
        <li><strong>Outlook:</strong> <InlinePrompt text="Also check my email from this week for key decisions or updates" /></li>
        <li><strong>Teams:</strong> <InlinePrompt text="Look at my Teams conversations for anything relevant" /></li>
        <li><strong>Calendar:</strong> <InlinePrompt text="Check my calendar to see what I spent time on this week" /></li>
      </ul>
      <p className="text-stone-800 text-base leading-relaxed mb-2">
        Edit the skill file to reference these sources permanently so it checks them every time.
      </p>
    </>
  ),
};

const webTips: Partial<Record<WebPlatform, React.ReactNode>> = {
  'claude-web': (
    <p className="text-stone-800 text-base leading-relaxed mb-6 italic">
      Tip: Create a Claude Project for your Manager OS. Upload your context files there so they persist across conversations - you won't have to re-upload every time you want to use a skill.
    </p>
  ),
};

const takeaways = [
  {
    title: "Context makes things better, but it has to be the right context",
    body: "You wouldn't add a file about your manager's communication preferences to a skill that preps you for a 1:1 with your direct report. But you absolutely need it for writing your weekly update. As you use each skill, you'll start to notice what context it's missing - and that tells you exactly what to add. The system gets smarter because you're specific about what each use case actually needs.",
  },
  {
    title: "You don't have to architect the system upfront",
    body: "You built this iteratively today: set up the interview, ran a skill, noticed what was missing, added context, ran it again. That's how the Manager OS grows in real life too. You try to send your weekly update, realize you need context about your manager's preferences, and add that. Then you think, \"Wait, now that I have this, I could also use it to prep for my skip-level.\" So you build another skill. One use case leads to the next.",
  },
  {
    title: "You start thinking in systems",
    body: "The shift isn't just \"I used AI to do a thing.\" It's \"instead of just doing this thing once, how do I do it in a way where it gets easier every time?\" That's working on the machine, not just running it. You notice a pattern - something you do repeatedly - and instead of prompting from scratch each time, you turn it into a skill. You add the right context files. You tighten the instructions after seeing what works. Over time, you're not just getting tasks done - you're building a system that makes every future task faster and better.",
  },
];

const Session: React.FC = () => {
  const [filePlatform, setFilePlatform] = useState<FilePlatform | null>('claude-code');
  const [webPlatform, setWebPlatform] = useState<WebPlatform | null>(null);
  const [currentTakeaway, setCurrentTakeaway] = useState(0);

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">
          &larr; Back
        </Link>

        <div className="mt-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Set Up Your Manager OS
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            In the first three sessions, you built tools that help your team do better work. Now you're building the system that helps <em>you</em> do better work as a manager - and gives your team a structured way to build AI fluency on their own.
          </p>
          <p className="text-stone-700 text-lg mt-3 leading-relaxed">
            By the end of this session, you'll have a Manager OS set up in your AI tool of choice, a customized 30 Days of AI plan for your team, a weekly update you could actually send your manager, and the tool you built earlier in this course saved as a portable skill.
          </p>
          <p className="text-stone-700 text-lg mt-3 leading-relaxed">
            <a
              href="https://docs.google.com/presentation/d/1W59nmK-Fz39K6_j6rqgNH657R4ElJ9R4E6XONPDJnW0/edit?slide=id.p#slide=id.p"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-stone-600 hover:underline transition-colors"
            >
              Session 4 slides &rarr;
            </a>
          </p>
          <p className="text-stone-500 text-sm mt-3">
            <Link to="/resources" className="underline underline-offset-2 hover:text-stone-600 transition-colors">Confused about a term? Check the glossary.</Link>
          </p>
        </div>

        {/* Step 1: Pick your tool */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-1">Step 1: Pick your tool</h2>
          <p className="text-stone-500 text-sm mb-3">The instructions below will update to match.</p>

          <div className="mb-4">
            <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-2">File-based tools <span className="normal-case tracking-normal font-normal">- read and write files directly</span></p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(filePlatformLabels) as FilePlatform[]).map((key) => (
                <button
                  key={key}
                  onClick={() => { setFilePlatform(key); setWebPlatform(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filePlatform === key && webPlatform === null
                      ? 'bg-stone-800 text-white'
                      : 'bg-white border-2 border-stone-300 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {filePlatformLabels[key]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-2">Web tools <span className="normal-case tracking-normal font-normal">- attach files, copy-paste outputs back</span></p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(webPlatformLabels) as WebPlatform[]).map((key) => (
                <button
                  key={key}
                  onClick={() => { setWebPlatform(key); setFilePlatform(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    webPlatform === key && filePlatform === null
                      ? 'bg-stone-800 text-white'
                      : 'bg-white border-2 border-stone-300 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {webPlatformLabels[key]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Get the folder */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Step 2: Get the Manager OS folder</h2>
          <p className="text-stone-700 text-lg mb-4">
            <a
              href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-stone-600 hover:underline transition-colors"
            >
              Get the Manager OS folder (Google Drive) &rarr;
            </a>
          </p>
          <details className="group">
            <summary className="text-stone-600 text-sm font-medium cursor-pointer hover:text-stone-800 transition-colors">
              What's in the folder
            </summary>
            <div className="mt-3 bg-white border-2 border-stone-300 rounded p-5 text-stone-800 text-base leading-loose">
              <p><strong>Me/</strong> - Your profile as a manager: your role, priorities, management style, strengths, and growth areas. This is how the AI understands who you are.</p>
              <p><strong>Team/</strong> - A folder for each direct report. Each one has an About file (their role, strengths, what they're working on) and a place for 1:1 notes.</p>
              <p><strong>My Manager/</strong> - Who your manager is, what they care about, how they like to receive updates, and their communication style.</p>
              <p><strong>Projects/</strong> - Your active projects with status, who's involved, and key risks.</p>
              <p><strong>Company Context/</strong> - Strategy docs, org goals, anything that helps the AI understand the bigger picture at your company.</p>
              <p><strong>Daily Notes/</strong> - A place for running notes as your day goes on. The more you capture here, the better your weekly updates and meeting prep get over time.</p>
              <p><strong>Skills/</strong> - Reusable prompts saved as files. These work like custom GPT instructions, but they live in a folder instead of inside one specific tool. Split into two buckets: <em>For Me</em> (weekly updates, meeting prep, 1:1 prep) and <em>For My Team</em> (feedback and coaching skills you run against your team's work).</p>
              <p><strong>Setup Interview.md</strong> - A prompt that interviews you and generates all of the above. This is where you start.</p>
            </div>
          </details>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Instructions - renders for whichever tool is selected */}
        {filePlatform && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 3: Set up your system</h2>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-8 list-decimal list-inside">
              {fileSetupSteps[filePlatform].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 4: Create a 30 Days of AI plan for your team</h2>
            <p className="text-stone-800 text-base leading-relaxed mb-3">
              Your Manager OS folder includes a 30 Days of AI template (in the Projects folder) - a daily exercise program to build AI fluency. Now that the AI knows about your team, have it create a customized version with exercises specific to your people and their work.
            </p>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-8 list-decimal list-inside">
              {file30DaysSteps[filePlatform].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 5: Run the weekly update writer</h2>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-8 list-decimal list-inside">
              {fileWeeklySteps[filePlatform].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 6: Make it better</h2>
            {fileMakeBetter[filePlatform]}
            <p className="text-stone-800 text-base leading-relaxed font-bold mb-8">Run it again. See the difference.</p>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 7: Add a skill from your course tool</h2>
            <p className="text-stone-800 text-base leading-relaxed mb-3">
              You've already built a working tool in this course - a Custom GPT, a Gem, or a Project. The prompt that powers it is a skill. Pull it into your Manager OS so it lives alongside everything else.
            </p>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
              <li>Open your Custom GPT, Gem, or Project from earlier in the course. Copy the system prompt / instructions.</li>
              <li>Tell your AI tool: <InlinePrompt text="Save this as a new skill file in my Manager OS under Skills/For My Team/. Name it something descriptive like Deck reviewer or Email clarity coach." /> It will create the file for you.</li>
            </ol>
            <p className="text-stone-800 text-base leading-relaxed">
              Now anyone on your team can run that skill from the same folder - no separate GPT link needed. And because the Manager OS has context about your team, the skill gets better automatically.
            </p>
          </div>
        )}

        {webPlatform && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 3: Set up your system</h2>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
              {webSetupSteps[webPlatform].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {webTips[webPlatform]}

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 4: Create a 30 Days of AI plan for your team</h2>
            <p className="text-stone-800 text-base leading-relaxed mb-3">
              Your Manager OS folder includes a 30 Days of AI template (in the Projects folder) - a daily exercise program to build AI fluency. Now that the AI has your context, have it create a customized version with exercises specific to your team and their work.
            </p>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-8 list-decimal list-inside">
              {web30DaysSteps[webPlatform].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 5: Run the weekly update writer</h2>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-8 list-decimal list-inside">
              {webWeeklySteps[webPlatform].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <h2 className="text-xl font-bold text-stone-800 mb-2">
              Step 6: Make it better{(webPlatform === 'gemini' || webPlatform === 'copilot') && <> - this is where {webPlatformLabels[webPlatform]} has a real advantage</>}
            </h2>
            {webMakeBetter[webPlatform]}
            <p className="text-stone-800 text-base leading-relaxed font-bold mb-8">Run it again. See the difference.</p>

            <h2 className="text-xl font-bold text-stone-800 mb-2">Step 7: Add a skill from your course tool</h2>
            <p className="text-stone-800 text-base leading-relaxed mb-3">
              You've already built a working tool in this course - a Custom GPT, a Gem, or a Project. The prompt that powers it is a skill. Pull it into your Manager OS so it lives alongside everything else.
            </p>
            <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-4 list-decimal list-inside">
              <li>Open your Custom GPT, Gem, or Project from earlier in the course. Copy the system prompt / instructions.</li>
              <li>Create a new doc in the <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For My Team/</span> folder in your Manager OS. Name it something descriptive (e.g., "Deck reviewer" or "Email clarity coach"). A Google Doc, Word doc, or plain text file all work - the format doesn't matter, the AI just needs to be able to read it.</li>
              <li>Paste the prompt into the doc and save it.</li>
            </ol>
            <p className="text-stone-800 text-base leading-relaxed">
              Now anyone on your team can run that skill from the same folder - no separate GPT link needed. And because the Manager OS has context about your team, the skill gets better automatically.
            </p>
          </div>
        )}

        <hr className="border-stone-300 mb-12" />

        {/* What you're actually building */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">What you're actually building</h2>
          <div className="relative">
            <div className="bg-white border-2 border-stone-300 rounded-lg p-6 min-h-[180px] flex flex-col justify-center">
              <p className="text-lg font-bold text-stone-800 mb-2">{takeaways[currentTakeaway].title}</p>
              <p className="text-stone-700 text-base leading-relaxed">{takeaways[currentTakeaway].body}</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <button onClick={() => setCurrentTakeaway(Math.max(0, currentTakeaway - 1))} disabled={currentTakeaway === 0} className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <span className="text-stone-400 text-sm">{currentTakeaway + 1} / {takeaways.length}</span>
              <button onClick={() => setCurrentTakeaway(Math.min(takeaways.length - 1, currentTakeaway + 1))} disabled={currentTakeaway === takeaways.length - 1} className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Managing across a team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">How do I manage this across a team?</h2>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            This space is evolving quickly. Today, keeping a shared set of context files and skills in sync across a team is still a bit imperfect - but all the frontier labs are actively working on making this easier.
          </p>
          <p className="text-stone-800 text-base leading-relaxed mb-4">
            In the meantime, a few approaches that work:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li><strong>Shared cloud folder</strong> - Put your team's Manager OS in a shared Google Drive or Dropbox folder. Everyone points their tool at the same context files. Simple and works today.</li>
            <li><strong>GitHub repository</strong> - If your team is comfortable with it, a shared repo lets you version-control your skills and context files. You can see what changed and when.</li>
            <li><strong>Vibe-coded skills repository</strong> - Some teams are building simple internal tools (using Lovable, Replit, etc.) that serve as a shared library of skills and prompts anyone on the team can browse and use.</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed">
            Start with whatever's easiest for your team. The important thing is that everyone has access to the same context and the same skills - the infrastructure will catch up.
          </p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Resources</h2>

          <div className="space-y-4">
            <p className="text-stone-800 text-base leading-relaxed">
              <a
                href="https://hils.substack.com/p/dont-start-by-sidelining-your-own"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-stone-600"
              >
                Don't Start by Sidelining Your Own People &rarr;
              </a>
              <br />
              <span className="text-stone-600">Newsletter on what actually works for AI adoption on your team.</span>
            </p>

            <p className="text-stone-800 text-base leading-relaxed">
              <a
                href="https://maven.com/hilary-gridley/ai-powered-people-management/5/home#893c77"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-stone-600"
              >
                Driving AI Adoption on Your Team &rarr;
              </a>
              <br />
              <span className="text-stone-600">Bonus course videos on how to think about adoption, training, and getting your team to actually use these tools.</span>
            </p>

            <p className="text-stone-800 text-base leading-relaxed">
              <a
                href="https://maven.com/hilary-gridley/ai-powered-people-management/5/home#a7482b"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-stone-600"
              >
                Rate this course on Maven &rarr;
              </a>
              <br />
              <span className="text-stone-600">Your ratings help other managers find this course. If it's been valuable, a 5-star review makes a real difference.</span>
            </p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* What's coming next */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">What's coming next</h2>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 list-disc list-inside">
            <li>Lifetime access to all course materials and videos</li>
            <li>Access to the alumni Slack community, where I share new resources as I make and update them</li>
            <li>Post-course video: how I use my whole system day-to-day</li>
            <li>Guide: ideas for things to vibe code</li>
            <li>Guide: ideas for automations and how to set them up</li>
            <li><Link to="/managercopilot" className="font-bold underline hover:text-stone-600">Supermanager Copilot</Link> - bring it any management problem. It helps you figure out what to build and walks you out with a prompt, a spec, or a plan.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Session;
