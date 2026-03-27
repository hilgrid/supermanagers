import React, { useState, useEffect } from 'react';

interface Guide {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

interface Section {
  heading: string;
  content: React.ReactNode;
}

function Prompt({ children }: { children: string }) {
  return (
    <div className="my-4 bg-stone-100 border-l-4 border-stone-400 px-4 py-3 rounded-r-lg">
      <p className="text-stone-700 text-base italic leading-relaxed">"{children}"</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="my-4 bg-stone-100 border border-stone-200 rounded-lg px-4 py-3 overflow-x-auto">
      <code className="text-stone-700 text-sm leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

const guides: Guide[] = [
  {
    id: 'install-claude-code',
    title: 'Install Claude Code',
    subtitle: 'Get Claude Code running on your computer',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>Claude Code is a terminal-based AI tool that can read and write files on your computer, manage your calendar, process emails, and automate workflows. Everything in these guides runs through Claude Code. Here's how to install it on a Mac.</p>
        ),
      },
      {
        heading: 'Steps',
        content: (
          <>
            <ol className="list-decimal list-inside space-y-3">
              <li>Click the <strong>magnifying glass</strong> in the top right of your screen (Spotlight search)</li>
              <li>Type <strong>Terminal</strong></li>
              <li>Open it</li>
              <li>Copy this script:</li>
            </ol>
            <CodeBlock>curl -fsSL https://claude.ai/install.sh | bash</CodeBlock>
            <ol className="list-decimal list-inside space-y-3" start={5}>
              <li>Paste it into the terminal and hit <strong>Enter</strong></li>
            </ol>
            <p className="mt-4">That's it. Follow the prompts and you'll be up and running.</p>
            <p className="mt-4">If you've never used the terminal before, don't worry - Claude's <a href="https://code.claude.com/docs/en/terminal-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 transition-colors">guide for new terminal users</a> is very good.</p>
          </>
        ),
      },
    ],
  },
  {
    id: 'context-directory',
    title: 'Context Directory and Daily Notes',
    subtitle: 'Give Claude a memory so it gets better over time',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>Before any of the other workflows, you need this. A context directory is a folder on your computer where Claude stores what it learns about how you work - your preferences, your schedule history, what's worked and what hasn't. Without it, every conversation starts from zero. With it, Claude gets smarter about you over time.</p>
        ),
      },
      {
        heading: 'Part 1: Create the folder structure',
        content: (
          <>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Open <strong>Claude Code</strong></li>
              <li>Type the following:</li>
            </ol>
            <Prompt>Create a folder called `context` in my home directory. Inside it, create a folder called `admin`. Inside `admin`, create two things: a folder called `daily-notes` and a file called `preferences.md`. The daily-notes folder should be organized with subfolders by year (e.g., `2026`) and then by month (e.g., `03-March`). Create the current year and month folders to start.</Prompt>
            <p className="mb-2">Claude will create the structure. It looks like this:</p>
            <CodeBlock>{`~/context/
  admin/
    preferences.md
    daily-notes/
      2026/
        03-March/`}</CodeBlock>
          </>
        ),
      },
      {
        heading: 'Part 2: Set up your preferences',
        content: (
          <>
            <p className="mb-4">This is where Claude learns how you work. Tell it:</p>
            <Prompt>I want you to ask me three questions to understand my work style and energy patterns, then write what you learn into `preferences.md`. After that, pay attention to what's working and not working for me over time, and proactively suggest updates to preferences when you notice patterns.</Prompt>
            <p className="mb-2">Claude will ask you things like:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>When do you do your best focused work?</li>
              <li>What are your hard constraints (meetings, caregiving, commute)?</li>
              <li>What tends to derail your day?</li>
            </ul>
            <p>Your answers go into <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">preferences.md</code>. Over time, as you plan days together and reflect on what worked, Claude will suggest additions - things like "morning warm-up time helps you ease into focus" or "you consistently overpack your schedule, pick 3 priorities max." You approve or reject the updates. The file gets smarter.</p>
          </>
        ),
      },
      {
        heading: 'Part 3: Set up daily notes',
        content: (
          <>
            <p className="mb-4">Daily notes are created automatically when you plan your day. Tell Claude:</p>
            <Prompt>When I say 'plan my day,' after we lock in the schedule and update my calendar, create a daily note at `~/context/admin/daily-notes/YYYY/MM-Month/YYYY-MM-DD.md`. It should have a schedule table, a running log section for tracking what actually happens during the day, and an end-of-day reflection template.</Prompt>
            <p className="mb-2">Claude will add this instruction to your <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">CLAUDE.md</code> file. From then on, every time you plan your day, a note like this gets created automatically:</p>
            <CodeBlock>{`# Wednesday, March 4, 2026

## Schedule

| Time        | Block                    |
|-------------|--------------------------|
| 9:00-9:30   | Day planning             |
| 9:30-11:30  | Deep work: project X     |
| 12:00-1:00  | Lunch + walk             |
| 1:30-3:00   | Emails + admin           |

## Log

- 9:05 - Planned the day, 3 priorities locked in
- 9:35 - Started project X draft
- 11:00 - Finished first pass

## End of Day Reflection

What got done?
What didn't get done?
What worked?
What would make tomorrow better?`}</CodeBlock>
            <p>The log builds throughout the day as you work with Claude (see Part 4). The reflection is for you to fill in (or dictate to Claude) when you wrap up.</p>
          </>
        ),
      },
      {
        heading: 'Part 4: Turn on the running log',
        content: (
          <>
            <p className="mb-4">This is the part that makes daily notes actually useful. Tell Claude:</p>
            <Prompt>Throughout every conversation, I want you to keep a running log in today's daily note. When something meaningful happens - I finish a task, start something new, hit a blocker, make a decision, switch contexts - add a one-line timestamped entry to the Log section. Don't tell me you're doing it, just do it quietly in the background.</Prompt>
            <p className="mb-2">That's it. From then on, as you work with Claude during the day, the log fills itself in. You'll end up with entries like:</p>
            <CodeBlock>{`## Log

- 9:05 - Planned the day, 3 priorities locked in
- 9:35 - Started draft of project proposal
- 10:20 - Finished first pass
- 10:45 - Emailed Sarah re: timeline - waiting to hear back
- 11:30 - Switched to admin - knocked out 4 emails
- 1:15 - Hit a wall on budget spreadsheet, need numbers from Jake
- 2:00 - Back on proposal, incorporated feedback`}</CodeBlock>
            <p>You never have to write any of this. It just accumulates. Then when you ask "wait, where was I?" or do a weekly review, the log is there. It's also what feeds the end-of-day reflection - when you wrap up, Claude can look at the log and help you fill in what got done and what didn't.</p>
          </>
        ),
      },
      {
        heading: 'Why this matters',
        content: (
          <>
            <p className="mb-2">After a few weeks, you'll have:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>A <strong>preferences file</strong> that actually reflects how you work, not how you think you should work</li>
              <li>A <strong>history of daily notes</strong> you can look back on during weekly reviews</li>
              <li>A Claude that <strong>remembers</strong> your patterns and plans around them instead of asking the same questions every time</li>
            </ul>
            <p className="mt-4">This is the foundation everything else builds on.</p>
          </>
        ),
      },
    ],
  },
  {
    id: 'voice-to-reminders',
    title: 'Voice-to-Reminders',
    subtitle: 'Dictate a reminder from anywhere, have Claude organize it',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>Double-tap the back of your phone, dictate a thought, it lands in your Reminders app, and Claude syncs and organizes it when you plan your day.</p>
        ),
      },
      {
        heading: 'Part 1: Create the "Inbox" list in Reminders',
        content: (
          <>
            <p className="mb-2">Skip this if you already have one.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open the <strong>Reminders</strong> app</li>
              <li>Tap <strong>Add List</strong> (bottom right)</li>
              <li>Name it <strong>Inbox</strong></li>
              <li>Tap <strong>Done</strong></li>
            </ol>
          </>
        ),
      },
      {
        heading: 'Part 2: Build the Shortcut',
        content: (
          <>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Open the <strong>Shortcuts</strong> app</li>
              <li>Tap <strong>+</strong> (top right) to create a new shortcut</li>
              <li>Tap <strong>Add Action</strong></li>
            </ol>
            <p className="font-bold mb-2">Action 1 - Dictate Text:</p>
            <ol className="list-decimal list-inside space-y-2 mb-4" start={4}>
              <li>Search for <strong>Dictate Text</strong> and add it</li>
              <li>Set "Stop Listening" to <strong>After Pause</strong> (it'll stop automatically when you stop talking - no need to tap anything)</li>
            </ol>
            <p className="font-bold mb-2">Action 2 - Add New Reminder:</p>
            <ol className="list-decimal list-inside space-y-2 mb-4" start={6}>
              <li>Tap <strong>+</strong> below the first action</li>
              <li>Search for <strong>Add New Reminder</strong> and add it</li>
              <li>Tap the reminder title field and make sure it's set to the blue <strong>"Dictated Text"</strong> variable from the previous step (it should auto-populate - if not, tap the field and select it from the variables)</li>
              <li>Tap <strong>List</strong> and select <strong>Inbox</strong></li>
            </ol>
            <p className="font-bold mb-2">Name it:</p>
            <ol className="list-decimal list-inside space-y-2" start={10}>
              <li>Tap the shortcut name at the top, rename it to <strong>Add to Inbox</strong></li>
              <li>Tap <strong>Done</strong></li>
            </ol>
          </>
        ),
      },
      {
        heading: 'Part 3: Set up Back Tap',
        content: (
          <>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Open <strong>Settings</strong></li>
              <li>Go to <strong>Accessibility → Touch → Back Tap</strong></li>
              <li>Tap <strong>Double Tap</strong></li>
              <li>Scroll down to the <strong>Shortcuts</strong> section</li>
              <li>Select <strong>Add to Inbox</strong></li>
              <li>Tap back to save</li>
            </ol>
            <p>Now double-tap the back of your phone. You should see the dictation interface pop up. Say your reminder, pause, and it'll be added to your Inbox list automatically.</p>
          </>
        ),
      },
      {
        heading: 'Part 4: Connect it to Claude Code',
        content: (
          <>
            <p className="mb-4">This is where the magic happens. You're going to tell Claude to build the bridge between your Reminders app and a markdown file it can read and organize for you.</p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Open <strong>Claude Code</strong> (the CLI - in your terminal)</li>
              <li>Type the following, then hit enter:</li>
            </ol>
            <Prompt>I have a Reminders list called Inbox on my Mac. I want you to write a script that pulls all the open items from that list into a markdown file. Then I want you to keep an organized version of my reminders in a separate markdown file - categorized by topic. When I say 'plan my day,' sync my reminders automatically as part of that process.</Prompt>
            <ol className="list-decimal list-inside space-y-2 mb-4" start={3}>
              <li>Claude will write an AppleScript that reads your Reminders app and dumps the items to a file. It'll save the script somewhere in your project folder. <strong>You'll need to grant permission</strong> the first time it runs - macOS will ask if the terminal can access Reminders. Say yes.</li>
              <li>Claude will add an instruction to your <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">CLAUDE.md</code> file so that syncing reminders happens automatically whenever you plan your day.</li>
            </ol>
            <p className="mb-2">After that, the flow is:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>You dictate reminders throughout the day whenever they come to you (Parts 1-3)</li>
              <li>When you sit down to plan, just say <strong>"plan my day"</strong></li>
              <li>Claude automatically syncs your Reminders app, organizes everything by category, and uses that list when helping you build your schedule</li>
            </ul>
            <p><strong>That's it.</strong> You talk to your phone, then you talk to Claude. Everything in between is handled.</p>
          </>
        ),
      },
      {
        heading: 'Tips',
        content: (
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Double vs. triple tap:</strong> Double is faster but can fire accidentally (setting your phone down, adjusting grip). If that bugs you, use triple tap instead.</li>
            <li><strong>Thick cases:</strong> Back Tap uses the accelerometer. Heavy cases can make it less responsive. Tap firmly near the center of the back.</li>
            <li><strong>No confirmation sound:</strong> The shortcut runs silently. You'll see a brief overlay but no audio confirmation. Trust it or spot-check in Reminders.</li>
            <li><strong>Works from lock screen</strong> but may prompt Face ID before completing.</li>
            <li><strong>The Reminders app sync is one-directional:</strong> Claude reads from Reminders but doesn't write back to it. Clear completed items in the Reminders app yourself, or they'll keep showing up in the sync.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'connect-calendar',
    title: 'Connect Your Calendar',
    subtitle: 'Let Claude see and add to your schedule',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>Before "Plan My Day" works, Claude needs access to your calendar. The good news: you don't need to figure out how to set this up. Just ask.</p>
        ),
      },
      {
        heading: 'What to do',
        content: (
          <>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Open <strong>Claude Code</strong></li>
              <li>Type:</li>
            </ol>
            <Prompt>I want to connect you to my Google Calendar so you can see my events and add new ones. Walk me through the steps to do that in the simplest way possible.</Prompt>
            <ol className="list-decimal list-inside space-y-2" start={3}>
              <li>Claude will walk you through it. It'll likely involve setting up an MCP server (a plugin that lets Claude talk to Google Calendar). You'll need to authorize it with your Google account. Claude will tell you exactly what to click and where.</li>
              <li>If something doesn't work the first time, just tell Claude what happened. "It gave me an error" or "I don't see that option" is enough. It'll troubleshoot with you.</li>
            </ol>
            <p className="mt-4">That's it. Once it's connected, Claude can check what's on your calendar, find conflicts, and add events directly. You'll use this every time you plan your day.</p>
          </>
        ),
      },
      {
        heading: 'Tips',
        content: (
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Multiple calendars:</strong> If you have a work calendar and a personal calendar (or a partner's calendar), mention that upfront. Claude can check all of them for conflicts.</li>
            <li><strong>Permissions:</strong> Google will ask you to approve access. This is normal. Claude needs read and write access to see your events and add new ones.</li>
            <li><strong>If the connection breaks:</strong> Just tell Claude. "My calendar connection isn't working" is enough. It'll walk you through fixing it.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'plan-my-day',
    title: 'Plan My Day',
    subtitle: 'Pull everything together and build a schedule that works',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>This is the workflow that ties it all together. You say "plan my day" and Claude pulls your reminders, checks your calendar, and helps you build a realistic schedule. Then it adds the events to your calendar and creates a daily note to track everything. This works best after you've set up the previous guides - your context directory, voice-to-reminders, and calendar connection. But even with just a calendar, it's useful.</p>
        ),
      },
      {
        heading: 'What happens when you say "plan my day"',
        content: (
          <>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Open <strong>Claude Code</strong></li>
              <li>Say: <strong>"Plan my day"</strong></li>
            </ol>
            <p className="mb-2">Claude will:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Sync your reminders</strong> - pulls in anything you've dictated since last time</li>
              <li><strong>Check your calendar</strong> - sees what meetings and commitments are already locked in</li>
              <li><strong>Show you the lay of the land</strong> - "You have 3 meetings today, here's what's on your reminders list, and here's what rolled over from yesterday"</li>
              <li><strong>Ask what else you need to get done</strong> - this is where you add anything that's on your mind. You can type it or dictate it. "Oh yeah, I need to send that email, and I want to work on the proposal, and I should probably deal with that insurance thing."</li>
            </ul>
            <p>Then you go back and forth. Claude proposes a schedule, you push back - "move that earlier," "I won't have time for that," "I need a break after that meeting." It's a conversation, not a form. You talk it out until the schedule feels right.</p>
          </>
        ),
      },
      {
        heading: 'What to tell Claude to set this up',
        content: (
          <>
            <p className="mb-4">Tell Claude:</p>
            <Prompt>When I say 'plan my day,' I want you to do the following: First, sync my reminders. Then check my calendar for today's existing events. Show me what's already scheduled and what's on my list. Ask me what else I need to get done. Then help me build a schedule around my fixed commitments. Once I agree, add the time blocks to my calendar and create a daily note.</Prompt>
            <p>Claude will add this to your <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">CLAUDE.md</code> file so it remembers the routine.</p>
          </>
        ),
      },
      {
        heading: 'The back-and-forth is the point',
        content: (
          <>
            <p className="mb-2">This isn't "Claude makes a schedule and you accept it." The conversation is where the value is. You might say:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>"That's too many things. What are the top 3?"</li>
              <li>"I'm not going to have energy for deep work after that meeting, move it to the morning"</li>
              <li>"Can you check if Colin has anything on his calendar at 2? I need him for this."</li>
              <li>"Actually, forget the insurance thing. It can wait."</li>
            </ul>
            <p>Claude will adjust. If you're packing too much in (and you will), it'll push back - "Based on your patterns, you usually get through about 3 big things. Which 3 matter most today?" This only gets better over time as your preferences file builds up.</p>
          </>
        ),
      },
      {
        heading: 'After you agree',
        content: (
          <>
            <p className="mb-2">Once the schedule is locked:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Calendar updated</strong> - time blocks added around your existing meetings</li>
              <li><strong>Daily note created</strong> - schedule table, empty log section, end-of-day reflection template</li>
              <li><strong>Running log starts</strong> - as you work with Claude throughout the day, it tracks what you're actually doing (see the Context Directory guide, Part 4)</li>
            </ul>
          </>
        ),
      },
      {
        heading: 'When your day falls apart',
        content: (
          <>
            <p className="mb-4">It will. The baby will have a meltdown, a meeting will run long, something urgent will come up. When that happens, just come back and say:</p>
            <Prompt>My day blew up. I haven't gotten anything done. Help me figure out what still matters and replan the rest of the day.</Prompt>
            <p>Claude will look at what you planned, what you've actually done (from the log), and what time you have left. Then it'll help you pick the one or two things that still matter and let go of the rest.</p>
          </>
        ),
      },
      {
        heading: 'Tips',
        content: (
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Use dictation.</strong> Talking through your day out loud is faster and more natural than typing it. Just hold the mic button and ramble.</li>
            <li><strong>Don't overplan.</strong> If Claude suggests 3 priorities and you want to add a 4th, it might push back. That's by design. You can override it, but it's usually right.</li>
            <li><strong>It gets better.</strong> The first few times, Claude won't know your patterns. It'll schedule things at the wrong time or underestimate how long meetings drain you. Correct it and tell it to remember. After a couple weeks, the plans get surprisingly good.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'recording-mode',
    title: 'Recording Mode',
    subtitle: 'Anonymize everything when you need to demo or screen-record',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>If you want to record yourself using Claude - for a demo, a podcast, a screen share - you probably don't want real names, real emails, and real calendar events showing up on screen. Recording mode tells Claude to anonymize everything automatically, then restore it all when you're done.</p>
        ),
      },
      {
        heading: 'How it works',
        content: (
          <>
            <p className="mb-4">This is built as a "skill" in Claude Code - a reusable command you can trigger anytime. You set it up once, and from then on you just type a slash command to turn it on or off.</p>
            <p className="mb-2">When recording mode is on, Claude will:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Replace every real name with a fake one (family, colleagues, students - everyone)</li>
              <li>Anonymize companies, email subjects, dollar amounts, and dates</li>
              <li>Keep the structure and workflow identical - nothing changes about how you work, just the data flowing through it</li>
              <li>Use fake names for calendar events</li>
              <li>Stay consistent - same real person always maps to the same fake name</li>
            </ul>
            <p>When you turn it off, Claude reverses everything - restores real names in files, cleans up fake calendar events, and shows you a summary of what it changed back.</p>
          </>
        ),
      },
      {
        heading: 'How to set it up',
        content: (
          <>
            <p className="mb-4">Tell Claude:</p>
            <Prompt>I want to create a recording mode skill. When I type /recording-on, you should anonymize all identifying information in everything you output or write to files - names, companies, email subjects, dollar amounts. Keep the workflows identical, just swap the data. Stay consistent with the same fake names. When I type /recording-off, restore everything to real data and show me what you changed back.</Prompt>
            <p>Claude will create the skill files and set up the slash commands. After that, your flow is:</p>
            <ol className="list-decimal list-inside space-y-2 mt-4">
              <li>About to record? Type <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/recording-on</code></li>
              <li>Do your demo - everything looks real but isn't</li>
              <li>Done recording? Type <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/recording-off</code></li>
              <li>Claude restores all your real data</li>
            </ol>
          </>
        ),
      },
      {
        heading: 'Tips',
        content: (
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Check before you publish.</strong> After recording, scrub through the video for any real info that slipped through. Claude is thorough but not perfect.</li>
            <li><strong>It works with everything.</strong> Email triage, calendar, daily notes, reminders - recording mode covers all of it.</li>
            <li><strong>The restore is automatic.</strong> You don't need to manually fix anything. Claude tracks what it changed and puts it all back.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'return-tracker',
    title: 'Return Tracker',
    subtitle: 'Never miss a return window again',
    sections: [
      {
        heading: 'What this is',
        content: (
          <p>You buy something online, you're not sure about it, and then 45 days later you realize you missed the return window. This skill scans your email for order confirmations, figures out the return deadline for each one based on the retailer's policy, and flags anything that's about to expire. It can also add return trips to your calendar and batch multiple returns into one errand.</p>
        ),
      },
      {
        heading: 'How it works',
        content: (
          <>
            <p className="mb-2">When you run the return tracker, Claude:</p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li><strong>Scans your Gmail</strong> for order confirmation emails from the past week (or whatever window you set)</li>
              <li><strong>Identifies what you bought</strong> and from where</li>
              <li><strong>Looks up the return policy</strong> - it knows the policies for common retailers (Amazon is 30 days, Nordstrom is 40, Target is 90, etc.) and defaults to 30 days for anything it doesn't recognize</li>
              <li><strong>Calculates the deadline</strong> for each order</li>
              <li><strong>Flags anything urgent</strong> - returns due in the next 7 days get called out</li>
            </ol>
            <p>If you have urgent returns, it'll offer to add a "returns trip" to your calendar or a reminder to your list. If you have multiple returns due around the same time, it'll suggest batching them into one trip.</p>
          </>
        ),
      },
      {
        heading: 'How to set it up',
        content: (
          <>
            <p className="mb-4">Tell Claude:</p>
            <Prompt>I want to build a return tracker. I want you to scan my Gmail for order confirmation emails, figure out the return deadline for each order based on the retailer's return policy, and save the results to a file. Flag anything due in the next 7 days as urgent. Offer to add return trips to my calendar or reminders list when something is about to expire.</Prompt>
            <p className="mb-4">Claude will need access to your Gmail to make this work. If you've already connected your email for another workflow (like email triage), it'll reuse those credentials. If not, it'll walk you through the OAuth setup - similar to connecting your calendar.</p>
            <p>Once it's set up, you can run it on demand anytime, or tell Claude to check automatically when you plan your day.</p>
          </>
        ),
      },
      {
        heading: 'Tips',
        content: (
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Run it weekly.</strong> A quick weekly check catches everything before it expires. You can add it to your weekly review or just run it whenever you think of it.</li>
            <li><strong>It learns your retailers.</strong> The more you use it, the more return policies it knows. If it gets one wrong, just correct it.</li>
            <li><strong>Batch your returns.</strong> If Claude says you have 3 returns due this week, ask it to find the most efficient route or suggest a single trip that covers all the drop-off locations.</li>
            <li><strong>Make it automatic.</strong> If you already have a "plan my day" workflow, you can tell Claude to run the return tracker as part of that process so you never have to remember to check. It'll add a little time to your morning planning, but you'll never miss a return window.</li>
          </ul>
        ),
      },
    ],
  },
];

const HowIAI: React.FC = () => {
  const [openGuide, setOpenGuide] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && guides.some(g => g.id === hash)) {
      setOpenGuide(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const toggleGuide = (id: string) => {
    const next = openGuide === id ? null : id;
    setOpenGuide(next);
    if (next) {
      window.history.replaceState(null, '', `#${next}`);
      setTimeout(() => {
        document.getElementById(next)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <a
          href="/"
          className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors"
        >
          &larr; Home
        </a>

        <div className="mt-8 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            How to set up everything Hilary demoed on How I AI
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Pick the one you want to set up and follow along.
          </p>
          <p className="text-stone-500 text-base mt-3">
            <a
              href="https://www.figma.com/design/h0IohJOcQFYMPEvgYBnIJV/how-i-ai?node-id=0-1&t=VrRcivvoQAo83wwQ-0"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-700 transition-colors"
            >
              Screenshots of everything demoed on the show
            </a>
          </p>
        </div>

        {/* Newsletter signup */}
        <div className="mt-10 mb-10">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Sign up for Hilary's newsletter
          </h2>
          <iframe
            src="https://hils.substack.com/embed"
            width="100%"
            height="320"
            style={{ border: '1px solid #EEE', background: 'white', borderRadius: '8px' }}
            frameBorder="0"
            scrolling="no"
          />
        </div>

        <h2 className="text-2xl font-bold text-stone-800 mb-6">
          Setup guides
        </h2>

        {/* Guide order indicator */}
        <div className="mb-10 mt-8 flex items-center gap-2 text-sm text-stone-400">
          <span>Start here</span>
          <span>→</span>
          {guides.map((g, i) => (
            <React.Fragment key={g.id}>
              <button
                onClick={() => toggleGuide(g.id)}
                className={`hover:text-stone-600 transition-colors ${openGuide === g.id ? 'text-stone-800 font-medium' : ''}`}
              >
                {i + 1}
              </button>
              {i < guides.length - 1 && <span>→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Guides */}
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div
              key={guide.id}
              id={guide.id}
              className="border border-stone-200 rounded-lg bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleGuide(guide.id)}
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-stone-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-stone-400">
                      {index + 1}
                    </span>
                    <h2 className="text-xl font-bold text-stone-800">
                      {guide.title}
                    </h2>
                  </div>
                  <p className="text-stone-500 text-base ml-7">
                    {guide.subtitle}
                  </p>
                </div>
                <span className="text-stone-400 text-xl mt-1 flex-shrink-0">
                  {openGuide === guide.id ? '-' : '+'}
                </span>
              </button>

              {openGuide === guide.id && (
                <div className="px-6 pb-6 border-t border-stone-100">
                  <div className="space-y-8 mt-6">
                    {guide.sections.map((section, i) => (
                      <div key={i}>
                        <h3 className="text-lg font-bold text-stone-800 mb-3">
                          {section.heading}
                        </h3>
                        <div className="text-stone-700 text-base leading-relaxed space-y-3">
                          {section.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIAI;
