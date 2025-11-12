
import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v6m0 0l-3-3m3 3l3-3M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
  </svg>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-wider text-white">
          SL
        </a>
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-brand-light-gray hover:text-brand-pink transition-colors duration-300">
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 ml-4">
            <a 
              href="/Shaunak_ML_RESUME.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-brand-pink text-white rounded-md hover:bg-opacity-80 transition duration-300 text-sm font-semibold"
            >
              <DownloadIcon />
              View CV
            </a>
            <a 
              href="/Shaunak_ML_RESUME.pdf" 
              download="Shaunak_ML_RESUME.pdf"
              className="flex items-center gap-2 px-4 py-2 border border-brand-pink text-brand-pink rounded-md hover:bg-brand-pink hover:text-white transition duration-300 text-sm font-semibold"
            >
              <DownloadIcon />
              Download
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
