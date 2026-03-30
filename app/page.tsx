import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import GithubSection from '@/components/sections/GithubSection';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import ClientEffects from '@/components/system/ClientEffects';

export default function HomePage() {
  return (
    <div className="site-wrapper">
      <ClientEffects />
      <div className="site-backdrop" aria-hidden="true" />
      <Header />

      <main id="main-content" className="page">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <GithubSection />
        <Contact />
      </main>
    </div>
  );
}
