import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center vintage-bg overflow-hidden p-4">
      <Link to="/" className="absolute top-4 left-4 text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors z-20">
        &larr; Back
      </Link>

      <div className="max-w-2xl w-full z-20">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-stone-800 uppercase mb-2">Experience</h2>
          <ul className="space-y-1 text-stone-800 text-lg">
            <li>• former head of core product & AI at WHOOP</li>
            <li>• prev @ dropbox, big health, nike, dosomething.org</li>
            <li>• former open water scuba instructor</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-stone-800 uppercase mb-2">Features</h2>
          <ul className="space-y-1 text-stone-800 text-lg">
            {[
              { title: 'How to be a supermanager with AI', pub: "Lenny's Newsletter", url: 'https://www.lennysnewsletter.com/p/how-to-become-a-supermanager-with' },
              { title: 'Be a better manager with CustomGPTs', pub: 'How I AI', url: 'https://www.youtube.com/watch?v=xDMkkOC-EhI' },
              { title: 'Build teams that can take a punch', pub: "Lenny's Podcast", url: 'https://www.lennysnewsletter.com/p/how-to-build-a-team-that-can-take-a-punch' },
              { title: 'How a WHOOP product leader made AI a habit for her team', pub: 'Business Insider', url: 'https://www.businessinsider.com/how-to-make-ai-daily-habit-work-days-gpt-whoop-2025-6' },
              { title: 'The Hidden Penalty of Using AI at Work', pub: 'Harvard Business Review', url: 'https://hbr.org/2025/08/research-the-hidden-penalty-of-using-ai-at-work' },
              { title: 'Your questions on AI at work', pub: "The Economist\u2019s Boss Class", url: 'https://www.economist.com/podcasts/2026/02/26/bonus-your-questions-on-ai-at-work' },
            ].map((item, i) => (
              <li key={i}>
                • <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 hover:underline transition-colors">{item.title}</a> <span className="text-stone-700">— {item.pub}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
