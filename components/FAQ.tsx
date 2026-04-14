import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  description: string;
  questions: FAQItem[];
}

const categories: FAQCategory[] = [
  {
    title: 'Choosing the right tool',
    description: 'Custom GPTs vs skills vs real apps - when to reach for each.',
    questions: [
      {
        question: "When should I use a Custom GPT versus a Claude skill versus just a regular chat?",
        answer: "Custom GPTs (along with Gems and Copilots - functionally the same thing) are for when someone else is going to use a prompt you've written. You take the burden of being a good prompter off them: you've written the system prompt, they just use the tool.\n\nSkills are for yourself. If there's a repetitive task you want AI help with, make a skill. The most basic version is a Markdown file of instructions you can tag into any conversation. Claude calls them skills, but the same idea is coming to ChatGPT and Gemini - it's too useful not to.\n\nThe shortcut: GPT-style tool when the output is for someone else, skill when it's for you.",
      },
      {
        question: "AI did something great in a one-off conversation - how do I turn that into a reusable tool?",
        answer: "The easiest move is to stay in that same conversation and ask: \"This was a good example. Can you write a prompt that would generate this exact kind of output again?\" Let the AI write the prompt for you, based on what just worked.\n\nAny time AI produces something I'm impressed by, I'll ask it to write up very specific instructions to do exactly what it just did. Then I save those as a skill. This is the ideal use case for a Claude skill - a Custom GPT works too, but skills are cleaner here.\n\nThe trick is capturing the good moment when it happens, not trying to recreate it from scratch later.",
      },
      {
        question: "How do I know when to build a Custom GPT versus when to build an actual app?",
        answer: "Default to the simplest thing that works. The main reason to build a real app is persistent context - you want data to accumulate over time, like weekly updates that build into performance reviews.\n\nWith a Custom GPT, everything in the knowledge base gets loaded into every prompt. If you want it to reference every previous weekly update, it will, and it will get confused. That's the collapse problem. An app with a real database can pull only what's relevant for the task at hand.\n\nBut defer to the simpler option. Custom GPTs have very few failure modes - when something's wrong, it's a prompting problem, and you fix the prompt. Apps introduce complexity, complexity introduces troubleshooting, and now you're maintaining something. Almost always I'd build the Custom GPT first.",
      },
      {
        question: "Do I really need to use Claude Code and the terminal? Can't I just wait until these AI tools get more user-friendly?",
        answer: "Yes, you can wait. The short answer to \"do I need to be a super user on the cutting edge?\" is no - most of this will get productized in nicer interfaces soon enough. But let me make the case for staying on the edge anyway.\n\nYour own thinking becomes context. The reason my tools keep getting better is that I've built workflows that generate context about how I work - what I'm doing every day, what my preferences are. That only exists because I set it up. The further out on the edge you are, the more you understand what's actually possible, not just how to use a product.\n\nManagers specifically are designing the future of work. If you care about the humans on your team, you have an obligation to figure out how to use these tools in ways that don't sideline people. You can't shape that if you're behind. The terminal is intimidating - I hadn't opened one two months ago - but learning it changes how you think about what's possible.",
      },
    ],
  },
  {
    title: 'Making tools good',
    description: 'Prompting, scoping, iteration, and getting AI to actually hold your standard.',
    questions: [
      {
        question: "Should I build one big tool that does the whole workflow, or break it into smaller specialized tools?",
        answer: "It depends on where your team is actually struggling. If the problem is macro - they don't understand what the whole document is supposed to do - a big tool that evaluates the whole thing makes sense. If there are specific areas where they keep falling down, zoom in and make a tool focused on that one thing.\n\nI've built tools as big as \"upload your whole deck and get feedback\" and as narrow as \"evaluate the headline on a single slide.\" Both work - they just do different things. The more ambitious the tool, the less granular the feedback.\n\nWhen in doubt, scope down. The more you stuff into one tool - frameworks, documents, multiple objectives - the less reliable it gets at any one thing. I almost always choose more focused over more ambitious. Get one thing working well and build from there.",
      },
      {
        question: "My Custom GPT isn't being critical enough - it keeps telling people their work is great. How do I fix it?",
        answer: "Usually that's a tone problem more than an evaluation problem. The tool is trying to be encouraging instead of measuring against an objective bar.\n\nMy fix is to give it something quantifiable. Evaluations work best when they're pass-fail - there's a specific line, and the work either clears it or doesn't. Letter grades or 1-to-5 scales can work too, but pass-fail is cleanest because it forces a decision.\n\nBe explicit: \"There is a bar here. You are evaluating whether the work meets it.\" If it's still too gentle, tell it directly: \"These responses are patronizing. Figure out how to adjust the tone so the results are less patronizing. Don't just add a line saying 'don't be patronizing.' Really think about it.\" That kind of meta-prompting works better than surface fixes.",
      },
      {
        question: "My Custom GPT keeps trying to continue the conversation with \"want me to make you a PowerPoint?\" - how do I stop it?",
        answer: "That's ChatGPT's own system prompt over-rotating to keep the conversation going and show off its helpfulness. You can override it.\n\nAt the end of your prompt, include something explicit: \"Your final step is X. When you have reached this step, terminate the conversation.\" That usually does it.\n\nIf you do want a next step, make it deliberate: \"Based on your assessment, pick the three biggest improvements the user could make and walk them through how to make them.\" That way you're driving the continuation instead of letting ChatGPT randomly try to sell PowerPoint.",
      },
      {
        question: "How do I approach this when I don't know what I want the tool to do yet - I just have a vague idea?",
        answer: "Dictate to it. I use voice input (WisprFlow) because it lets me word-vomit a loose idea without having to type a clean version of it first.\n\nI'll just talk at the AI: \"I want to build something that does this, I'm not sure if it should be an evaluator or a guide, here are some things I think matter, can you help me think through this?\" It's very good at that. You can ask it to play your idea back to you, ask clarifying questions, help you pick criteria, or propose options.\n\nThe upfront spec work matters enormously - good inputs equal good outputs, and most slop is an input problem. But writing the spec doesn't mean sitting alone staring at a blank doc. Talk to the AI about it. Let it help you figure out what you're trying to build before you build it.",
      },
      {
        question: "Is there such a thing as too much context? When do you hit diminishing returns?",
        answer: "Hard to give a precise answer because context windows keep getting bigger with new models. But the general rule: give the least amount of information it needs.\n\nThe more context you add, the more likely you introduce contradictions or irrelevant details that distract from what matters. There's no specific \"okay, that's too much\" line, but you'll feel it, especially in long conversations. Every previous turn is also context. If a conversation has gone on forever and the AI is getting confused, clear it and start over.\n\nEarly on you'll over-context everything because you're not sure what you want. That's fine - it's part of building the intuition. Over time you figure out that simpler is almost always better.",
      },
      {
        question: "Do I need to write my prompts and context in Markdown, or can I use regular formats like PDFs?",
        answer: "Markdown isn't required - your prompts will work fine without it. I do low-tech things sometimes, like saving something as a PDF and uploading it, and it works most of the time.\n\nThat said, the more context you're dealing with, the more it matters that you use a format the AI handles well. A four-page PDF is fine. A 500-page PDF is not. At that volume, the extra structure Markdown gives you helps the AI not get confused.\n\nThe other reason I've come around on Markdown is portability. If your docs live in Notion or Google Docs or Word, they're locked into that platform. Markdown is platform-agnostic, so you can move your whole system anywhere and use it with any AI tool.",
      },
    ],
  },
  {
    title: 'Vibe coding & apps',
    description: 'Building real applications - when to rebuild, how to stay safe.',
    questions: [
      {
        question: "What's actually the difference between a prototype and a real tool when we're using Lovable or Google AI Studio?",
        answer: "A framing I like: a prototype is something you have to walk your laptop over to show someone. A tool is something you can send them a link to. The pivot is whether it's published.\n\nThe bigger technical distinction is whether it has a backend - a database. Without one, the tool can't remember anything between sessions. With one, it can. You can also use a Google Sheet or Google Doc as a lightweight database for simple tools. If a Google Sheet does the job, you shouldn't build a whole app around it.\n\nThat used to be obvious: you wouldn't build an app if a spreadsheet worked, because apps were expensive to make. Now that anyone can spin one up in twenty minutes, people forget that you still have to maintain it. A Google Sheet isn't going to break on you. An app might.",
      },
      {
        question: "When I'm iterating on a vibe-coded tool and it's getting messy, at what point should I just start over?",
        answer: "My usual pattern: I iterate in a prototype-y way at first - trying different things, moving stuff around, experimenting with layouts. Once I get it into a place I like, I rebuild it from scratch.\n\nI give the tool access to the current code or a screenshot and say, \"I made this. It was a long winding path to get here, but I think it's in a good place. Can you rebuild it from scratch based on where we are today?\" That strips out the accumulated bloat from experiments that didn't pan out.\n\nIf you've only gone back and forth three or four times, don't bother. I've gone fifty rounds. But when it starts feeling Frankensteined - weird logic that only exists because of something you've long since changed your mind about - that's the signal to rebuild clean.",
      },
      {
        question: "What's the simplest way to think about handling API keys safely when I'm building tools?",
        answer: "API keys are the one place where \"vibe coding feels scary but it's fine\" stops being true. Be careful with them.\n\nAn API key is a string you copy from Anthropic or OpenAI or Google, and it charges you for every query. Usually a couple of cents - fine if it's just you or your team. But if that key leaks, it can run up real bills.\n\nWhat I do: as I'm going along, I ask the AI things like \"Is there anything I should be careful about here?\" and \"Are you sure that's a good idea?\" before doing anything with a key. In Lovable, you can often skip the key entirely by using their built-in AI gateway, which puts a cap on usage so you can't get surprise-billed.\n\nIf you're distributing a tool to a lot of people, think about cost structure. This is why I keep my public tools as Custom GPTs instead of websites: if people use a Custom GPT, their own ChatGPT subscription pays for the AI. If I build a website that calls the API, I pay every time anyone uses it.",
      },
    ],
  },
  {
    title: 'Rolling out to your team',
    description: 'Testing, onboarding, and meeting people where they are.',
    questions: [
      {
        question: "How much should I test and tweak a Custom GPT before I share it with my team?",
        answer: "Not much. I run it two or three times, and once it's pretty good, I hand it to one person on my team and ask them to try it and tell me if it's helpful.\n\nYou get diminishing returns from tweaking on your own. The tool also starts to over-correct to whatever the last piece of feedback you gave it. The whole point is that someone else is going to use it, not you, so the sooner it's in their hands, the better. Don't try to make it perfect in a vacuum.",
      },
      {
        question: "How do I calibrate these systems for different people on my team - some want to dig into complexity, others want things simple?",
        answer: "The destination I'm aiming for is the same for everyone: working in shared tools, with shared context, in the same system. I don't want my team working in radically different ways if I can avoid it - the point is shared leverage.\n\nBut the path to that destination is different per person. Some people need structured training wheels - start in Lovable, move to Cursor, then into the terminal. Others are self-motivated and want to figure it out themselves. The question isn't \"how much complexity can this person tolerate,\" it's \"what's the right on-ramp for them?\"\n\nMinimize variance on the destination. Be flexible on the journey. And be honest about your own bias - I have a strong preference for simplicity because I hate troubleshooting. Someone on your team might love troubleshooting. That changes what tools they can productively use.",
      },
    ],
  },
  {
    title: 'Enterprise, privacy & sensitive info',
    description: 'Working around permissions, handling confidential data, and protecting your team.',
    questions: [
      {
        question: "How do I work with AI in a locked-down enterprise environment where I don't have permissions to connect tools?",
        answer: "A few things. First, separate your learning from your enterprise. Build things for problems in your personal life too. You don't want your own ability to grow with these tools to be constrained by internal permissions. My real estate search, my daily planning, my side projects - those are how I rewire my brain around what's possible.\n\nFor work, get past the binary of tools being \"blocked\" or \"unblocked.\" It's a workflow, and each step has options. Maybe you can't send slides with proprietary client info to an AI, but you can build a checklist of what great slides look like and hand that to your team. Copy and paste are powerful - you can often chain tools manually instead of connecting them.\n\nWhen you do need to fight for permissions, don't go in hypothetically. Build a hacky janky version first - even using screenshots instead of real connections - and show people the value. \"I want access to this tool\" is a losing argument. \"Here's a workflow that would double our outreach, here's the proof of concept, I just need these two things connected\" is one you can win.\n\nAlso: read access is much safer than write access. When in doubt, start there. Give the AI the least permissions and least data it needs to do the job.",
      },
      {
        question: "Can I really get useful work done in AI tools if I just take screenshots instead of connecting systems? Isn't that inefficient?",
        answer: "It's surprisingly effective. People further along the AI super-user curve than me are often surprised by how much I screenshot and save as PDFs. They say, \"You know you can just connect those tools, right?\" And I say two things: I'm too lazy, and I'm too cautious.\n\nI don't necessarily want AI to have unlimited access to my email or send messages on my behalf. That makes me nervous. The screenshot version gives me all the useful context and none of the scary autonomy.\n\n\"Export\" doesn't have to mean a real data export. It can mean screenshotting the thing and pasting it in. That's often enough for the AI to do the work, and you can always upgrade to real connections once you've proven the value.",
      },
      {
        question: "How do I handle giving AI access to sensitive team information - like for performance reviews or coaching?",
        answer: "This is genuinely messy, and nobody has figured it out perfectly. A few practical moves.\n\nFor a Custom GPT, the knowledge base gets loaded into every prompt, so curate carefully. Don't upload every weekly update you've ever read - upload a few as examples, and write instructions that tell the AI when to consult each reference file. Organization matters; random dumps confuse it.\n\nFor genuinely sensitive material - performance reviews, confidential context - consider whether the tool actually needs persistent memory, or whether you can just paste in what's relevant for that one task. The collapse problem (too much context equals worse outputs) is a feature here, not a bug. It forces you to be selective.\n\nFor the broader \"who owns this context?\" question - what happens to the skills and preferences you build up at one company when you leave - that's an unsolved problem. Be thoughtful about what you put where.",
      },
    ],
  },
  {
    title: 'The long game',
    description: 'Systems thinking, maintenance, and where this all goes.',
    questions: [
      {
        question: "Everything goes to decay - shared docs, context files, memory - how do I keep any of it up to date?",
        answer: "Nobody has solved this well. Notion is focused on it inside their own product. I suspect it's going to become someone's job on teams: keeping shared context organized and current.\n\nYou can build simple hygiene loops. You could write something in Claude Code that watches a folder (Notion, Google Drive, local files) and flags anything that hasn't been edited in two months. Once a month, sit down with it and go through the list: delete what shouldn't be there anymore, update what's stale. I do that for my own context directory.\n\nThe harder version of the problem is tacit knowledge - stuff that lives in people's heads for real reasons (confidentiality, sensitivity, nuance). How much of what makes a company run can actually be documented and kept current? That's the real unknown in \"will AI do everyone's jobs?\" It's not whether the models are smart enough. It's whether the context can be captured at all.\n\nRemote companies have an unfair advantage here: more written communication, more transcripts, more documented context by default.",
      },
      {
        question: "What does \"building a system\" actually mean, and why should I bother?",
        answer: "The shift is from thinking about work as individual artifacts you produce to thinking about work as a machine that produces those artifacts.\n\nA system is a context directory (what the AI knows about you, your team, your job) plus skills (instructions for recurring workflows) plus the ability to compose them. My weekly update writer isn't a one-off tool - it's a skill that pulls from my calendar, my daily logs, and my meeting notes, and drafts the update. When my manager gives me feedback, I don't just apply it to this week. I ask the AI to pull the \"note behind the note,\" generalize the pattern, and update the skill so future updates address it automatically.\n\nThe power is compounding. Every interaction gets better because every interaction feeds the system. Once you start thinking this way - what is the machine that produces this work, and how do I engineer it? - the shape of what you can accomplish changes radically. That's the real unlock, not any individual tool.",
      },
    ],
  },
];

const FAQ: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState<string | null>(null);

  const renderAnswer = (text: string) => {
    return text.split('\n\n').map((para, i) => (
      <p key={i} className="text-stone-800 text-base leading-relaxed mb-3 last:mb-0">
        {para}
      </p>
    ));
  };

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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Student Frequently Asked Questions
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Real questions from past and current students, with my honest answers. Can't find what you're looking for? Drop your question in Slack and I'll add it here.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl font-bold text-stone-800 mb-1">{cat.title}</h2>
              <p className="text-stone-600 text-base mb-4">{cat.description}</p>
              <div className="space-y-3">
                {cat.questions.map((faq, i) => {
                  const id = `${cat.title}-${i}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="border border-stone-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors text-left"
                      >
                        <span className="text-stone-800 text-base font-medium pr-4">{faq.question}</span>
                        <span className="text-stone-400 text-lg flex-shrink-0">
                          {isOpen ? '\u2212' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-stone-200 pt-4">
                          {renderAnswer(faq.answer)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
