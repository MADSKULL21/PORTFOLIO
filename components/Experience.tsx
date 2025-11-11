
import React from 'react';

const experiences = [
  {
    title: 'Minutes of Meeting Recorder',
    company: 'Atul Limited (Infotech Division) | Summer Internship',
    description: 'Designed bilingual speech-to-text system achieving >90% accuracy with real-time transcription, Tkinter GUI, and structured document export in <5 seconds using Web Speech API and Selenium automation.',
  },
  {
    title: 'BCG Data Science Simulation',
    company: 'Forage | Customer Churn Analysis',
    description: 'Conducted advanced analytics using Python, built Random Forest model achieving 85% accuracy in predicting customer churn, and created data visualizations revealing critical business insights for strategic intervention.',
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Professional Experience</h2>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -ml-0.5 w-1 bg-brand-gray h-full"></div>
          {experiences.map((exp, index) => (
            <div key={exp.title} className="mb-12 flex justify-between items-center w-full flex-col md:flex-row">
              <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}></div>
              <div className="z-10 flex items-center justify-center md:order-2">
                <div className="w-8 h-8 bg-brand-pink rounded-full border-4 border-brand-dark shadow-lg"></div>
              </div>
              <div className={`bg-brand-gray p-6 rounded-lg shadow-xl md:w-5/12 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-brand-pink mb-3 font-semibold">{exp.company}</p>
                <p className="text-brand-light-gray">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
