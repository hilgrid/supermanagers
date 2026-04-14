import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "Is this course too basic if I'm already fluent in AI?",
    answer: (
      <>
        <p className="text-stone-800 text-base leading-relaxed mb-3">
          Week 1 is intentionally foundational so the whole cohort starts from a shared baseline - expect some familiar ground if you've been building with AI for a while. Weeks 2-4 ramp up significantly: iterating on prompts like a product manager, vibe coding full applications from scratch, and building agentic systems with your own Manager OS.
        </p>
        <p className="text-stone-800 text-base leading-relaxed">
          If Week 1 feels too basic, you're welcome to skim the video notes and jump ahead to Week 2 onward. And if the course isn't the right fit for you, refunds are available - just reach out.
        </p>
      </>
    ),
  },
];

const FAQ: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState<number | null>(0);

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
            Common questions from past and current students. Can't find what you're looking for? Drop your question in the Slack and I'll add it here.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-stone-300 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors text-left"
              >
                <span className="text-stone-800 text-base font-medium pr-4">{faq.question}</span>
                <span className="text-stone-400 text-lg flex-shrink-0">
                  {open === i ? '\u2212' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 border-t border-stone-200 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
