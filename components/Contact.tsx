
import React from 'react';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-pink" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-pink" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
        <p className="max-w-3xl mx-auto text-brand-light-gray mb-12">
          I'm actively seeking internship opportunities in AI/ML and software engineering. My passion for building intelligent systems, combined with proven technical skills and real-world project experience, positions me to contribute meaningfully to your team's success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-brand-gray p-8 rounded-lg flex flex-col items-center">
            <EmailIcon />
            <h3 className="text-xl font-bold mt-4 mb-2">Email</h3>
            <a href="mailto:work.shaunaklad@gmail.com" className="text-brand-light-gray hover:text-brand-pink transition">work.shaunaklad@gmail.com</a>
          </div>
          <div className="bg-brand-gray p-8 rounded-lg flex flex-col items-center">
            <PhoneIcon />
            <h3 className="text-xl font-bold mt-4 mb-2">Phone</h3>
            <p className="text-brand-light-gray">+91 9106155727</p>
          </div>
          <div className="bg-brand-gray p-8 rounded-lg flex flex-col items-center">
            <LocationIcon />
            <h3 className="text-xl font-bold mt-4 mb-2">Location</h3>
            <p className="text-brand-light-gray">Valsad, Gujarat, India</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-brand-gray p-8 rounded-lg flex flex-col items-center">
            <a href="https://www.linkedin.com/in/shaunaklad21/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile" className="hover:scale-110 transition-transform duration-300">
              <LinkedInIcon />
            </a>
            <h3 className="text-xl font-bold mt-4 mb-2">LinkedIn</h3>
            <a href="https://www.linkedin.com/in/shaunaklad21/" target="_blank" rel="noopener noreferrer" className="text-brand-light-gray hover:text-brand-pink transition">
              Visit Profile
            </a>
          </div>
          <div className="bg-brand-gray p-8 rounded-lg flex flex-col items-center">
            <a href="https://github.com/MADSKULL21" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile" className="hover:scale-110 transition-transform duration-300">
              <GitHubIcon />
            </a>
            <h3 className="text-xl font-bold mt-4 mb-2">GitHub</h3>
            <a href="https://github.com/MADSKULL21" target="_blank" rel="noopener noreferrer" className="text-brand-light-gray hover:text-brand-pink transition">
              View Repository
            </a>
          </div>
        </div>
        <a href="mailto:work.shaunaklad@gmail.com" className="bg-brand-pink text-white font-semibold py-3 px-10 rounded-md hover:bg-opacity-80 transition duration-300 text-lg">
          Send Message
        </a>
      </div>
    </section>
  );
};

export default Contact;
