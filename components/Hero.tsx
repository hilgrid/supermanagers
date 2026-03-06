import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center vintage-bg overflow-hidden p-4">
      <div className="cartoon-card-bg relative z-20 transform transition-all duration-300 ease-out hover:rotate-1 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-xl cursor-pointer p-6 md:p-8" style={{ width: '560px', maxWidth: '90vw' }}>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-800 font-sans text-center">Hilary Gridley</h1>
          <h2 className="text-xl md:text-2xl font-medium tracking-widest text-stone-500 uppercase mt-2">WRITERBUILDER</h2>
        </div>
        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-row justify-between items-center text-sm md:text-base font-bold tracking-widest text-stone-700 uppercase">
          <span>Have words</span>
          <span>Will Build</span>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
      </div>
      <div className="flex flex-col items-center space-y-2 mt-8 z-20">
        <a href="https://hils.substack.com" target="_blank" rel="noopener noreferrer" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">Writerbuilder newsletter</a>
        <a href="https://maven.com/hilary-gridley/ai-powered-people-management" target="_blank" rel="noopener noreferrer" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">Supermanagers course</a>
        <a href="/jobsearch" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">Job search tools</a>
        <Link to="/steeringwheel" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">AI steering wheel</Link>
        <Link to="/about" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors">About me</Link>
      </div>
    </section>
  );
};

export default Hero;
