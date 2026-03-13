export interface ContentBlock {
  type: 'text' | 'prompt' | 'note' | 'steps' | 'heading' | 'instruction';
  text?: string;
  label?: string;
  variant?: 'fail' | 'succeed' | 'neutral';
  items?: string[];
}

export interface DayData {
  day: number;
  title: string;
  content: ContentBlock[];
  keyTakeaway: string;
}

export interface WeekData {
  number: number;
  theme: string;
  tool: string;
  description: string;
  days: DayData[];
}

export const weeks: WeekData[] = [
  {
    number: 1,
    theme: 'Show Up',
    tool: 'Claude web',
    description:
      'The hardest part is starting. This week is deliberately low-friction \u2014 all you need is Claude on the web. You\u2019ll practice the fundamentals that make everything else work, and start building the instinct to reach for AI when you have a problem.',
    days: [
      {
        day: 0,
        title: 'Before You Start',
        content: [
          {
            type: 'steps',
            items: [
              'Get a paid Claude account. You need Claude Pro or Team at claude.ai. The free tier won\u2019t cut it.',
              'Switch to the best model. Open claude.ai, click the model selector at the top of any chat, and choose Claude Opus. The model matters \u2014 you wouldn\u2019t give your hardest problem to your most junior person.',
            ],
          },
        ],
        keyTakeaway:
          'Once you have a paid account and Opus selected, you\u2019re ready to go.',
      },
      {
        day: 1,
        title: 'Ask for the Steps First',
        content: [
          {
            type: 'text',
            text: 'Most people open an AI chat, type a vague request, and hope for the best. That\u2019s like walking into a gym with no plan. Today\u2019s exercise is simple: before the AI starts working, ask it to show you the steps it\u2019ll take. If the plan doesn\u2019t make sense, you fix it in two minutes instead of throwing away the output.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai and try both prompts.',
          },
          {
            type: 'prompt',
            label: 'First, paste this prompt',
            variant: 'fail',
            text: 'Create an onboarding plan for new hires on my team.',
          },
          {
            type: 'prompt',
            label: 'Now paste this one instead',
            variant: 'succeed',
            text: 'I need to create an onboarding plan for new hires on my team. Before you write the plan, walk me through the steps you\u2019d take to build a good one.',
          },
        ],
        keyTakeaway:
          'Align on how the work is going to get done before it happens.',
      },
      {
        day: 2,
        title: 'Define What Good Looks Like',
        content: [
          {
            type: 'text',
            text: 'Before you can evaluate any output, you need to know what good looks like. Most people skip this step and jump straight to reacting. Without a clear picture of what \u201cgood\u201d means, feedback becomes a moving target \u2014 you keep asking for changes, the AI keeps guessing, and you\u2019re never sure when it\u2019s done.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai and try both prompts. Notice how the second one forces alignment before any work begins.',
          },
          {
            type: 'prompt',
            label: 'First, paste this prompt',
            variant: 'fail',
            text: 'Write a self-review for my performance review cycle. I\u2019m a senior product manager. This is for demo purposes, so don\u2019t ask me follow-up questions, just use an illustrative example.',
          },
          {
            type: 'prompt',
            label: 'Now paste this one instead',
            variant: 'succeed',
            text: 'I need to write a self-review for my performance review cycle. I\u2019m a senior product manager. This is for demo purposes, so don\u2019t ask me follow-up questions, just use an illustrative example. Before you write anything, give me 5 criteria that distinguish a great self-review from a mediocre one.',
          },
        ],
        keyTakeaway:
          'Align on what good looks like before the work happens. This can be as simple as defining the top 3\u20135 criteria for success.',
      },
      {
        day: 3,
        title: 'Check for Clarity',
        content: [
          {
            type: 'text',
            text: 'Before the AI starts working, have it tell you what it thinks the job is. Don\u2019t ask \u201cdoes this make sense?\u201d \u2014 have it explain back what it understood. This is how you find out whether you were actually clear.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai. Start a new conversation and paste in each prompt below, one at a time.',
          },
          {
            type: 'prompt',
            label: 'First, paste this prompt',
            variant: 'fail',
            text: 'I need to give my team feedback about how they run meetings. The meetings are too long, there\u2019s no agenda, and people go off-topic. But the team is new and I don\u2019t want to come across as micromanaging \u2014 I want them to own the fix, not feel like I\u2019m imposing rules. Does that make sense?',
          },
          {
            type: 'prompt',
            label: 'Now paste this one instead',
            variant: 'succeed',
            text: 'I need to give my team feedback about how they run meetings. The meetings are too long, there\u2019s no agenda, and people go off-topic. But the team is new and I don\u2019t want to come across as micromanaging \u2014 I want them to own the fix, not feel like I\u2019m imposing rules. Before you do anything, explain back to me what you think I\u2019m asking for and what the constraints are.',
          },
        ],
        keyTakeaway:
          'You can\u2019t validate whether the AI understood unless you ask it to explain back. The succeed prompt takes 10 extra seconds \u2014 and catches misunderstandings before they become bad output.',
      },
      {
        day: 4,
        title: 'Align on Structure Before Writing Content',
        content: [
          {
            type: 'text',
            text: 'Sometimes you read a draft and something feels off but you can\u2019t put your finger on it. You start giving feedback on the writing \u2014 tighten this paragraph, change that word \u2014 but it never quite gets there. Usually the problem isn\u2019t the writing. It\u2019s that the information is in the wrong order, or the framing is wrong for the audience, or it\u2019s answering a different question than the one that matters. That\u2019s a structure problem, not a writing problem. And the easiest time to fix it is before anyone starts writing.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai and run these two prompts in separate conversations. Compare the outputs.',
          },
          {
            type: 'prompt',
            label: 'First, paste this prompt',
            variant: 'fail',
            text: 'Write me a memo about why we need to migrate our analytics platform.',
          },
          {
            type: 'prompt',
            label: 'Now paste this one instead',
            variant: 'succeed',
            text: 'I need to write a memo about why we need to migrate our analytics platform. Before you write anything, propose 3 different structures this memo could follow. For each one, tell me what it prioritizes and when it would be the best choice. I\u2019ll pick one, then we\u2019ll write it together.',
          },
        ],
        keyTakeaway:
          'Aligning on how work is organized before doing the work prevents the most common type of rework.',
      },
      {
        day: 5,
        title: 'Say Exactly What You Mean',
        content: [
          {
            type: 'text',
            text: 'You probably have a clearer picture in your head of what you want than you\u2019re communicating. When the AI gives you something off, it\u2019s usually because it had a dozen directions it could have gone, and you didn\u2019t tell it which one. Today you\u2019ll see exactly how much a single word changes the output.',
          },
          {
            type: 'note',
            text: 'If you want to go deeper on finding the right words, check out the [AI Steering Wheel](/steeringwheel) \u2014 it\u2019s a tool for dialing in tone, structure, and intent.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai. Run both prompts and pay attention to how different the outputs are.',
          },
          {
            type: 'prompt',
            label: 'First, paste this prompt',
            variant: 'fail',
            text: 'Draft an email to my VP about our hiring plan. Use a hypothetical situation and don\u2019t ask me any questions about it.',
          },
          {
            type: 'prompt',
            label: 'Now paste this one instead',
            variant: 'succeed',
            text: 'Draft an email to my VP about our hiring plan. Use a hypothetical situation and don\u2019t ask me any questions about it. Give me four versions:\n1. One that\u2019s extremely practical\n2. One that\u2019s extremely strategic\n3. One that\u2019s extremely direct\n4. One that finds the right balance between all three',
          },
        ],
        keyTakeaway:
          'You have expectations in your head that feel obvious to you. But the AI has a dozen ways it could go, and it\u2019s guessing which one you want. The more precise your language, the less guessing it has to do.',
      },
      {
        day: 6,
        title: 'Give Them the Right Context',
        content: [
          {
            type: 'text',
            text: 'The AI does better work when it knows what you know. The single biggest thing you can do to get better output is give it the context it needs to do the job well.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai in your browser. You\u2019re going to run two prompts and compare the outputs.',
          },
          {
            type: 'prompt',
            label: 'First, paste this prompt',
            variant: 'fail',
            text: 'Help me prepare for my 1:1 tomorrow.',
          },
          {
            type: 'prompt',
            label: 'Now paste this one instead',
            variant: 'succeed',
            text: 'I\u2019m a product manager at a mid-size SaaS company. I have a 1:1 tomorrow with a direct report who just missed a deadline on a feature launch. They\u2019re usually reliable, and I don\u2019t think it\u2019s a performance issue \u2014 I think they\u2019re overwhelmed. Help me prepare 3 talking points that are supportive but still address the missed deadline directly.',
          },
          {
            type: 'note',
            text: 'Notice the difference. The first prompt could go in any direction. The second one gives the AI everything it needs to do useful work.',
          },
        ],
        keyTakeaway:
          'When AI delivers the wrong thing, the first question isn\u2019t \u201cwhat did it get wrong?\u201d \u2014 it\u2019s \u201cwhat did I fail to tell it?\u201d',
      },
      {
        day: 7,
        title: 'Hit the Wall',
        content: [
          {
            type: 'text',
            text: 'Every time you start a new conversation in web chat, you have to rebuild the context from scratch. Even if it\u2019s the same project, the same role, the same instructions you gave last time. Today you\u2019re going to feel that.',
          },
          {
            type: 'instruction',
            text: 'Open claude.ai and start a brand new conversation. Try to get the same self-review criteria you got on Day 2 \u2014 but don\u2019t paste anything in. Just describe what you want from memory. Notice how much work it takes to rebuild the role, the situation, the standards. All of it, from scratch.',
          },
          {
            type: 'text',
            text: 'That\u2019s what you\u2019ll do every single time unless you have a system for carrying context forward. Before you lose everything you\u2019ve built this week, let\u2019s save it.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Take everything we\u2019ve discussed this week \u2014 how I like things structured, my communication style, my standards for what \u201cgood\u201d looks like \u2014 and compile it into a single document I can save. Format it as a set of instructions an AI partner would need to work with me effectively. Title it \u201cMy Operating Manual.\u201d',
          },
          {
            type: 'instruction',
            text: 'Download this document and save it somewhere. You\u2019ll use it tomorrow.',
          },
        ],
        keyTakeaway:
          'If you don\u2019t have a system where context can be accessed and updated over time, you\u2019ll hit a ceiling on how useful these tools can be. Tomorrow, we fix that.',
      },
    ],
  },
  {
    number: 2,
    theme: 'Build the Routine',
    tool: 'Claude Code',
    description:
      'Now you\u2019ll set up Claude Code \u2014 a tool that runs on your computer and can read and write files. This is where AI stops being a chat window and starts being a system that remembers what you told it yesterday. You\u2019re building the routine that makes showing up tomorrow easier than it was today.',
    days: [
      {
        day: 8,
        title: 'Set Up Claude Code',
        content: [
          {
            type: 'text',
            text: 'Claude Code is a tool that runs on your computer and can read and write files. You don\u2019t have to know how to code to use it, but because it can write code \u2014 build a deck, generate a template, automate a workflow \u2014 it unlocks a lot more than chat. Instead of re-typing context and instructions every time, you can save to a file once and it\u2019s there every time you open it.',
          },
          {
            type: 'heading',
            text: 'What to do',
          },
          {
            type: 'steps',
            items: [
              'Open your terminal (on Mac: search for \u201cTerminal\u201d in Spotlight). You\u2019ll see a window with a blinking cursor.',
              'Copy the command below and paste it into the terminal. Press Enter and wait for it to finish.',
            ],
          },
          {
            type: 'prompt',
            label: 'Copy this command',
            variant: 'neutral',
            text: 'npm install -g @anthropic-ai/claude-code',
          },
          {
            type: 'steps',
            items: [
              'Type claude and press Enter. This starts Claude Code.',
              'It will walk you through connecting your account.',
              'Paste the prompt below. Replace the bracketed section with the \u201cWorking With Me\u201d document you built on Day 7.',
            ],
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Create a folder called my-context and inside it create a file called CLAUDE.md with the following instructions:\n\n[Paste your Working With Me document here]',
          },
          {
            type: 'instruction',
            text: 'Watch what happens. It creates the folder and the file on your computer. You can open them in Finder and see them.',
          },
          {
            type: 'note',
            text: 'When you\u2019re done for the day, just close the terminal. Your files are saved on your computer. Tomorrow, open Terminal, type claude, and you\u2019re right back where you left off.',
          },
        ],
        keyTakeaway:
          'You just installed a tool, created a folder, and saved a file \u2014 all by telling it what to do in plain English. That\u2019s what Claude Code is: instead of just answering questions, it does things on your computer.',
      },
      {
        day: 9,
        title: 'Organize Your Existing Context',
        content: [
          {
            type: 'instruction',
            text: 'Open Terminal, type `claude`, and press Enter to start Claude Code.',
          },
          {
            type: 'text',
            text: 'You have useful stuff scattered all over your computer \u2014 templates in Downloads, notes in random folders, docs you saved months ago and forgot about. You know it\u2019s there somewhere, but finding it and organizing it is a chore you never get to. Claude Code can scan your computer and surface what\u2019s relevant. You just decide what to keep.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Look in my Downloads folder and my Documents folder. Are there any documents \u2014 templates, reports, notes, guides \u2014 that might be useful for building out my working system? Tell me what you find and I\u2019ll tell you what to move in here.',
          },
          {
            type: 'instruction',
            text: 'Look at what it surfaces. Some of it will be useful, some won\u2019t. Tell it what to keep \u2014 \u201cmove those first three in, skip the rest.\u201d',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'Now, based on my CLAUDE.md and whatever documents are in this folder \u2014 what do you know about how I work?',
          },
        ],
        keyTakeaway:
          'In chat, the AI decides what it remembers. In Claude Code, the context lives in files you can see, edit, and control. You\u2019re not hoping it remembers \u2014 you\u2019re telling it exactly what to know. And it can go find things on your computer, but you decide what matters.',
      },
      {
        day: 10,
        title: 'Build Your First Team Profile',
        content: [
          {
            type: 'instruction',
            text: 'Open Terminal, type `claude`, and press Enter.',
          },
          {
            type: 'text',
            text: 'The AI can help you work with the people you work with \u2014 prep for a 1:1, draft a message, think through a tricky conversation \u2014 but only if it knows who those people are. Right now it doesn\u2019t. Today you fix that. Pick someone you send regular updates to \u2014 your manager, the CEO, a key stakeholder.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Create a folder called team/ and a file for [name]. I\u2019ll ask you to refer to this file when prepping for 1:1s with them or working on anything that involves them. Ask me three questions to get the information you\u2019d need to make this file useful, and then go ahead and create it.',
          },
          {
            type: 'instruction',
            text: 'Open your project folder and find the file Claude Code just created. Open it in any text editor \u2014 TextEdit, Notes, whatever you have. That file is on your computer. You can read it, edit it, and build on it.',
          },
        ],
        keyTakeaway:
          'The AI can\u2019t help you navigate a relationship it knows nothing about. Now it knows.',
      },
      {
        day: 11,
        title: 'Work at the Speed of Thinking',
        content: [
          {
            type: 'instruction',
            text: 'Open Terminal, type `claude`, and press Enter.',
          },
          {
            type: 'text',
            text: 'You just spent Day 10 typing out answers about someone you work with. It probably took longer than it needed to. From here on out, you\u2019ll be telling Claude Code a lot about how you work, who you work with, and what you care about. Typing all of that is slow. Talking is faster, and closer to how you actually think.',
          },
          {
            type: 'heading',
            text: 'What to do',
          },
          {
            type: 'steps',
            items: [
              'Mac: Open System Settings \u2192 Keyboard \u2192 scroll down to Dictation \u2192 turn it on. Set the shortcut to whatever\u2019s easiest for you (double-press Fn is the default).',
              'Windows: Press Win+H to open dictation. It\u2019s on by default.',
            ],
          },
          {
            type: 'text',
            text: 'Now open your terminal, type claude, press Enter, and make sure you\u2019re in your my-context folder. Click into the prompt, trigger dictation, and talk instead of typing.',
          },
          {
            type: 'prompt',
            label: 'Prompt (dictate this)',
            variant: 'neutral',
            text: 'Go back to the team profile we created yesterday for [name]. Add the following context: [just talk \u2014 how you\u2019d describe this person to a trusted colleague. What\u2019s going on with them right now, what are they good at, what do you need to be thoughtful about.]',
          },
        ],
        keyTakeaway:
          'The fastest way to get your knowledge into the system is to talk. Don\u2019t write \u2014 dictate. You can also use a dedicated tool like Wispr Flow, which cleans up filler words automatically and works in any text field on your computer.',
      },
      {
        day: 12,
        title: 'Fix It Once, Fix It Forever',
        content: [
          {
            type: 'text',
            text: 'In chat, every correction you make disappears when the conversation ends. In Claude Code, you can save a correction to a file so it applies to everything going forward. The system gets better every time you use it.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Read [name]\u2019s profile in team/ and draft an email to them about [something relevant \u2014 a project update, a meeting follow-up, a request].',
          },
          {
            type: 'text',
            text: 'Read the draft. It\u2019ll be decent but probably off in some way. Now give it specific feedback:',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: '[Name] actually prefers more detail than this \u2014 they like to see the reasoning behind a decision, not just the conclusion. Can you rewrite with that in mind?',
          },
          {
            type: 'text',
            text: 'Read the new draft. Better, right? Now make the correction permanent:',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'Add that note to [name]\u2019s profile in team/ \u2014 that they prefer detailed communication with reasoning, not just conclusions. That way you don\u2019t make that mistake next time I\u2019m writing to them.',
          },
        ],
        keyTakeaway:
          'You gave a correction once and it\u2019s now part of the system. Next time you write to this person, you won\u2019t have to say it again.',
      },
      {
        day: 13,
        title: 'Document a Workflow',
        content: [
          {
            type: 'text',
            text: 'You do your weekly status update on autopilot. But could you explain the process clearly enough that someone else would do it the way you want? Most people can\u2019t. The process feels automatic, so they\u2019ve never articulated the actual steps. Having the AI interview you forces you to make it explicit.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Read [name]\u2019s profile in team/. I send them a status update every [Friday]. Create a folder called workflows/ and a file called weekly-status-update.md that documents how I do this. It should lead with business impact \u2014 what we shipped and why it matters, not just a list of what we did. Structure: What shipped / What\u2019s at risk / What I need from you. Keep it under 200 words. Use what you know about [name] from their profile to tailor the format to what they care about. Ask me three questions to get whatever else you need, then create the file.',
          },
        ],
        keyTakeaway:
          'You gave it the parts you already know, and it filled in the gaps you hadn\u2019t thought about. You don\u2019t have to have everything figured out before you hand it off.',
      },
      {
        day: 14,
        title: 'Use the Workflow',
        content: [
          {
            type: 'text',
            text: 'Yesterday you documented how you do your weekly status update. Today you\u2019ll see what happens when you tell Claude Code to actually do it. The workflow file is already there \u2014 you just point it at the work.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Read my workflow in workflows/weekly-status-update.md and do it. Here\u2019s this week\u2019s raw information: [dump whatever you\u2019d normally pull together \u2014 bullet points, Slack messages, notes, whatever you have].',
          },
        ],
        keyTakeaway:
          'You didn\u2019t repeat any instructions. You didn\u2019t explain the format, the audience, or the tone. You just said \u201cdo it\u201d and the process was already there.',
      },
    ],
  },
  {
    number: 3,
    theme: 'Push Your Limits',
    tool: 'Claude Code',
    description:
      'Your system is set up. Now you increase the weight. You\u2019ll try harder things \u2014 building decks, connecting integrations, automating real workflows. Some of it won\u2019t work on the first try. That\u2019s the training.',
    days: [
      {
        day: 15,
        title: 'Make Your Workflow Repeatable',
        content: [
          {
            type: 'text',
            text: 'You\u2019ve now run the same workflow twice \u2014 once to document it, once to use it. If this is something you\u2019ll do every week, it should be one word, not a paragraph. A slash command is a saved prompt you can trigger by typing / and its name.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Take the workflow in workflows/weekly-status-update.md and turn it into a slash command I can run every week. The command should read the workflow file and ask me for this week\u2019s raw updates, then produce the status update.',
          },
          {
            type: 'instruction',
            text: 'Now try it: type /status-update and watch it run.',
          },
          {
            type: 'note',
            text: 'You can explore other built-in slash commands too, like /compact (which clears out a long conversation and starts fresh from a summary). Just type / and hit the down arrow to browse them all.',
          },
        ],
        keyTakeaway:
          'You went from typing a full prompt, to referencing a file, to a single command. That\u2019s three levels of leverage from the same piece of work.',
      },
      {
        day: 16,
        title: 'Have Claude Code Build You a Deck',
        content: [
          {
            type: 'text',
            text: 'Claude Code doesn\u2019t just write text. It can write code, which means it can produce real work artifacts \u2014 a PowerPoint deck, a formatted report, a spreadsheet. Today you\u2019ll have it build something you\u2019d normally spend 30 minutes putting together manually. It might not be perfect on the first try. That\u2019s fine \u2014 you\u2019re pushing your limits, not staying in your comfort zone.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'I want to update the status update slash command so it also produces a 3-slide PowerPoint deck. Slide 1: What shipped. Slide 2: What\u2019s at risk. Slide 3: What I need. Minimal style \u2014 clean, blue and white, McKinsey-like formatting. Update the command so it produces both the text update and the deck.',
          },
        ],
        keyTakeaway:
          'You wrote a clear brief and got a finished deliverable back. If the result wasn\u2019t perfect, that\u2019s expected \u2014 the first version rarely is. The skill you\u2019re building is describing what you want clearly enough that each iteration gets closer.',
      },
      {
        day: 17,
        title: 'Make the Work Look Like Yours',
        content: [
          {
            type: 'text',
            text: 'The deck from yesterday works, but it doesn\u2019t look like your company\u2019s decks. Claude Code can read files on your computer, so if you give it a real template, it can match the formatting, fonts, and layout.',
          },
          {
            type: 'heading',
            text: 'What to do',
          },
          {
            type: 'instruction',
            text: 'Download your company\u2019s PowerPoint template to your computer.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Go into my Downloads folder and find the PowerPoint template I just saved. When I run the /status-update command, I want the deck it produces to match this template \u2014 same fonts, colors, layout, and slide structure. Update the command to use this as the base.',
          },
          {
            type: 'text',
            text: 'Now have it check its own work:',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'Compare the deck you just made to the original template. Grade yourself \u2014 what did you get right, what\u2019s off, and what would you change to get it closer?',
          },
          {
            type: 'text',
            text: 'Review its self-assessment. You\u2019ll notice it catches things you might have missed, and misses things that are obvious to you. Now make it stick:',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'What changes would you make to the slash command so it does a better job next time? Go ahead and make those changes.',
          },
        ],
        keyTakeaway:
          'Every time you use a workflow and improve it, the next run is better. The system learns because you taught it.',
      },
      {
        day: 18,
        title: 'Build Context from Real Data',
        content: [
          {
            type: 'text',
            text: 'Your first profile came from your head. This one comes from real material \u2014 emails, Slack messages, meeting notes. You already have a template; now you\u2019ll show Claude Code how to reuse it and work with messy, real-world inputs.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Look at the team profile you created for [first person] in team/. Use the same structure to create a profile for [second person]. Here\u2019s what I have on them. What are your observations about them from these materials that you would add to their file? Tell me, then go ahead and add it. [paste in a few emails, Slack messages, or notes. Don\u2019t clean them up. Just dump them in.]',
          },
        ],
        keyTakeaway:
          'You didn\u2019t describe the structure. You said \u201ccopy that one.\u201d And you didn\u2019t have to organize your raw material \u2014 the AI figured out what mattered. That\u2019s how you scale: reuse what exists and feed it real inputs instead of doing the work of summarizing everything yourself.',
      },
      {
        day: 19,
        title: 'Edit Everything at Once',
        content: [
          {
            type: 'text',
            text: 'One of the most tedious parts of any job is updating a deliverable when the audience changes. Different stakeholder, different framing, different emphasis \u2014 but the same underlying information. Today you\u2019ll see how Claude Code can go through an entire deck and update every slide at once.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Take the status update deck you built and reformat it for [second person] instead of [first person]. Read both of their profiles in team/ and adjust the framing, emphasis, and level of detail based on what each person cares about. Save it as a new file.',
          },
        ],
        keyTakeaway:
          'When the audience changes, everything changes \u2014 framing, emphasis, level of detail, what you lead with. Most people edit the obvious parts and miss the subtle ones. Describing the audience clearly and letting the system find every place that needs to change is faster and more thorough than going slide by slide yourself.',
      },
      {
        day: 20,
        title: 'Connect Your Calendar',
        content: [
          {
            type: 'text',
            text: 'Your system knows your team and your preferences, but it doesn\u2019t know what your week looks like. You\u2019re still the one connecting the dots between \u201cI have a meeting with Sarah at 2\u201d and \u201cSarah\u2019s been struggling with the project timeline.\u201d Today you give it the missing piece.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'I want to connect you to my Google Calendar so you can see my real schedule. Connect directly to Google \u2014 don\u2019t use a third-party tool.',
          },
          {
            type: 'text',
            text: 'Claude Code will walk you through the steps \u2014 installing the connection, authenticating with Google, and verifying it works. Just follow what it says.',
          },
          {
            type: 'text',
            text: 'Once it\u2019s connected, try:',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'What meetings do I have tomorrow?',
          },
          {
            type: 'note',
            text: 'If you hit a wall and the terminal is showing something confusing, take a screenshot, paste it into claude.ai (the web chat), and say \u201cI\u2019m trying to connect Claude Code to my Google Calendar. Here\u2019s what I\u2019m seeing. How do I fix it?\u201d',
          },
        ],
        keyTakeaway:
          'There\u2019s a difference between having information and having it accessible when you need it. Your calendar, your team profiles, your preferences \u2014 you had all of that before. Now it\u2019s connected, so the system can use it without you having to pull it together every time.',
      },
      {
        day: 21,
        title: 'Bring Multiple Context Sources Together',
        content: [
          {
            type: 'text',
            text: 'You have a meeting tomorrow and the context is scattered \u2014 some of it\u2019s in their profile, some is on your calendar, some is in your head. Normally you\u2019d spend 10 minutes pulling it all together, or you\u2019d just wing it. Today you\u2019ll see what happens when the system already has the pieces and you just tell it to connect them.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Look at my calendar for this week. For any meetings with people who have a profile in team/, read their profile and help me think about what I should bring up or be prepared for based on what you know about them and what I have coming up.',
          },
          {
            type: 'note',
            text: 'This is a good one to dictate \u2014 talk through what\u2019s on your mind for each person.',
          },
        ],
        keyTakeaway:
          'You carry a lot of context in your head as you move through your week \u2014 who you\u2019re meeting with, what they care about, what you need to bring up. The AI can ease that mental overhead for you by connecting the dots.',
      },
    ],
  },
  {
    number: 4,
    theme: 'See What Changed',
    tool: 'Claude Code',
    description:
      'Everything you\u2019ve built starts compounding. Every correction you made, every standard you set, every piece of context you added \u2014 that\u2019s all working for you now. This week you\u2019ll look back and notice you\u2019re not approaching problems the same way you were 21 days ago.',
    days: [
      {
        day: 22,
        title: 'Give It a Memory of Your Day',
        content: [
          {
            type: 'text',
            text: 'The best systems run without you having to remember to use them. Today you\u2019ll set up a daily workflow that runs automatically: plan your day from your real schedule, create a daily note, and have Claude Code keep a running log of what you\u2019re working on. You write the instruction once. It just happens from then on.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Add the following instructions to my CLAUDE.md: At the start of each day, check my calendar and create a daily note with my schedule and key prep for each meeting. Throughout the day, keep a running log of what we work on \u2014 what got done, what\u2019s in progress, any decisions or blockers. I don\u2019t want to have to tell you to do this. Just do it as we work.',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'Now do today. Check my calendar, create a daily note, and let\u2019s get started.',
          },
        ],
        keyTakeaway:
          'You can write instructions that Claude Code follows without being prompted. Instead of asking it to do something every time, you tell it once and it just does it in the background as you work.',
      },
      {
        day: 23,
        title: 'Keep the System Current (Without the Work)',
        content: [
          {
            type: 'text',
            text: 'It\u2019s been a couple of weeks since you created [first person]\u2019s profile. Things have probably changed \u2014 new projects, a shift in priorities, something they mentioned in a conversation. Most systems fall into disrepair because updating them takes effort. But when the AI can do the updating, the cost drops to almost zero.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Read [first person]\u2019s profile in team/. I want to update it. Here are some notes from our recent conversations: [paste meeting notes, or just dictate what you remember \u2014 what\u2019s changed, what came up, what you learned about them recently].\n\nWhat are your observations from this? Tell me, then update the file.',
          },
          {
            type: 'note',
            text: 'If you don\u2019t have notes, just dictate: talk about any conversations you\u2019ve had with this person recently. What\u2019s different now compared to when you first wrote their profile?',
          },
        ],
        keyTakeaway:
          'Systems fall apart because they take effort to maintain. When the AI can do the updating for you \u2014 from raw notes, a quick voice dump, or even a pasted Slack thread \u2014 the system stays current without becoming a chore.',
      },
      {
        day: 24,
        title: 'Turn Your Notes into Insight',
        content: [
          {
            type: 'text',
            text: 'You\u2019ve been feeding the system for a few days now \u2014 daily notes, meeting prep, updates. You\u2019ve been putting information in. Today you ask it what it sees. Sometimes an outside perspective, even from an AI, catches patterns you\u2019re too close to notice.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Read my daily notes from this week and my calendar. Answer three questions: (1) Where did I spend the most time this week? (2) What did I say I\u2019d do that I didn\u2019t get to? (3) What pattern do you see that I might not \u2014 something I\u2019m spending more time on than I realize, or something I keep pushing off?',
          },
        ],
        keyTakeaway:
          'The system isn\u2019t just a place to store information. Once it has enough context about how you work, it can reflect that back to you in useful ways. The daily notes you\u2019ve been keeping aren\u2019t just a log \u2014 they\u2019re data.',
      },
      {
        day: 25,
        title: 'Teach It from Your Edits',
        content: [
          {
            type: 'text',
            text: 'A lot of people try an AI workflow once, get a mediocre result, and quit. That\u2019s like doing one set at the gym and saying exercise doesn\u2019t work. The first version is never great. The difference is what you do next. Today you\u2019ll run your status update workflow, make edits, and then teach the system from those edits so it\u2019s better next time.',
          },
          {
            type: 'text',
            text: 'Run your /status-update command with this week\u2019s real information. Look at the text output (not the deck). It\u2019ll be decent but probably off in places. Make your edits \u2014 change what you\u2019d change if you were sending this to someone today.',
          },
          {
            type: 'text',
            text: 'Now feed those edits back:',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Here\u2019s the status update you wrote, and here\u2019s the version I actually sent [paste both]. What can you learn from the edits I made? What patterns do you see in what I changed? Tell me, then update the workflow in workflows/weekly-status-update.md so you get closer next time.',
          },
        ],
        keyTakeaway:
          'The system gets better because you use it and correct it, not because you set it up perfectly on day one. Every edit you make is a lesson. The trick is feeding those lessons back in instead of just fixing the output and moving on.',
      },
      {
        day: 26,
        title: 'The Swiss Cheese Check',
        content: [
          {
            type: 'text',
            text: 'AI output sounds confident. That\u2019s the problem. It reads well, it\u2019s structured clearly, and your brain wants to accept it. But sounding right and being right are different things. Today you\u2019ll learn a four-question framework for pressure-testing any output \u2014 from an AI, from a consultant, from a direct report, or from yourself.',
          },
          {
            type: 'text',
            text: 'Take something the system produced recently \u2014 your status update from yesterday, meeting prep notes, anything.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'I want to pressure-test this output using four checks. For each one, answer honestly:\n1. Confidence check: How sure are you this is correct? What assumptions are you making? What would make you more or less confident?\n2. Context check: Under what circumstances would this be wrong? What edge cases or scenarios would make this bad advice?\n3. Expert check: If a world-class expert reviewed this, what would they add, change, or challenge?\n4. Verification check: How should I verify this on my own? If I wanted to fact-check your work, what would I look at?\n\n[Paste the output you want to check]',
          },
        ],
        keyTakeaway:
          'These four questions work on anything \u2014 an AI summary, a vendor proposal, a strategy recommendation from your team. The Swiss cheese model: no single check catches everything, but layered together, very little gets through.',
      },
      {
        day: 27,
        title: 'Find Your Highest-Leverage Workflow',
        content: [
          {
            type: 'text',
            text: 'You\u2019ve been following a curriculum. Now it\u2019s time to figure out what Claude Code should actually do for your job. Today you\u2019ll use a structured decision-making framework: generate options, define criteria, rate, rank, pick.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Look at everything in my system \u2014 my CLAUDE.md, team profiles in team/, workflows in workflows/, and my calendar. Based on what you know about how I work, come up with 10 ideas for things you could do for me on a regular basis that would save me real time or help me do better work. For each one, rate it on two dimensions: feasibility (how easy is it to set up with what we already have?) and impact (how much would it actually help?). Then rank them. Save the ranked list as a file so I can reference it later.',
          },
          {
            type: 'prompt',
            label: 'Follow-up prompt',
            variant: 'neutral',
            text: 'I want more ideas. Ask me three questions that will give you more information that you don\u2019t currently have to come up with additional, better ideas. Then rescore and rerank.',
          },
        ],
        keyTakeaway:
          'This is where you start seeing differently. A month ago, you wouldn\u2019t have known what to ask for. Now you\u2019re generating ideas for workflows you didn\u2019t know were possible. That\u2019s the shift.',
      },
      {
        day: 28,
        title: 'Close the Context Gap',
        content: [
          {
            type: 'text',
            text: 'You picked your #1 idea. Now you need to set it up. The gap between \u201cgood idea\u201d and \u201cworking system\u201d is almost always context: the AI needs to know things you haven\u2019t told it yet. Today you\u2019ll figure out exactly what\u2019s missing and start filling it in.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'The idea I want to build is: [your #1 from yesterday]. Before you start, tell me: what context would you need from me to do this well? What format should it be in? What files should we create? And what\u2019s the first step?',
          },
          {
            type: 'note',
            text: 'Dictate your answers as it asks follow-up questions \u2014 this is the fastest way to get your knowledge into the system.',
          },
          {
            type: 'text',
            text: 'Then do what it says. Create the files, add the context, and create a workflow file in workflows/ that documents the process. By the end of today, you should have a working first version you can run.',
          },
        ],
        keyTakeaway:
          'The gap between a good idea and a working system is almost always context. Figuring out what\u2019s missing and filling it in is a skill you\u2019ve been building all month.',
      },
      {
        day: 29,
        title: 'Show It What Good Looks Like',
        content: [
          {
            type: 'text',
            text: 'Your workflow is set up. Now make it great. The best way to teach an AI what quality looks like isn\u2019t to describe it in the abstract. It\u2019s to show it examples and have it figure out what makes those examples good. Then it can apply those lessons every time.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'I\u2019m going to give you examples of [the output your workflow produces \u2014 e.g., good status updates, well-written pre-reads, strong meeting prep notes]. Look at these and tell me: what specifically makes them good? What patterns do you see? Extract the principles and add them to the workflow file in workflows/ so you apply them every time you run it.\n\n[Paste 2\u20133 examples of good work]',
          },
          {
            type: 'note',
            text: 'If you don\u2019t have examples saved, ask a colleague for one, or pull from your sent folder. Real examples beat hypothetical ones.',
          },
        ],
        keyTakeaway:
          'Give it examples of good work. Ask it to extract what makes that work good. Then have it apply those principles every time. This is how you teach standards.',
      },
      {
        day: 30,
        title: 'Look Back',
        content: [
          {
            type: 'text',
            text: 'Before you keep going, take a minute to see how far you\u2019ve come. On Day 1, you typed a vague prompt into a chat window. Now you have a system that knows how you work, who you work with, and what your standards are \u2014 because you built it, one day at a time.',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'Look at everything in my system \u2014 CLAUDE.md, team profiles, workflows, daily notes. Then answer: what do you know about me and how I work that you didn\u2019t know 30 days ago? What can you do for me now that you couldn\u2019t do on Day 1?',
          },
          {
            type: 'text',
            text: 'Now think about your own work. What problems are you approaching differently than you were a month ago? What solutions are you considering that you wouldn\u2019t have thought of before? That shift \u2014 not the tool, not the prompts, but how you think about what\u2019s possible \u2014 is what you built.',
          },
          {
            type: 'text',
            text: 'If you want to share what you\u2019ve built with someone on your team, try this:',
          },
          {
            type: 'prompt',
            label: 'Optional prompt',
            variant: 'neutral',
            text: 'I want to package up [the workflow/tool you built on Days 27\u201329] so someone on my team can use it. Create a short guide that explains: what it does, what they need to set up, and how to run it. Write it for someone who\u2019s never used Claude Code. Save it as docs/[name]-guide.md.',
          },
        ],
        keyTakeaway:
          'You didn\u2019t just learn a tool. You changed how you work. The system you built is proof \u2014 but the real change is in how you see problems now.',
      },
      {
        day: 31,
        title: 'Go Explore',
        content: [
          {
            type: 'text',
            text: 'You\u2019ve followed a curriculum for 30 days. Now try this:',
          },
          {
            type: 'prompt',
            label: 'Try this prompt',
            variant: 'neutral',
            text: 'What\u2019s something you could do right now, with everything you know about me and my system, that you think would impress me \u2014 something I wouldn\u2019t think to ask for? Give me a few ideas.',
          },
          {
            type: 'text',
            text: 'Some things people have been surprised by:',
          },
          {
            type: 'steps',
            items: [
              'Turning a workflow doc into an interactive webpage they could share with their team',
              'Setting up a weekly email that briefs them on the latest AI news in their industry',
              'Building a simple app that does something they\u2019d been doing manually in spreadsheets',
            ],
          },
          {
            type: 'text',
            text: 'Try one. If it doesn\u2019t work perfectly, tell it what\u2019s off and try again. The point isn\u2019t the first output \u2014 it\u2019s that you now have a system with enough context that the AI can surprise you. You\u2019re not prompting anymore. You\u2019re exploring.',
          },
        ],
        keyTakeaway:
          'You\u2019re not prompting anymore. You\u2019re exploring.',
      },
    ],
  },
];
