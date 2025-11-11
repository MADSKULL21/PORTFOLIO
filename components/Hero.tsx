
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center relative overflow-hidden">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-brand-dark opacity-40"></div>
      
      {/* Subtle dark pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark-pattern"></div>
      
      <div className="relative z-10 p-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">Shaunak Lad</h1>
        <p className="text-lg md:text-xl text-brand-light-gray mb-8">AI/ML Engineer | Python Developer | NLP Specialist</p>
        <div className="space-x-4">
          <a href="#contact" className="bg-brand-pink text-white font-semibold py-3 px-8 rounded-md hover:bg-opacity-80 transition duration-300">
            Get in Touch
          </a>
          <a href="#projects" className="bg-transparent border border-brand-pink text-brand-pink font-semibold py-3 px-8 rounded-md hover:bg-brand-pink hover:text-white transition duration-300">
            View Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
