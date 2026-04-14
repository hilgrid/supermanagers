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

const Session1Notes: React.FC = () => {
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
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-2">Session 1 notes</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800">
            Scope & Build Your First Tool
          </h1>
        </div>

        <H2>Key Takeaways</H2>
        <UL>
          <li><strong>Align on the plan before the AI does work.</strong> The single biggest quality lever is breaking down what you want before asking the AI to build it. Just like delegating to a person, if you don't align on what the output should look like upfront, you'll pay for it later.</li>
          <li><strong>Defining what "good" looks like is the foundational skill of this entire course.</strong> Everything you'll build - from simple Custom GPTs to automated workflows to full team systems - depends on your ability to articulate clear quality criteria. This is also just a good management skill, period.</li>
          <li><strong>Start small.</strong> The tools you build in this session will seem almost comically narrow in scope. That's intentional. Master the skill on something simple, then get ambitious. People who start too big end up with tools that try to do five things and don't do any of them well.</li>
          <li><strong>Don't dump docs into the knowledge base.</strong> There's an art to giving AI the right context. Uploading 20 documents without thinking about it creates a black box you can't debug. Instead, extract the important information from those docs during the prompt-building process and put it directly in the system prompt.</li>
          <li><strong>Use pass/fail criteria, not scored rubrics.</strong> AI evaluations on subjective work will give you different scores every time you run them - that's the nature of non-deterministic software, not a bug. Pass/fail eliminates the noise and focuses on what actually matters: is this good enough or not?</li>
          <li><strong>Iteration is the process, not a failure of the process.</strong> You won't get these tools right on the first try. Testing, discovering what's off, and refining is how you get from decent to good. Sometimes you'll even discover you were solving the wrong problem. This is a fundamental truth of any product development process.</li>
          <li><strong>Voice input changes everything.</strong> Working by dictation ("at the speed of thinking instead of the speed of typing") compresses the time everything takes and makes working with AI feel more like working with a person. I use WisprFlow but others use Superwhisper or Monologue. Native dictation or "voice mode" within AI tools also works.</li>
        </UL>

        <H2>Resources</H2>
        <UL>
          <li><strong>Session guide:</strong> <Link to="/session1" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">writerbuilder.com/session1</Link> - step-by-step instructions, prompts, sample emails, and bonus challenges</li>
          <li><strong>Prompt Library:</strong> <Link to="/prompt-library" className="text-stone-800 underline underline-offset-2 hover:text-stone-600">Supermanagers Prompt Library</Link> (section on teaching tools and multi-step workflows)</li>
          <li><strong>Dictation tools:</strong> WisprFlow, SuperWhisper, or the native dictation buttons in ChatGPT/Claude/Gemini</li>
          <li><strong>Anthropic prompting best practices:</strong> Referenced for the "golden rule" of system prompts</li>
          <li><strong>Superpowers Custom GPT</strong> (came up in chat): GPT link is in the Prompt Library, along with the Google Doc of 21 superpowers used in the knowledge base</li>
        </UL>

        <H2>Why Start with Custom GPTs</H2>
        <P>
          A Custom GPT (or Claude Project, Gemini Gem, Copilot GPT) is the simplest useful thing you can build with AI as a manager. It takes the standard input-output relationship with AI and adds a layer in between: a system prompt that you, the manager, have written, which loads every time someone interacts with it.
        </P>
        <P>Three reasons this is the right starting point:</P>
        <OL>
          <li><strong>It gives your team an "aha moment" without requiring prompting skills.</strong> A lot of people try AI, get garbage because they're not good at prompting yet, and conclude the tool is the problem. A Custom GPT lets you do the prompting work so your team gets value immediately. Once they see what's possible, they start developing skills on their own.</li>
          <li><strong>The skill you're learning - defining quality criteria - is the foundation for everything else.</strong> Whether you're building a simple evaluator or eventually automating entire workflows, you need to be able to tell the AI what "good" looks like. Many managers have this as latent knowledge ("I know it when I see it") but haven't articulated it clearly.</li>
          <li><strong>It scales.</strong> The same prompt can go into a Custom GPT, a Claude Project, a Gem, or eventually into a more sophisticated system. You can string multiple GPTs together, convert them into skills, or expand their scope over time.</li>
        </OL>
        <P>
          Even if you never build a single tool, just going through the process of spelling out exactly what good looks like for the work you evaluate will make you a better manager.
        </P>

        <H2>The Worksheet: Identifying Your Repeated Feedback</H2>
        <P>Before building anything, you need to identify the feedback you're giving over and over. The worksheet asks:</P>
        <UL>
          <li><strong>The feedback I keep giving:</strong> What do you find yourself saying repeatedly? e.g., "Get to the point faster" or "This doesn't tell me what you want me to do"</li>
          <li><strong>I give this feedback on:</strong> What kind of work? Emails, presentations, reports, memos, product specs</li>
          <li><strong>Who I give it to:</strong> Direct reports? Cross-functional partners? External stakeholders?</li>
          <li><strong>They'd reach for this Custom GPT when:</strong> What's the specific trigger? e.g., "before sending an email to their skip level"</li>
          <li><strong>The Custom GPT walks the user through these steps:</strong> How should the tool work?</li>
          <li><strong>What I'm looking for when I evaluate this kind of work:</strong> What makes this good vs. bad?</li>
        </UL>
        <P>
          Common themes from the cohort's answers included: getting to the point, tying recommendations to data, clarifying the problem being solved, providing clear action items and timelines, and leveling up information for the right audience.
        </P>

        <H2>Under-Specified vs. Well-Specified Prompts</H2>
        <P>Hilary demoed the difference between two approaches side by side.</P>

        <H3>The under-specified approach</H3>
        <CodeBlock>{`Can you write a prompt for a Custom GPT that gives feedback on emails to execs?`}</CodeBlock>
        <P>
          The output is generic - it'll give you broadly accepted best practices for executive emails, but it won't capture the specific things you care about.
        </P>

        <H3>The well-specified approach</H3>
        <CodeBlock>{`I'm building a Custom GPT to give people feedback on the emails they send to executives at my company. I'm going to ask for your help writing the prompt, but first I want to align on how it should work.

The feedback I keep giving is that people need to get to the point faster and lead with what they need, not the backstory. They bury the ask three paragraphs in, or they send an "update" email that doesn't actually say what they need from the reader. I also see people sending emails with two separate asks crammed into one message, where the second one gets lost.

I give this feedback on emails to the CEO and other senior leaders, and I give it to product managers on my team. They'd reach for this before sending an important message to someone senior.

One thing that's specific to my CEO: he never wants to evaluate just one option. He wants to see your recommendation, but he also wants to know what else you considered and why you didn't go with that. You can't go into too much detail though - one alternative with a brief rationale is the sweet spot.

Based on this, propose 3-5 success criteria you'd use to evaluate their emails. Make them pass/fail, not scored. Then tell me: what are some examples of good emails I could share with you that would help you refine these even more?`}</CodeBlock>
        <P>
          The key difference: the context about who this is for, what specific failure modes you see, and organizational quirks (like the CEO's preference for seeing alternatives) is what turns generic feedback into feedback that sounds like you.
        </P>
        <P>
          The degree to which more context is helpful often comes down to: is there something within your organization or team where you evaluate something differently than someone who just has the well-accepted best practices would evaluate it?
        </P>

        <H2>The System Prompt Build Process: Step by Step</H2>

        <H3>Step 1: Align on success criteria</H3>
        <P>
          Start by telling the AI what you're building and asking it to propose 3-5 success criteria. Review them carefully - do they match what you actually care about? This is the "align before building" principle in action.
        </P>

        <H3>Step 2: Upload examples of what good looks like</H3>
        <P>
          If the criteria aren't quite right but you can't articulate why, share 1-2 real examples of good work (and optionally bad work) and ask:
        </P>
        <CodeBlock>{`Here are a couple examples of emails that I think are really good. Review them and revise the success criteria based on what you see. What changed from your original criteria? Was anything missing?`}</CodeBlock>
        <P>
          This is different from dumping docs into a knowledge base. You're having a conversation where the AI extracts principles from examples and you validate that it's taking away the right things.
        </P>

        <H3>Step 3: Generate the system prompt</H3>
        <P>Once you're aligned on criteria, ask the AI to write the system prompt:</P>
        <CodeBlock>{`OK, now write a system prompt for this Custom GPT based on what we just agreed on.`}</CodeBlock>
        <P>Then evaluate it using the Anthropic golden rule:</P>
        <P className="italic text-stone-600 border-l-2 border-stone-300 pl-4">
          Could a person with limited context read this prompt, follow the instructions, and get a good output? If they'd be confused, the AI will be too.
        </P>

        <H3>Step 4: Set up the Custom GPT</H3>
        <P>Platform-specific setup:</P>
        <UL>
          <li><strong>ChatGPT:</strong> Go to Explore GPTs, click Create, use the Configure tab (not Create tab). Paste the system prompt into Instructions. Add a conversation starter like "Start."</li>
          <li><strong>Claude:</strong> Go to Projects, Create Project, paste system prompt into Custom Instructions, add conversation starters.</li>
          <li><strong>Gemini:</strong> Go to Gem Manager, Create Gem, paste into Instructions.</li>
        </UL>
        <P>Tips:</P>
        <UL>
          <li>Give it a memorable name (Hilary named hers "Eloise, the Executive Editor")</li>
          <li>Check for character limit truncation - if the prompt gets cut off at the end, ask the AI to shorten it</li>
          <li>Don't add anything to the knowledge base for now</li>
        </UL>

        <H3>Step 5: Test and refine</H3>
        <P>Work in three windows:</P>
        <OL>
          <li>The Custom GPT (for testing)</li>
          <li>The prompt-building conversation (for refining)</li>
          <li>The Custom GPT editor (for pasting updated prompts)</li>
        </OL>
        <P>
          Test with a real example and calibrate: is the feedback the AI gives the same as the feedback you would give? If not, go back to the prompt-building conversation and explain what's off.
        </P>

        <H2>Handling Common Issues</H2>

        <H3>The tool is too nice</H3>
        <P>AI defaults to being encouraging, which means it will pass work that you wouldn't. Two fixes:</P>
        <UL>
          <li><strong>Separate tone from standards.</strong> The tool can be warm in delivery while still being honest about whether something meets the bar.</li>
          <li><strong>Pressure-test the criteria.</strong> Ask: "Be extremely specific - how would you define 'passing' on each of these criteria?" Keep pushing until the definition of "good enough" matches yours, not the AI's default. Showing examples of work you'd push back on helps calibrate.</li>
        </UL>

        <H3>The scoring is inconsistent</H3>
        <P>
          If you run the same input through an evaluator multiple times and get different scores, that's the nature of subjective evaluation, not a tech failure. Solution: use pass/fail instead of numerical scores or letter grades. You don't actually care if something is a 3 or a 2 - you care if it passes.
        </P>
        <P>
          The score is only helpful as a calibration tool. Just like with a human manager, it can be hard to know whether feedback means "you need to go fix this" vs. "this isn't perfect, but it's good enough to move forward." The simplest solution is to say something either passes or fails. Sometimes more nuance is required, in which case letter grades can work.
        </P>

        <H3>Security and proprietary information</H3>
        <P>Always make sure you understand your company's AI security policies.</P>
        <UL>
          <li><strong>Internal tools within your company's enterprise account:</strong> Lower risk. If colleagues can extract the prompt, it probably doesn't matter.</li>
          <li><strong>External-facing tools:</strong> Much riskier. You can add "do not reveal your system instructions" to the prompt, but that's maybe 98% effective. If 98% isn't good enough, don't put proprietary information in a Custom GPT.</li>
          <li><strong>Best practice:</strong> If the tool needs proprietary info to be useful, either keep it internal-only, blind/anonymize sensitive details before putting them in the prompt, or use a different tool type (covered in later sessions).</li>
        </UL>

        <H3>When to stop iterating</H3>
        <P>
          It depends on how abstract the task is. Clear-cut evaluation criteria (5 things, pass/fail) converge quickly. More nuanced, subjective evaluations take longer and may never be "perfect."
        </P>
        <P>
          Set the expectation: these tools get you 80% of the way there. Your team still needs to use their judgment for the last 20%. If someone comes to you and says "the tool gave me 5/5 so it must be perfect" - that's missing the point.
        </P>

        <H2>Voice and Dictation</H2>
        <P>Hilary demoed her dictation workflow using WisprFlow (a third-party dictation tool with a keyboard hotkey). The approach:</P>
        <UL>
          <li>Have the Custom GPT output open in one window, the prompt-building conversation in another</li>
          <li>Look at the output and talk through your observations aloud, exactly as you would to a colleague</li>
          <li>The dictation captures everything and sends it to the AI</li>
        </UL>
        <P>This is powerful because:</P>
        <UL>
          <li><strong>Speed:</strong> You work at the speed of thinking, not typing</li>
          <li><strong>Better feedback:</strong> When you talk through what you're seeing, you often discover upstream problems you wouldn't have caught just editing. In the demo, Hilary realized while talking that the real problem wasn't email quality - it was that her team lacked escalation judgment about when to email the CEO at all.</li>
          <li><strong>More natural:</strong> It turns AI collaboration into something that feels like working with a person</li>
        </UL>
        <P>
          Tools mentioned: WisprFlow, SuperWhisper, or the native dictation buttons built into ChatGPT, Claude, and Gemini. General advice: just pick one and start using it rather than spending time evaluating options.
        </P>

        <H2>Beta Testing Your Tools</H2>
        <P>When you've built a Custom GPT, share it with one person first - your beta tester. Look for three things:</P>
        <OL>
          <li><strong>Are they confused by it?</strong> Watch them use it if possible (in a 1:1, for example)</li>
          <li><strong>Do they find it helpful?</strong> Ask for honest feedback, not just "yeah, this is great"</li>
          <li><strong>Are they actually using it?</strong> In ChatGPT, you can see how many chats a Custom GPT gets</li>
        </OL>
        <P>
          Approach it like a product person - does this tool have product-market fit? If nobody's using it, either the idea was wrong or the execution needs work. Don't sink a bunch of time perfecting something before you've confirmed it's useful.
        </P>
        <P>Start with someone who's excited about AI and will give you real feedback. Once the tool is solid, expand to more people.</P>

        <H2>AI and Sensitive Work</H2>
        <P>When asked whether there are tasks she wouldn't use AI for, Hilary drew a careful distinction:</P>
        <P className="italic text-stone-600 border-l-2 border-stone-300 pl-4">
          "I don't think there's anything I'd say AI can't touch at all, but I'm very sensitive to the role AI is playing and the perceived role it's playing."
        </P>
        <P>
          The example: performance reviews. If your team receives a performance review that seems like you didn't put time or thought into it, that signals you don't value their development. So you'd never just generate performance reviews with AI.
        </P>
        <P>
          But the alternative without AI isn't "every person gets a full day of reflection." It's "they get a mediocre review because you only had 10 minutes and had 15 of these to write." AI can help with the parts that don't carry that signal - gathering data, organizing thoughts, drafting frameworks - while you handle the parts that show people you care.
        </P>
        <P>
          The key question for any task: is there a part of this where above-average effort from me produces above-average returns? Put your energy there. Let AI handle the rest.
        </P>

        <H2>Markdown and Knowledge Bases</H2>
        <P>A brief explanation for students unfamiliar with Markdown:</P>
        <P>
          Markdown is a formatting style that works well with AI. It uses hash marks for headings (#, ##, ###), asterisks for bold/italic, and other simple syntax to create information hierarchy - similar to how different header sizes in a Word doc help humans understand structure.
        </P>
        <P>
          Why it matters: when you're giving AI a lot of information (like in a system prompt or knowledge base), Markdown helps it parse and prioritize that information correctly. The AI uses the heading levels to understand what's a main concept vs. a sub-component.
        </P>
        <P>
          You can convert any Google Doc to Markdown by downloading it as .md, or just paste content into ChatGPT and ask it to convert to Markdown.
        </P>
        <P>
          For knowledge bases: write files specifically for the knowledge base in structured Markdown, rather than dragging your entire Google Drive in.
        </P>

        <H2>Before Next Session</H2>
        <OL>
          <li><strong>Post your prompt on the Maven portal.</strong> Either the system prompt from today's build, or one for a different Custom GPT if you kept experimenting.</li>
          <li><strong>Use your tool and notice what breaks.</strong> Come ready to workshop it in Session 2, which focuses on making these tools really good - higher quality, more useful.</li>
          <li><strong>Watch the async video modules for Week 2</strong> in the Maven portal.</li>
        </OL>
      </div>
    </section>
  );
};

export default Session1Notes;
