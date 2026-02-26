import React from 'react';
import { Link } from 'react-router-dom';

const tools = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'chatgpt', label: 'ChatGPT (web)' },
  { id: 'claude-web', label: 'Claude (web)' },
  { id: 'gemini', label: 'Gemini (web)' },
  { id: 'copilot', label: 'Microsoft 365 Copilot' },
  { id: 'cowork', label: 'Claude Cowork' },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Session: React.FC = () => {
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
            Download the Manager OS folder, pick your tool, and follow the guide. By the end you'll have a working system and a weekly update you could actually send your manager.
          </p>
          <p className="text-stone-700 text-lg mt-3 leading-relaxed">
            <a
              href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-stone-600 hover:underline transition-colors"
            >
              Get the Manager OS folder (Google Drive) &rarr;
            </a>
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
        </div>

        {/* Tool selector */}
        <div className="mb-12">
          <p className="text-stone-800 font-bold text-base mb-3 uppercase tracking-widest">
            What tool are you using?
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

        {/* Folder structure */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-3">What's in the folder</h2>
          <div className="bg-white border-2 border-stone-300 rounded p-5 text-stone-800 text-base leading-loose">
            <p><strong>Me/</strong> — Your profile as a manager: your role, priorities, management style, strengths, and growth areas. This is how the AI understands who you are.</p>
            <p><strong>Team/</strong> — A folder for each direct report. Each one has an About file (their role, strengths, what they're working on) and a place for 1:1 notes.</p>
            <p><strong>My Manager/</strong> — Who your manager is, what they care about, how they like to receive updates, and their communication style.</p>
            <p><strong>Projects/</strong> — Your active projects with status, who's involved, and key risks.</p>
            <p><strong>Company Context/</strong> — Strategy docs, org goals, anything that helps the AI understand the bigger picture at your company.</p>
            <p><strong>Daily Notes/</strong> — A place for running notes as your day goes on. The more you capture here, the better your weekly updates and meeting prep get over time.</p>
            <p><strong>Skills/</strong> — Reusable prompts saved as files. These work like custom GPT instructions, but they live in a folder instead of inside one specific tool. Split into two buckets: <em>For Me</em> (weekly updates, meeting prep, 1:1 prep) and <em>For My Team</em> (feedback and coaching skills you run against your team's work).</p>
            <p><strong>Setup Interview.md</strong> — A prompt that interviews you and generates all of the above. This is where you start.</p>
          </div>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Claude Code */}
        <div id="claude-code" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Claude Code</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the Manager OS folder</a> and save it somewhere on your computer (Desktop is fine).</li>
            <li>Open your terminal and start Claude Code by typing: <span className="font-mono bg-rose-100 px-1 text-sm">claude</span></li>
            <li>Tell it: <span className="font-mono bg-rose-100 px-1 text-sm">"Navigate to my Manager OS folder and read the Setup Interview file. Walk me through it."</span></li>
            <li>Answer the questions one section at a time. It will ask about you, your team, your manager, your projects, and your company.</li>
            <li>When you're done, it will create all your files automatically — About docs, team folders, project summaries, everything.</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>In the same conversation, say: <span className="font-mono bg-rose-100 px-1 text-sm">"Read my weekly update writer skill and run it"</span></li>
            <li>It pulls from your manager's preferences, your projects, your team — everything the interview just generated.</li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            The first output will probably be too generic. That's the point — it shows you what's missing. Now make the context richer:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li>If you keep a running notes doc, tell it: <span className="font-mono bg-rose-100 px-1 text-sm">"Also pull from my running notes at [path]"</span></li>
            <li>If you had 1:1s this week, tell it where those notes live</li>
            <li>If a big decision happened over email or Slack, tell it to check there</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed mb-2">
            Then open <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span> and edit the "Where to pull context from" section so it knows where to look every time.
          </p>
          <p className="text-stone-800 text-base leading-relaxed font-bold">Run it again. See the difference.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Cursor */}
        <div id="cursor" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Cursor</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the Manager OS folder</a> and save it somewhere on your computer (Desktop is fine).</li>
            <li>Open Cursor. Go to File &rarr; Open Folder and select your Manager OS folder.</li>
            <li>Open the chat panel (Cmd+L on Mac, Ctrl+L on Windows).</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the Setup Interview file and walk me through it"</span></li>
            <li>Answer the questions one section at a time. It will ask about you, your team, your manager, your projects, and your company.</li>
            <li>When you're done, it will create all your files automatically.</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>In the same chat, type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the weekly update writer skill and run it using the context in my Manager OS folder"</span></li>
            <li>It has access to all your files, same as Claude Code.</li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            The first output will probably be too generic. Now make the context richer:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li>If you keep a running notes doc, tell it: <span className="font-mono bg-rose-100 px-1 text-sm">"Also pull from my running notes at [path]"</span></li>
            <li>Your 1:1 notes from this week</li>
            <li>Any project docs or status updates you keep</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed mb-2">
            Edit <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span> to reference these sources permanently.
          </p>
          <p className="text-stone-800 text-base leading-relaxed font-bold">Run it again.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* ChatGPT */}
        <div id="chatgpt" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">ChatGPT (web)</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the Manager OS folder</a> and save it somewhere on your computer (Desktop is fine).</li>
            <li>Open a new chat in ChatGPT.</li>
            <li>Attach the file <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> from your Manager OS folder (click the paperclip icon or drag it in).</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the attached file and walk me through the setup interview"</span></li>
            <li>Answer the questions one section at a time.</li>
            <li>It will generate the content for each file. Copy-paste each one into the right file in your Manager OS folder (Me/About.md, My Manager/About.md, etc.).</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>Start a new chat. Attach the weekly update writer skill file: <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span></li>
            <li>Also attach the context files the interview generated — your manager's About file, your project summaries.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Use the attached instructions to write my weekly update from this context"</span></li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            The first output will probably be too generic. Think about what other context you have lying around:
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li>A running notes doc from this week? Attach it.</li>
            <li>1:1 notes? Attach those too.</li>
            <li>Screenshot your calendar — it's a rough record of what you actually spent time on.</li>
            <li>A Slack or email thread with a key decision? Screenshot it and attach it.</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed mb-2">
            Edit the skill file to mention these sources in the "Where to pull context from" section, then run it again with the extra context attached.
          </p>
          <p className="text-stone-800 text-base leading-relaxed font-bold">Run it again. See the difference.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Claude web */}
        <div id="claude-web" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Claude (web)</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the Manager OS folder</a> and save it somewhere on your computer (Desktop is fine).</li>
            <li>Open a new chat in Claude.</li>
            <li>Attach the file <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> from your Manager OS folder (click the paperclip icon or drag it in).</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the attached file and walk me through the setup interview"</span></li>
            <li>Answer the questions one section at a time.</li>
            <li>It will generate the content for each file. Copy-paste each one into the right file in your Manager OS folder.</li>
          </ol>
          <p className="text-stone-800 text-base leading-relaxed mb-6 italic">
            Tip: Create a Claude Project for your Manager OS. Upload your context files there so they persist across conversations — you won't have to re-upload every time you want to use a skill.
          </p>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>Start a new chat (or use your Project). Attach the weekly update writer skill file: <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span></li>
            <li>Also attach your context files — manager's About doc, project summaries, anything relevant.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Use the attached instructions to write my weekly update from this context"</span></li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better</h3>
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
          <p className="text-stone-800 text-base leading-relaxed font-bold">Run it again. See the difference.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Gemini */}
        <div id="gemini" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Gemini (web / Google Drive)</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Copy the Manager OS folder into your Google Drive.</a> You can keep the .md files as-is or convert them to Google Docs — either works.</li>
            <li>Open Gemini (gemini.google.com).</li>
            <li>Attach the <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> file from your Drive, or copy-paste the prompt.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the attached file and walk me through the setup interview"</span></li>
            <li>Answer the questions. Gemini can create files directly in your Drive if you ask it to, or you can copy-paste the outputs into the right files.</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>In a new chat, reference the skill file by name or attach it.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Pull from my Manager OS folder in Google Drive to write my weekly update using the weekly update writer skill"</span></li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better — this is where Gemini has a real advantage</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Gemini can read your Gmail, your Google Calendar, and your Google Docs. That's a lot of context most other tools can't reach.
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li><strong>Gmail:</strong> <span className="font-mono bg-rose-100 px-1 text-sm">"Also check my email from this week for anything relevant to my update"</span></li>
            <li><strong>Google Calendar:</strong> <span className="font-mono bg-rose-100 px-1 text-sm">"Look at my calendar this week to see what I spent time on"</span></li>
            <li><strong>Google Docs:</strong> Point it at your running notes if you keep one in Drive.</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed mb-2">
            Edit the skill file in Drive to reference these sources permanently so it checks them every time.
          </p>
          <p className="text-stone-800 text-base leading-relaxed font-bold">Run it again. See the difference.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Copilot */}
        <div id="copilot" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Microsoft 365 Copilot</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the Manager OS folder.</a></li>
            <li>Copy it into OneDrive or SharePoint. You can keep the .md files as-is — Copilot can read them.</li>
            <li>Open Microsoft Copilot.</li>
            <li>Attach the <span className="font-mono bg-rose-100 px-1 text-sm">Setup Interview.md</span> file (click the paperclip icon or drag it in). You can also copy-paste the prompt if attaching doesn't work.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the attached file and walk me through the setup interview"</span></li>
            <li>Answer the questions. Copy-paste the generated content into the right files in your Manager OS folder.</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>Start a new chat. Attach the weekly update writer skill file: <span className="font-mono bg-rose-100 px-1 text-sm">Skills/For Me/Weekly update writer.md</span></li>
            <li>Also attach your context files — manager's About file, project summaries.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Use the attached instructions to write my weekly update from this context"</span></li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better — Copilot has access to your Microsoft ecosystem</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Copilot can read your Outlook, Teams, and calendar. That's context most other tools can't reach.
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li><strong>Outlook:</strong> <span className="font-mono bg-rose-100 px-1 text-sm">"Also check my email from this week for key decisions or updates"</span></li>
            <li><strong>Teams:</strong> <span className="font-mono bg-rose-100 px-1 text-sm">"Look at my Teams conversations for anything relevant"</span></li>
            <li><strong>Calendar:</strong> <span className="font-mono bg-rose-100 px-1 text-sm">"Check my calendar to see what I spent time on this week"</span></li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed mb-2">
            Edit the skill file to reference these sources permanently so it checks them every time.
          </p>
          <p className="text-stone-800 text-base leading-relaxed font-bold">Run it again. See the difference.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Cowork */}
        <div id="cowork" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Claude Cowork</h2>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Set up your system</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li><a href="https://drive.google.com/drive/folders/1dhh25hgwlPN8ptESnWR6NlZdqU95Z5q_" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-stone-600">Download the Manager OS folder.</a></li>
            <li>Upload it to Cowork.</li>
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the Setup Interview file and walk me through it"</span></li>
            <li>Answer the questions. It will generate the content for your files.</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Run the weekly update writer</h3>
          <ol className="text-stone-800 text-base leading-relaxed space-y-3 mb-6 list-decimal list-inside">
            <li>Type: <span className="font-mono bg-rose-100 px-1 text-sm">"Read the weekly update writer skill and run it using my Manager OS context"</span></li>
            <li>Cowork runs in the background — it will come back to you with a draft.</li>
            <li>Look at the output. Could your manager read this in 60 seconds? Would you actually send it?</li>
          </ol>

          <h3 className="text-lg font-bold text-stone-800 mb-2">Make it better</h3>
          <p className="text-stone-800 text-base leading-relaxed mb-3">
            Review the draft. What's missing?
          </p>
          <ul className="text-stone-800 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
            <li>Edit the skill file to point to more specific context — your running notes, 1:1 notes, project docs.</li>
            <li>Upload any additional context you have from this week.</li>
          </ul>
          <p className="text-stone-800 text-base leading-relaxed font-bold">Tell it to run again. See the difference.</p>
        </div>

        <hr className="border-stone-300 mb-12" />

        {/* Closing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">After you've run it twice</h2>
          <p className="text-stone-800 text-lg leading-relaxed mb-4">
            The gap between your first output and your second output is the whole lesson. The system got better because <strong>you told it where to find real context about your work.</strong>
          </p>
          <p className="text-stone-800 text-lg leading-relaxed">
            That's how the Manager OS grows — not by architecting the perfect folder structure upfront, but by running into a gap, filling it, and running again. One use case at a time.
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
                href="https://maven.com/hilary-gridley/ai-powered-people-management/feb-2026/home#62887a"
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
                href="https://maven.com/hilary-gridley/ai-powered-people-management/feb-2026/home#275430"
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
            <li>Post-course video: how I use my whole system day-to-day</li>
            <li>Guide: ideas for things to vibe code</li>
            <li>Guide: ideas for automations and how to set them up</li>
            <li><Link to="/managercopilot" className="font-bold underline hover:text-stone-600">Supermanager Copilot</Link> — bring it any management problem. It helps you figure out what to build and walks you out with a prompt, a spec, or a plan.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Session;
