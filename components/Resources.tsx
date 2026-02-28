import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const [filter, setFilter] = useState('');

  const cheatSheet = [
    {
      title: 'The golden rule of prompting',
      body: 'Show your prompt to a colleague with minimal context and ask them to follow it. If they\'d be confused, the AI will be too.',
    },
    {
      title: 'Start with the smallest possible scope',
      body: 'Get one thing working well before you expand. You can always add complexity later — but it\'s much harder to debug a tool that\'s trying to do five things at once.',
    },
    {
      title: 'Criteria need to say what passing looks like',
      body: '"Clarity" is not a criterion. "A non-expert could read this and understand the recommendation without asking follow-up questions" is a criterion.',
    },
    {
      title: 'The AI will be nicer than you',
      body: 'AI defaults to being encouraging. If your tool isn\'t catching things you\'d catch, your criteria aren\'t specific enough. Use pass/fail or a numeric score to force a real judgment.',
    },
    {
      title: 'If it\'s important, put it in the prompt',
      body: 'Don\'t rely on uploaded documents for anything load-bearing. There\'s no way to verify that the AI interpreted a 50-page doc the way you would. Anything critical should be an explicit instruction in the prompt.',
    },
    {
      title: 'Describe your tool like you\'re telling a friend',
      body: 'Most people describe their tool better in conversation than in their prompt. If you can explain it clearly in two sentences to a person, put THAT in the prompt.',
    },
    {
      title: 'Don\'t say "don\'t"',
      body: '"Don\'t be patronizing" is a weak instruction — the AI either ignores it or over-corrects. Instead, describe what you DO want: give an example of the tone you\'re going for.',
    },
  ];

  const tools = [
    {
      name: 'ChatGPT',
      what: 'OpenAI\'s AI chat interface. The most popular consumer AI tool.',
      why: 'Custom GPTs let you save a system prompt as a reusable tool with its own link.',
      need: 'Yes — if you\'re building Custom GPTs, you need a Plus ($20/mo) or Team plan.',
    },
    {
      name: 'Claude',
      what: 'Anthropic\'s AI assistant. Known for strong writing and long-context understanding.',
      why: 'Projects let you save instructions and reference documents in a reusable workspace. Tends to be less sycophantic than ChatGPT.',
      need: 'Worth trying alongside ChatGPT. Pro plan is $20/mo. Some people prefer Claude\'s tone and writing quality.',
    },
    {
      name: 'Gemini',
      what: 'Google\'s AI assistant. Integrated with Google Workspace.',
      why: 'Gems are the equivalent of Custom GPTs. Deep integration with Google Docs, Sheets, etc.',
      need: 'If your company is on Google Workspace, this may be the path of least resistance.',
    },
    {
      name: 'Microsoft Copilot',
      what: 'Microsoft\'s AI assistant. Integrated with Office 365.',
      why: 'Copilot GPTs work like Custom GPTs. Built into the tools your company may already use.',
      need: 'If your org is on Microsoft 365, you may already have access.',
    },
    {
      name: 'Wispr Flow',
      what: 'A voice dictation tool that works anywhere on your computer — any text field, any app.',
      why: 'You talk, it types. Much faster than typing for first drafts, emails, prompt writing. It cleans up filler words and false starts automatically.',
      need: 'Not required, but once you try it you won\'t go back. Great for people who think better out loud. Mac only for now.',
    },
    {
      name: 'Claude Code',
      what: 'A command-line tool from Anthropic that lets you use Claude to build software by describing what you want in plain English.',
      why: 'This is what "vibe coding" looks like in practice — you describe what you want, and it writes and runs the code. No IDE or coding knowledge required.',
      need: 'Only if you\'re interested in building apps or automations beyond what a Custom GPT can do. Covered in Week 3+.',
    },
    {
      name: 'Cursor',
      what: 'An AI-powered code editor. Like VS Code but with AI built in.',
      why: 'Another vibe coding tool. More visual than Claude Code — you can see the files and code as it writes them.',
      need: 'Same as Claude Code — only if you want to build beyond chat. Some people prefer this to Claude Code because it\'s more visual.',
    },
    {
      name: 'Lovable / Replit',
      what: 'Browser-based tools that let you build apps by chatting with AI. No install required.',
      why: 'The lowest-friction way to go from idea to working app. Everything runs in your browser.',
      need: 'Good option if you don\'t want to install anything. More limited than Claude Code or Cursor for complex projects.',
    },
  ];

  const glossary = [
    {
      term: 'System prompt',
      definition: 'The instructions you give to a Custom GPT, Project, or Gem that tell it how to behave. The user doesn\'t see these — they run behind the scenes every time someone starts a conversation.',
    },
    {
      term: 'Custom GPT',
      definition: 'A reusable ChatGPT configuration with its own system prompt, name, and optional knowledge files. Anyone with the link can use it. Requires a paid ChatGPT account to create.',
    },
    {
      term: 'Project (Claude)',
      definition: 'Claude\'s equivalent of a Custom GPT. A workspace where you set custom instructions and upload reference documents. Conversations inside the project follow your instructions automatically.',
    },
    {
      term: 'Gem (Gemini)',
      definition: 'Google Gemini\'s equivalent of a Custom GPT. A saved set of instructions that you can reuse and share.',
    },
    {
      term: 'Token',
      definition: 'The unit AI models use to process text. Roughly ¾ of a word. When someone says a model has a "128K context window," they mean it can process about 96,000 words at once.',
    },
    {
      term: 'Context window',
      definition: 'How much text the AI can "see" at once — your instructions, uploaded documents, conversation history, and its own response all count. When you hit the limit, the AI starts forgetting earlier parts of the conversation.',
    },
    {
      term: 'Hallucination',
      definition: 'When the AI generates something that sounds confident but is factually wrong. It\'s not lying — it doesn\'t know what\'s true. It\'s predicting plausible-sounding text. This is why evaluation criteria matter: they give the AI (and you) something concrete to check against.',
    },
    {
      term: 'Markdown',
      definition: 'A simple way to format text using plain characters. **Bold**, *italic*, # headings, - bullet points. Most AI tools output in Markdown. You don\'t need to learn it, but it helps to recognize it when you see it.',
    },
    {
      term: 'Vibe coding',
      definition: 'Building software by describing what you want in plain English and letting AI write the code. You don\'t need to know how to code — you need to know what you want. Covered in the course starting Week 3.',
    },
    {
      term: 'RAG (Retrieval-Augmented Generation)',
      definition: 'A technique where the AI searches through documents to find relevant information before generating a response. This is what\'s happening behind the scenes when you upload files to a Custom GPT — but it\'s not magic, and the AI may not find or interpret the right passages.',
    },
    {
      term: 'API',
      definition: 'A way for software to talk to other software. When people say "use the API," they mean connecting to the AI directly through code rather than through the chat interface. Not something you need for this course.',
    },
    {
      term: 'Temperature',
      definition: 'A setting that controls how "creative" vs. "predictable" the AI\'s responses are. Higher temperature = more varied and surprising. Lower temperature = more consistent and focused. Most chat tools set this for you.',
    },
  ];

  const lowerFilter = filter.toLowerCase();

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerFilter) ||
      t.what.toLowerCase().includes(lowerFilter)
  );

  const filteredGlossary = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(lowerFilter) ||
      g.definition.toLowerCase().includes(lowerFilter)
  );

  const showCheatSheet = !filter || cheatSheet.some(
    (c) =>
      c.title.toLowerCase().includes(lowerFilter) ||
      c.body.toLowerCase().includes(lowerFilter)
  );

  const filteredCheatSheet = filter
    ? cheatSheet.filter(
        (c) =>
          c.title.toLowerCase().includes(lowerFilter) ||
          c.body.toLowerCase().includes(lowerFilter)
      )
    : cheatSheet;

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

        <div className="mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Resources
          </h1>
          <p className="text-stone-700 text-lg mt-4 leading-relaxed">
            Quick reference for tools, terms, and best practices you'll encounter in the course.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search for a tool or term..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
          />
        </div>

        {/* Cheat Sheet */}
        {showCheatSheet && filteredCheatSheet.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">
              Cheat Sheet
            </h2>
            <div className="space-y-4">
              {filteredCheatSheet.map((item, i) => (
                <div key={i} className="bg-white border border-stone-300 rounded-lg p-4">
                  <p className="text-stone-800 text-base font-bold mb-1">
                    {item.title}
                  </p>
                  <p className="text-stone-700 text-base leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {filteredTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Tools</h2>
            <div className="space-y-6">
              {filteredTools.map((tool, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-stone-800 mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-stone-800 text-base leading-relaxed mb-1">
                    <strong>What it is:</strong> {tool.what}
                  </p>
                  <p className="text-stone-800 text-base leading-relaxed mb-1">
                    <strong>Why people like it:</strong> {tool.why}
                  </p>
                  <p className="text-stone-800 text-base leading-relaxed">
                    <strong>Do you need it?</strong> {tool.need}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Glossary */}
        {filteredGlossary.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">
              Glossary
            </h2>
            <div className="space-y-4">
              {filteredGlossary.map((item, i) => (
                <div key={i}>
                  <p className="text-stone-800 text-base">
                    <strong>{item.term}</strong>
                    {' — '}
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filter &&
          filteredCheatSheet.length === 0 &&
          filteredTools.length === 0 &&
          filteredGlossary.length === 0 && (
            <p className="text-stone-500 text-base">
              No results for "{filter}." Try a different search term.
            </p>
          )}
      </div>
    </section>
  );
};

export default Resources;
