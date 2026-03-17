import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'form' | 'sending' | 'sent'>('idle');
  const [requestName, setRequestName] = useState('');
  const [requestContext, setRequestContext] = useState('');
  const [requestQuestion, setRequestQuestion] = useState('');

  const handleSubmitRequest = async () => {
    setRequestStatus('sending');
    try {
      await fetch('/api/resource-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: filter, name: requestName, context: requestContext, question: requestQuestion }),
      });
      setRequestStatus('sent');
    } catch {
      setRequestStatus('form');
    }
  };

  const cheatSheet = [
    {
      title: 'The golden rule of prompting',
      body: 'Show your prompt to a colleague with minimal context and ask them to follow it. If they\'d be confused, the AI will be too.',
    },
    {
      title: 'Start small',
      body: 'Get one thing working well before you expand.',
    },
    {
      title: 'Start with what you know best',
      body: 'Build your first tools around work where you have strong judgment. You need to understand the domain to know whether the AI is doing a good job.',
    },
    {
      title: 'Be thoughtful about context',
      body: 'Don\'t just upload a bunch of docs and hope for the best. When you\'re starting out, put your instructions directly in the prompt where you can read and troubleshoot them.',
    },
  ];

  const tools = [
    {
      name: 'ChatGPT',
      what: 'OpenAI\'s AI chat interface. The most popular consumer AI tool. Custom GPTs let you save a system prompt as a reusable tool with its own link.',
      need: 'Yes — if you\'re building Custom GPTs, you need a Plus ($20/mo) or Team plan.',
    },
    {
      name: 'Claude',
      what: 'Anthropic\'s AI assistant. Known for strong writing and long-context understanding. Projects let you save instructions and reference documents in a reusable workspace.',
      need: 'Worth trying alongside ChatGPT. Pro plan is $20/mo.',
    },
    {
      name: 'Gemini',
      what: 'Google\'s AI assistant. Integrated with Google Workspace — can read your Gmail, Calendar, and Drive. Gems are the equivalent of Custom GPTs.',
      need: 'If your company is on Google Workspace, this may be the path of least resistance.',
    },
    {
      name: 'Microsoft Copilot',
      what: 'Microsoft\'s AI assistant. Integrated with Office 365, Outlook, and Teams. Copilot GPTs work like Custom GPTs.',
      need: 'If your org is on Microsoft 365, you may already have access.',
    },
    {
      name: 'Google AI Studio',
      what: 'Google\'s developer-facing AI tool. More powerful and flexible than Gemini — longer context windows, ability to upload large files, and access to the latest models. Can also be used to build and test apps.',
      need: 'Free to use. Worth knowing about if you want more control than Gemini gives you, or if you\'re building something more complex.',
    },
    {
      name: 'Granola',
      what: 'An AI note-taker that sits on top of your meetings. It listens to the audio and combines what it hears with any notes you type to produce structured meeting notes.',
      need: 'Not required for the course, but very useful if you take a lot of meetings. Works on Mac and Windows.',
    },
    {
      name: 'Wispr Flow',
      what: 'A voice dictation tool that works anywhere on your computer — any text field, any app. You talk, it types. Cleans up filler words and false starts automatically.',
      need: 'Not required, but once you try it you won\'t go back. Great for people who think better out loud. Mac only for now.',
    },
    {
      name: 'Claude Code',
      what: 'A terminal-based AI tool from Anthropic. It can write code, but its real power is that it can access your local files and control your computer. That means it can read, write, and organize documents, manage your calendar, process emails, and automate workflows — not just build software.',
      need: 'Covered in Weeks 3-4. Steeper learning curve than chat-based tools, but the most flexible option for building systems around your actual work.',
    },
    {
      name: 'Cursor',
      what: 'An AI-powered editor. Like Claude Code, it can write code and work with files on your computer, but with a more visual interface — you can see files and changes as they happen. Useful for both building software and managing knowledge work.',
      need: 'Same use cases as Claude Code. Some people prefer the visual interface.',
    },
    {
      name: 'Lovable',
      what: 'A browser-based tool that lets you build apps by chatting with AI. No install required — everything runs in your browser. Describe what you want and it builds a working app.',
      need: 'The lowest-friction way to go from idea to working app. Good for prototyping and building team tools quickly.',
    },
    {
      name: 'Replit',
      what: 'A browser-based development environment with AI built in. Similar to Lovable but with more control over the code and deployment. Also supports backend logic and databases.',
      need: 'Good option if you want more control than Lovable offers, or if your app needs to store data or connect to other services.',
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
    {
      term: 'MCP (Model Context Protocol)',
      definition: 'A standard that lets AI tools connect to external services — your calendar, email, databases, APIs, etc. Instead of copying and pasting information into a chat, MCP lets the AI pull it in directly. Think of it as giving the AI permission to look things up on its own.',
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
        <button
          onClick={() => window.history.back()}
          className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors"
        >
          &larr; Back
        </button>

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
            onChange={(e) => { setFilter(e.target.value); setRequestStatus('idle'); setRequestName(''); setRequestContext(''); setRequestQuestion(''); }}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-800 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
          />
        </div>

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

        {/* No results */}
        {filter &&
          filteredCheatSheet.length === 0 &&
          filteredTools.length === 0 &&
          filteredGlossary.length === 0 && (
            <div className="py-8">
              <p className="text-stone-500 text-base mb-4">
                No results for "{filter}."
              </p>
              {requestStatus === 'sent' ? (
                <p className="text-stone-600 text-base font-medium">Sent! Hilary will take a look.</p>
              ) : requestStatus === 'form' || requestStatus === 'sending' ? (
                <div className="max-w-md mx-auto text-left space-y-3">
                  <div>
                    <label className="block text-stone-700 text-sm font-medium mb-1">Your name</label>
                    <input
                      type="text"
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 text-sm font-medium mb-1">Where did this come up?</label>
                    <input
                      type="text"
                      value={requestContext}
                      onChange={(e) => setRequestContext(e.target.value)}
                      placeholder="Optional - e.g. &quot;a colleague mentioned it&quot;"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 text-sm font-medium mb-1">Got a specific question?</label>
                    <input
                      type="text"
                      value={requestQuestion}
                      onChange={(e) => setRequestQuestion(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                    />
                  </div>
                  <button
                    onClick={handleSubmitRequest}
                    disabled={requestStatus === 'sending'}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-50"
                  >
                    {requestStatus === 'sending' ? 'Sending...' : 'Send request'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setRequestStatus('form')}
                  className="px-4 py-2 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Ask Hilary to add this
                </button>
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default Resources;
