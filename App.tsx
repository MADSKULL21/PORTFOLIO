
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="bg-brand-dark text-white min-h-screen portfolio-bg">
      <div className="portfolio-overlay">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <footer className="text-center p-6 bg-black text-sm text-brand-light-gray">
          <p>&copy; {new Date().getFullYear()} Shaunak Lad. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
